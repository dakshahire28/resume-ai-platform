import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText, BookOpen, Activity, Send, Sun, Moon, Map } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import Logo from '../components/Logo';
import DotGrid from '../components/ui/DotGrid';

const features = [
  {
    icon: FileText,
    title: "Resume Builder",
    description: "Craft an ATS-optimized resume with our intelligent templates."
  },
  {
    icon: Activity,
    title: "Resume Analyzer",
    description: "Get instant AI feedback and score your resume for any role."
  },
  {
    icon: Map,
    title: "Career Roadmaps",
    description: "Step-by-step guides to mastering any tech stack or role."
  }
];

export default function Home() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background text-text-main selection:bg-primary selection:text-white pb-20 transition-colors duration-300">
      
      {/* Navbar (Landing specific) */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-6 max-w-7xl mx-auto absolute top-0 left-0 right-0 z-50">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-white flex items-center justify-center font-bold shadow-sm">
            <Logo className="w-6 h-6" />
          </div>
          <span className="font-bold text-xl tracking-wide uppercase text-text-main" style={{fontFamily: 'monospace'}}>CareerPilot</span>
        </Link>
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleTheme}
            className="p-2 mr-2 text-text-secondary hover:text-primary transition-colors hover:bg-surface rounded-lg outline-none cursor-pointer"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <Link to="/login" className="px-5 py-2 text-sm font-medium hover:text-primary transition-colors rounded text-text-main border border-border bg-surface shadow-sm">
            Log In
          </Link>
          <Link to="/builder" className="px-5 py-2 text-sm font-medium bg-primary hover:bg-primary/90 text-white rounded transition-colors hidden sm:block shadow-sm">
            Get Started
          </Link>
        </div>
      </nav>


      {/* Hero Section */}
      <section className="relative pt-40 pb-32 flex flex-col items-center justify-center text-center px-4 overflow-hidden border-b border-border">
        {/* DotGrid Background */}
        <div className="absolute inset-0 z-0 opacity-40">
          <DotGrid 
            baseColor={isDark ? "#374151" : "#cbd5e1"} 
            activeColor={isDark ? "#4F46E5" : "#2563eb"} 
            dotSize={2} 
            gap={20}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-text-main">
            Your <span className="text-primary">Career Navigator</span> <br className="hidden md:block"/>Starts Here
          </h1>
          <p className="text-xl md:text-2xl text-text-secondary mb-10 max-w-2xl font-light">
            Our AI-powered workspace helps you build resumes, analyze skills, and land your dream role with confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link to="/builder" className="px-8 py-4 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg text-lg transition-colors flex items-center justify-center gap-2 shadow-md">
              Build Resume
            </Link>
            <Link to="/dashboard" className="px-8 py-4 border border-border hover:border-primary bg-surface text-text-main font-semibold rounded-lg text-lg transition-colors flex items-center justify-center gap-2 shadow-sm">
              Explore Platform
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-4 border-b border-border bg-background">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-text-main">How it works</h2>
          <p className="text-text-secondary max-w-3xl mx-auto mb-16 text-lg">
            This is the platform we wish we had when we were applying on our own. We scour the internet looking for only the best resources to supplement your career journey and present them in a logical order.
          </p>

          <div className="grid md:grid-cols-3 gap-12 text-center items-start">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 mb-6 rounded-2xl bg-surface flex items-center justify-center text-primary border border-border shadow-lg">
                <BookOpen size={48} strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-text-main">Prepare</h3>
              <p className="text-text-secondary">
                Learn from curated resources, analyze your skill gaps, and construct a narrative with our intelligent resume builder.
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 mb-6 rounded-2xl bg-surface flex items-center justify-center text-primary border border-border shadow-lg">
                <FileText size={48} strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-text-main">Construct</h3>
              <p className="text-text-secondary">
                Craft a professional narrative with our intelligent resume builder and analyze your skill gaps.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-24 h-24 mb-6 rounded-2xl bg-surface flex items-center justify-center text-primary border border-border shadow-lg">
                <Activity size={48} strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-text-main">Analyze</h3>
              <p className="text-text-secondary">
                Get targeted feedback and ATS scores for your resume to optimize it for any job description.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-24 px-4 bg-surface">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-text-main">What you'll explore</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className="bg-background border border-border rounded-lg p-8 flex flex-col items-center text-center hover:border-primary transition-all cursor-pointer group shadow-sm hover:shadow-md">
                  <div className="w-28 h-28 mb-8 rounded-full border-2 border-primary border-dashed group-hover:border-solid flex items-center justify-center transition-all bg-surface">
                    <div className="w-24 h-24 rounded-full border border-primary flex items-center justify-center text-primary bg-primary/5">
                      <Icon size={40} strokeWidth={1.5} />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors text-text-main">{feature.title}</h3>
                  <p className="text-sm text-text-secondary hidden sm:block">{feature.description}</p>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/resources" className="px-6 py-3 border border-border hover:border-primary text-sm font-medium rounded transition-colors text-text-secondary hover:text-text-main bg-background shadow-sm hover:shadow-md">
              Explore Resources
            </Link>
            <Link to="/roadmaps" className="px-6 py-3 border border-border hover:border-primary text-sm font-medium rounded transition-colors text-text-secondary hover:text-text-main bg-background shadow-sm hover:shadow-md">
              Explore Roadmaps
            </Link>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="pt-24 pb-12 px-4 text-center bg-background border-t border-border">
        <h2 className="text-4xl font-bold mb-6 text-text-main">Ready to launch?</h2>
        <p className="text-text-secondary mb-8 text-lg">Join thousands of job seekers taking control of their career trajectory.</p>
        <Link to="/builder" className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg text-lg transition-colors shadow-md">
          Get Started Now <ArrowRight size={20} />
        </Link>
      </section>

    </div>
  );
}
