import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Resources from './pages/Resources';
import Home from './pages/Home';
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
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/builder" element={<ResumeBuilder />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analyzer" element={<ResumeAnalyzer />} />
          <Route path="/resumes" element={<MyResumes />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/roadmaps" element={<Roadmaps />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
