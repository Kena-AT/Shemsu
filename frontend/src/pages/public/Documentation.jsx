import React from 'react';
import { BookOpen, Code, Layers, Server, ShieldCheck, Zap, Globe, Github, ExternalLink, ChevronRight, Play } from 'lucide-react';
import Button from '../../components/common/Button';

const Documentation = () => {
  const sidebarItems = [
    { title: "Introduction", icon: BookOpen },
    { title: "Quick Start", icon: Zap },
    { title: "Authentication", icon: ShieldCheck },
    { title: "Product Sync", icon: Layers },
    { title: "Order Flow", icon: ShoppingBag },
    { title: "API Reference", icon: Code },
    { title: "CLI Tools", icon: Server },
    { title: "Recent Updates", icon: Zap },
  ];

  function ShoppingBag(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
        <path d="M3 6h18" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <nav className="h-16 border-b border-slate-100 px-6 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Shemsu Logo" className="h-8 w-auto mix-blend-multiply" />
          <span className="font-bold text-slate-900 tracking-tight">Shemsu <span className="text-slate-400 font-medium">Docs</span></span>
        </div>
        
        <div className="flex-1 max-w-md mx-10 hidden md:block">
            <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="text" placeholder="Search documentation..." className="w-full bg-slate-50 border border-slate-200 rounded-full py-1.5 pl-9 pr-4 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/10" />
            </div>
        </div>

        <div className="flex items-center gap-4">
            <button className="text-xs font-bold text-slate-500 hover:text-slate-900">Sign In</button>
            <Button className="rounded-lg bg-slate-900 text-white px-4 py-1.5 text-xs font-bold flex items-center gap-2">
                <Github size={14} /> Github
            </Button>
        </div>
      </nav>

      <div className="max-w-[1400px] mx-auto flex">
        {/* Sidebar */}
        <aside className="w-64 border-r border-slate-50 h-[calc(110vh-64px)] overflow-y-auto p-8 sticky top-16 hidden lg:block no-scrollbar">
            <div className="space-y-8">
                <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6">Getting Started</h4>
                    <nav className="space-y-1">
                        {sidebarItems.slice(0, 2).map((item, i) => (
                            <button key={i} className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-bold transition-all ${i === 0 ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}>
                                <item.icon size={16} />
                                {item.title}
                            </button>
                        ))}
                    </nav>
                </div>

                <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6">Core Modules</h4>
                    <nav className="space-y-1">
                        {sidebarItems.slice(2, 5).map((item, i) => (
                            <button key={i} className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-bold text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-all">
                                <item.icon size={16} />
                                {item.title}
                            </button>
                        ))}
                    </nav>
                </div>

                <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6">Changelog</h4>
                    <nav className="space-y-1">
                        <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-bold text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-all">
                            <Zap size={16} />
                            Recent Updates
                        </button>
                    </nav>
                </div>
            </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 md:p-16 max-w-4xl">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                Docs <ChevronRight size={12} /> Documentation <ChevronRight size={12} /> <span className="text-slate-900">Introduction</span>
            </div>

            <h1 className="text-5xl font-black text-slate-900 mb-6 tracking-tighter leading-none">Introduction to Shemsu</h1>
            <p className="text-lg text-slate-500 mb-12 leading-relaxed">Build modern, high-performance multi-vendor marketplaces with the engine designed for developers.</p>

            <div className="space-y-12">
                <section className="space-y-6">
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight">What is Shemsu?</h2>
                    <p className="text-slate-600 leading-relaxed">Shemsu is an open-source, multi-vendor marketplace engine that handles the complexity of complex e-commerce ecosystems out of the box. From vendor onboarding and multi-warehouse inventory to sophisticated order routing and automated payouts, Shemsu provides the backbone for your next global commerce platform.</p>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 group hover:border-blue-200 transition-all">
                            <Zap className="text-blue-600 mb-4 group-hover:scale-110 transition-transform" />
                            <h4 className="font-bold text-slate-900 mb-2">Key Design Philosophy</h4>
                            <p className="text-xs text-slate-500 leading-relaxed">Shemsu is built with a “API-first” mentality. Every feature available in the dashboard is accessible via our RESTful and GraphQL APIs.</p>
                        </div>
                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 group hover:border-blue-200 transition-all">
                             <Layers className="text-blue-600 mb-4 group-hover:scale-110 transition-transform" />
                            <h4 className="font-bold text-slate-900 mb-2">Technical Architecture</h4>
                            <p className="text-xs text-slate-500 leading-relaxed">Shemsu leverages a modern, battle-tested stack to ensure maximum performance and scalability.</p>
                        </div>
                    </div>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Developer Experience</h2>
                    <p className="text-slate-600 leading-relaxed">Integrate Shemsu into your existing infrastructure using our typed schemas. Here is a simple example of defining a product vendor requirement using Zod.</p>
                    
                    <div className="relative group">
                        <pre className="bg-slate-900 rounded-2xl p-6 text-sm text-blue-100 font-mono overflow-x-auto shadow-2xl">
                            <code>{`import { z } from 'zod';

const VendorSchema = z.object({
  id: z.string().uuid(),
  businessName: z.string().min(2),
  taxId: z.string(),
  status: z.enum(['PENDING', 'ACTIVE', 'SUSPENDED']),
  settings: z.object({
    autoApprove: z.boolean().default(true),
    commissionRate: z.number().max(100)
  })
});

// Use this schema to validate incoming vendor applications
export type Vendor = z.infer<typeof VendorSchema>;`}</code>
                        </pre>
                        <button className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white p-2 rounded-lg transition-all backdrop-blur-sm">
                            <Code size={16} />
                        </button>
                    </div>
                </section>
            </div>
        </main>

        {/* Right Sidebar - On this page */}
        <aside className="w-64 p-8 sticky top-16 h-fit hidden xl:block">
             <div className="space-y-8">
                <div>
                   <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6">On this page</h3>
                   <nav className="space-y-3">
                        {['What is Shemsu?', 'Technical Architecture', 'Core Modules', 'Developer Experience', 'Next Steps'].map(item => (
                            <a key={item} href="#" className="block text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors">{item}</a>
                        ))}
                   </nav>
                </div>
                <div className="bg-blue-600 p-6 rounded-2xl text-white shadow-lg shadow-blue-100">
                    <h4 className="font-bold mb-2">Need help?</h4>
                    <p className="text-[10px] text-blue-100 leading-relaxed mb-4">Join our Discord community or reach out to our team.</p>
                    <button className="w-full bg-white text-blue-600 py-2 rounded-lg text-xs font-bold">Join Discord</button>
                </div>
            </div>
        </aside>
      </div>
    </div>
  );
};



function Search(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}

export default Documentation;
