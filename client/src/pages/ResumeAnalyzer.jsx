import React from 'react';
import { 
  FileText, RefreshCw, Sparkles, CheckCircle2, 
  XOctagon, AlertTriangle, ChevronRight, LayoutTemplate
} from 'lucide-react';

// Mock Data
const PRESENT_KEYWORDS = ["React", "TypeScript", "JavaScript", "HTML/CSS", "Git", "REST APIs"];
const MISSING_KEYWORDS = ["GraphQL", "Next.js", "Jest", "CI/CD", "Tailwind CSS", "Redux"];

const SUGGESTIONS = [
  { id: 1, type: "warning", text: "Quantify your achievements.", subtext: "Add numerical metrics to your experience bullets (e.g. 'Improved efficiency by 20%')." },
  { id: 2, type: "info", text: "Add an executive summary.", subtext: "Include a 2-3 sentence overview of your career focus at the top of the resume." },
  { id: 3, type: "success", text: "Great use of action verbs.", subtext: "Your bullet points start with strong action verbs like 'Developed' and 'Mentored'." }
];

const TEMPLATES = [
  { id: 'professional', name: 'Professional', desc: 'Standard ATS-friendly layout, perfect for corporate roles.' },
  { id: 'modern', name: 'Modern Creative', desc: 'Two-column layout with icons. Great for startups.', highlight: true },
  { id: 'academic', name: 'Academic CV', desc: 'Comprehensive layout for research and academia.' },
  { id: 'minimalist', name: 'Minimalist', desc: 'High white-space design with elegant typography.' }
];

export default function ResumeAnalyzer() {
  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-8 pb-12 w-full text-text-main font-sans">
      
      {/* Header */}
      <section>
        <h1 className="text-3xl font-extrabold tracking-tight mb-2">Resume Analyzer</h1>
        <p className="text-sm font-medium text-text-secondary">
          Upload your resume to check its ATS compatibility and get improvement suggestions.
        </p>
      </section>

      {/* Uploaded File Card & AI CTA */}
      <section className="flex flex-col md:flex-row gap-6">
        {/* File Card */}
        <div className="flex-1 bg-surface border border-border rounded-2xl p-5 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-red-500/10 text-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <FileText size={28} />
            </div>
            <div>
              <h3 className="text-base font-bold text-text-main mb-1">Alex_Walker_Frontend_Resume.pdf</h3>
              <p className="text-xs font-semibold text-text-secondary">142 KB • Uploaded just now</p>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm font-semibold hover:bg-background transition-colors text-text-secondary hover:text-text-main">
            <RefreshCw size={16} /> Re-upload
          </button>
        </div>

        {/* Generate with AI Button (User Request) */}
        <button className="md:w-auto w-full group relative overflow-hidden rounded-2xl p-[1px] shadow-md transition-shadow hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/50">
           <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
           <div className="relative flex h-full items-center justify-center gap-2 rounded-2xl bg-surface px-8 py-5 text-lg font-bold text-text-main transition-colors group-hover:bg-background">
             <Sparkles size={20} className="text-primary" />
             Optimize with AI
           </div>
        </button>
      </section>

      {/* Main Grid: Scores & Keywords */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Col: Overall Score Card */}
        <div className="bg-surface border border-primary/20 rounded-2xl p-8 shadow-sm flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-purple-500 to-primary"></div>
          
          <h2 className="text-xl font-bold mb-8 w-full text-left">Overall Score</h2>
          
          {/* Radial Gauge */}
          <div className="relative flex justify-center mb-8">
            <svg width="240" height="240" viewBox="0 0 240 240">
              {/* Background Arc */}
              <circle cx="120" cy="120" r="100" fill="none" stroke="currentColor" strokeWidth="20" className="text-border" />
              {/* Progress Arc (80%) */}
              <circle cx="120" cy="120" r="100" fill="none" stroke="currentColor" strokeWidth="20" className="text-primary" 
                strokeDasharray="628" 
                strokeDashoffset="125.6" 
                strokeLinecap="round" 
                style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%', transition: 'stroke-dashoffset 1s ease-in-out' }} />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-6xl font-black tracking-tighter mb-1">80<span className="text-2xl text-text-secondary">%</span></span>
              <span className="text-sm font-bold text-success-text bg-success-bg px-3 py-1 rounded-full uppercase tracking-wider">Good Fit</span>
            </div>
          </div>

          {/* Sub Metrics */}
          <div className="w-full flex justify-between gap-4 mt-auto">
            <div className="flex-1 text-center bg-background border border-border rounded-xl p-3">
              <p className="text-xs font-semibold text-text-secondary uppercase mb-1">Impact</p>
              <p className="text-xl font-black">85%</p>
            </div>
            <div className="flex-1 text-center bg-background border border-border rounded-xl p-3">
              <p className="text-xs font-semibold text-text-secondary uppercase mb-1">Brevity</p>
              <p className="text-xl font-black">92%</p>
            </div>
            <div className="flex-1 text-center bg-background border border-border rounded-xl p-3">
              <p className="text-xs font-semibold text-text-secondary uppercase mb-1">Keywords</p>
              <p className="text-xl font-black text-yellow-500">64%</p>
            </div>
          </div>
        </div>

        {/* Right Col: Keyword Analysis */}
        <div className="bg-surface border border-border rounded-2xl p-8 shadow-sm flex flex-col">
          <h2 className="text-xl font-bold mb-2">Keyword Analysis</h2>
          <p className="text-sm text-text-secondary font-medium mb-8">
            Comparing against typical "Frontend Engineer" job descriptions.
          </p>

          <div className="mb-8">
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
              <CheckCircle2 size={16} className="text-success" /> Present Keywords
            </h3>
            <div className="flex flex-wrap gap-2">
              {PRESENT_KEYWORDS.map(kw => (
                 <span key={kw} className="bg-success-bg/50 text-success-text border border-success-bg px-3 py-1.5 rounded-lg text-sm font-bold">
                   {kw}
                 </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
              <XOctagon size={16} className="text-red-500" /> Missing Keywords <span className="text-xs font-medium text-text-muted normal-case ml-1">(Consider adding if applicable)</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {MISSING_KEYWORDS.map(kw => (
                 <span key={kw} className="bg-background text-text-secondary hover:text-text-main border border-border px-3 py-1.5 rounded-lg text-sm font-bold transition-colors cursor-default">
                   {kw}
                 </span>
              ))}
            </div>
          </div>

          {/* AI Banner inside keywords */}
          <div className="mt-auto pt-6 border-t border-border">
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex items-start gap-4">
              <div className="bg-primary/10 text-primary p-2 rounded-lg">
                <Sparkles size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-text-main mb-1">Auto-Inject Keywords</h4>
                <p className="text-xs text-text-secondary">Click "Optimize with AI" to automatically weave missing skills into your experience bullet points naturally.</p>
              </div>
            </div>
          </div>
          
        </div>

      </section>

      {/* Improvement Suggestions */}
      <section className="bg-surface border border-border rounded-2xl p-8 shadow-sm">
         <div className="flex items-center justify-between mb-6">
           <h2 className="text-xl font-bold">Improvement Suggestions</h2>
           <span className="bg-blue-500/10 text-blue-500 font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
             3 Recommendations
           </span>
         </div>
         
         <div className="flex flex-col gap-4">
           {SUGGESTIONS.map(sug => (
             <div key={sug.id} className="flex gap-4 p-4 rounded-xl border border-border bg-background hover:border-text-muted transition-colors">
               <div className="mt-1">
                 {sug.type === 'warning' && <AlertTriangle size={20} className="text-yellow-500" />}
                 {sug.type === 'info' && <FileText size={20} className="text-blue-500" />}
                 {sug.type === 'success' && <CheckCircle2 size={20} className="text-success" />}
               </div>
               <div>
                 <h4 className="font-bold text-text-main mb-1">{sug.text}</h4>
                 <p className="text-sm text-text-secondary">{sug.subtext}</p>
               </div>
             </div>
           ))}
         </div>
      </section>

      {/* Templates Library (User Request) */}
      <section className="mt-4">
         <div className="mb-6 flex items-center justify-between">
           <div>
             <h2 className="text-2xl font-bold mb-2">Recommended Templates</h2>
             <p className="text-sm text-text-secondary font-medium">Apply a new design to your optimized content.</p>
           </div>
           <button className="text-sm font-semibold text-primary hover:underline flex items-center gap-1">
             Browse Library <ChevronRight size={16} />
           </button>
         </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
           {TEMPLATES.map(temp => (
             <div key={temp.id} className={`group bg-surface border rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl ${temp.highlight ? 'border-primary ring-1 ring-primary' : 'border-border'}`}>
               {/* Template visual preview mockup */}
               <div className="h-40 bg-background border-b border-border p-4 flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                 {temp.highlight && <div className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg z-10">BEST SELLER</div>}
                 <LayoutTemplate size={64} className="text-text-muted opacity-30" />
               </div>
               {/* Info */}
               <div className="p-5 flex-1 flex flex-col">
                 <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">{temp.name}</h3>
                 <p className="text-xs text-text-secondary mb-6 leading-relaxed flex-1">{temp.desc}</p>
                 <button className={`w-full py-2.5 rounded-lg text-sm font-bold transition-colors ${temp.highlight ? 'bg-primary hover:bg-primary-hover text-white' : 'bg-background hover:bg-border text-text-main border border-border'}`}>
                   Apply Template
                 </button>
               </div>
             </div>
           ))}
         </div>
      </section>

    </div>
  );
}
