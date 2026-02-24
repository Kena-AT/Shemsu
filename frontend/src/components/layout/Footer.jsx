import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket, Globe, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';

const Footer = ({ showNewsletter = true, showCompany = true }) => {
  return (
    <footer className="bg-white border-t border-slate-100 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-1 lg:col-span-1 text-left">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-blue-600 p-1.5 rounded-lg flex items-center justify-center">
                <Rocket className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900 uppercase">Shemsu</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-8">
              A curated multi-vendor marketplace connecting refined shoppers with high-quality vendors globally. 
              Focused on trust, design, and seamless experience.
            </p>
            <div className="flex gap-4">
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

          {/* Marketplace */}
          <div className="text-left">
            <h4 className="font-bold text-slate-900 mb-6 uppercase text-xs tracking-widest">Marketplace</h4>
            <ul className="space-y-4">
              <li><Link to="/app/about" className="text-slate-500 text-sm hover:text-blue-600 transition-colors">About Us</Link></li>
              <li><Link to="/app/marketplace" className="text-slate-500 text-sm hover:text-blue-600 transition-colors">All Categories</Link></li>
              <li><Link to="/app/marketplace" className="text-slate-500 text-sm hover:text-blue-600 transition-colors">Trending Products</Link></li>
              <li><Link to="/app/marketplace" className="text-slate-500 text-sm hover:text-blue-600 transition-colors">Eco-friendly Initiative</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="text-left">
            <h4 className="font-bold text-slate-900 mb-6 uppercase text-xs tracking-widest">Support</h4>
            <ul className="space-y-4">
              <li><Link to="/app/help" className="text-slate-500 text-sm hover:text-blue-600 transition-colors">Help Center</Link></li>
              <li><Link to="/app/contact" className="text-slate-500 text-sm hover:text-blue-600 transition-colors">Contact Us</Link></li>
              <li><Link to="/app/terms" className="text-slate-500 text-sm hover:text-blue-600 transition-colors">Terms of Service</Link></li>
              <li><Link to="/app/privacy" className="text-slate-500 text-sm hover:text-blue-600 transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          {showNewsletter && (
            <div className="text-left">
              <h4 className="font-bold text-slate-900 mb-6 uppercase text-xs tracking-widest">Stay Updated</h4>
              <p className="text-slate-500 text-sm mb-4">Subscribe to get special offers and first look at new arrivals.</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Email address" 
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors">
                  Join
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-xs">© 2024 Shemsu Marketplace. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-slate-400 text-xs hover:text-slate-600">English (US)</a>
            <span className="text-slate-400 text-xs">ETB</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
