import React, { useState } from 'react';
import { 
  Map, ExternalLink, Search, Code, Server, 
  Terminal, MonitorSmartphone, Database, Cpu, 
  ShieldCheck, Smartphone, Layers, Hexagon
} from 'lucide-react';

const ROLE_ROADMAPS = [
  { id: 'frontend', title: 'Frontend Developer', desc: 'Step by step guide to becoming a modern frontend developer.', icon: Code, link: 'https://roadmap.sh/frontend' },
  { id: 'backend', title: 'Backend Developer', desc: 'Step by step guide to becoming a modern backend developer.', icon: Server, link: 'https://roadmap.sh/backend' },
  { id: 'devops', title: 'DevOps', desc: 'Step by step guide for DevOps, SRE or any Operations role.', icon: Terminal, link: 'https://roadmap.sh/devops' },
  { id: 'fullstack', title: 'Full Stack Developer', desc: 'Step by step guide to becoming a Full Stack developer.', icon: Layers, link: 'https://roadmap.sh/full-stack' },
  { id: 'android', title: 'Android Developer', desc: 'Step by step guide to becoming an Android developer.', icon: Smartphone, link: 'https://roadmap.sh/android' },
  { id: 'ios', title: 'iOS Developer', desc: 'Step by step guide to becoming an iOS Developer.', icon: MonitorSmartphone, link: 'https://roadmap.sh/ios' },
  { id: 'postgresql', title: 'PostgreSQL DBA', desc: 'Step by step guide to becoming a PostgreSQL Database Administrator.', icon: Database, link: 'https://roadmap.sh/postgresql-dba' },
  { id: 'ai', title: 'AI Engineer', desc: 'Step by step roadmap for becoming an Artificial Intelligence Engineer.', icon: Cpu, link: 'https://roadmap.sh/ai-data-scientist' },
  { id: 'cybersecurity', title: 'Cyber Security', desc: 'Step by step guide to becoming a Cyber Security Expert.', icon: ShieldCheck, link: 'https://roadmap.sh/cyber-security' },
];

const SKILL_ROADMAPS = [
  { id: 'react', title: 'React', desc: 'Step by step guide to learning React in 2024.', icon: Hexagon, link: 'https://roadmap.sh/react' },
  { id: 'nodejs', title: 'Node.js', desc: 'Step by step guide to learning Node.js in 2024.', icon: Hexagon, link: 'https://roadmap.sh/nodejs' },
  { id: 'python', title: 'Python', desc: 'Step by step guide to learning Python in 2024.', icon: Hexagon, link: 'https://roadmap.sh/python' },
  { id: 'system-design', title: 'System Design', desc: 'Step by step guide to learning System Design Principles.', icon: Hexagon, link: 'https://roadmap.sh/system-design' },
  { id: 'graphql', title: 'GraphQL', desc: 'Step by step guide to learning GraphQL in 2024.', icon: Hexagon, link: 'https://roadmap.sh/graphql' },
  { id: 'typescript', title: 'TypeScript', desc: 'Step by step guide to learning TypeScript in 2024.', icon: Hexagon, link: 'https://roadmap.sh/typescript' },
  { id: 'docker', title: 'Docker', desc: 'Step by step guide to learning Docker in 2024.', icon: Hexagon, link: 'https://roadmap.sh/docker' },
  { id: 'kubernetes', title: 'Kubernetes', desc: 'Step by step guide to learning Kubernetes.', icon: Hexagon, link: 'https://roadmap.sh/kubernetes' },
];

export default function Roadmaps() {
  const [searchTerm, setSearchTerm] = useState('');

  const filterRoadmaps = (roadmaps) => {
    return roadmaps.filter(r => 
      r.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      r.desc.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredRoles = filterRoadmaps(ROLE_ROADMAPS);
  const filteredSkills = filterRoadmaps(SKILL_ROADMAPS);

  const RoadmapCard = ({ item }) => {
    const Icon = item.icon;
    return (
      <a 
        href={item.link} 
        target="_blank" 
        rel="noopener noreferrer"
        className="group bg-surface border border-border rounded-xl p-6 transition-all duration-300 hover:border-primary hover:shadow-[0_0_20px_rgba(79,70,229,0.15)] flex flex-col h-full relative overflow-hidden block outline-none focus:ring-2 focus:ring-primary focus:border-transparent cursor-pointer"
      >
        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -z-10 transition-transform duration-500 group-hover:scale-150"></div>
        
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 rounded-lg bg-background border border-border flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300 shadow-sm">
            <Icon size={24} strokeWidth={1.5} />
          </div>
          <ExternalLink size={18} className="text-text-muted group-hover:text-primary transition-colors" />
        </div>
        
        <h3 className="text-lg font-bold text-text-main mb-2 tracking-tight group-hover:text-primary transition-colors">{item.title}</h3>
        <p className="text-sm text-text-secondary leading-relaxed flex-1 font-medium">{item.desc}</p>
        
        <div className="mt-6 font-bold text-xs text-primary uppercase tracking-wider flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
          View Roadmap <ExternalLink size={12} />
        </div>
      </a>
    );
  };

  return (
    <div className="max-w-7xl mx-auto flex flex-col w-full text-text-main font-sans pb-16">
      
      {/* Header Area */}
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-primary font-bold mb-2">
            <Map size={20} />
            <span className="uppercase tracking-widest text-xs">Career Execution Paths</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight mb-2">Developer Roadmaps</h1>
          <p className="text-base text-text-secondary font-medium max-w-2xl">
            Powered by <a href="https://roadmap.sh" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">roadmap.sh</a>. Step by step guides and paths to learn different tools or technologies.
          </p>
        </div>

        {/* Search Filter */}
        <div className="relative w-full md:w-72">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input 
            type="text" 
            placeholder="Search roadmaps..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-surface border border-border rounded-xl py-3 pl-10 pr-4 text-sm font-medium outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-text-muted shadow-sm"
          />
        </div>
      </header>

      {/* Role-based Roadmaps */}
      {filteredRoles.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-bold tracking-tight mb-6 border-b border-border pb-2">Role Based Roadmaps</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredRoles.map(item => (
              <RoadmapCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      )}

      {/* Skill-based Roadmaps */}
      {filteredSkills.length > 0 && (
        <section>
          <h2 className="text-xl font-bold tracking-tight mb-6 border-b border-border pb-2">Skill Based Roadmaps</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
             {filteredSkills.map(item => (
              <RoadmapCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      )}

      {/* Empty State */}
      {filteredRoles.length === 0 && filteredSkills.length === 0 && (
        <div className="py-20 text-center flex flex-col items-center">
          <Map size={48} className="text-text-muted mb-4 opacity-50" />
          <h3 className="text-xl font-bold text-text-main mb-2">No roadmaps found</h3>
          <p className="text-sm font-medium text-text-secondary">Try adjusting your search term.</p>
        </div>
      )}

    </div>
  );
}
