import React from 'react';
import { Settings, Bell, Shield, Wallet, Globe, Lock, Save, Moon, Sun } from 'lucide-react';
import { useThemeStore } from '../../../state/useThemeStore';
import Button from '../../../components/common/Button';
import toast from 'react-hot-toast';

const SellerSettings = () => {
    const { theme, toggleTheme } = useThemeStore();

    const sections = [
        {
            title: "Store Preferences",
            icon: Globe,
            desc: "Regional settings and store visibility.",
            options: [
                { name: "Store Visibility", desc: "Make your store visible to the public.", type: "toggle", defaultChecked: true },
                { name: "Vacation Mode", desc: "Temporarily hide all your products.", type: "toggle", defaultChecked: false },
            ]
        },
        {
            title: "Notifications",
            icon: Bell,
            desc: "Manage how we alert you about orders and account updates.",
            options: [
                { name: "Order Alerts", desc: "Get instantly notified on new orders.", type: "toggle", defaultChecked: true },
                { name: "Marketing Emails", desc: "Receive tips to grow your store.", type: "toggle", defaultChecked: false },
            ]
        },
        {
            title: "Security",
            icon: Shield,
            desc: "Keep your account details safe.",
            options: [
                { name: "Two-Factor Authentication", desc: "Add an extra layer of security.", type: "button", buttonText: "Enable 2FA" },
                { name: "Change Password", desc: "Update your login credentials.", type: "button", buttonText: "Update" },
            ]
        }
    ];

    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Store Settings</h1>
                    <p className="text-slate-500 mt-2">Configure your seller account preferences.</p>
                </div>
            </div>

            <div className="space-y-8">
                {/* Global App Theme Toggle */}
                <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm flex items-center justify-between">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
                            {theme === 'dark' ? <Moon size={24} /> : <Sun size={24} />}
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-slate-900">App Theme</h3>
                            <p className="text-sm text-slate-500">Toggle the entire Shemsu interface between Light and Dark mode.</p>
                        </div>
                    </div>
                    <button 
                        type="button"
                        onClick={toggleTheme}
                        className="w-14 h-8 bg-slate-200 rounded-full relative p-1 transition-colors duration-300 shrink-0"
                        style={{ backgroundColor: theme === 'dark' ? '#2563eb' : '#e2e8f0' }}
                    >
                        <div 
                            className={`w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm transition-transform duration-300 ${theme === 'dark' ? 'translate-x-6' : 'translate-x-0'}`}
                        >
                            {theme === 'dark' ? <Moon size={14} className="text-blue-600" /> : <Sun size={14} className="text-amber-500" />}
                        </div>
                    </button>
                </div>

                {sections.map((section, i) => (
                    <div key={i} className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
                        <div className="flex items-center gap-4 border-b border-slate-50 pb-6 mb-6">
                            <div className="w-12 h-12 bg-slate-50 text-slate-700 rounded-2xl flex items-center justify-center">
                                <section.icon size={24} />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-slate-900">{section.title}</h2>
                                <p className="text-sm text-slate-500">{section.desc}</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {section.options.map((opt, j) => (
                                <div key={j} className="flex items-center justify-between px-2">
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-sm">{opt.name}</h4>
                                        <p className="text-xs text-slate-500 mt-1">{opt.desc}</p>
                                    </div>
                                    {opt.type === 'toggle' ? (
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" className="sr-only peer" defaultChecked={opt.defaultChecked} />
                                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                        </label>
                                    ) : (
                                        <Button variant="outline" className="text-xs font-bold rounded-lg px-4 py-1.5">{opt.buttonText}</Button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 flex justify-end">
                <Button onClick={() => toast.success('Settings saved!')} className="px-8 rounded-xl bg-slate-900 text-white font-bold flex items-center gap-2">
                    <Save size={18} /> Save All Preferences
                </Button>
            </div>
        </div>
    );
};

export default SellerSettings;
