import { Mail, Phone, MapPin, Search, Send, MessageSquare, HelpCircle, FileText, ArrowRight } from 'lucide-react';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
           <div className="text-lg font-bold text-slate-900 flex items-center gap-2">
                Shemsu <span className="text-slate-300 font-light">|</span> <span className="text-sm text-slate-500 font-medium uppercase tracking-widest">Support</span>
           </div>
           <div className="flex items-center gap-4">
                <button className="text-xs font-bold text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-widest">Help Center</button>
                <Button variant="primary" className="rounded-full px-5 py-1.5 text-[10px] font-black uppercase tracking-widest">Sign In</Button>
           </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-left mb-16">
            <h1 className="text-4xl font-black mb-4 tracking-tighter text-blue-600">Get in Touch</h1>
            <p className="text-slate-500 max-w-xl">We're here to help. Whether you're a buyer looking for an order update or a seller needing technical assistance, our support team is ready to guide you.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2 bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
                <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <Input 
                            label="Full Name" 
                            placeholder="e.g. Alex Johnson" 
                            className="rounded-xl bg-slate-50 border-slate-100 py-3.5"
                        />
                        <Input 
                            label="Email Address" 
                            type="email" 
                            placeholder="alex@example.com" 
                            className="rounded-xl bg-slate-50 border-slate-100 py-3.5"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Inquiry Type</label>
                        <select className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all appearance-none">
                            <option>Select a topic</option>
                            <option>Order Support</option>
                            <option>Seller Verification</option>
                            <option>Business Partnership</option>
                            <option>Other</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Message</label>
                        <textarea rows={5} placeholder="How can we help you today?" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"></textarea>
                    </div>
                    <Button variant="primary" className="w-full sm:w-auto px-10 py-4 rounded-xl flex items-center justify-center gap-2 text-sm font-bold shadow-lg shadow-blue-100">
                        <Send size={18} /> Send Message
                    </Button>
                </form>
            </div>

            {/* Sidebar info */}
            <div className="space-y-8">
                <div className="bg-blue-600 p-8 rounded-[2.5rem] text-white">
                    <h3 className="font-bold text-xl mb-6">Direct Contact</h3>
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                                <Mail size={18} />
                            </div>
                            <div>
                                <p className="text-[10px] uppercase font-bold text-blue-200 tracking-widest">Email Us</p>
                                <p className="font-medium">support@shemsu.com</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                                <MessageSquare size={18} />
                            </div>
                            <div>
                                <p className="text-[10px] uppercase font-bold text-blue-200 tracking-widest">Support Hours</p>
                                <p className="font-medium">Mon - Fri: 9AM - 6PM EST</p>
                                <p className="font-medium">Sat: 10AM - 2PM EST</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                    <h3 className="font-bold text-slate-900 mb-6 uppercase text-xs tracking-widest">Frequent Help Topics</h3>
                    <div className="space-y-4">
                        {[
                            { title: "Becoming a seller", icon: ArrowRight },
                            { title: "Payment methods", icon: ArrowRight },
                            { title: "Refund policy", icon: ArrowRight }
                        ].map((item, i) => (
                           <button key={i} className="w-full flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors">
                                <span className="text-sm font-bold text-slate-700">{item.title}</span>
                                <item.icon size={16} className="text-slate-400" />
                           </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
