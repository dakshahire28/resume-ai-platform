import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Lock, LogIn, Globe, Loader2, AlertCircle } from 'lucide-react';
import Logo from '../components/Logo';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login, loading, error, clearError, user } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // If already logged in, redirect to dashboard
  useEffect(() => {
    if (user) navigate('/dashboard');
  }, [user, navigate]);

  // Clear error on field change
  useEffect(() => {
    if (error) clearError();
  }, [email, password]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex text-text-main bg-background flex-col md:flex-row font-sans">
      
      {/* Left side: Branding / Illustration */}
      <div className="hidden md:flex md:w-1/2 bg-surface border-r border-border flex-col justify-between p-12 relative overflow-hidden">
        {/* Subtle decorative background gradient */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-background via-surface to-primary/10 z-0"></div>
        
        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-2 group w-max">
            <div className="w-8 h-8 rounded bg-white flex items-center justify-center font-bold transition-transform group-hover:scale-105">
              <Logo className="w-6 h-6" />
            </div>
            <span className="font-bold text-xl tracking-wide uppercase text-text-main" style={{fontFamily: 'monospace'}}>CareerPilot</span>
          </Link>
        </div>

        <div className="relative z-10 max-w-md">
          <h1 className="text-4xl font-bold text-text-main mb-6 leading-tight">
            Resume your <span className="text-primary">journey</span> to the perfect job.
          </h1>
          <p className="text-text-secondary text-lg">
            "CareerPilot completely transformed my application process. The ATS analysis alone secured me twice as many interviews."
          </p>
          <div className="mt-6 flex items-center gap-3 bg-background border border-border rounded-xl p-4 w-fit shadow-sm">
            <div className="w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center font-bold text-text-main">
              JS
            </div>
            <div>
              <p className="text-text-main text-sm font-bold">Jordan Smith</p>
              <p className="text-text-secondary text-xs font-semibold">Frontend Developer @ TechCorp</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side: Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          
          {/* Mobile Home Nav */}
          <Link to="/" className="md:hidden flex items-center gap-2 text-text-secondary hover:text-text-main mb-8 text-sm transition-colors w-max">
             <ArrowLeft size={16} /> Back to Home
          </Link>

          <div className="mb-10 text-center md:text-left">
            <h2 className="text-3xl font-extrabold text-text-main mb-2">Welcome back</h2>
            <p className="text-text-secondary text-sm">Enter your credentials to access your workspace.</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3 text-red-500 text-sm font-medium animate-in">
              <AlertCircle size={18} className="flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
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
              <div className="flex items-center justify-between ml-1">
                <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Password</label>
                <a href="#" className="text-xs text-primary hover:underline font-medium">Forgot password?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-surface border border-border rounded-lg py-3 pl-10 pr-4 text-sm outline-none focus:border-primary/50 text-text-main placeholder:text-text-muted shadow-sm transition-colors"
                  placeholder="••••••••"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg shadow-md transition-colors flex items-center justify-center gap-2 mt-4 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" /> Signing in...
                </>
              ) : (
                <>
                  Sign In <LogIn size={18} />
                </>
              )}
            </button>
          </form>

          <p className="mt-10 text-center text-sm text-text-secondary">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary font-bold hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
