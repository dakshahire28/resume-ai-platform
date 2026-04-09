import React from 'react';
import { User, Bell, Shield, Palette, Globe, CreditCard, ChevronRight, Check } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const THEMES = [
  { id: 'dark', label: 'Dark', color: 'bg-[#09090b]', accent: 'bg-indigo-500' },
  { id: 'light', label: 'Light', color: 'bg-white', accent: 'bg-blue-600', border: 'border-zinc-200' },
  { id: 'coffee', label: 'Coffee', color: 'bg-[#1c1917]', accent: 'bg-amber-600' },
  { id: 'cyberpunk', label: 'Cyberpunk', color: 'bg-black', accent: 'bg-yellow-400' },
  { id: 'emerald', label: 'Emerald', color: 'bg-[#022c22]', accent: 'bg-emerald-500' },
];

const SECTIONS = [
  { id: 'profile', icon: User, label: "Profile", description: "Manage your account details and public profile." },
  { id: 'notifications', icon: Bell, label: "Notifications", description: "Configure how you receive alerts and updates." },
  { id: 'appearance', icon: Palette, label: "Appearance", description: "Customize the look and feel of your workspace." },
  { id: 'security', icon: Shield, label: "Security", description: "Update your password and secure your account." },
  { id: 'language', icon: Globe, label: "Language", description: "Set your preferred language and region." },
  { id: 'billing', icon: CreditCard, label: "Billing", description: "Manage your subscription and payment methods." },
];

export default function Settings() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="max-w-4xl mx-auto space-y-10 py-4">
      <div className="space-y-2">
        <h2 className="text-text-muted font-bold uppercase tracking-[0.2em] text-[10px]">Preferences</h2>
        <h1 className="text-4xl font-black text-text-main tracking-tight">Settings</h1>
        <p className="text-text-secondary text-sm font-medium">Control your experience and security.</p>
      </div>

      <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-2xl shadow-black/10">
        <div className="divide-y divide-border/50">
          {SECTIONS.map((section, idx) => {
            const Icon = section.icon;
            if (section.id === 'appearance') {
              return (
                <div key={section.id} className="p-8 space-y-6">
                  <div className="flex items-center gap-5">
                    <div className="w-10 h-10 rounded-xl bg-background flex items-center justify-center text-primary border border-primary/20 shadow-[0_0_15px_rgba(79,70,229,0.1)]">
                      <Icon size={18} />
                    </div>
                    <div>
                      <h4 className="font-bold text-text-main text-sm">{section.label}</h4>
                      <p className="text-xs text-text-secondary font-medium">{section.description}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    {THEMES.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setTheme(t.id)}
                        className={`group relative flex flex-col gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                          theme === t.id 
                            ? 'bg-background border-primary shadow-lg' 
                            : 'bg-background hover:bg-surface border-border hover:border-text-muted/20'
                        }`}
                      >
                        <div className={`w-full h-12 rounded-lg ${t.color} ${t.border || ''} relative overflow-hidden flex items-end p-1.5`}>
                          <div className={`w-full h-1/3 rounded-sm ${t.accent} opacity-50`}></div>
                          {theme === t.id && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                              <Check size={16} className="text-white" />
                            </div>
                          )}
                        </div>
                        <span className={`text-[10px] font-black uppercase tracking-widest ${
                          theme === t.id ? 'text-primary' : 'text-text-muted'
                        }`}>
                          {t.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              );
            }

            return (
              <div 
                key={idx}
                className="p-6 flex items-center gap-5 hover:bg-background/50 transition-all cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-xl bg-background flex items-center justify-center text-text-muted group-hover:text-primary group-hover:border-primary/20 transition-all border border-border">
                  <Icon size={18} />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-text-main group-hover:text-primary transition-colors text-sm">{section.label}</h4>
                  <p className="text-xs text-text-secondary font-medium">{section.description}</p>
                </div>
                <ChevronRight size={16} className="text-border group-hover:text-text-secondary transition-colors" />
              </div>
            );
          })}
        </div>
      </div>


      <div className="p-8 bg-red-900/10 border border-red-900/20 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 overflow-hidden relative">
        <div className="relative z-10">
          <h4 className="font-bold text-red-500 uppercase tracking-widest text-xs">Danger Zone</h4>
          <h3 className="text-lg font-bold text-text-main mt-1">Delete Account</h3>
          <p className="text-sm text-text-secondary mt-1">Once you delete your account, there is no going back. Please be certain.</p>
        </div>
        <button className="relative z-10 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold transition-all active:scale-95 shadow-lg shadow-red-900/20 whitespace-nowrap">
          Delete My Account
        </button>
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-600 opacity-[0.03] blur-3xl pointer-events-none"></div>
      </div>
    </div>
  );
}

