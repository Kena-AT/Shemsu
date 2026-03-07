import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket, Globe, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';

const Footer = ({ showCompany = true }) => {
  return (
    <footer className="bg-white border-t border-slate-100 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Changed grid items to center text and items */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 text-center">
          
          {/* Brand - Centered */}
          <div className="col-span-1 flex flex-col items-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <img src="/logo.png" alt="Shemsu Logo" className="h-8 w-auto mix-blend-multiply" />
              <span className="text-xl font-bold tracking-tight text-slate-900 uppercase">Shemsu</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-8 max-w-sm">
              A curated multi-vendor marketplace connecting refined shoppers with high-quality vendors globally. 
              Focused on trust, design, and seamless experience.
            </p>
            {/* Added justify-center for social icons */}
            <div className="flex justify-center gap-4">
              <a href="#" className="p-2 rounded-full bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all">
                <Globe className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Marketplace - Centered */}
          <div>
            <h4 className="font-bold text-slate-900 mb-6 uppercase text-xs tracking-widest">Marketplace</h4>
            <ul className="space-y-4">
              <li><Link to="/" className="text-slate-500 text-sm hover:text-blue-600 transition-colors">About Us</Link></li>
              <li><Link to="/app/marketplace" className="text-slate-500 text-sm hover:text-blue-600 transition-colors">All Categories</Link></li>
              <li><Link to="/app/marketplace" className="text-slate-500 text-sm hover:text-blue-600 transition-colors">Trending Products</Link></li>
            </ul>
          </div>

          {/* Support - Centered */}
          <div>
            <h4 className="font-bold text-slate-900 mb-6 uppercase text-xs tracking-widest">Support</h4>
            <ul className="space-y-4">
              <li><Link to="/app/contact" className="text-slate-500 text-sm hover:text-blue-600 transition-colors">Contact Us</Link></li>
              <li><Link to="/app/terms" className="text-slate-500 text-sm hover:text-blue-600 transition-colors">Terms of Service</Link></li>
              <li><Link to="/app/privacy" className="text-slate-500 text-sm hover:text-blue-600 transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar - Centered */}
        <div className="pt-8 border-t border-slate-100 flex flex-col items-center gap-4 text-center">
          <p className="text-slate-400 text-xs">© 2026 K.A.Y.E. All rights reserved.</p>
          <div className="flex justify-center gap-6">
            <a href="#" className="text-slate-400 text-xs hover:text-slate-600">English (US)</a>
            <span className="text-slate-400 text-xs">ETB</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
