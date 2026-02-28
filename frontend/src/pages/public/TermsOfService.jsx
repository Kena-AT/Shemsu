import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LifeBuoy, FileText, Shield, UserCheck, AlertCircle, Scale, Clock } from 'lucide-react';

const TermsOfService = () => {
  const navigate = useNavigate();

  const sections = [
    { title: "Acceptance of Terms", id: "acceptance", icon: LifeBuoy },
    { title: "Account Registration", id: "registration", icon: UserCheck },
    { title: "User Conduct", id: "conduct", icon: Shield },
    { title: "Multi-Vendor Rules", id: "vendors", icon: Scale },
    { title: "Intellectual Property", id: "ip", icon: FileText },
    { title: "Limitation of Liability", id: "liability", icon: AlertCircle },
    { title: "Governing Law", id: "law", icon: Clock },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-20 pb-32">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 mb-8">
            Legal <span className="text-slate-200">/</span> <span className="text-slate-900">Terms of Service</span>
        </div>

        <div className="grid lg:grid-cols-4 gap-12">
            {/* Table of Contents */}
            <div className="hidden lg:block space-y-8 sticky top-24 h-fit">
                <div>
                   <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6">Table of Contents</h3>
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
                <div className="pt-8 border-t border-slate-200">
                    <button className="flex items-center gap-2 text-xs font-bold text-blue-600 hover:underline">
                        <FileText size={14} /> Print for your records
                    </button>
                </div>
            </div>

            {/* Document Content */}
            <div className="lg:col-span-3 bg-white p-10 md:p-16 rounded-[2.5rem] shadow-sm border border-slate-100">
                <div className="mb-12 border-b border-slate-50 pb-12">
                    <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tighter leading-none">Terms of Service</h1>
                    <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest">
                        <span className="text-blue-600">v2.4 Final</span>
                        <span className="text-slate-300">Last Updated: October 24, 2023</span>
                    </div>
                </div>

                <div className="prose prose-slate max-w-none space-y-12">
                    <section id="acceptance" className="space-y-4">
                        <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                            <span className="text-blue-600">1.</span> Acceptance of Terms
                        </h2>
                        <p className="text-slate-600 leading-relaxed">
                            By accessing or using the Shemsu platform (“the Marketplace”), you agree to be bound by these Terms of Service. Shemsu provides a multi-vendor ecommerce environment connecting independent sellers (“Vendors”) with individual or commercial buyers (“Buyers”).
                        </p>
                        <p className="text-slate-600 leading-relaxed">
                            Please read these terms carefully. If you do not agree to all of these terms, you must not use our services. We reserve the right to modify these terms at any time. Your continued use of the platform after changes are posted constitutes your acceptance of the new terms.
                        </p>
                    </section>

                    <section id="registration" className="space-y-4">
                        <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                            <span className="text-blue-600">2.</span> Account Registration
                        </h2>
                        <p className="text-slate-600 leading-relaxed">
                            To access certain features of the Marketplace, you must register for an account. You agree to:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-slate-600">
                            <li>Provide accurate, current, and complete information during the registration process.</li>
                            <li>Maintain the security of your password and accept all risks of unauthorized access to your account.</li>
                            <li>Promptly notify Shemsu immediately if you discover or suspect any security breaches related to the service.</li>
                            <li>Not sell, transfer, or assign your account to any third party without written consent.</li>
                        </ul>
                    </section>

                    <section id="conduct" className="space-y-4">
                        <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                            <span className="text-blue-600">3.</span> User Conduct
                        </h2>
                        <p className="text-slate-600 leading-relaxed">
                            You are solely responsible for all activity that occurs under your account. You agree not to engage in any of the following prohibited activities:
                        </p>
                        <div className="grid md:grid-cols-2 gap-4 pt-2">
                            <div className="bg-slate-50 p-6 rounded-2xl">
                                <h4 className="font-bold text-slate-900 mb-2 text-sm uppercase tracking-widest">No Fraudulent Activity</h4>
                                <p className="text-xs text-slate-500 leading-relaxed">Attempting to manipulate prices or interfering with other users' listings.</p>
                            </div>
                            <div className="bg-slate-50 p-6 rounded-2xl">
                                <h4 className="font-bold text-slate-900 mb-2 text-sm uppercase tracking-widest">Respect Privacy</h4>
                                <p className="text-xs text-slate-500 leading-relaxed">Collecting or storing any personally identifiable information from other users without consent.</p>
                            </div>
                        </div>
                    </section>

                    <section id="vendors" className="space-y-4">
                        <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                            <span className="text-blue-600">4.</span> Multi-Vendor Rules
                        </h2>
                        <p className="text-slate-600 leading-relaxed">
                            Vendors on Shemsu are independent contractors and are not employees, agents, or partners of Shemsu. Vendors are responsible for:
                        </p>
                        <ul className="list-disc pl-6 space-y-3 text-slate-600">
                            <li><strong>Accuracy:</strong> Ensuring all product descriptions, images, and pricing are accurate and not misleading.</li>
                            <li><strong>Fulfillment:</strong> Managing shipping and delivery within the timelines specified on the product page.</li>
                            <li><strong>Taxes:</strong> Collecting and remitting any applicable sales taxes for transactions processed through the platform.</li>
                            <li><strong>Returns:</strong> Adhering to the platform-wide return policy unless a custom vendor policy is clearly stated and approved.</li>
                        </ul>
                    </section>

                    <div className="pt-12 border-t border-slate-50 text-center">
                        <h4 className="text-lg font-bold text-slate-900 mb-2">Still have questions?</h4>
                        <p className="text-slate-400 text-sm mb-8 px-10">Our legal and support teams are here to help you understand your rights.</p>
                        <div className="flex justify-center gap-3">
                            <button className="bg-blue-600 text-white font-bold px-8 py-3 rounded-xl hover:bg-blue-700 transition-colors text-sm" onClick={() => navigate("/contact")}>Contact Support</button>
                            <button className="bg-white border border-slate-200 text-slate-900 font-bold px-8 py-3 rounded-xl hover:bg-slate-50 transition-colors text-sm" onClick={() => navigate("/privacy")}>Privacy Policy</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
