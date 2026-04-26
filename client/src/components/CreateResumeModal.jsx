import React, { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CreateResumeModal({ isOpen, onClose }) {
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    setLoading(true);
    try {
      const payload = {
        title: title.trim(),
        template: 'Minimalist',
        settings: {
          template: 'Minimalist',
          font: 'Inter',
          fontSize: 14,
          lineHeight: 1.5,
          primaryColor: '#4f46e5',
          bgColor: '#ffffff',
          borderStyle: 'solid',
          pageMargin: 48,
          customCss: '',
        },
        data: {
          picture: { url: '', size: 80, borderRadius: 0 },
          basics: {
            firstName: '',
            lastName: '',
            headline: '',
            email: '',
            phone: '',
            location: '',
            website: '',
            summary: '',
          },
          profiles: [],
          experience: [],
          education: [],
          skills: [],
          languages: [],
          interests: [],
          awards: [],
          certifications: [],
          publications: [],
          volunteer: [],
          references: [],
        }
      };
      
      const res = await axios.post('http://localhost:5000/api/resumes', payload, { withCredentials: true });
      const newId = res.data._id || res.data.id || res.data.data?._id || res.data.data?.id;
      
      onClose();
      if (newId) {
        navigate(`/builder?id=${newId}`);
      } else {
        navigate(`/builder?title=${encodeURIComponent(title.trim())}`);
      }
    } catch (err) {
      console.error('Error creating resume:', err);
      onClose();
      navigate(`/builder?title=${encodeURIComponent(title.trim())}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-surface border border-border rounded-2xl p-6 w-full max-w-md shadow-2xl relative animate-in fade-in zoom-in duration-200">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-text-muted hover:text-text-main transition-colors"
        >
          <X size={20} />
        </button>
        
        <div className="mb-6">
          <h2 className="text-xl font-bold text-text-main">Create New Resume</h2>
          <p className="text-sm text-text-secondary mt-1">Give your new resume a memorable name.</p>
        </div>
        
        <form onSubmit={handleCreate} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-text-main block">Resume Name</label>
            <input 
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Frontend Developer - Google"
              className="w-full bg-background border border-border rounded-xl px-4 py-3 text-text-main outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
              autoFocus
              required
            />
          </div>
          
          <div className="flex justify-end gap-3 pt-2">
            <button 
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl font-medium text-text-secondary hover:text-text-main hover:bg-background transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={!title.trim() || loading}
              className="px-6 py-2 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all disabled:opacity-50 flex items-center gap-2 shadow-lg shadow-primary/20"
            >
              {loading && <Loader2 size={16} className="animate-spin" />}
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
