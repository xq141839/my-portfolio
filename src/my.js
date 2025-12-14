import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Github, 
  Linkedin, 
  Mail, 
  MapPin, 
  ExternalLink, 
  Award, 
  Cpu, 
  Activity, 
  FileText, 
  Users, 
  ChevronRight,
  Menu,
  X,
  Globe,
  GraduationCap,
  Calendar
} from 'lucide-react';
import profilePic from './assets/profile.jpg'

// --- DATA CONFIGURATION (Replace with your own data) ---

const PROFILE = {
  name: "Qing Xu",
  title: "Ph.D. Candidate",
  university: "University of Nottingham",
  lab: "CVIP Lab",
  email: "san.zhang@example.edu",
  location: "Nottingham, UK",
  scholarUrl: "https://scholar.google.com/citations?user=IzA-Ij8AAAAJ&hl=zh-CN&authuser=3", // Google Scholar Link
  githubUrl: "https://github.com/xq141839", // GitHub Link
  twitterUrl: "#",
  // Updated: 'about' is now a JSX element to support links and formatting
  about: (
    <>
      I'm a Ph.D. Candidate in the School of Computer Science at University of Nottingham, supervised by <a href="https://research.nottingham.edu.cn/en/persons/xiangjian-he/" className="font-semibold text-indigo-600 hover:underline hover:text-indigo-800 transition-colors">Prof. Xiangjian He</a>. 
      Prior to that, I worked as a research assistant at the Chinese University of Hong Kong, supervised by <a href="https://scholar.google.com/citations?user=oVG2zEkAAAAJ&hl=zh-CN" className="font-semibold text-indigo-600 hover:underline hover:text-indigo-800 transition-colors">Prof. Zhen Chen</a>. I received the M.S. degree from The University of Hong Kong in 2023, the B.S. degree from University of Lincoln in 2019. 
      <br /><br />
      Currently, my research interests primarily lie in <b>Medical Image Analysis</b>, <b>Image Segmentation</b>, and the application of <b>Foundation Models</b> in clinical diagnosis.
    </>
  )
};

const EDUCATION = [
  {
    degree: "Ph.D. in Computer Science",
    university: "University of Nottingham",
    location: "Nottingham, UK & Ningbo, China",
    year: "2024 - Present",
    advisor: "Prof. Xiangjian He"
  },
  {
    degree: "M.S. in Computer Science",
    university: "The University of Hong Kong",
    location: "Hong Kong, China",
    year: "2022 - 2023",
    advisor: "Prof. Mentor Name"
  },
  {
    degree: "B.S. in Computer Science",
    university: "University of Lincoln",
    location: "Lincoln, UK",
    year: "2019 - 2021",
    gpa: "3.8/4.0 (First Class Honours)"
  }
];

const NEWS = [
  { id: 1, date: "Dec 2025", content: "Our latest work on Versatile Medical Segmentation was accepted by IEEE TMI.", tag: "Journal" },
  { id: 2, date: "Nov 2025", content: "Our latest work on Lightweight SAM was accepted by IEEE TCSVT.", tag: "Journal" },
  { id: 3, date: "July 2025", content: "Our latest work on 3D Vessel Segmentation was accepted by ACM TOMM**.", tag: "Journal" },
  { id: 4, date: "Jun 2025", content: "One paper accepted by MICCAI 2025.", tag: "Conference" },
  { id: 5, date: "May 2025", content: "Our latest work on Nuclei SAM was accepted by MedIA.", tag: "Journal" },
];

const PUBLICATIONS = [
  {
    id: 1,
    title: "Co-Seg++: Mutual Prompt-Guided Collaborative Learning for Versatile Medical Segmentation",
    authors: ["Qing Xu", "Yuxiang Luo", "Wenting Duan", "Zhen Chen^"],
    venue: "IEEE Transactions on Medical Imaging (TMI)",
    year: "2025",
    type: "Journal",
    highlight: true,
    links: { pdf: "https://ieeexplore.ieee.org/document/11299102", code: "https://github.com/xq141839/Co-Seg-Plus", project: "#" }
  },
  {
    id: 2,
    title: "De-LightSAM: Modality-Decoupled Lightweight SAM for Generalizable Medical Segmentation",
    authors: ["Qing Xu*", "Jiaxuan Li*", "Xiangjian He^", "Chenxin Li", "Fiseha Berhanu Tesema", "Wenting Duan", "Zhen Chen", "Rong Qu", "Jonathan M. Garibaldi", "Chang Wen Chen"], // * indicates equal contribution
    venue: "IEEE Transactions on Circuits and Systems for Video Technology (TCSVT)",
    year: "2025",
    type: "Journal",
    highlight: true,
    links: { pdf: "https://ieeexplore.ieee.org/abstract/document/11203003", code: "https://github.com/xq141839/De-LightSAM" }
  },
  {
    id: 3,
    title: "MambaVesselNet++: A Hybrid CNN-Mamba Architecture for Medical Image Segmentation",
    authors: ["Qing Xu", "Yanming Chen", "Yue Li", "Ziyu Liu", "Zhenye Lou", "Yixuan Zhang", "Huizhong Zheng", "Xiangjian He^"],
    venue: "TOMM",
    year: "2025",
    type: "Journal",
    highlight: true,
    links: { pdf: "https://dl.acm.org/doi/abs/10.1145/3757324", code: "https://github.com/CC0117/MambaVesselNet" }
  },
  {
    id: 4,
    title: "Co-Seg: Mutual Prompt-Guided Collaborative Learning for Tissue and Nuclei Segmentation",
    authors: ["Qing Xu", "Wenting Duan", "Zhen Chen"],
    venue: "MICCAI",
    year: "2025",
    type: "Conference",
    highlight: true,
    links: { pdf: "https://link.springer.com/chapter/10.1007/978-3-032-04927-8_13", code: "https://github.com/xq141839/Co-Seg" }
  },
  {
    id: 5,
    title: "UN-SAM: Domain-adaptive self-prompt segmentation for universal nuclei images",
    authors: ["Zhen Chen*", "Qing Xu*", "Xinyu Liu", "Yixuan Yuan^"],
    venue: "Medical Image Analysis (MedIA)",
    year: "2025",
    type: "Journal",
    highlight: true,
    links: { pdf: "https://www.sciencedirect.com/science/article/pii/S1361841525001549", code: "https://github.com/CUHK-AIM-Group/UN-SAM" }
  }
];

const SERVICES = [
  {
    category: "Journal Reviewer",
    items: ["JBHI", "TCSVT", "TMM"]
  },
  {
    category: "Conference Reviewer / PC Member",
    items: ["CVPR 2025-2026", "ISBI 2026", "ICCV 2025"]
  }
];

// --- COMPONENTS ---

const NavLink = ({ href, children, active, onClick }) => (
  <a
    href={href}
    onClick={(e) => {
      e.preventDefault();
      onClick();
    }}
    className={`px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-full cursor-pointer select-none
      ${active 
        ? "bg-indigo-600 text-white shadow-md" 
        : "text-slate-600 hover:text-indigo-600 hover:bg-indigo-50"
      }`}
  >
    {children}
  </a>
);

const SectionTitle = ({ children, icon: Icon }) => (
  <div className="flex items-center gap-3 mb-8 group">
    <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600 group-hover:scale-110 transition-transform duration-300">
      {Icon && <Icon size={24} />}
    </div>
    <h2 className="text-3xl font-bold text-slate-800 tracking-tight">{children}</h2>
  </div>
);

const Tag = ({ type }) => {
  const styles = {
    Journal: "bg-purple-100 text-purple-700 border-purple-200",
    Conference: "bg-blue-100 text-blue-700 border-blue-200",
    Talk: "bg-orange-100 text-orange-700 border-orange-200",
    Award: "bg-yellow-100 text-yellow-700 border-yellow-200",
    default: "bg-slate-100 text-slate-700 border-slate-200"
  };
  return (
    <span className={`px-2 py-1 text-xs font-semibold rounded-md border ${styles[type] || styles.default}`}>
      {type}
    </span>
  );
};

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [filter, setFilter] = useState('All'); // For publications

  // Scroll listener to update active nav link
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'education', 'news', 'publications', 'services'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Offset for sticky header
          if (rect.top >= -100 && rect.top <= 300) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      // Offset for sticky header
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setActiveSection(id);
      setIsMobileMenuOpen(false);
    }
  };

  const filteredPublications = filter === 'All' 
    ? PUBLICATIONS 
    : PUBLICATIONS.filter(p => p.type === filter);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-600 selection:bg-indigo-100 selection:text-indigo-700">
      
      {/* Top Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 z-50 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div 
              className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 cursor-pointer"
              onClick={() => scrollToSection('home')}
            >
              {PROFILE.name.split(' ')[0]} Lab
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-1">
              {['Home', 'Education', 'News', 'Publications', 'Services'].map((item) => (
                <NavLink 
                  key={item} 
                  href={`#${item.toLowerCase()}`}
                  active={activeSection === item.toLowerCase()}
                  onClick={() => scrollToSection(item.toLowerCase())}
                >
                  {item}
                </NavLink>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-slate-600 hover:text-indigo-600"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 absolute w-full px-4 py-4 shadow-lg animate-in slide-in-from-top-5">
            <div className="flex flex-col space-y-3">
              {['Home', 'Education', 'News', 'Publications', 'Services'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`text-left px-4 py-2 rounded-lg font-medium ${
                    activeSection === item.toLowerCase() 
                    ? 'bg-indigo-50 text-indigo-600' 
                    : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 space-y-24">

        {/* Home / Hero Section */}
        <section id="home" className="min-h-[80vh] flex flex-col justify-center animate-fade-in-up">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1 space-y-6 text-center md:text-left">
              <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
                <span className="text-indigo-600">{PROFILE.name}</span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-500 font-medium">
                {PROFILE.title}
              </p>
              <div className="flex items-center justify-center md:justify-start gap-2 text-slate-500">
                <MapPin size={18} />
                <span>{PROFILE.university}, {PROFILE.location}</span>
              </div>
              
              {/* UPDATED: Renders JSX 'about' content directly */}
              <div className="text-lg leading-relaxed text-slate-600 max-w-2xl">
                {PROFILE.about}
              </div>
              

              <div className="flex justify-center md:justify-start gap-4 pt-2">
                <a href={`mailto:${PROFILE.email}`} className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all hover:scale-105 shadow-lg shadow-slate-200">
                  <Mail size={18} />
                  Contact Me
                </a>
                <div className="flex gap-2">
                  <a href={PROFILE.scholarUrl} className="p-3 bg-white border border-slate-200 rounded-lg hover:border-indigo-300 hover:text-indigo-600 transition-colors shadow-sm">
                    <BookOpen size={20} />
                  </a>
                  <a href={PROFILE.githubUrl} className="p-3 bg-white border border-slate-200 rounded-lg hover:border-slate-400 hover:text-slate-900 transition-colors shadow-sm">
                    <Github size={20} />
                  </a>
                </div>
              </div>
            </div>
            
            {/* Decorative / Photo Area */}
            <div className="w-64 h-64 md:w-80 md:h-80 relative flex-shrink-0 group">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-3xl rotate-6 opacity-20 group-hover:rotate-12 transition-transform duration-500"></div>
              <div className="absolute inset-0 bg-white rounded-3xl border-2 border-indigo-50 flex items-center justify-center overflow-hidden shadow-2xl">
                {/* Image Placeholder */}
                <img src={profilePic}/>
              </div>
            </div>
          </div>
        </section>

        {/* Education Section (New) */}
        <section id="education" className="scroll-mt-24">
          <SectionTitle icon={GraduationCap}>Education</SectionTitle>
          <div className="relative border-l-2 border-slate-200 ml-3 pl-8 space-y-8">
            {EDUCATION.map((edu, idx) => (
              <div key={idx} className="relative group">
                 {/* Timeline Dot */}
                 <div className="absolute -left-[41px] top-1 w-5 h-5 bg-white border-2 border-indigo-400 rounded-full group-hover:bg-indigo-600 transition-colors duration-300"></div>
                 
                 <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                    <div>
                      <h3 className="text-lg font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                        {edu.university}
                      </h3>
                      <div className="text-base font-medium text-slate-700">{edu.degree}</div>
                      {edu.advisor && <div className="text-sm text-slate-500 mt-1">Advisor: {edu.advisor}</div>}
                      {edu.gpa && <div className="text-sm text-slate-500">GPA/Rank: {edu.gpa}</div>}
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm font-mono text-slate-500 bg-slate-50 px-2 py-1 rounded self-start mt-2 sm:mt-0">
                      <Calendar size={14} />
                      {edu.year}
                    </div>
                 </div>
              </div>
            ))}
          </div>
        </section>

        {/* News Section */}
        <section id="news" className="scroll-mt-24">
          <SectionTitle icon={Globe}>Latest News</SectionTitle>
          <div className="space-y-6 border-l-2 border-slate-200 ml-3 pl-8 relative">
            {NEWS.map((item, idx) => (
              <div key={item.id} className="relative group">
                {/* Timeline Dot */}
                <div className="absolute -left-[41px] top-1.5 w-5 h-5 bg-white border-2 border-indigo-400 rounded-full group-hover:bg-indigo-600 transition-colors duration-300"></div>
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-1">
                  <span className="font-mono text-sm text-slate-400 min-w-[80px]">{item.date}</span>
                  <Tag type={item.tag} />
                </div>
                <p className="text-slate-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: item.content }}></p>
              </div>
            ))}
          </div>
        </section>

        {/* Publications Section */}
        <section id="publications" className="scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <SectionTitle icon={FileText}>Publications</SectionTitle>
            
            {/* Filter Buttons */}
            <div className="flex gap-1 bg-slate-100 p-1 rounded-lg self-start">
              {['All', 'Journal', 'Conference'].map(type => (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                    filter === type 
                    ? 'bg-white text-indigo-600 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-6">
            {filteredPublications.map((pub) => (
              <div 
                key={pub.id} 
                className={`bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-lg hover:border-indigo-100 transition-all duration-300 group ${pub.highlight ? 'ring-1 ring-indigo-50 bg-indigo-50/10' : ''}`}
              >
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="text-lg font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                      {pub.title}
                    </h3>
                    {pub.highlight && (
                      <span className="flex-shrink-0 px-2 py-0.5 bg-red-50 text-red-600 text-xs font-bold rounded-full border border-red-100">
                        Selected
                      </span>
                    )}
                  </div>
                  
                  <div className="text-sm text-slate-600">
                    {pub.authors.map((author, i) => (
                      <span key={i} className={author.includes(PROFILE.name) ? "font-bold text-slate-900 border-b-2 border-indigo-200" : ""}>
                        {author}{i < pub.authors.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 text-sm font-medium mt-1">
                    <span className="text-indigo-700">{pub.venue}</span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-500">{pub.year}</span>
                  </div>

                  {pub.abstract && (
                    <p className="text-sm text-slate-500 mt-2 line-clamp-2 group-hover:line-clamp-none transition-all duration-500">
                      {pub.abstract}
                    </p>
                  )}

                  <div className="flex gap-3 mt-4 pt-4 border-t border-slate-50">
                    {pub.links.pdf && (
                      <a href={pub.links.pdf} className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-indigo-600 transition-colors">
                        <FileText size={14} /> PDF
                      </a>
                    )}
                    {pub.links.code && (
                      <a href={pub.links.code} className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-indigo-600 transition-colors">
                        <Github size={14} /> Code
                      </a>
                    )}
                    {pub.links.project && (
                      <a href={pub.links.project} className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-indigo-600 transition-colors">
                        <ExternalLink size={14} /> Project Page
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="scroll-mt-24 pb-12">
          <SectionTitle icon={Users}>Academic Services</SectionTitle>
          <div className="grid md:grid-cols-2 gap-6">
            {SERVICES.map((service, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <Award size={18} className="text-indigo-500" />
                  {service.category}
                </h3>
                <ul className="space-y-2">
                  {service.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                      <ChevronRight size={16} className="text-indigo-300 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} {PROFILE.name}. All rights reserved.
          </p>
          <p className="text-slate-400 text-xs mt-2">
            Built with React & Tailwind CSS. Hosted on GitHub Pages.
          </p>
        </div>
      </footer>
      
      {/* Animation Styles */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}