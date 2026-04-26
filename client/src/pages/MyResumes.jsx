import React, { useState, useEffect } from 'react';
import { Plus, MoreVertical, FileText, Download, Copy, Trash2, ExternalLink, LayoutDashboard, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function MyResumes() {
  const navigate = useNavigate();
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/resumes', { withCredentials: true });
      setResumes(res.data);
    } catch (err) {
      console.error('Error fetching resumes:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this resume?')) {
      try {
        await axios.delete(`http://localhost:5000/api/resumes/${id}`, { withCredentials: true });
        setResumes(resumes.filter(r => r._id !== id));
      } catch (err) {
        console.error('Error deleting resume:', err);
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  return (
    <div className="max-w-6xl mx-auto space-y-10 py-4">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h2 className="text-text-muted font-bold uppercase tracking-[0.2em] text-[10px]">Dashboard</h2>
          <h1 className="text-4xl font-black text-text-main tracking-tight">My Resumes</h1>
          <p className="text-text-secondary text-sm font-medium">Manage and build your collection of professional resumes.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* Create New Card */}
        <div 
          onClick={() => navigate('/builder')}
          className="group border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center p-8 hover:border-primary/50 hover:bg-surface/50 transition-all cursor-pointer h-[340px] shadow-xl shadow-black/5"
        >
          <div className="w-16 h-16 rounded-full bg-surface text-text-muted flex items-center justify-center mb-6 border border-border group-hover:scale-110 group-hover:text-primary group-hover:border-primary/20 transition-all">
            <Plus size={32} strokeWidth={2.5} />
          </div>
          <h3 className="font-bold text-text-main uppercase tracking-widest text-xs">New Resume</h3>
          <p className="text-[10px] font-medium text-text-secondary text-center mt-3 px-6 leading-relaxed">
            Create a professional resume from scratch or use a job-specific template.
          </p>
        </div>

        {/* Resume Cards */}
        {resumes.map((resume) => (
          <div 
            key={resume._id}
            className="group bg-surface border border-border rounded-2xl overflow-hidden hover:border-primary/40 transition-all flex flex-col h-[340px] shadow-2xl shadow-black/10"
          >
            <div className="flex-1 bg-background relative flex items-center justify-center group-hover:bg-surface/50 transition-all">
              <div className="text-center p-6 space-y-4">
                <LayoutDashboard size={48} className="mx-auto text-text-muted opacity-20 group-hover:text-primary/20 transition-colors" />
                <p className="text-[10px] font-black uppercase tracking-widest text-text-muted opacity-40">{resume.template}</p>
              </div>
              
              {/* Overlay Actions */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3 transition-all duration-300 backdrop-blur-[2px]">
                <button 
                  onClick={() => navigate(`/builder?id=${resume._id}`)}
                  title="Edit" className="bg-surface border border-border p-2.5 rounded-xl text-text-main hover:text-primary hover:border-primary/30 transition-all shadow-xl active:scale-95"
                >
                  <ExternalLink size={18} />
                </button>
                <button 
                  onClick={() => handleDelete(resume._id)}
                  title="Delete" className="bg-surface border border-border p-2.5 rounded-xl text-text-secondary hover:text-red-400 hover:border-red-500/30 transition-all shadow-xl active:scale-95"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            
            <div className="p-6 bg-surface border-t border-border/50">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-text-main truncate pr-2 text-sm">{resume.title}</h4>
                <div className={`w-1.5 h-1.5 rounded-full ring-4 ring-black/5 bg-primary/40 group-hover:bg-primary transition-colors`}></div>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-medium text-text-secondary">
                <Clock size={10} />
                <span>Last edited {formatDate(resume.updatedAt)}</span>
              </div>
              
              <div className="mt-5 flex items-center gap-2">
                <button 
                  onClick={() => navigate(`/builder?id=${resume._id}`)}
                  className="flex-1 bg-primary text-white text-[10px] font-black uppercase tracking-widest py-2.5 rounded-lg hover:bg-primary/90 transition-all active:scale-95 shadow-md"
                >
                  Edit Resume
                </button>
                <button className="p-2.5 border border-border rounded-lg text-text-secondary hover:text-text-main hover:bg-background transition-all">
                  <Copy size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {loading && resumes.length === 0 && (
          [1,2,3].map(i => (
            <div key={i} className="bg-surface border border-border rounded-2xl h-[340px] animate-pulse"></div>
          ))
        )}

        {!loading && resumes.length === 0 && (
           <div className="col-span-full py-20 text-center">
              <p className="text-text-secondary text-sm">No resumes found. Create your first one!</p>
           </div>
        )}
      </div>
    </div>
  );
}

