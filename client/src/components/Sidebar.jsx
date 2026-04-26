import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Logo from './Logo';
import {
  LayoutDashboard,
  FileText,
  Activity,
  BookOpen,
  Map,
  Settings,
  LogOut,
  User
} from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Resume Builder', path: '/resumes', icon: FileText },
  { label: 'Resume Analyzer', path: '/analyzer', icon: Activity },
  { label: 'Roadmaps', path: '/roadmaps', icon: Map },
  { label: 'Resources', path: '/resources', icon: BookOpen },
  { label: 'Settings', path: '/settings', icon: Settings },
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    navigate('/');
    await logout();
  };

  return (
    <aside className="w-[260px] min-w-[260px] bg-background h-full border-r border-border flex flex-col z-50 transition-colors duration-300">
      <div className="p-8 pb-10 flex items-center gap-3">
        <div className="w-9 h-9 flex items-center justify-center overflow-hidden rounded-lg bg-surface border border-border">
          <Logo className="w-6 h-6 text-primary" />
        </div>
        <h1 className="font-bold text-lg text-text-main tracking-tighter uppercase">CareerPilot</h1>
      </div>

      <nav className="flex-1 px-4 flex flex-col gap-2">
        <div className="flex-1 space-y-2">
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
            const Icon = item.icon;

            return (
              <Link
                key={item.label}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group relative
                  ${isActive
                    ? 'bg-surface text-primary shadow-sm'
                    : 'text-text-secondary hover:text-text-main hover:bg-surface/50'
                  }`}
              >
                <Icon size={18} strokeWidth={isActive ? 2.5 : 2} className="transition-transform group-hover:scale-110" />
                <span className="text-sm font-medium">{item.label}</span>

                {isActive && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-l-full shadow-[0_0_10px_var(--primary)]"></div>
                )}
              </Link>
            );
          })}
        </div>

        {/* User section */}
        <div className="border-t border-border pt-4 pb-2 space-y-2">
          {user && (
            <div className="flex items-center gap-3 px-4 py-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                <User size={16} strokeWidth={2.5} />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-text-main truncate">{user.name}</p>
                <p className="text-[10px] text-text-muted truncate">{user.email}</p>
              </div>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-text-secondary hover:text-red-500 hover:bg-red-500/5 transition-all duration-200 group cursor-pointer w-full"
          >
            <LogOut size={18} strokeWidth={2} className="transition-transform group-hover:scale-110" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </nav>
    </aside>
  );
}
