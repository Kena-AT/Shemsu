import React from 'react';
import { HelpCircle, Mail, MessageSquare, Phone, FileText, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/common/Button';

const SellerSupport = () => {
    const navigate = useNavigate();

    const faqs = [
        { q: "How do I get my store verified?", a: "Submit your business license and ID through the Verification tab. Processing takes 24-48 hours." },
        { q: "When do I get paid?", a: "Payouts are processed automatically every Tuesday for orders completed in the previous week." },
        { q: "How do I handle returns?", a: "Buyers have 7 days to request a return. You can manage and approve returns from the Orders tab." },
        { q: "Can I sell digital products?", a: "Currently, Shemsu only supports physical goods. Digital products will be supported in Q4." },
    ];

    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            <div className="mb-8">
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Seller Support</h1>
                <p className="text-slate-500 mt-2">Get help with your store, orders, and account.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
                <div className="bg-blue-600 text-white p-8 rounded-[2rem] shadow-lg shadow-blue-200 text-center flex flex-col items-center group">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <MessageSquare size={32} />
                    </div>
                    <h3 className="text-lg font-bold mb-2">Live Chat</h3>
                    <p className="text-blue-100 text-sm mb-6 flex-1">Chat instantly with our merchant success team.</p>
                    <Button className="w-full bg-white text-blue-600 font-bold rounded-xl py-3">Start Chat</Button>
                </div>

                <div className="bg-white border border-slate-100 p-8 rounded-[2rem] shadow-sm text-center flex flex-col items-center">
                    <div className="w-16 h-16 bg-slate-50 text-slate-600 rounded-2xl flex items-center justify-center mb-6">
                        <Mail size={32} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">Email Us</h3>
                    <p className="text-slate-500 text-sm mb-6 flex-1">Prefer email? Send us a detailed message.</p>
                    <div className="text-sm font-bold text-blue-600">merchants@shemsu.com</div>
                </div>

                <div className="bg-white border border-slate-100 p-8 rounded-[2rem] shadow-sm text-center flex flex-col items-center">
                    <div className="w-16 h-16 bg-slate-50 text-slate-600 rounded-2xl flex items-center justify-center mb-6">
                        <Phone size={32} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">Call Center</h3>
                    <p className="text-slate-500 text-sm mb-6 flex-1">Available Mon-Fri, 9AM to 6PM EAT.</p>
                    <div className="text-sm font-bold text-blue-600">+251 911 234 567</div>
                </div>
            </div>

            <div className="bg-white border border-slate-100 rounded-[2rem] shadow-sm p-8">
                <div className="flex items-center justify-between border-b border-slate-50 pb-6 mb-6">
                    <div>
                        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                            <HelpCircle size={24} className="text-blue-600" /> Frequently Asked Questions
                        </h2>
                    </div>
                    <button onClick={() => navigate('/app/docs')} className="text-xs font-bold text-blue-600 uppercase tracking-widest hover:underline flex items-center gap-1">
                        Read Docs <ChevronRight size={14} />
                    </button>
                </div>

                <div className="space-y-6">
                    {faqs.map((faq, i) => (
                        <div key={i} className="group">
                            <h4 className="font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{faq.q}</h4>
                            <p className="text-sm text-slate-500 leading-relaxed">{faq.a}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SellerSupport;
