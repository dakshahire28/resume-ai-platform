import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, UploadCloud, RefreshCw, File } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import * as pdfjsLib from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';
import axios from 'axios';

// Configure pdf.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export default function ImportResumeModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [pdfFile, setPdfFile] = useState(null);

  const extractTextFromPDF = async (file) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      let fullText = '';
      
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map(item => item.str).join(' ');
        fullText += pageText + '\n';
      }
      return fullText;
    } catch (err) {
      console.error('PDF extraction failed:', err);
      throw new Error('Could not extract text from PDF. Please ensure it is a text-based PDF, not an image.');
    }
  };

  const onDrop = useCallback(async (acceptedFiles) => {
    if (acceptedFiles?.length > 0) {
      const file = acceptedFiles[0];
      if (file.type !== 'application/pdf') {
        setError('Please upload a PDF file.');
        return;
      }
      setPdfFile(file);
      setError('');
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles: 1
  });

  const handleImport = async () => {
    if (!pdfFile) return;
    setLoading(true);
    setError('');

    try {
      const extractedText = await extractTextFromPDF(pdfFile);
      
      if (!extractedText || extractedText.trim().length < 50) {
        throw new Error("Could not find enough text in this PDF. It might be a scanned image.");
      }

      // Limit string to 30k characters to prevent TLS/SSL payload bloat to Gemini API
      const safeText = extractedText.substring(0, 30000);

      // Extract filename without extension to use as the resume title
      const pdfFileName = pdfFile.name.replace(/\.pdf$/i, '');

      const res = await axios.post('/api/resumes/auto-improve', {
        source: 'pdf',
        resumeText: safeText,
        pdfFileName,
        missingKeywords: [], // No target job or keywords, just straight parse
        targetJob: 'Professional'
      });

      // Redirect to builder
      navigate(`/builder?id=${res.data.newResumeId}`);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.message || "Failed to import resume.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setPdfFile(null);
    setError('');
    setLoading(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={handleClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-surface border border-border w-full max-w-md rounded-2xl shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        <div className="flex items-center justify-between p-6 border-b border-border/50">
          <div>
            <h2 className="text-xl font-bold text-text-main">Import Resume</h2>
            <p className="text-xs font-medium text-text-secondary mt-1">AI will extract your PDF into an editable format.</p>
          </div>
          <button 
            onClick={handleClose}
            className="p-2 rounded-lg text-text-muted hover:bg-background hover:text-text-main transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-200 font-medium">
              {error}
            </div>
          )}

          {!pdfFile ? (
            <div 
              {...getRootProps()} 
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${isDragActive ? 'border-primary bg-primary/5' : 'border-border hover:border-text-muted hover:bg-background'}`}
            >
              <input {...getInputProps()} />
              <UploadCloud size={32} className="mx-auto text-text-muted mb-3" />
              <p className="text-sm font-bold text-text-main">Click or drag a PDF here</p>
              <p className="text-xs text-text-secondary mt-1">Maximum file size: 5MB</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between bg-background border border-border rounded-xl p-4">
                <div className="flex items-center gap-3 overflow-hidden">
                  <File size={24} className="text-red-500 shrink-0" />
                  <div className="truncate">
                    <p className="text-sm font-bold text-text-main truncate">{pdfFile.name}</p>
                    <p className="text-xs text-text-secondary">{(pdfFile.size / 1024).toFixed(0)} KB</p>
                  </div>
                </div>
                <button 
                  onClick={() => setPdfFile(null)} 
                  disabled={loading}
                  className="text-text-secondary hover:text-red-500 p-2 disabled:opacity-50"
                >
                  <X size={18} />
                </button>
              </div>

              <button
                onClick={handleImport}
                disabled={loading}
                className="w-full bg-primary text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? <RefreshCw size={18} className="animate-spin" /> : <UploadCloud size={18} />}
                {loading ? "Importing... (This takes a moment)" : "Extract & Import"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
