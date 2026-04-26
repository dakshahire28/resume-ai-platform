import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  FileText, 
  Activity, 
  ArrowRight,
  Clock,
  ChevronRight,
  LayoutDashboard
} from 'lucide-react';
import CreateResumeModal from '../components/CreateResumeModal';

const FEATURE_CARDS = [
  {
    title: "Resume Builder",
    description: "Design a professional resume with real-time AI assistance.",
    icon: FileText,
    path: "/resumes",
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/20",
    cta: "Open Builder"
  },
  {
    title: "Resume Analyzer",
    description: "Get targeted feedback and ATS scores for your resume.",
    icon: Activity,
    path: "/analyzer",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    cta: "Analyze Resume"
  }
];

const RECENT_RESUMES = [
  { id: 1, title: "Software Engineer - Google", updatedAt: "2 hours ago", status: "Published" },
  { id: 2, title: "Product Manager - Meta", updatedAt: "Yesterday", status: "Draft" },
  { id: 3, title: "Full Stack Developer", updatedAt: "3 days ago", status: "Draft" }
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const firstName = 'there';

  return (
    <div className="max-w-5xl mx-auto space-y-12 py-4">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-2">
          <h2 className="text-text-muted font-bold uppercase tracking-[0.2em] text-[10px]">Overview</h2>
          <h1 className="text-4xl md:text-5xl font-black text-text-main tracking-tight">
            Welcome, <span className="text-text-secondary">{firstName}.</span>
          </h1>
          <p className="text-text-secondary text-sm font-medium">What would you like to build today?</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-bold transition-all active:scale-95 whitespace-nowrap shadow-lg shadow-primary/10"
        >
          <Plus size={18} strokeWidth={3} />
          <span>New Resume</span>
        </button>
      </section>

      {/* Feature Grid */}
      <section className="grid md:grid-cols-2 gap-6">
        {FEATURE_CARDS.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <div 
              key={idx}
              className={`group relative bg-surface border border-border rounded-2xl p-8 hover:bg-surface/80 transition-all cursor-pointer overflow-hidden shadow-xl shadow-black/5`}
              onClick={() => navigate(feature.path)}
            >
              <div className={`w-12 h-12 ${feature.bg} ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border border-border`}>
                <Icon size={24} />
              </div>
              <h3 className="text-lg font-bold text-text-main mb-2">{feature.title}</h3>
              <p className="text-text-secondary text-xs leading-relaxed mb-6 max-w-[240px] font-medium">
                {feature.description}
              </p>
              <div className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${feature.color} group-hover:gap-4 transition-all`}>
                <span>{feature.cta}</span>
                <ArrowRight size={14} />
              </div>
            </div>
          );
        })}
      </section>

      {/* Activity Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <h3 className="font-bold text-text-main flex items-center gap-2 text-sm uppercase tracking-widest">
            <Clock size={16} className="text-text-muted" />
            Recent Templates
          </h3>
          <button 
            onClick={() => navigate('/resumes')}
            className="text-[10px] font-black text-primary hover:text-primary/80 uppercase tracking-widest flex items-center gap-1 group transition-colors"
          >
            View Library
            <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        
        <div className="grid gap-3">
          {RECENT_RESUMES.map((resume) => (
            <div 
              key={resume.id}
              className="bg-surface/50 hover:bg-surface border border-border rounded-xl p-4 flex items-center justify-between transition-all cursor-pointer group"
              onClick={() => navigate(`/builder?id=${resume.id}`)}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-background rounded-lg flex items-center justify-center text-text-muted group-hover:text-primary transition-colors border border-border">
                  <LayoutDashboard size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-text-main">{resume.title}</h4>
                  <p className="text-[10px] font-medium text-text-secondary leading-none mt-1">{resume.updatedAt}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`text-[9px] uppercase tracking-[0.15em] font-black px-2 py-1 rounded bg-background border border-border ${
                  resume.status === 'Published' ? 'text-success' : 'text-text-muted'
                }`}>
                  {resume.status}
                </span>
                <ChevronRight size={14} className="text-text-muted group-hover:text-text-secondary transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <CreateResumeModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}

