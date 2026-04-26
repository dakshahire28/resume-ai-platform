import React, { useState, useEffect, useCallback } from 'react';
import { 
  FileText, Sparkles, CheckCircle2, 
  XOctagon, AlertTriangle, ChevronRight, LayoutTemplate, UploadCloud, RefreshCw, File
} from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import * as pdfjsLib from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';
import axios from 'axios';

// Configure pdf.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export default function ResumeAnalyzer() {
  const [targetJob, setTargetJob] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [results, setResults] = useState(null);
  
  // 'pdf' or 'saved'
  const [uploadMode, setUploadMode] = useState('pdf');
  
  // PDF state
  const [pdfFile, setPdfFile] = useState(null);
  const [extractedPdfText, setExtractedPdfText] = useState('');
  
  // Saved resumes state
  const [savedResumes, setSavedResumes] = useState([]);
  const [selectedResumeId, setSelectedResumeId] = useState('');

  // Fetch saved resumes on mount
  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const res = await axios.get('/api/resumes');
        setSavedResumes(res.data.data || res.data);
      } catch (err) {
        console.error("Failed to fetch resumes:", err);
      }
    };
    fetchResumes();
  }, []);

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
      console.error("Error reading PDF:", err);
      throw new Error("Could not parse PDF file. Ensure it is a valid text-based PDF.");
    }
  };

  const onDrop = useCallback(async (acceptedFiles) => {
    setError('');
    const file = acceptedFiles[0];
    if (!file) return;
    
    setPdfFile(file);
    try {
      setLoading(true);
      const text = await extractTextFromPDF(file);
      setExtractedPdfText(text);
    } catch (err) {
      setError(err.message);
      setPdfFile(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles: 1
  });

  const handleAnalyze = async () => {
    if (!targetJob.trim()) {
      setError("Please enter a Target Job Description or Title.");
      return;
    }

    let payloadText = '';

    if (uploadMode === 'pdf') {
      if (!extractedPdfText) {
        setError("Please upload a PDF resume first.");
        return;
      }
      payloadText = extractedPdfText;
    } else {
      if (!selectedResumeId) {
        setError("Please select a saved resume.");
        return;
      }
      const selected = savedResumes.find(r => r._id === selectedResumeId || r.id === selectedResumeId);
      if (!selected) {
        setError("Selected resume not found.");
        return;
      }
      payloadText = JSON.stringify(selected.data);
    }

    setLoading(true);
    setError('');
    
    try {
      const res = await axios.post('/api/resumes/analyze', {
        resumeText: payloadText,
        targetJob: targetJob
      });
      setResults(res.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || err.response?.data?.message || err.message || "Analysis failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 pb-12 w-full text-text-main font-sans">
      
      {/* LEFT COLUMN: INPUTS */}
      <div className="lg:w-1/3 flex flex-col gap-6">
        <section>
          <h1 className="text-3xl font-extrabold tracking-tight mb-2">Resume Analyzer</h1>
          <p className="text-sm font-medium text-text-secondary">
            Upload your resume and provide a target job to check its ATS compatibility.
          </p>
        </section>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm font-medium">
            {error}
          </div>
        )}

        <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm flex flex-col gap-6">
          {/* Target Job */}
          <div>
            <label className="block text-sm font-bold text-text-main mb-2">Target Job Description or Title <span className="text-red-500">*</span></label>
            <textarea 
              className="w-full bg-background border border-border rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all h-32 resize-none"
              placeholder="Paste the job description or role title here (e.g., 'Senior Frontend Engineer')..."
              value={targetJob}
              onChange={(e) => setTargetJob(e.target.value)}
            />
          </div>

          {/* Source Toggle */}
          <div>
            <label className="block text-sm font-bold text-text-main mb-2">Resume Source</label>
            <div className="flex bg-background border border-border rounded-lg p-1">
              <button 
                className={`flex-1 py-1.5 text-sm font-semibold rounded-md transition-colors ${uploadMode === 'pdf' ? 'bg-surface shadow-sm text-primary' : 'text-text-secondary hover:text-text-main'}`}
                onClick={() => setUploadMode('pdf')}
              >
                Upload PDF
              </button>
              <button 
                className={`flex-1 py-1.5 text-sm font-semibold rounded-md transition-colors ${uploadMode === 'saved' ? 'bg-surface shadow-sm text-primary' : 'text-text-secondary hover:text-text-main'}`}
                onClick={() => setUploadMode('saved')}
              >
                Saved Resumes
              </button>
            </div>
          </div>

          {/* Source Input */}
          {uploadMode === 'pdf' ? (
            <div>
              {pdfFile ? (
                <div className="flex items-center justify-between bg-background border border-border rounded-xl p-4">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <File size={24} className="text-red-500 shrink-0" />
                    <div className="truncate">
                      <p className="text-sm font-bold text-text-main truncate">{pdfFile.name}</p>
                      <p className="text-xs text-text-secondary">{(pdfFile.size / 1024).toFixed(0)} KB</p>
                    </div>
                  </div>
                  <button onClick={() => { setPdfFile(null); setExtractedPdfText(''); }} className="text-text-secondary hover:text-red-500 p-2">
                    <XOctagon size={18} />
                  </button>
                </div>
              ) : (
                <div {...getRootProps()} className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${isDragActive ? 'border-primary bg-primary/5' : 'border-border hover:border-text-muted hover:bg-background'}`}>
                  <input {...getInputProps()} />
                  <UploadCloud size={32} className="mx-auto text-text-muted mb-3" />
                  <p className="text-sm font-bold text-text-main">Click or drag a PDF here</p>
                  <p className="text-xs text-text-secondary mt-1">Maximum file size: 5MB</p>
                </div>
              )}
            </div>
          ) : (
            <div>
              <select 
                className="w-full bg-background border border-border rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary outline-none"
                value={selectedResumeId}
                onChange={(e) => setSelectedResumeId(e.target.value)}
              >
                <option value="">Select a saved resume...</option>
                {savedResumes.map(r => (
                  <option key={r._id || r.id} value={r._id || r.id}>
                    {r.title || 'Untitled Resume'}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Analyze Button */}
          <button 
            onClick={handleAnalyze}
            disabled={loading}
            className="w-full group relative overflow-hidden rounded-xl p-[1px] shadow-sm transition-shadow hover:shadow-md focus:outline-none disabled:opacity-70 disabled:cursor-not-allowed mt-2"
          >
            {!loading && <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />}
            <div className="relative flex h-full items-center justify-center gap-2 rounded-xl bg-surface px-6 py-4 text-base font-bold text-text-main transition-colors group-hover:bg-background">
              {loading ? (
                <><RefreshCw size={18} className="animate-spin text-primary" /> Analyzing...</>
              ) : (
                <><Sparkles size={18} className="text-primary" /> Optimize with AI</>
              )}
            </div>
          </button>
        </div>
      </div>

      {/* RIGHT COLUMN: RESULTS */}
      <div className="lg:w-2/3 flex flex-col gap-6">
        {!results ? (
          <div className="h-full bg-surface border border-border rounded-2xl p-12 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
              <Sparkles size={32} />
            </div>
            <h2 className="text-2xl font-bold mb-2">Ready to analyze</h2>
            <p className="text-text-secondary max-w-md">
              Upload your resume and provide a target job description to get AI-powered insights, keyword extraction, and ATS scoring.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Top Row: Score & Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Overall Score */}
              <div className="bg-surface border border-primary/20 rounded-2xl p-8 shadow-sm flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-purple-500 to-primary"></div>
                <h2 className="text-lg font-bold mb-6 w-full text-left">Overall ATS Score</h2>
                
                <div className="relative flex justify-center mb-6">
                  <svg width="200" height="200" viewBox="0 0 240 240">
                    <circle cx="120" cy="120" r="100" fill="none" stroke="currentColor" strokeWidth="20" className="text-border" />
                    <circle cx="120" cy="120" r="100" fill="none" stroke="currentColor" strokeWidth="20" className={results.score >= 80 ? "text-success" : results.score >= 60 ? "text-yellow-500" : "text-red-500"} 
                      strokeDasharray="628" 
                      strokeDashoffset={628 - (628 * results.score) / 100} 
                      strokeLinecap="round" 
                      style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%', transition: 'stroke-dashoffset 1.5s ease-out' }} />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-5xl font-black tracking-tighter mb-1">{results.score}<span className="text-xl text-text-secondary">%</span></span>
                  </div>
                </div>

                <div className="w-full flex flex-col gap-3 mt-4">
                  <div className="w-full flex items-center justify-between bg-background border border-border rounded-xl p-3">
                    <p className="text-[11px] font-bold text-text-secondary uppercase">Impact</p>
                    <p className="text-lg font-black">{results.subScores?.impact}%</p>
                  </div>
                  <div className="w-full flex items-center justify-between bg-background border border-border rounded-xl p-3">
                    <p className="text-[11px] font-bold text-text-secondary uppercase">Brevity</p>
                    <p className="text-lg font-black">{results.subScores?.brevity}%</p>
                  </div>
                  <div className="w-full flex items-center justify-between bg-background border border-border rounded-xl p-3">
                    <p className="text-[11px] font-bold text-text-secondary uppercase">Keywords</p>
                    <p className="text-lg font-black">{results.subScores?.keywords}%</p>
                  </div>
                </div>
              </div>

              {/* Keywords Analysis */}
              <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm flex flex-col">
                <h2 className="text-lg font-bold mb-4">Keyword Match</h2>
                
                <div className="mb-6">
                  <h3 className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2 text-success">
                    <CheckCircle2 size={14} /> Present ({results.presentKeywords?.length || 0})
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {results.presentKeywords?.map((kw, i) => (
                      <span key={i} className="bg-success-bg/50 text-success-text border border-success-bg px-2.5 py-1 rounded-md text-[11px] font-bold">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2 text-red-500">
                    <XOctagon size={14} /> Missing ({results.missingKeywords?.length || 0})
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {results.missingKeywords?.map((kw, i) => (
                      <span key={i} className="bg-background text-text-secondary border border-border px-2.5 py-1 rounded-md text-[11px] font-bold">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Improvement Suggestions */}
            <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-bold mb-4">Improvement Suggestions</h2>
              <div className="flex flex-col gap-3">
                {results.suggestions?.map((sug, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-xl border border-border bg-background">
                    <div className="mt-0.5 shrink-0">
                      {sug.type === 'warning' && <AlertTriangle size={18} className="text-yellow-500" />}
                      {sug.type === 'info' && <FileText size={18} className="text-blue-500" />}
                      {sug.type === 'success' && <CheckCircle2 size={18} className="text-success" />}
                      {sug.type === 'critical' && <XOctagon size={18} className="text-red-500" />}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-text-main mb-1">{sug.text}</h4>
                      <p className="text-[13px] text-text-secondary leading-relaxed">{sug.subtext}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}
      </div>

    </div>
  );
}
