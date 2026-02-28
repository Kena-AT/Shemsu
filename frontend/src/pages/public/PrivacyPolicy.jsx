import React from 'react';
import { Shield, Eye, Lock, Share2, UserCircle, Download, Printer } from 'lucide-react';

const PrivacyPolicy = () => {
  const sections = [
    { title: "Introduction", id: "intro", icon: Shield },
    { title: "Information We Collect", id: "collect", icon: Eye },
    { title: "How We Use Your Information", id: "use", icon: Lock },
    { title: "Data Security", id: "security", icon: Shield },
    { title: "Third-Party Sharing", id: "sharing", icon: Share2 },
    { title: "Your Privacy Rights", id: "rights", icon: UserCircle },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-20 pb-32">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 mb-8">
            Home <span className="text-slate-200">/</span> Legal <span className="text-slate-200">/</span> <span className="text-slate-900">Privacy Policy</span>
        </div>

        <div className="grid lg:grid-cols-4 gap-12">
            {/* Sidebar Navigation */}
            <div className="hidden lg:block space-y-8 sticky top-24 h-fit">
                <div>
                   <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 font-sans">On this page</h3>
                   <nav className="space-y-3">
                        {sections.map(section => (
                            <a 
                                key={section.id} 
                                href={`#${section.id}`}
                                className="flex items-center gap-3 text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors"
                            >
                                <section.icon size={16} className="opacity-40" />
                                {section.title}
                            </a>
                        ))}
                   </nav>
                </div>
                <div className="pt-8 border-t border-slate-200 flex flex-col gap-3">
                    <button className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-blue-600">
                        <Download size={14} /> Download PDF
                    </button>
                    <button className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-blue-600">
                        <Printer size={14} /> Print
                    </button>
                </div>
                <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                    <h4 className="text-xs font-bold text-blue-900 mb-2 uppercase tracking-widest leading-none">Need Help?</h4>
                    <p className="text-[11px] text-blue-600 leading-relaxed mb-4">If you have questions regarding our policy, our legal team is here to help.</p>
                    <button className="text-[10px] font-black uppercase tracking-tighter bg-blue-600 text-white px-4 py-2 rounded-lg">Contact Privacy Officer</button>
                </div>
            </div>

            {/* Content Area */}
            <div className="lg:col-span-3 bg-white p-10 md:p-16 rounded-[2.5rem] shadow-sm border border-slate-100">
                <div className="mb-12 border-b border-slate-50 pb-12">
                    <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tighter leading-none">Privacy Policy</h1>
                    <div className="text-xs font-bold uppercase tracking-widest text-slate-400">
                        Last Updated: October 24, 2023
                    </div>
                </div>

                <div className="prose prose-slate max-w-none space-y-12">
                    <section id="intro" className="space-y-4">
                        <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                            <span className="text-blue-600">1.</span> Introduction
                        </h2>
                        <p className="text-slate-600 leading-relaxed">
                            At Shemsu Marketplace, we are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy or our practices with regards to your personal information, please contact us at <span className="text-blue-600 font-bold">privacy@shemsu.com</span>.
                        </p>
                        <p className="text-slate-600 leading-relaxed italic">
                            When you visit our website shemsu.com, and use our services, you trust us with your personal information. We take your privacy very seriously. In this privacy notice, we describe our privacy policy. We seek to explain to you in the clearest way possible what information we collect, how we use it and what rights you have in relation to it.
                        </p>
                    </section>

                    <section id="collect" className="space-y-4 text-slate-600">
                        <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                            <span className="text-blue-600">2.</span> Information We Collect
                        </h2>
                        <p className="leading-relaxed">
                            We collect personal information that you voluntarily provide to us when registering at the Marketplace, expressing an interest in obtaining information about us or our products and services, when participating in activities on the Marketplace or otherwise contacting us.
                        </p>
                        <ul className="list-disc pl-6 space-y-3">
                            <li><strong>Personal Identification Information:</strong> Names; phone numbers; email addresses; mailing addresses; job titles; usernames; passwords; contact preferences; and other similar data.</li>
                            <li><strong>Payment Data:</strong> We collect data necessary to process your payment if you make purchases, such as your payment instrument number (such as a credit card number), and the security code associated with your payment instrument.</li>
                            <li><strong>Vendor Data:</strong> For multi-vendor accounts, we collect business registration details, tax identification, and settlement bank information.</li>
                            <li><strong>Device Data:</strong> We automatically collect certain information when you visit, use or navigate the Marketplace, such as IP address, browser and device characteristics.</li>
                        </ul>
                    </section>

                    <section id="use" className="space-y-4 text-slate-600">
                        <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                            <span className="text-blue-600">3.</span> How We Use Your Information
                        </h2>
                        <p className="leading-relaxed">
                            We use personal information collected via our Marketplace for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
                        </p>
                        <ul className="list-disc pl-6 space-y-3">
                            <li>To facilitate account creation and logon process.</li>
                            <li>To fulfill and manage your orders, payments, returns, and exchanges made through the Marketplace.</li>
                            <li>To post testimonials with your consent.</li>
                            <li>To deliver targeted advertising to you based on your shopping behavior.</li>
                            <li>To protect our Services and Marketplace from fraud and abuse.</li>
                        </ul>
                    </section>

                    <section id="security" className="space-y-4 text-slate-600">
                        <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                            <span className="text-blue-600">4.</span> Data Security
                        </h2>
                        <p className="leading-relaxed">
                            We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please also remember that we cannot guarantee that the internet itself is 100% secure.
                        </p>
                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex items-start gap-4">
                            <Lock className="text-blue-600 shrink-0" size={20} />
                            <div>
                                <h4 className="font-bold text-slate-900 text-sm mb-1 uppercase tracking-widest">Encryption Standards</h4>
                                <p className="text-xs text-slate-500 leading-relaxed">All sensitive data, including payment information, is encrypted using industry-standard SSL technology. We do not store full credit card details on our servers; these are managed by PCI-compliant third-party payment gateways.</p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
