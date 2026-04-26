import React from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Bell, ChevronRight, User } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();

  const pathParts = location.pathname.split('/').filter(Boolean);
  let breadcrumb = 'Dashboard';
  if (pathParts.length > 0) {
    if (pathParts[0] === 'resumes') {
      breadcrumb = 'Resume Builder';
    } else if (pathParts[0] === 'analyzer') {
      breadcrumb = 'Resume Analyzer';
    } else {
      breadcrumb = pathParts[0].charAt(0).toUpperCase() + pathParts[0].slice(1);
    }
  }

  return (
    <header className="h-16 bg-background border-b border-border flex items-center px-8 justify-between sticky top-0 z-40 transition-colors duration-300">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-xs text-text-secondary">
          <span className="hover:text-text-main cursor-pointer transition-colors uppercase tracking-widest font-bold">CareerPilot</span>
          <ChevronRight size={12} className="text-text-muted" />
          <span className="text-text-main font-bold uppercase tracking-widest">{breadcrumb}</span>
        </div>
      </div>

      <div className="flex items-center gap-5">
        <div className="relative hidden lg:flex items-center w-72">
          <Search className="absolute left-3 text-text-muted" size={14} />
          <input 
            type="text" 
            placeholder="Search resumes, tools..." 
            className="w-full bg-surface border border-border rounded-lg py-1.5 pl-9 pr-4 text-xs outline-none focus:border-primary/50 transition-all text-text-main placeholder:text-text-muted"
          />
        </div>

        <div className="h-6 w-[1px] bg-border mx-1"></div>

        <div className="flex items-center gap-2 text-text-secondary">
          <button className="p-2 hover:bg-surface hover:text-text-main rounded-lg transition-all outline-none relative cursor-pointer">
            <Bell size={18} />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-primary rounded-full ring-2 ring-background"></span>
          </button>
        </div>
        
        <button className="flex items-center gap-2 bg-surface hover:bg-surface/80 px-2 py-1.5 rounded-lg border border-border transition-all cursor-pointer group ml-2 shadow-sm">
          <div className="w-7 h-7 rounded-md bg-primary/10 flex items-center justify-center text-primary border border-primary/20 group-hover:bg-primary/20 transition-colors">
             <User size={14} />
          </div>
          <ChevronRight size={12} className="text-text-muted group-hover:text-text-secondary rotate-90 transition-all" />
        </button>
      </div>
    </header>
  );
}



