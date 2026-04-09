import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import axios from 'axios';
import {
  User, Briefcase, GraduationCap, Code, Globe, Heart, Award,
  ShieldCheck, BookOpen, Handshake, Phone, Image as ImageIcon,
  ChevronDown, ChevronRight, Plus, Trash2,
  Settings2, LayoutTemplate, Type, Palette, FileText, Braces,
  Undo2, Redo2, ZoomIn, ZoomOut, Maximize2,
  Link2, FileDown, FileType, Info,
  Home
} from 'lucide-react';

/* ─────────── LEFT NAVIGATION SECTIONS (matches RxResu) ─────────── */
const SECTIONS = [
  { id: 'picture', label: 'Picture', icon: ImageIcon },
  { id: 'basics', label: 'Basics', icon: User },
  { id: 'profiles', label: 'Profiles', icon: Globe },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'skills', label: 'Skills', icon: Code },
  { id: 'languages', label: 'Languages', icon: Globe },
  { id: 'interests', label: 'Interests', icon: Heart },
  { id: 'awards', label: 'Awards', icon: Award },
  { id: 'certifications', label: 'Certifications', icon: ShieldCheck },
  { id: 'publications', label: 'Publications', icon: BookOpen },
  { id: 'volunteer', label: 'Volunteer', icon: Handshake },
  { id: 'references', label: 'References', icon: Phone },
];

/* ─────────── RIGHT SETTINGS TABS ─────────── */
const SETTINGS_TABS = [
  { id: 'template', label: 'Template', icon: LayoutTemplate },
  { id: 'layout', label: 'Layout', icon: Settings2 },
  { id: 'typography', label: 'Typography', icon: Type },
  { id: 'design', label: 'Design', icon: Palette },
  { id: 'page', label: 'Page', icon: FileText },
  { id: 'css', label: 'Custom CSS', icon: Braces },
  { id: 'sharing', label: 'Sharing', icon: Globe },
  { id: 'export', label: 'Export', icon: FileDown },
  { id: 'info', label: 'Information', icon: Info },
];

/* ─────────── TEMPLATES ─────────── */
const TEMPLATES = [
  'Software Engineer', 
  'Data Scientist', 
  'Marketing Manager', 
  'Creative Director', 
  'Sales Executive', 
  'Project Manager', 
  'Academic Researcher', 
  'Executive Leadership', 
  'General Professional'
];

const FONT_FAMILIES = [
  'Inter', 'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Poppins',
  'Source Sans Pro', 'Nunito', 'PT Sans', 'Merriweather'
];

/* ─────────── REUSABLE HELPER COMPONENTS (defined outside to prevent remount) ─────────── */
const InputField = ({ label, value, onChange, type = 'text', placeholder = '', suffix = '' }) => (
  <div className="space-y-1.5">
    <label className="block text-xs font-semibold text-text-secondary">{label}</label>
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-surface border border-border rounded-md px-3 py-2 text-sm text-text-main placeholder:text-text-muted outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-200"
      />
      {suffix && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-text-muted font-medium">{suffix}</span>
      )}
    </div>
  </div>
);

const TextareaField = ({ label, value, onChange, rows = 4, placeholder = '' }) => (
  <div className="space-y-1.5">
    <label className="block text-xs font-semibold text-text-secondary">{label}</label>
    <textarea
      rows={rows}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-surface border border-border rounded-md px-3 py-2 text-sm text-text-main placeholder:text-text-muted outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-200 resize-none"
    />
  </div>
);

const ItemCard = ({ title, subtitle, onRemove, children, defaultOpen = true }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-border rounded-lg bg-surface/50 overflow-hidden transition-all duration-300">
      <div className="flex items-center justify-between p-3 cursor-pointer hover:bg-surface/80 transition-colors" onClick={() => setOpen(!open)}>
        <div className="flex items-center gap-2 min-w-0">
          <ChevronRight size={14} className={`text-text-muted transition-transform duration-200 ${open ? 'rotate-90' : ''}`} />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-text-main truncate">{title || 'Untitled'}</p>
            {subtitle && <p className="text-[11px] text-text-muted truncate">{subtitle}</p>}
          </div>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); onRemove(); }}
          className="p-1 rounded hover:bg-red-500/10 text-text-muted hover:text-red-500 transition-colors"
        >
          <Trash2 size={14} />
        </button>
      </div>
      <div className={`transition-all duration-300 ease-in-out overflow-hidden ${open ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="p-4 pt-0 space-y-3 border-t border-border/50">
          {children}
        </div>
      </div>
    </div>
  );
};

const AddButton = ({ label, onClick }) => (
  <button
    onClick={onClick}
    className="w-full py-2.5 border border-dashed border-border hover:border-primary/50 text-text-secondary hover:text-primary rounded-lg flex items-center justify-center gap-2 transition-all duration-200 text-sm font-medium"
  >
    <Plus size={14} /> {label}
  </button>
);

/* ═══════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════════ */
export default function ResumeBuilder() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const resumeId = searchParams.get('id');
  const { user } = useAuth();
  const { isDark } = useTheme();
  const previewRef = useRef(null);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);

  /* ── Active panels ── */
  const [activeSection, setActiveSection] = useState('basics');
  const [activeSettingsTab, setActiveSettingsTab] = useState(null);
  const [leftPanelOpen, setLeftPanelOpen] = useState(true);
  const [rightPanelOpen, setRightPanelOpen] = useState(false);

  /* ── Zoom ── */
  const [zoom, setZoom] = useState(80);

  /* ── Design Settings ── */
  const [settings, setSettings] = useState({
    template: 'Software Engineer',
    font: 'Inter',
    fontSize: 14,
    lineHeight: 1.5,
    primaryColor: '#4f46e5',
    bgColor: '#ffffff',
    borderStyle: 'solid',
    pageMargin: 48,
    customCss: '',
  });

  /* ── Resume Data ── */
  const [resume, setResume] = useState({
    picture: { url: '', size: 80, borderRadius: 0 },
    basics: {
      firstName: user?.name?.split(' ')[0] || 'Guest',
      lastName: user?.name?.split(' ').slice(1).join(' ') || 'User',
      headline: '',
      email: user?.email || '',
      phone: '',
      location: '',
      website: '',
      summary: '',
    },
    profiles: [],
    experience: [],
    education: [],
    skills: [],
    languages: [],
    interests: [],
    awards: [],
    certifications: [],
    publications: [],
    volunteer: [],
    references: [],
  });

  /* ─────────── HANDLERS ─────────── */
  const updateBasics = (field, value) => {
    setResume(r => ({ ...r, basics: { ...r.basics, [field]: value } }));
  };

  const updatePicture = (field, value) => {
    setResume(r => ({ ...r, picture: { ...r.picture, [field]: value } }));
  };

  const addItem = (section, template) => {
    setResume(r => ({
      ...r,
      [section]: [...r[section], { _id: (typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2)), ...template }]
    }));
  };

  /* ── History for Undo/Redo ── */
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const isUndoRedoAction = useRef(false);

  // Load resume if ID exists
  useEffect(() => {
    if (resumeId) {
      const fetchResume = async () => {
        try {
          const res = await axios.get(`/api/resumes/${resumeId}`);
          setResume(res.data.data || res.data);
          setSettings(res.data.settings || settings);
          // Sync history with loaded data
          const initial = JSON.stringify(res.data.data || res.data);
          setHistory([initial]);
          setHistoryIndex(0);
        } catch (err) {
          console.error('Error loading resume:', err);
          alert('Failed to load resume. It might have been deleted.');
          navigate('/resumes');
        }
      };
      fetchResume();
    }
  }, [resumeId]);

  const saveResume = async () => {
    setSaving(true);
    try {
      const payload = {
        title: `${resume.basics.firstName} ${resume.basics.lastName} Resume`.trim() || 'Untitled Resume',
        template: settings.template,
        settings,
        data: resume
      };

      if (resumeId) {
        await axios.put(`/api/resumes/${resumeId}`, payload);
      } else {
        const res = await axios.post('/api/resumes', payload);
        const newId = res.data._id || res.data.id;
        if (newId) setSearchParams({ id: newId }); // Add ID to URL
      }
      setLastSaved(new Date());
    } catch (err) {
      console.error('Error saving resume:', err);
    } finally {
      setSaving(false);
    }
  };

  // Auto-save every 30 seconds if changed
  useEffect(() => {
    const timer = setTimeout(() => {
      if (resumeId) saveResume();
    }, 30000);
    return () => clearTimeout(timer);
  }, [resume, settings]);

  // Initialize history if not loading
  useEffect(() => {
    if (!resumeId && history.length === 0) {
      const initial = JSON.stringify(resume);
      setHistory([initial]);
      setHistoryIndex(0);
    }
  }, [resumeId]);

  // Watch for resume changes
  useEffect(() => {
    if (isUndoRedoAction.current) {
      isUndoRedoAction.current = false;
      return;
    }
    
    // Only push if content actually changed from what's in history
    const currentStr = JSON.stringify(resume);
    if (historyIndex >= 0 && currentStr !== history[historyIndex]) {
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(currentStr);
      if (newHistory.length > 50) newHistory.shift();
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    }
  }, [resume]);

  const handleUndo = () => {
    if (historyIndex > 0) {
      isUndoRedoAction.current = true;
      const prevData = JSON.parse(history[historyIndex - 1]);
      setResume(prevData);
      setHistoryIndex(historyIndex - 1);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      isUndoRedoAction.current = true;
      const nextData = JSON.parse(history[historyIndex + 1]);
      setResume(nextData);
      setHistoryIndex(historyIndex + 1);
    }
  };

  const updateItem = (section, id, field, value) => {
    setResume(r => ({
      ...r,
      [section]: r[section].map(item => item._id === id ? { ...item, [field]: value } : item)
    }));
  };

  const removeItem = (section, id) => {
    setResume(r => ({
      ...r,
      [section]: r[section].filter(item => item._id !== id)
    }));
  };

  const handleSettingsTab = (tabId) => {
    if (activeSettingsTab === tabId) {
      setActiveSettingsTab(null);
      setRightPanelOpen(false);
    } else {
      setActiveSettingsTab(tabId);
      setRightPanelOpen(true);
    }
  };

  const handleSectionClick = (sectionId) => {
    if (activeSection === sectionId && leftPanelOpen) {
      setLeftPanelOpen(false);
      setActiveSection(null);
    } else {
      setActiveSection(sectionId);
      setLeftPanelOpen(true);
    }
    // Close right panel when opening left
    if (!leftPanelOpen) {
      setRightPanelOpen(false);
      setActiveSettingsTab(null);
    }
  };

  /* ── Export PDF (High Quality) ── */
  const handleExportPDF = async () => {
    if (!resumeId) {
      alert('Please save your resume first before exporting a high-quality PDF.');
      return;
    }

    setSaving(true);
    try {
      const element = document.getElementById('resume-preview');
      const html = element.innerHTML;
      
      // We wrap it in a basic HTML structure with A4 styles
      const fullHtml = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <script src="https://cdn.tailwindcss.com"></script>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Roboto:wght@400;500;700&family=Montserrat:wght@400;700;900&display=swap" rel="stylesheet">
            <style>
              body { margin: 0; padding: 0; background: white; -webkit-print-color-adjust: exact; }
              #resume-preview { 
                width: 210mm !important; 
                height: 297mm !important; 
                padding: ${settings.pageMargin}mm !important;
                font-family: "${settings.font}", sans-serif !important;
              }
            </style>
          </head>
          <body>
            <div id="resume-preview">${html}</div>
          </body>
        </html>
      `;

      const res = await axios.post(`http://localhost:5000/api/resumes/${resumeId}/export/pdf`, { html: fullHtml }, { 
        responseType: 'blob',
        withCredentials: true 
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `resume_${resume.basics.firstName || 'data'}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error('High-quality PDF export failed, falling back to print:', err);
      window.print();
    } finally {
      setSaving(false);
    }
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(resume, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `resume_${resume.basics.firstName || 'data'}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleExportDOC = () => {
    const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Resume</title></head><body>";
    const footer = "</body></html>";
    const sourceHTML = header + document.getElementById("resume-preview").innerHTML + footer;
    
    const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
    const fileDownload = document.createElement("a");
    document.body.appendChild(fileDownload);
    fileDownload.href = source;
    fileDownload.download = `resume_${resume.basics.firstName || 'data'}.doc`;
    fileDownload.click();
    document.body.removeChild(fileDownload);
  };

  /* ═══════════════════════════════════════════════════════════
     EDITOR PANEL SECTIONS
     ═══════════════════════════════════════════════════════════ */
  const renderEditorContent = () => {
    switch (activeSection) {
      case 'picture':
        return (
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-lg bg-surface border-2 border-dashed border-border flex items-center justify-center">
                {resume.picture.url ? (
                  <img src={resume.picture.url} alt="Profile" className="w-full h-full rounded-lg object-cover" />
                ) : (
                  <ImageIcon size={24} className="text-text-muted" />
                )}
              </div>
              <div className="flex-1">
                <InputField label="URL" value={resume.picture.url} onChange={(v) => updatePicture('url', v)} placeholder="https://example.com/photo.jpg" />
              </div>
            </div>
            <InputField label="Size" value={resume.picture.size} onChange={(v) => updatePicture('size', parseInt(v) || 0)} suffix="pt" />
            <InputField label="Border Radius" value={resume.picture.borderRadius} onChange={(v) => updatePicture('borderRadius', parseInt(v) || 0)} suffix="pt" />
          </div>
        );

      case 'basics':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <InputField label="First Name" value={resume.basics.firstName} onChange={(v) => updateBasics('firstName', v)} />
              <InputField label="Last Name" value={resume.basics.lastName} onChange={(v) => updateBasics('lastName', v)} />
            </div>
            <InputField label="Headline" value={resume.basics.headline} onChange={(v) => updateBasics('headline', v)} placeholder="e.g. Software Engineer" />
            <div className="grid grid-cols-2 gap-3">
              <InputField label="Email" value={resume.basics.email} onChange={(v) => updateBasics('email', v)} type="email" />
              <InputField label="Phone" value={resume.basics.phone} onChange={(v) => updateBasics('phone', v)} />
            </div>
            <InputField label="Location" value={resume.basics.location} onChange={(v) => updateBasics('location', v)} placeholder="San Francisco, CA" />
            <InputField label="Website" value={resume.basics.website} onChange={(v) => updateBasics('website', v)} placeholder="https://yoursite.com" />
            <TextareaField label="Summary" value={resume.basics.summary} onChange={(v) => updateBasics('summary', v)} placeholder="A brief summary about yourself..." rows={5} />
          </div>
        );

      case 'profiles':
        return (
          <div className="space-y-3">
            {resume.profiles.map(p => (
              <ItemCard key={p._id} title={p.network} subtitle={p.username} onRemove={() => removeItem('profiles', p._id)}>
                <InputField label="Network" value={p.network} onChange={(v) => updateItem('profiles', p._id, 'network', v)} placeholder="e.g. LinkedIn" />
                <InputField label="Username" value={p.username} onChange={(v) => updateItem('profiles', p._id, 'username', v)} />
                <InputField label="URL" value={p.url} onChange={(v) => updateItem('profiles', p._id, 'url', v)} placeholder="https://linkedin.com/in/..." />
              </ItemCard>
            ))}
            <AddButton label="Add Profile" onClick={() => addItem('profiles', { network: '', username: '', url: '' })} />
          </div>
        );

      case 'experience':
        return (
          <div className="space-y-3">
            {resume.experience.map(exp => (
              <ItemCard key={exp._id} title={exp.company} subtitle={exp.position} onRemove={() => removeItem('experience', exp._id)}>
                <InputField label="Company" value={exp.company} onChange={(v) => updateItem('experience', exp._id, 'company', v)} />
                <InputField label="Position" value={exp.position} onChange={(v) => updateItem('experience', exp._id, 'position', v)} />
                <div className="grid grid-cols-2 gap-3">
                  <InputField label="Start Date" value={exp.startDate} onChange={(v) => updateItem('experience', exp._id, 'startDate', v)} placeholder="Jan 2022" />
                  <InputField label="End Date" value={exp.endDate} onChange={(v) => updateItem('experience', exp._id, 'endDate', v)} placeholder="Present" />
                </div>
                <InputField label="Location" value={exp.location} onChange={(v) => updateItem('experience', exp._id, 'location', v)} />
                <TextareaField label="Summary" value={exp.summary} onChange={(v) => updateItem('experience', exp._id, 'summary', v)} placeholder="Describe your responsibilities and achievements..." />
              </ItemCard>
            ))}
            <AddButton label="Add Experience" onClick={() => addItem('experience', { company: '', position: '', startDate: '', endDate: '', location: '', summary: '' })} />
          </div>
        );

      case 'education':
        return (
          <div className="space-y-3">
            {resume.education.map(edu => (
              <ItemCard key={edu._id} title={edu.institution} subtitle={edu.studyType} onRemove={() => removeItem('education', edu._id)}>
                <InputField label="Institution" value={edu.institution} onChange={(v) => updateItem('education', edu._id, 'institution', v)} />
                <InputField label="Degree" value={edu.studyType} onChange={(v) => updateItem('education', edu._id, 'studyType', v)} placeholder="B.S. Computer Science" />
                <div className="grid grid-cols-2 gap-3">
                  <InputField label="Start Date" value={edu.startDate} onChange={(v) => updateItem('education', edu._id, 'startDate', v)} />
                  <InputField label="End Date" value={edu.endDate} onChange={(v) => updateItem('education', edu._id, 'endDate', v)} />
                </div>
                <InputField label="GPA" value={edu.score} onChange={(v) => updateItem('education', edu._id, 'score', v)} placeholder="3.8/4.0" />
                <TextareaField label="Summary" value={edu.summary} onChange={(v) => updateItem('education', edu._id, 'summary', v)} rows={3} />
              </ItemCard>
            ))}
            <AddButton label="Add Education" onClick={() => addItem('education', { institution: '', studyType: '', startDate: '', endDate: '', score: '', summary: '' })} />
          </div>
        );

      case 'skills':
        return (
          <div className="space-y-3">
            {resume.skills.map(s => (
              <ItemCard key={s._id} title={s.name} subtitle={s.level} onRemove={() => removeItem('skills', s._id)}>
                <InputField label="Skill" value={s.name} onChange={(v) => updateItem('skills', s._id, 'name', v)} placeholder="e.g. React" />
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-text-secondary">Level</label>
                  <select
                    value={s.level}
                    onChange={(e) => updateItem('skills', s._id, 'level', e.target.value)}
                    className="w-full bg-surface border border-border rounded-md px-3 py-2 text-sm text-text-main outline-none focus:border-primary/50 transition-all"
                  >
                    <option value="">Select Level</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>
                <InputField label="Keywords (comma separated)" value={s.keywords} onChange={(v) => updateItem('skills', s._id, 'keywords', v)} placeholder="React, TypeScript, Node.js" />
              </ItemCard>
            ))}
            <AddButton label="Add Skill" onClick={() => addItem('skills', { name: '', level: '', keywords: '' })} />
          </div>
        );

      case 'languages':
        return (
          <div className="space-y-3">
            {resume.languages.map(l => (
              <ItemCard key={l._id} title={l.language} subtitle={l.fluency} onRemove={() => removeItem('languages', l._id)}>
                <InputField label="Language" value={l.language} onChange={(v) => updateItem('languages', l._id, 'language', v)} />
                <InputField label="Fluency" value={l.fluency} onChange={(v) => updateItem('languages', l._id, 'fluency', v)} placeholder="e.g. Native, Fluent, Intermediate" />
              </ItemCard>
            ))}
            <AddButton label="Add Language" onClick={() => addItem('languages', { language: '', fluency: '' })} />
          </div>
        );

      case 'interests':
        return (
          <div className="space-y-3">
            {resume.interests.map(i => (
              <ItemCard key={i._id} title={i.name} onRemove={() => removeItem('interests', i._id)}>
                <InputField label="Interest" value={i.name} onChange={(v) => updateItem('interests', i._id, 'name', v)} placeholder="e.g. Open Source" />
                <InputField label="Keywords" value={i.keywords} onChange={(v) => updateItem('interests', i._id, 'keywords', v)} placeholder="e.g. Linux, Golang" />
              </ItemCard>
            ))}
            <AddButton label="Add Interest" onClick={() => addItem('interests', { name: '', keywords: '' })} />
          </div>
        );

      case 'awards':
        return (
          <div className="space-y-3">
            {resume.awards.map(a => (
              <ItemCard key={a._id} title={a.title} subtitle={a.awarder} onRemove={() => removeItem('awards', a._id)}>
                <InputField label="Title" value={a.title} onChange={(v) => updateItem('awards', a._id, 'title', v)} />
                <InputField label="Awarder" value={a.awarder} onChange={(v) => updateItem('awards', a._id, 'awarder', v)} />
                <InputField label="Date" value={a.date} onChange={(v) => updateItem('awards', a._id, 'date', v)} />
                <TextareaField label="Summary" value={a.summary} onChange={(v) => updateItem('awards', a._id, 'summary', v)} rows={3} />
              </ItemCard>
            ))}
            <AddButton label="Add Award" onClick={() => addItem('awards', { title: '', awarder: '', date: '', summary: '' })} />
          </div>
        );

      case 'certifications':
        return (
          <div className="space-y-3">
            {resume.certifications.map(c => (
              <ItemCard key={c._id} title={c.name} subtitle={c.issuer} onRemove={() => removeItem('certifications', c._id)}>
                <InputField label="Name" value={c.name} onChange={(v) => updateItem('certifications', c._id, 'name', v)} />
                <InputField label="Issuer" value={c.issuer} onChange={(v) => updateItem('certifications', c._id, 'issuer', v)} />
                <InputField label="Date" value={c.date} onChange={(v) => updateItem('certifications', c._id, 'date', v)} />
                <InputField label="URL" value={c.url} onChange={(v) => updateItem('certifications', c._id, 'url', v)} />
              </ItemCard>
            ))}
            <AddButton label="Add Certification" onClick={() => addItem('certifications', { name: '', issuer: '', date: '', url: '' })} />
          </div>
        );

      case 'publications':
        return (
          <div className="space-y-3">
            {resume.publications.map(p => (
              <ItemCard key={p._id} title={p.name} subtitle={p.publisher} onRemove={() => removeItem('publications', p._id)}>
                <InputField label="Name" value={p.name} onChange={(v) => updateItem('publications', p._id, 'name', v)} />
                <InputField label="Publisher" value={p.publisher} onChange={(v) => updateItem('publications', p._id, 'publisher', v)} />
                <InputField label="Date" value={p.date} onChange={(v) => updateItem('publications', p._id, 'date', v)} />
                <InputField label="URL" value={p.url} onChange={(v) => updateItem('publications', p._id, 'url', v)} />
                <TextareaField label="Summary" value={p.summary} onChange={(v) => updateItem('publications', p._id, 'summary', v)} rows={3} />
              </ItemCard>
            ))}
            <AddButton label="Add Publication" onClick={() => addItem('publications', { name: '', publisher: '', date: '', url: '', summary: '' })} />
          </div>
        );

      case 'volunteer':
        return (
          <div className="space-y-3">
            {resume.volunteer.map(v => (
              <ItemCard key={v._id} title={v.organization} subtitle={v.position} onRemove={() => removeItem('volunteer', v._id)}>
                <InputField label="Organization" value={v.organization} onChange={(vi) => updateItem('volunteer', v._id, 'organization', vi)} />
                <InputField label="Position" value={v.position} onChange={(vi) => updateItem('volunteer', v._id, 'position', vi)} />
                <div className="grid grid-cols-2 gap-3">
                  <InputField label="Start Date" value={v.startDate} onChange={(vi) => updateItem('volunteer', v._id, 'startDate', vi)} />
                  <InputField label="End Date" value={v.endDate} onChange={(vi) => updateItem('volunteer', v._id, 'endDate', vi)} />
                </div>
                <TextareaField label="Summary" value={v.summary} onChange={(vi) => updateItem('volunteer', v._id, 'summary', vi)} rows={3} />
              </ItemCard>
            ))}
            <AddButton label="Add Volunteer" onClick={() => addItem('volunteer', { organization: '', position: '', startDate: '', endDate: '', summary: '' })} />
          </div>
        );

      case 'references':
        return (
          <div className="space-y-3">
            {resume.references.map(r => (
              <ItemCard key={r._id} title={r.name} subtitle={r.relationship} onRemove={() => removeItem('references', r._id)}>
                <InputField label="Name" value={r.name} onChange={(v) => updateItem('references', r._id, 'name', v)} />
                <InputField label="Relationship" value={r.relationship} onChange={(v) => updateItem('references', r._id, 'relationship', v)} placeholder="e.g. Former Manager" />
                <InputField label="Phone" value={r.phone} onChange={(v) => updateItem('references', r._id, 'phone', v)} />
                <InputField label="Email" value={r.email} onChange={(v) => updateItem('references', r._id, 'email', v)} />
              </ItemCard>
            ))}
            <AddButton label="Add Reference" onClick={() => addItem('references', { name: '', relationship: '', phone: '', email: '' })} />
          </div>
        );

      default:
        return <p className="text-sm text-text-muted py-8 text-center">Select a section from the left.</p>;
    }
  };

  /* ═══════════════════════════════════════════════════════════
     RIGHT SETTINGS PANEL CONTENT
     ═══════════════════════════════════════════════════════════ */
  const renderSettingsContent = () => {
    switch (activeSettingsTab) {
      case 'template':
        return (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-text-main">Templates</h3>
            <div className="grid grid-cols-2 gap-2">
              {TEMPLATES.map(t => (
                <button
                  key={t}
                  onClick={() => setSettings(s => ({ ...s, template: t }))}
                  className={`p-3 rounded-lg border text-xs font-semibold transition-all duration-200 ${
                    settings.template === t
                      ? 'border-primary bg-primary/10 text-primary ring-1 ring-primary/30'
                      : 'border-border bg-surface text-text-secondary hover:border-primary/30 hover:text-text-main'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        );

      case 'layout':
        return (
          <div className="space-y-5">
            <h3 className="text-sm font-bold text-text-main">Layout</h3>
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-text-secondary">Page Margin</label>
              <input
                type="range" min="24" max="80" value={settings.pageMargin}
                onChange={(e) => setSettings(s => ({ ...s, pageMargin: parseInt(e.target.value) }))}
                className="w-full accent-primary"
              />
              <p className="text-[11px] text-text-muted text-right">{settings.pageMargin}px</p>
            </div>
          </div>
        );

      case 'typography':
        return (
          <div className="space-y-5">
            <h3 className="text-sm font-bold text-text-main">Typography</h3>
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-text-secondary">Font Family</label>
              <select
                value={settings.font}
                onChange={(e) => setSettings(s => ({ ...s, font: e.target.value }))}
                className="w-full bg-surface border border-border rounded-md px-3 py-2 text-sm text-text-main outline-none"
              >
                {FONT_FAMILIES.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-text-secondary">Font Size</label>
              <input
                type="range" min="10" max="20" value={settings.fontSize}
                onChange={(e) => setSettings(s => ({ ...s, fontSize: parseInt(e.target.value) }))}
                className="w-full accent-primary"
              />
              <p className="text-[11px] text-text-muted text-right">{settings.fontSize}px</p>
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-text-secondary">Line Height</label>
              <input
                type="range" min="1" max="2.5" step="0.1" value={settings.lineHeight}
                onChange={(e) => setSettings(s => ({ ...s, lineHeight: parseFloat(e.target.value) }))}
                className="w-full accent-primary"
              />
              <p className="text-[11px] text-text-muted text-right">{settings.lineHeight}</p>
            </div>
          </div>
        );

      case 'design':
        return (
          <div className="space-y-5">
            <h3 className="text-sm font-bold text-text-main">Design</h3>
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-text-secondary">Primary Color</label>
              <div className="flex items-center gap-3">
                <input
                  type="color" value={settings.primaryColor}
                  onChange={(e) => setSettings(s => ({ ...s, primaryColor: e.target.value }))}
                  className="w-10 h-10 rounded-lg border border-border cursor-pointer"
                />
                <input
                  type="text" value={settings.primaryColor}
                  onChange={(e) => setSettings(s => ({ ...s, primaryColor: e.target.value }))}
                  className="flex-1 bg-surface border border-border rounded-md px-3 py-2 text-sm text-text-main outline-none"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-text-secondary">Background Color</label>
              <div className="flex items-center gap-3">
                <input
                  type="color" value={settings.bgColor}
                  onChange={(e) => setSettings(s => ({ ...s, bgColor: e.target.value }))}
                  className="w-10 h-10 rounded-lg border border-border cursor-pointer"
                />
                <input
                  type="text" value={settings.bgColor}
                  onChange={(e) => setSettings(s => ({ ...s, bgColor: e.target.value }))}
                  className="flex-1 bg-surface border border-border rounded-md px-3 py-2 text-sm text-text-main outline-none"
                />
              </div>
            </div>
          </div>
        );

      case 'page':
        return (
          <div className="space-y-5">
            <h3 className="text-sm font-bold text-text-main">Page</h3>
            <p className="text-xs text-text-muted">Page size: A4 (210mm × 297mm)</p>
            <p className="text-xs text-text-muted">Orientation: Portrait</p>
          </div>
        );

      case 'export':
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-text-main">Export Resume</h3>
              <p className="text-[11px] text-text-secondary">Download your resume in various formats for applications.</p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <button 
                onClick={handleExportPDF}
                className="flex items-center gap-3 p-4 bg-primary/10 border border-primary/20 rounded-xl hover:bg-primary/20 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20">
                  <FileDown size={20} />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-text-main group-hover:text-primary transition-colors">Download PDF</p>
                  <p className="text-[10px] text-text-secondary">High-quality document export</p>
                </div>
              </button>

              <button 
                onClick={handleExportDOC}
                className="flex items-center gap-3 p-4 bg-blue-500/5 border border-blue-500/10 rounded-xl hover:bg-blue-500/10 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-500 text-white flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <FileType size={20} />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-text-main group-hover:text-blue-500 transition-colors">Download DOC</p>
                  <p className="text-[10px] text-text-secondary">Editable Microsoft Word format</p>
                </div>
              </button>

              <button 
                onClick={handleExportJSON}
                className="flex items-center gap-3 p-4 bg-zinc-500/5 border border-zinc-500/10 rounded-xl hover:bg-zinc-500/10 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-zinc-600 text-white flex items-center justify-center shadow-lg shadow-zinc-500/20">
                  <Braces size={20} />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-text-main group-hover:text-zinc-600 transition-colors">Export JSON</p>
                  <p className="text-[10px] text-text-secondary">For backup or advanced migration</p>
                </div>
              </button>
            </div>
          </div>
        );

      case 'css':
        return (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-text-main">Custom CSS</h3>
            <textarea
              rows={16}
              value={settings.customCss}
              onChange={(e) => setSettings(s => ({ ...s, customCss: e.target.value }))}
              placeholder="/* Add custom CSS here. Example: .resume-header { background: #f0f0f0; } */"
              className="w-full bg-surface border border-border rounded-md px-3 py-2 text-xs text-text-main font-mono outline-none focus:border-primary/50 resize-none"
            />
          </div>
        );

      case 'sharing':
        return (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-text-main">Sharing</h3>
            <p className="text-xs text-text-muted">Sharing options will be available after saving.</p>
          </div>
        );

      case 'export':
        return (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-text-main">Export</h3>
            <button className="w-full py-2.5 bg-primary hover:bg-primary/90 text-white rounded-lg text-sm font-bold transition-colors flex items-center justify-center gap-2">
              <FileDown size={16} /> Export as PDF
            </button>
            <button className="w-full py-2.5 bg-surface hover:bg-background border border-border text-text-main rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2">
              <FileType size={16} /> Export as JSON
            </button>
          </div>
        );

      case 'info':
        return (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-text-main">Information</h3>
            <div className="space-y-2 text-xs text-text-secondary">
              <p><strong className="text-text-main">Template:</strong> {settings.template}</p>
              <p><strong className="text-text-main">Font:</strong> {settings.font}</p>
              <p><strong className="text-text-main">Font Size:</strong> {settings.fontSize}px</p>
              <p><strong className="text-text-main">Primary Color:</strong> {settings.primaryColor}</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  /* ═══════════════════════════════════════════════════════════
     LIVE A4 PREVIEW
     ═══════════════════════════════════════════════════════════ */
  const ResumePreview = () => {
    const b = resume.basics;
    const fullName = `${b.firstName} ${b.lastName}`.trim();

    return (
      <div
        ref={previewRef}
        className="bg-white shadow-2xl transition-transform duration-300 ease-out origin-top shrink-0"
        style={{
          width: '794px',
          minHeight: '1123px',
          transform: `scale(${zoom / 100})`,
          fontFamily: `'${settings.font}', sans-serif`,
          fontSize: `${settings.fontSize}px`,
          lineHeight: settings.lineHeight,
          backgroundColor: settings.bgColor,
          color: '#1a1a1a',
        }}
      >
        <div style={{ padding: `${settings.pageMargin}px` }}>

          {/* Header */}
          <header className="mb-6 pb-4" style={{ borderBottom: `3px solid ${settings.primaryColor}` }}>
            <div className="flex items-start gap-4">
              {resume.picture.url && (
                <img
                  src={resume.picture.url}
                  alt="Profile"
                  style={{
                    width: resume.picture.size,
                    height: resume.picture.size,
                    borderRadius: resume.picture.borderRadius,
                    objectFit: 'cover',
                  }}
                />
              )}
              <div className="flex-1 text-center">
                <h1 className="text-3xl font-extrabold uppercase tracking-tight text-[#1a1a1a] mb-1">
                  {fullName || 'Your Name'}
                </h1>
                {b.headline && (
                  <h2 className="text-base font-medium uppercase tracking-[0.2em] mb-3" style={{ color: settings.primaryColor }}>
                    {b.headline}
                  </h2>
                )}
                <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-[11px] font-medium text-gray-500">
                  {b.email && <span>{b.email}</span>}
                  {b.phone && <span>• {b.phone}</span>}
                  {b.location && <span>• {b.location}</span>}
                  {b.website && <span>• {b.website}</span>}
                </div>
              </div>
            </div>
            {b.summary && (
              <p className="mt-4 text-[13px] text-gray-600 leading-relaxed">{b.summary}</p>
            )}
          </header>

          {/* Two Column Body */}
          <div className="flex gap-8">
            {/* Left Column 65% */}
            <div className="w-[65%] flex flex-col gap-6">

              {/* Experience */}
              {resume.experience.length > 0 && (
                <section>
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em] border-b border-gray-300 pb-2 mb-4" style={{ color: settings.primaryColor }}>Experience</h3>
                  <div className="flex flex-col gap-5">
                    {resume.experience.map(exp => (
                      <div key={exp._id}>
                        <div className="flex justify-between items-baseline mb-0.5">
                          <h4 className="font-bold text-[14px] text-[#1a1a1a]">{exp.company}</h4>
                          <span className="text-[11px] font-medium text-gray-500 whitespace-nowrap ml-2">
                            {[exp.startDate, exp.endDate].filter(Boolean).join(' — ')}
                          </span>
                        </div>
                        <p className="text-[13px] font-semibold italic mb-1" style={{ color: settings.primaryColor }}>{exp.position}</p>
                        {exp.location && <p className="text-[11px] text-gray-500 mb-1">{exp.location}</p>}
                        {exp.summary && <p className="text-[12px] text-gray-700 leading-relaxed whitespace-pre-wrap">{exp.summary}</p>}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Volunteer */}
              {resume.volunteer.length > 0 && (
                <section>
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em] border-b border-gray-300 pb-2 mb-4" style={{ color: settings.primaryColor }}>Volunteer</h3>
                  <div className="flex flex-col gap-4">
                    {resume.volunteer.map(v => (
                      <div key={v._id}>
                        <h4 className="font-bold text-[14px] text-[#1a1a1a]">{v.organization}</h4>
                        <p className="text-[13px] font-semibold italic" style={{ color: settings.primaryColor }}>{v.position}</p>
                        <span className="text-[11px] text-gray-500">{[v.startDate, v.endDate].filter(Boolean).join(' — ')}</span>
                        {v.summary && <p className="text-[12px] text-gray-700 leading-relaxed mt-1 whitespace-pre-wrap">{v.summary}</p>}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Publications */}
              {resume.publications.length > 0 && (
                <section>
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em] border-b border-gray-300 pb-2 mb-4" style={{ color: settings.primaryColor }}>Publications</h3>
                  <div className="flex flex-col gap-3">
                    {resume.publications.map(p => (
                      <div key={p._id}>
                        <h4 className="font-bold text-[14px] text-[#1a1a1a]">{p.name}</h4>
                        <p className="text-[12px] text-gray-600">{p.publisher} {p.date && `• ${p.date}`}</p>
                        {p.summary && <p className="text-[12px] text-gray-700 mt-1">{p.summary}</p>}
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Right Column 35% */}
            <div className="w-[35%] flex flex-col gap-6">

              {/* Education */}
              {resume.education.length > 0 && (
                <section>
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em] border-b border-gray-300 pb-2 mb-4" style={{ color: settings.primaryColor }}>Education</h3>
                  <div className="flex flex-col gap-4">
                    {resume.education.map(edu => (
                      <div key={edu._id}>
                        <h4 className="font-bold text-[13px] text-[#1a1a1a] leading-tight">{edu.studyType}</h4>
                        <p className="text-[12px] font-medium text-gray-600">{edu.institution}</p>
                        <div className="text-[11px] text-gray-500 mt-1 flex justify-between">
                          <span>{[edu.startDate, edu.endDate].filter(Boolean).join(' — ')}</span>
                          {edu.score && <span className="font-bold" style={{ color: settings.primaryColor }}>{edu.score}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Skills */}
              {resume.skills.length > 0 && (
                <section>
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em] border-b border-gray-300 pb-2 mb-4" style={{ color: settings.primaryColor }}>Skills</h3>
                  <div className="flex flex-col gap-2">
                    {resume.skills.map(s => (
                      <div key={s._id}>
                        <div className="flex justify-between items-center">
                          <span className="text-[12px] font-bold text-[#1a1a1a]">{s.name}</span>
                          {s.level && <span className="text-[10px] text-gray-500">{s.level}</span>}
                        </div>
                        {s.keywords && <p className="text-[10px] text-gray-500 mt-0.5">{s.keywords}</p>}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Languages */}
              {resume.languages.length > 0 && (
                <section>
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em] border-b border-gray-300 pb-2 mb-4" style={{ color: settings.primaryColor }}>Languages</h3>
                  <div className="flex flex-col gap-1">
                    {resume.languages.map(l => (
                      <div key={l._id} className="flex justify-between text-[12px]">
                        <span className="font-semibold text-[#1a1a1a]">{l.language}</span>
                        <span className="text-gray-500">{l.fluency}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Interests */}
              {resume.interests.length > 0 && (
                <section>
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em] border-b border-gray-300 pb-2 mb-4" style={{ color: settings.primaryColor }}>Interests</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {resume.interests.map(i => (
                      <span key={i._id} className="bg-gray-100 text-[#1a1a1a] text-[10px] font-bold px-2 py-1 rounded">{i.name}</span>
                    ))}
                  </div>
                </section>
              )}

              {/* Awards */}
              {resume.awards.length > 0 && (
                <section>
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em] border-b border-gray-300 pb-2 mb-4" style={{ color: settings.primaryColor }}>Awards</h3>
                  <div className="flex flex-col gap-3">
                    {resume.awards.map(a => (
                      <div key={a._id}>
                        <h4 className="font-bold text-[12px] text-[#1a1a1a]">{a.title}</h4>
                        <p className="text-[11px] text-gray-500">{a.awarder} {a.date && `• ${a.date}`}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Certifications */}
              {resume.certifications.length > 0 && (
                <section>
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em] border-b border-gray-300 pb-2 mb-4" style={{ color: settings.primaryColor }}>Certifications</h3>
                  <div className="flex flex-col gap-2">
                    {resume.certifications.map(c => (
                      <div key={c._id}>
                        <h4 className="font-bold text-[12px] text-[#1a1a1a]">{c.name}</h4>
                        <p className="text-[11px] text-gray-500">{c.issuer} {c.date && `• ${c.date}`}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* References */}
              {resume.references.length > 0 && (
                <section>
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em] border-b border-gray-300 pb-2 mb-4" style={{ color: settings.primaryColor }}>References</h3>
                  <div className="flex flex-col gap-3">
                    {resume.references.map(r => (
                      <div key={r._id}>
                        <h4 className="font-bold text-[12px] text-[#1a1a1a]">{r.name}</h4>
                        <p className="text-[11px] text-gray-500">{r.relationship}</p>
                        {r.phone && <p className="text-[11px] text-gray-500">{r.phone}</p>}
                        {r.email && <p className="text-[11px] text-gray-500">{r.email}</p>}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Profiles */}
              {resume.profiles.length > 0 && (
                <section>
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em] border-b border-gray-300 pb-2 mb-4" style={{ color: settings.primaryColor }}>Profiles</h3>
                  <div className="flex flex-col gap-1">
                    {resume.profiles.map(p => (
                      <div key={p._id} className="text-[12px]">

                        <span className="font-semibold text-[#1a1a1a]">{p.network}: </span>
                        <span className="text-gray-600">{p.username}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  /* ═══════════════════════════════════════════════════════════
     RENDER — 5 COLUMN LAYOUT
     ═══════════════════════════════════════════════════════════ */
  const sectionLabel = SECTIONS.find(s => s.id === activeSection)?.label || '';
  const settingsLabel = SETTINGS_TABS.find(s => s.id === activeSettingsTab)?.label || '';

  return (
    <div className={`fixed inset-0 flex flex-col z-[100] transition-colors duration-300 ${isDark ? 'bg-[#0f1115] text-[#e2e8f0]' : 'bg-[#f8fafc] text-[#0f172a]'}`}>
      
      {/* ── Top Bar ── */}
      <header className={`h-12 border-b border-border/50 flex items-center justify-between px-4 z-[110] transition-colors ${isDark ? 'bg-[#0f1115]/80 backdrop-blur-md' : 'bg-white/80 backdrop-blur-md'}`}>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('/dashboard')}
            className={`p-1.5 rounded-md transition-all hover:scale-110 ${isDark ? 'hover:bg-white/5 text-text-muted hover:text-primary' : 'hover:bg-black/5 text-text-muted hover:text-primary'}`}
            title="Go to Dashboard"
          >
            <Home size={18} />
          </button>
          
          <div className="h-6 w-px bg-border/50 mx-1"></div>
          
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="text-[10px] uppercase tracking-wider font-bold text-text-muted whitespace-nowrap">Dashboard /</span>
            <span className="text-sm font-bold text-text-main truncate max-w-[200px]">
              {resume.basics.firstName ? `${resume.basics.firstName} ${resume.basics.lastName}` : 'Untitled Resume'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {lastSaved && (
            <span className="text-[10px] text-text-muted font-medium italic hidden md:block">
              Auto-saved at {lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          )}
          {saving ? (
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
              Saving
            </div>
          ) : (
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-[10px] font-bold uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
              Synced
            </div>
          )}
          <button 
             onClick={() => {
               setActiveSettingsTab('export');
               setRightPanelOpen(true);
             }}
             className="px-4 py-1.5 bg-primary hover:bg-primary/90 text-white text-xs font-bold rounded-lg transition-all shadow-lg shadow-primary/20 active:scale-95 ml-2"
          >
            Export
          </button>
        </div>
      </header>

      {/* ── Main Area ── */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* ── Column 1: Left Icon Nav (56px) ── */}
        <nav className={`w-14 min-w-[56px] border-r border-border/50 flex flex-col items-center py-4 gap-2 z-50 transition-colors ${isDark ? 'bg-[#161b22]' : 'bg-[#ffffff]'}`}>
          {SECTIONS.map((s) => {
            const Icon = s.icon;
            const isActive = activeSection === s.id && leftPanelOpen;
            return (
              <button
                key={s.id}
                onClick={() => {
                  if (activeSection === s.id) setLeftPanelOpen(!leftPanelOpen);
                  else {
                    setActiveSection(s.id);
                    setLeftPanelOpen(true);
                  }
                }}
                className={`relative p-2.5 rounded-xl transition-all group ${
                  isActive 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-text-muted hover:text-text-main hover:bg-surface'
                }`}
                title={s.label}
              >
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} className="transition-transform group-hover:scale-110" />
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-primary rounded-r-full shadow-[0_0_10px_var(--primary)]"></div>
                )}
                {/* Tooltip */}
                <div className="absolute left-full ml-2 px-2 py-1 bg-surface rounded text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-border/50 z-[1000] shadow-xl translate-x-1 group-hover:translate-x-0">
                  {s.label}
                </div>
              </button>
            );
          })}
        </nav>

        {/* ── Column 2: Editor Panel (420px) ── */}
        <div 
          className={`transition-all duration-300 ease-in-out border-r border-border/10 overflow-hidden z-40 shadow-2xl ${isDark ? 'bg-[#0f1115]' : 'bg-white'}`}
          style={{ width: leftPanelOpen ? '420px' : '0px' }}
        >
          <div className="w-[420px] h-full flex flex-col">
            <header className="p-6 pb-4 flex items-center justify-between border-b border-border/10">
              <div className="flex flex-col">
                <h2 className="text-sm font-black uppercase tracking-widest text-text-main">{sectionLabel}</h2>
                <p className="text-[10px] text-text-muted font-bold uppercase tracking-v-wide mt-1">Configure section data</p>
              </div>
              <button 
                onClick={() => setLeftPanelOpen(false)}
                className="p-1.5 rounded-lg hover:bg-surface/50 text-text-muted hover:text-text-main transition-colors"
              >
                <ChevronRight size={18} className="rotate-180" />
              </button>
            </header>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
              {renderEditorContent()}
            </div>
          </div>
        </div>

        {/* ── Column 3: Preview Canvas ── */}
        <main className={`flex-1 overflow-auto flex items-start justify-center p-12 relative scroll-smooth transition-colors ${isDark ? 'bg-[#1a1c20]' : 'bg-[#e2e8f0]'}`}>
          <div className="relative group">
            <ResumePreview />
          </div>
        </main>

        {/* ── Column 4: Right Settings Panel (320px) ── */}
        <div 
          className={`transition-all duration-300 ease-in-out border-l border-border/10 overflow-hidden z-40 shadow-2xl ${isDark ? 'bg-[#0f1115]' : 'bg-white'}`}
          style={{ width: rightPanelOpen ? '320px' : '0px' }}
        >
          <div className="w-[320px] h-full flex flex-col">
            <header className="p-6 pb-4 flex items-center justify-between border-b border-border/10">
              <div className="flex flex-col">
                <h2 className="text-sm font-black uppercase tracking-widest text-text-main text-right">{settingsLabel}</h2>
                <p className="text-[10px] text-text-muted font-bold uppercase tracking-v-wide mt-1 text-right">Customize your resume</p>
              </div>
              <button 
                onClick={() => setRightPanelOpen(false)}
                className="p-1.5 rounded-lg hover:bg-surface/50 text-text-muted hover:text-text-main transition-colors"
              >
                <ChevronRight size={18} />
              </button>
            </header>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
              {renderSettingsContent()}
            </div>
          </div>
        </div>

        {/* ── Column 5: Right Icon Nav (56px) ── */}
        <nav className={`w-14 min-w-[56px] border-l border-border/50 flex flex-col items-center py-4 gap-2 z-50 transition-colors ${isDark ? 'bg-[#161b22]' : 'bg-[#ffffff]'}`}>
          {SETTINGS_TABS.map((s) => {
            const Icon = s.icon;
            const isActive = activeSettingsTab === s.id && rightPanelOpen;
            return (
              <button
                key={s.id}
                onClick={() => {
                  if (activeSettingsTab === s.id) setRightPanelOpen(!rightPanelOpen);
                  else {
                    setActiveSettingsTab(s.id);
                    setRightPanelOpen(true);
                  }
                }}
                className={`relative p-2.5 rounded-xl transition-all group ${
                  isActive 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-text-muted hover:text-text-main hover:bg-surface'
                }`}
                title={s.label}
              >
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} className="transition-transform group-hover:scale-110" />
                {isActive && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-primary rounded-l-full shadow-[0_0_10px_var(--primary)]"></div>
                )}
                <div className="absolute right-full mr-2 px-2 py-1 bg-surface rounded text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-border/50 z-[1000] shadow-xl -translate-x-1 group-hover:translate-x-0">
                  {s.label}
                </div>
              </button>
            );
          })}
        </nav>

        {/* ── Floating Toolbar ── */}
        <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-1 border border-border rounded-full px-4 py-2 shadow-2xl z-[100] transition-all backdrop-blur-md ${isDark ? 'bg-[#161b22]/90' : 'bg-white/90'}`}>
          <button 
            onClick={handleUndo} 
            disabled={historyIndex <= 0}
            className="p-2 rounded-full hover:bg-surface/50 text-text-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <Undo2 size={16} />
          </button>
          <button 
            onClick={handleRedo} 
            disabled={historyIndex >= history.length - 1}
            className="p-2 rounded-full hover:bg-surface/50 text-text-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <Redo2 size={16} />
          </button>
          
          <div className="w-[1px] h-4 bg-border/50 mx-2"></div>
          
          <button onClick={() => setZoom(z => Math.max(30, z - 10))} className="p-2 rounded-full hover:bg-surface/50 text-text-muted">
            <ZoomOut size={16} />
          </button>
          <span className="text-[11px] font-black text-text-main w-10 text-center select-none">{zoom}%</span>
          <button onClick={() => setZoom(z => Math.min(150, z + 10))} className="p-2 rounded-full hover:bg-surface/50 text-text-muted">
            <ZoomIn size={16} />
          </button>
          
          <div className="w-[1px] h-4 bg-border/50 mx-2"></div>
          
          <button 
            onClick={() => setZoom(80)}
            className="p-2 rounded-full hover:bg-surface/50 text-text-muted"
            title="Reset Zoom"
          >
            <Maximize2 size={16} />
          </button>

          <div className="w-[1px] h-4 bg-border/50 mx-2"></div>

          <button 
            onClick={() => {
              setActiveSettingsTab('export');
              setRightPanelOpen(true);
            }}
            className="p-2 rounded-full hover:bg-surface/50 text-text-muted"
            title="Export"
          >
            <FileDown size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
