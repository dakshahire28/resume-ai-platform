import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Bell, Shield, Palette, Globe, CreditCard, ChevronRight, Check, AlertTriangle, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

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
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [confirmText, setConfirmText] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  const handleDeleteAccount = async () => {
    if (confirmText !== 'DELETE') return;
    setDeleting(true);
    setDeleteError('');

    try {
      await axios.delete('/api/auth/delete', { withCredentials: true });
      await logout();
      navigate('/');
    } catch (err) {
      setDeleteError(err.response?.data?.message || 'Failed to delete account. Please try again.');
    } finally {
      setDeleting(false);
    }
  };

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
        <button 
          onClick={() => setShowDeleteModal(true)}
          className="relative z-10 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold transition-all active:scale-95 shadow-lg shadow-red-900/20 whitespace-nowrap"
        >
          Delete My Account
        </button>
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-600 opacity-[0.03] blur-3xl pointer-events-none"></div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-surface border border-border rounded-2xl p-8 w-full max-w-md shadow-2xl relative animate-in fade-in zoom-in duration-200 mx-4">
            <button 
              onClick={() => { setShowDeleteModal(false); setConfirmText(''); setDeleteError(''); }}
              className="absolute top-4 right-4 text-text-muted hover:text-text-main transition-colors"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
                <AlertTriangle size={24} className="text-red-500" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-text-main">Delete Account</h2>
                <p className="text-xs text-text-secondary mt-0.5">This action is permanent and irreversible.</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-red-500/5 border border-red-500/10 rounded-xl p-4 space-y-2">
                <p className="text-sm text-text-secondary">This will permanently delete:</p>
                <ul className="text-sm text-red-400 space-y-1">
                  <li className="flex items-center gap-2">• Your profile and account data</li>
                  <li className="flex items-center gap-2">• All saved resumes</li>
                  <li className="flex items-center gap-2">• All AI-generated content</li>
                </ul>
              </div>

              {deleteError && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl px-4 py-3 text-sm">
                  {deleteError}
                </div>
              )}

              <div className="space-y-2">
                <label className="text-xs font-semibold text-text-secondary">
                  Type <span className="font-black text-red-500">DELETE</span> to confirm
                </label>
                <input 
                  type="text"
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                  placeholder="Type DELETE here"
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 text-text-main outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/20 transition-all text-sm font-mono"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => { setShowDeleteModal(false); setConfirmText(''); setDeleteError(''); }}
                  className="flex-1 py-3 bg-surface hover:bg-background border border-border text-text-main rounded-xl text-sm font-bold transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAccount}
                  disabled={confirmText !== 'DELETE' || deleting}
                  className="flex-1 py-3 bg-red-600 hover:bg-red-700 disabled:opacity-30 disabled:cursor-not-allowed text-white rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2"
                >
                  {deleting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    'Delete Forever'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
