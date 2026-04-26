import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Resources from './pages/Resources';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ResumeBuilder from './pages/ResumeBuilder';
import ResumeAnalyzer from './pages/ResumeAnalyzer';
import Roadmaps from './pages/Roadmaps';
import Dashboard from './pages/Dashboard';
import MyResumes from './pages/MyResumes';
import Settings from './pages/Settings';

function Layout() {
  return (
    <div className="flex h-screen w-full bg-background overflow-hidden border-border transition-colors">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-8 relative">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected: Resume Builder (standalone layout) */}
          <Route path="/builder" element={
            <ProtectedRoute>
              <ResumeBuilder />
            </ProtectedRoute>
          } />

          {/* Protected: Dashboard layout routes */}
          <Route element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/analyzer" element={<ResumeAnalyzer />} />
            <Route path="/resumes" element={<MyResumes />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/roadmaps" element={<Roadmaps />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
