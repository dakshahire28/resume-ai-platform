import { useState } from 'react';
import { 
  Search, 
  Code, 
  TerminalSquare, 
  Briefcase, 
  FileText, 
  MonitorPlay, 
  Cpu,
  Target,
  BookOpen,
  LayoutTemplate,
  Wrench,
  Video,
  Star
} from 'lucide-react';

const CATEGORY_NAMES = ['All', 'DSA', 'Interview', 'Resume', 'Web Dev', 'AI/ML', 'Career'];

const TYPES = ['All', 'Course', 'Practice', 'Guide', 'Tool', 'Article', 'Template', 'Video'];

const MOCK_RESOURCES = [
  {
    id: 1,
    title: "Striver's A2Z DSA Sheet",
    description: "The most comprehensive DSA roadmap. 455 problems organized topic-wise from basics to advanced.",
    category: "DSA",
    type: "Article",
    price: "Free",
    rating: 5,
    icon: Code,
    url: "https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/"
  },
  {
    id: 2,
    title: "NeetCode 150",
    description: "Curated 150 LeetCode problems that cover every pattern needed to ace FAANG interviews.",
    category: "DSA",
    type: "Practice",
    price: "Free",
    rating: 5,
    icon: Code,
    url: "https://neetcode.io/"
  },
  {
    id: 3,
    title: "LeetCode Patterns",
    description: "Learn the 14 coding patterns (sliding window, two pointers, BFS/DFS etc.) that solve 80% of problems.",
    category: "DSA",
    type: "Practice",
    price: "Free",
    rating: 4,
    icon: Code,
    url: "https://seanprashad.com/leetcode-patterns/"
  },
  {
    id: 4,
    title: "CS50x — Harvard",
    description: "Harvard's legendary intro to computer science. Best foundations course on the internet.",
    category: "DSA",
    type: "Course",
    price: "Free",
    rating: 5,
    icon: Code,
    url: "https://cs50.harvard.edu/x/"
  },
  {
    id: 5,
    title: "Visualgo",
    description: "Visualize data structures and algorithms step by step. Great for understanding before coding.",
    category: "DSA",
    type: "Tool",
    price: "Free",
    rating: 4,
    icon: Code,
    url: "https://visualgo.net/"
  },
  {
    id: 6,
    title: "Tech Interview Handbook",
    description: "End-to-end guide for software engineering interviews — resume, coding, system design, behavioral.",
    category: "Interview",
    type: "Guide",
    price: "Free",
    rating: 5,
    icon: Briefcase,
    url: "https://www.techinterviewhandbook.org/"
  },
  {
    id: 7,
    title: "interviewing.io",
    description: "Anonymous mock interviews with engineers from Google, Facebook, Amazon. See how you compare.",
    category: "Interview",
    type: "Tool",
    price: "Paid",
    rating: 5,
    icon: Briefcase,
    url: "https://interviewing.io/"
  },
  {
    id: 8,
    title: "Jake's Resume Template",
    description: "The most popular LaTeX resume template used by students who got into FAANG. Clean, ATS-friendly.",
    category: "Resume",
    type: "Template",
    price: "Free",
    rating: 5,
    icon: FileText,
    url: "https://www.overleaf.com/latex/templates/jakes-resume/syzfjbzwjncs"
  },
  {
    id: 9,
    title: "Resumeworded",
    description: "AI-powered resume scorer. Get instant feedback on ATS compatibility and keyword optimization.",
    category: "Resume",
    type: "Tool",
    price: "Paid",
    rating: 4,
    icon: FileText,
    url: "https://resumeworded.com/"
  },
  {
    id: 10,
    title: "The Odin Project",
    description: "Full-stack web development curriculum. Free, open source, project-based. From zero to job-ready.",
    category: "Web Dev",
    type: "Course",
    price: "Free",
    rating: 5,
    icon: TerminalSquare,
    url: "https://www.theodinproject.com/"
  },
  {
    id: 11,
    title: "Machine Learning Specialization",
    description: "Andrew Ng's legendary ML course. The absolute best starting point for AI/ML foundations.",
    category: "AI/ML",
    type: "Course",
    price: "Free",
    rating: 5,
    icon: Cpu,
    url: "https://www.coursera.org/specializations/machine-learning-introduction"
  },
  {
    id: 12,
    title: "Build Your Own X",
    description: "Master programming by recreating your favorite technologies from scratch. Build a database, OS, or web server.",
    category: "Web Dev",
    type: "Guide",
    price: "Free",
    rating: 5,
    icon: Code,
    url: "https://github.com/codecrafters-io/build-your-own-x"
  },
  {
    id: 13,
    title: "Free Programming Books",
    description: "A massively popular GitHub repository containing thousands of free programming books across all languages.",
    category: "Career",
    type: "Article",
    price: "Free",
    rating: 5,
    icon: BookOpen,
    url: "https://github.com/EbookFoundation/free-programming-books"
  },
  {
    id: 14,
    title: "System Design Primer",
    description: "Learn how to design large-scale systems. The ultimate prep for the system design interview.",
    category: "Interview",
    type: "Guide",
    price: "Free",
    rating: 5,
    icon: Code,
    url: "https://github.com/donnemartin/system-design-primer"
  },
  {
    id: 15,
    title: "freeCodeCamp",
    description: "Learn to code for free. Earn certifications in Responsive Web Design, JavaScript, and more.",
    category: "Web Dev",
    type: "Course",
    price: "Free",
    rating: 5,
    icon: TerminalSquare,
    url: "https://www.freecodecamp.org/"
  }
];

const CATEGORIES = CATEGORY_NAMES.map(id => ({
  id,
  count: id === 'All' ? MOCK_RESOURCES.length : MOCK_RESOURCES.filter(r => r.category === id).length
}));

export default function Resources() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeType, setActiveType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [freeOnly, setFreeOnly] = useState(false);

  // Filter Logic
  const filteredResources = MOCK_RESOURCES.filter(resource => {
    const matchesCat = activeCategory === 'All' || resource.category === activeCategory;
    const matchesType = activeType === 'All' || resource.type === activeType;
    const matchesFree = !freeOnly || resource.price === 'Free';
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesType && matchesFree && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-8 pb-12">
      
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-text-main mb-2 tracking-tight uppercase" style={{ fontFamily: 'monospace, sans-serif' }}>Resources</h1>
          <p className="text-text-secondary text-sm">Curated links for DSA, interview prep, resume building and more</p>
        </div>
        <div className="flex items-center gap-6 text-center">
          <div>
            <span className="block text-2xl font-black text-primary tracking-tighter">{MOCK_RESOURCES.length}</span>
            <span className="text-xs font-semibold text-text-secondary uppercase">Resources</span>
          </div>
          <div>
            <span className="block text-2xl font-black text-success tracking-tighter">{MOCK_RESOURCES.filter(r => r.price === 'Free').length}</span>
            <span className="text-xs font-semibold text-text-secondary uppercase">Free</span>
          </div>
          <div>
            <span className="block text-2xl font-black text-yellow-500 tracking-tighter">{filteredResources.length}</span>
            <span className="text-xs font-semibold text-text-secondary uppercase">Showing</span>
          </div>
        </div>
      </section>

      {/* Interactive Filters */}
      <section className="bg-surface border border-border rounded-xl p-5 shadow-sm space-y-4">
        
        {/* Search & Toggle Row */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
           <div className="relative flex-1 w-full max-w-3xl">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
             <input 
                type="text" 
                placeholder="Search resources..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-background border border-border rounded-lg py-2.5 pl-10 pr-4 text-sm outline-none focus:border-primary/50 text-text-main placeholder:text-text-muted shadow-inner"
             />
           </div>
           <label className="flex items-center gap-2 text-sm font-medium text-text-secondary cursor-pointer">
             <input 
               type="checkbox" 
               checked={freeOnly}
               onChange={() => setFreeOnly(!freeOnly)}
               className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary bg-background border-border"
             />
             Free Only
           </label>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-4 border-t border-border pt-4 overflow-x-auto pb-1">
          <span className="text-xs font-semibold text-text-muted uppercase min-w-[70px]">Category:</span>
          <div className="flex items-center gap-2">
            {CATEGORIES.map(cat => (
              <button 
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors outline-none
                  ${activeCategory === cat.id 
                    ? 'bg-primary/10 text-primary border border-primary/20' 
                    : 'bg-background hover:bg-border/50 text-text-secondary border border-border'}`}
              >
                {cat.id !== 'All' && <BookOpen size={12} />}
                {cat.id}
                <span className="opacity-60">{cat.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Type Pills */}
        <div className="flex items-center gap-4 pt-1 overflow-x-auto">
          <span className="text-xs font-semibold text-text-muted uppercase min-w-[70px]">Type:</span>
          <div className="flex items-center gap-2">
            {TYPES.map(type => (
              <button 
                key={type}
                onClick={() => setActiveType(type)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors outline-none
                  ${activeType === type 
                    ? 'bg-primary/20 text-primary border border-primary/30' 
                    : 'bg-background hover:bg-border/50 text-text-secondary border border-border'}`}
              >
                {type === 'All' && <LayoutTemplate size={12} />}
                {type === 'Course' && <MonitorPlay size={12} />}
                {type === 'Practice' && <TerminalSquare size={12} />}
                {type === 'Guide' && <FileText size={12} />}
                {type === 'Tool' && <Wrench size={12} />}
                {type === 'Article' && <BookOpen size={12} />}
                {type === 'Template' && <LayoutTemplate size={12} />}
                {type === 'Video' && <Video size={12} />}
                {type !== 'All' && type}
              </button>
            ))}
          </div>
        </div>

      </section>

      {/* Resources List Deck */}
      <section className="flex flex-col gap-3">
        {filteredResources.length === 0 ? (
          <div className="text-center py-20 text-text-muted">
             <Target size={48} className="mx-auto mb-4 opacity-20" />
             <p>No resources found matching your criteria.</p>
          </div>
        ) : (
          filteredResources.map((res) => {
            const Icon = res.icon;
            return (
              <a 
                href={res.url} 
                target="_blank" 
                rel="noopener noreferrer"
                key={res.id} 
                className="bg-surface hover:bg-black/5 dark:hover:bg-white/5 border border-border rounded-xl p-5 shadow-sm transition-colors group flex flex-col md:flex-row md:items-center gap-5 cursor-pointer outline-none focus:ring-2 focus:ring-primary/40 block"
              >
                
                {/* Left Icon Box */}
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center flex-shrink-0 border border-primary/20">
                  <Icon size={20} />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-base font-bold text-text-main mb-1 truncate group-hover:text-primary transition-colors">{res.title}</h3>
                  <p className="text-sm text-text-secondary line-clamp-1 mb-3">{res.description}</p>
                  
                  {/* Badges Row */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="flex items-center gap-1 bg-background border border-border text-text-secondary px-2 py-0.5 rounded text-xs font-semibold">
                      <LayoutTemplate size={10} />
                      {res.type}
                    </span>
                    <span className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded text-xs font-bold">
                      {res.category}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-xs font-bold border ${res.price === 'Free' ? 'bg-success-bg text-success-text border-success-bg' : 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20'}`}>
                      {res.price}
                    </span>
                    <div className="flex items-center gap-0.5 text-yellow-500 ml-2">
                       {[...Array(5)].map((_, i) => (
                         <Star key={i} size={12} fill={i < res.rating ? "currentColor" : "none"} className={i >= res.rating ? "text-text-muted opacity-30" : ""} />
                       ))}
                    </div>
                  </div>
                </div>

                {/* Right Arrow/Link Indicator */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 text-text-muted mr-2 hidden md:block">
                  <Target size={20} />
                </div>
              </a>
            );
          })
        )}
      </section>

    </div>
  );
}
