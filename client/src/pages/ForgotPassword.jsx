import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Lock, KeyRound, Loader2, AlertCircle, CheckCircle2, ShieldCheck } from 'lucide-react';
import Logo from '../components/Logo';
import API from '../api/api';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1 = enter email, 2 = enter new password, 3 = success
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Step 1: Verify email
  const handleVerifyEmail = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      await API.post('/auth/forgot-password', { email });
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Reset password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      setLoading(true);
      setError(null);
      await API.post('/auth/reset-password', { email, password });
      setStep(3);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex text-text-main bg-background flex-col md:flex-row font-sans">
      
      {/* Left side: Branding */}
      <div className="hidden md:flex md:w-1/2 bg-surface border-r border-border flex-col justify-between p-12 relative overflow-hidden">
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
            Don't worry, we've got your <span className="text-primary">back</span>.
          </h1>
          <p className="text-text-secondary text-lg">
            Reset your password in just two simple steps and get back to building your career.
          </p>

          {/* Step Indicator */}
          <div className="mt-10 flex items-center gap-4">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${step >= 1 ? 'border-primary bg-primary/10 text-primary' : 'border-border text-text-muted'}`}>
              <Mail size={16} />
              <span className="text-xs font-bold uppercase tracking-wider">Verify Email</span>
            </div>
            <div className={`w-8 h-px ${step >= 2 ? 'bg-primary' : 'bg-border'} transition-colors`}></div>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${step >= 2 ? 'border-primary bg-primary/10 text-primary' : 'border-border text-text-muted'}`}>
              <KeyRound size={16} />
              <span className="text-xs font-bold uppercase tracking-wider">New Password</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right side: Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          
          <Link to="/login" className="flex items-center gap-2 text-text-secondary hover:text-text-main mb-8 text-sm transition-colors w-max">
             <ArrowLeft size={16} /> Back to Login
          </Link>

          {/* Step 3: Success */}
          {step === 3 ? (
            <div className="text-center space-y-6">
              <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto">
                <ShieldCheck size={40} className="text-emerald-500" />
              </div>
              <div>
                <h2 className="text-3xl font-extrabold text-text-main mb-2">Password Reset!</h2>
                <p className="text-text-secondary text-sm">Your password has been updated successfully. You can now log in with your new credentials.</p>
              </div>
              <button 
                onClick={() => navigate('/login')}
                className="w-full py-3 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg shadow-md transition-colors flex items-center justify-center gap-2"
              >
                Go to Login
              </button>
            </div>
          ) : (
            <>
              <div className="mb-10 text-center md:text-left">
                <h2 className="text-3xl font-extrabold text-text-main mb-2">
                  {step === 1 ? 'Forgot password?' : 'Create new password'}
                </h2>
                <p className="text-text-secondary text-sm">
                  {step === 1 
                    ? 'Enter the email associated with your account and we\'ll help you reset it.' 
                    : 'Enter your new password below. Make sure it\'s at least 6 characters.'
                  }
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3 text-red-500 text-sm font-medium">
                  <AlertCircle size={18} className="flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Step 1: Email */}
              {step === 1 && (
                <form onSubmit={handleVerifyEmail} className="space-y-5">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider ml-1">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                      <input 
                        type="email" 
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); setError(null); }}
                        className="w-full bg-surface border border-border rounded-lg py-3 pl-10 pr-4 text-sm outline-none focus:border-primary/50 text-text-main placeholder:text-text-muted shadow-sm transition-colors"
                        placeholder="name@example.com"
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <button 
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg shadow-md transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <><Loader2 size={18} className="animate-spin" /> Verifying...</>
                    ) : (
                      'Continue'
                    )}
                  </button>
                </form>
              )}

              {/* Step 2: New Password */}
              {step === 2 && (
                <form onSubmit={handleResetPassword} className="space-y-5">
                  <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg flex items-center gap-3 text-sm text-primary font-medium">
                    <CheckCircle2 size={18} className="flex-shrink-0" />
                    <span>Email verified: <strong>{email}</strong></span>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider ml-1">New Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                      <input 
                        type="password" 
                        value={password}
                        onChange={(e) => { setPassword(e.target.value); setError(null); }}
                        className="w-full bg-surface border border-border rounded-lg py-3 pl-10 pr-4 text-sm outline-none focus:border-primary/50 text-text-main placeholder:text-text-muted shadow-sm transition-colors"
                        placeholder="••••••••"
                        required
                        minLength={6}
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider ml-1">Confirm Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                      <input 
                        type="password" 
                        value={confirmPassword}
                        onChange={(e) => { setConfirmPassword(e.target.value); setError(null); }}
                        className="w-full bg-surface border border-border rounded-lg py-3 pl-10 pr-4 text-sm outline-none focus:border-primary/50 text-text-main placeholder:text-text-muted shadow-sm transition-colors"
                        placeholder="••••••••"
                        required
                        minLength={6}
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <button 
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg shadow-md transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <><Loader2 size={18} className="animate-spin" /> Resetting...</>
                    ) : (
                      'Reset Password'
                    )}
                  </button>

                  <button 
                    type="button"
                    onClick={() => { setStep(1); setError(null); setPassword(''); setConfirmPassword(''); }}
                    className="w-full py-2 text-text-secondary hover:text-text-main text-sm font-medium transition-colors"
                  >
                    Use a different email
                  </button>
                </form>
              )}
            </>
          )}

          <p className="mt-10 text-center text-sm text-text-secondary">
            Remember your password?{' '}
            <Link to="/login" className="text-primary font-bold hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
