import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Rocket, ShieldCheck, ShoppingBag, ArrowRight, Star, Globe, Zap, Users } from 'lucide-react';
import Button from '../../components/common/Button';
import Footer from '../../components/layout/Footer';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar (Static version for Landing) */}
      <nav className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Shemsu Logo" className="h-9 w-auto mix-blend-multiply" />
          <span className="text-xl font-black tracking-tight text-slate-900 uppercase">Shemsu</span>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/login')} className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors">Login</button>
          <Button onClick={() => navigate('/signup')} variant="primary" className="rounded-full px-6 py-2 text-xs font-black uppercase tracking-widest">Sign Up</Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-bold uppercase tracking-widest">
                <ShieldCheck size={14} /> Trust-First Marketplace
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] tracking-tighter">
                Secure Marketplace for <span className="text-blue-600">Verified</span> Sellers & Buyers
              </h1>
              <p className="text-lg text-slate-500 leading-relaxed max-w-lg">
                Experience the future of e-commerce where trust is built-in. Shop with confidence from vetted merchants or grow your business on a platform that prioritizes security and simplicity.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  onClick={() => navigate('/login')} 
                  className="rounded-2xl px-8 py-4 bg-slate-900 text-white font-bold flex items-center justify-center gap-2 group"
                >
                  Start Shopping <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  onClick={() => navigate('/signup?role=seller')} 
                  variant="outline"
                  className="rounded-2xl px-8 py-4 font-bold"
                >
                  Become a Seller
                </Button>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <div className="bg-slate-50 rounded-[3rem] p-4 relative overflow-hidden aspect-square flex items-center justify-center">
                 <img 
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop" 
                    alt="Dashboard Preview" 
                    className="w-full h-full object-cover rounded-[2.5rem] shadow-2xl"
                 />
                 <div className="absolute top-10 right-10 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce shadow-blue-100">
                    <div className="w-10 h-10 bg-green-50 text-green-600 rounded-full flex items-center justify-center">
                        <Zap size={18} />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Identity Verified</p>
                        <p className="font-bold text-slate-900">Premium Seller</p>
                    </div>
                 </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Choose Shemsu?</h2>
          <p className="text-slate-500">We've built a foundation of trust to ensure that every interaction on our platform is safe, transparent, and efficient.</p>
        </div>
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8">
            {[
                { icon: ShieldCheck, title: "Secure Payments", desc: "Your transactions are protected by industry-leading encryption and advanced fraud prevention protocols." },
                { icon: Star, title: "Verified Merchants", desc: "Every seller undergoes a rigorous multi-step verification process to ensure quality and authenticity." },
               
            ].map((feature, i) => (
                <div key={i} className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                        <feature.icon size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-3">{feature.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{feature.desc}</p>
                </div>
            ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
