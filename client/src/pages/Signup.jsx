import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Mail, Lock, UserPlus, Globe, Loader2, AlertCircle } from 'lucide-react';
import Logo from '../components/Logo';
import { useAuth } from '../context/AuthContext';

export default function Signup() {
  const navigate = useNavigate();
  const { register, loading, error, clearError, user } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Clear error on field change
  useEffect(() => {
    if (error) clearError();
  }, [name, email, password]);

  const handleSignup = async (e) => {
    e.preventDefault();
    const success = await register(name, email, password);
    if (success) {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen flex text-text-main bg-background flex-col md:flex-row-reverse font-sans">
      
      {/* Right side: Branding / Illustration (Flipped for Signup) */}
      <div className="hidden md:flex md:w-1/2 bg-surface border-l border-border flex-col justify-between p-12 relative overflow-hidden">
        {/* Subtle decorative background gradient */}
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-background via-surface to-primary/10 z-0"></div>
        
        <div className="relative z-10 flex justify-end">
          <Link to="/" className="flex items-center gap-2 group w-max">
            <div className="w-8 h-8 rounded bg-white flex items-center justify-center font-bold transition-transform group-hover:scale-105">
              <Logo className="w-6 h-6" />
            </div>
            <span className="font-bold text-xl tracking-wide uppercase text-text-main" style={{fontFamily: 'monospace'}}>CareerPilot</span>
          </Link>
        </div>

        <div className="relative z-10 max-w-md float-right ml-auto text-right">
          <h1 className="text-4xl font-bold text-text-main mb-6 leading-tight">
            Launch your <span className="text-primary">career</span> to new heights.
          </h1>
          <p className="text-text-secondary text-lg">
            Create an account in seconds and unlock AI-powered resume tools, curated resources, and comprehensive application tracking.
          </p>
          
          <div className="flex gap-4 mt-8 justify-end">
             <div className="text-center px-4 py-3 bg-background backdrop-blur-sm rounded-xl border border-border shadow-sm">
               <div className="text-2xl font-black text-text-main">40k+</div>
               <div className="text-xs text-primary font-bold uppercase mt-1">Interviews Landed</div>
             </div>
             <div className="text-center px-4 py-3 bg-background backdrop-blur-sm rounded-xl border border-border shadow-sm">
               <div className="text-2xl font-black text-text-main">99%</div>
               <div className="text-xs text-primary font-bold uppercase mt-1">ATS Accuracy</div>
             </div>
          </div>
        </div>
      </div>

      {/* Left side: Signup Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          
          {/* Mobile Home Nav */}
          <Link to="/" className="md:hidden flex items-center gap-2 text-text-secondary hover:text-text-main mb-8 text-sm transition-colors w-max">
             <ArrowLeft size={16} /> Back to Home
          </Link>

          <div className="mb-8 text-center md:text-left">
            <h2 className="text-3xl font-extrabold text-text-main mb-2">Create an account</h2>
            <p className="text-text-secondary text-sm">Join the platform to gain full access to your career toolkit.</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3 text-red-500 text-sm font-medium">
              <AlertCircle size={18} className="flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-4">
            
            <div className="flex gap-4">
              <div className="space-y-1 relative flex-1">
                <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-surface border border-border rounded-lg py-3 pl-10 pr-4 text-sm outline-none focus:border-primary/50 text-text-main placeholder:text-text-muted shadow-sm transition-colors"
                    placeholder="Jane Doe"
                    required
                    disabled={loading}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1 relative">
              <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider ml-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-surface border border-border rounded-lg py-3 pl-10 pr-4 text-sm outline-none focus:border-primary/50 text-text-main placeholder:text-text-muted shadow-sm transition-colors"
                  placeholder="name@example.com"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div className="space-y-1 relative">
              <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-surface border border-border rounded-lg py-3 pl-10 pr-4 text-sm outline-none focus:border-primary/50 text-text-main placeholder:text-text-muted shadow-sm transition-colors"
                  placeholder="••••••••"
                  required
                  minLength={6}
                  disabled={loading}
                />
              </div>
              <p className="text-[10px] text-text-muted ml-1 mt-1">Must be at least 6 characters</p>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg shadow-md transition-colors flex items-center justify-center gap-2 mt-6 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" /> Creating account...
                </>
              ) : (
                <>
                  Create Account <UserPlus size={18} />
                </>
              )}
            </button>
          </form>

          <p className="mt-10 text-center text-sm text-text-secondary">
            Already have an account?{' '}
            <Link to="/login" className="text-primary font-bold hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
