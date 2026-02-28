import { User, Mail, Bell, Shield, Key, CreditCard, ChevronRight, Save, Camera, Smartphone } from 'lucide-react';
import { useAuthStore } from '../../state/useAuthStore';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import toast from 'react-hot-toast';

const AccountSettings = () => {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile Info', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'billing', label: 'Billing', icon: CreditCard },
  ];

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 md:px-8">
      <div className="mb-12">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Account Settings</h1>
        <p className="text-slate-500 mt-2">Manage your personal information, security preferences, and notification settings.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sidebar Nav */}
        <aside className="lg:w-64 space-y-2">
            {tabs.map(tab => (
                <button 
                   key={tab.id}
                   onClick={() => setActiveTab(tab.id)}
                   className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl text-sm font-bold transition-all ${activeTab === tab.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                    <tab.icon size={18} />
                    {tab.label}
                </button>
            ))}
        </aside>

        {/* Form Area */}
        <main className="flex-1 bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
            {activeTab === 'profile' && (
                <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <div className="flex items-center gap-8 border-b border-slate-50 pb-10">
                        <div className="relative group">
                            <div className="w-24 h-24 bg-blue-50 rounded-[2rem] flex items-center justify-center border-4 border-white shadow-xl">
                                <User size={40} className="text-blue-600" />
                            </div>
                            <button className="absolute -bottom-2 -right-2 bg-slate-900 text-white p-2 rounded-xl shadow-lg hover:scale-110 transition-transform">
                                <Camera size={14} />
                            </button>
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900 text-lg">{user?.name || 'User'}</h3>
                            <p className="text-sm text-slate-400 capitalize">{user?.role} Account</p>
                            <div className="flex items-center gap-2 mt-2 px-3 py-1 bg-green-50 text-green-600 rounded-full text-[10px] font-bold uppercase tracking-widest w-fit">
                                <Shield size={12} /> Verified Member
                            </div>
                        </div>
                    </div>

                    <form className="grid md:grid-cols-2 gap-8">
                         <Input 
                            label="FULL NAME" 
                            defaultValue={user?.name} 
                            className="rounded-2xl bg-slate-50 border-slate-100 py-4 font-bold"
                            labelClassName="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1"
                         />
                         <Input 
                            label="EMAIL ADDRESS" 
                            defaultValue={user?.email} 
                            className="rounded-2xl bg-slate-50 border-slate-100 py-4 font-bold"
                            labelClassName="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1"
                         />
                         <Input 
                            label="PHONE NUMBER" 
                            icon={Smartphone}
                            placeholder="+251 ..." 
                            className="rounded-2xl bg-slate-50 border-slate-100 py-4 font-bold"
                            labelClassName="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1"
                         />
                         <Input 
                            label="USERNAME" 
                            placeholder="@username" 
                            className="rounded-2xl bg-slate-50 border-slate-100 py-4 font-bold"
                            labelClassName="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1"
                         />
                    </form>

                    <div className="pt-8 flex justify-end gap-3 border-t border-slate-50">
                        <Button variant="outline" className="px-8 rounded-xl font-bold">Discard</Button>
                        <Button onClick={() => toast.success('Profile updated!')} className="px-8 rounded-xl bg-slate-900 text-white font-bold flex items-center gap-2">
                            <Save size={18} /> Save Changes
                        </Button>
                    </div>
                </div>
            )}

            {activeTab === 'security' && (
                <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <div className="p-8 bg-blue-50 rounded-3xl border border-blue-100 flex items-start gap-4">
                        <Key className="text-blue-600 mt-1" size={20} />
                        <div>
                             <h4 className="font-bold text-blue-900 mb-1">Update Password</h4>
                             <p className="text-xs text-blue-600 leading-relaxed mb-6">Ensure your account is using a long, random password to stay secure.</p>
                             <div className="space-y-4 max-w-sm">
                                <Input type="password" placeholder="Current Password" className="rounded-xl border-blue-200 py-3" />
                                <Input type="password" placeholder="New Password" className="rounded-xl border-blue-200 py-3" />
                                <Button className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold">Update Password</Button>
                             </div>
                        </div>
                    </div>
                </div>
            )}
            
            {activeTab !== 'profile' && activeTab !== 'security' && (
                <div className="h-64 flex flex-col items-center justify-center text-center opacity-40 grayscale">
                    <Layers size={48} className="text-slate-200 mb-4" />
                    <p className="text-sm font-bold uppercase tracking-widest text-slate-400">Section Coming Soon</p>
                </div>
            )}
        </main>
      </div>
    </div>
  );
};

function Layers(props) {
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
      <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
      <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" />
      <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" />
    </svg>
  )
}

export default AccountSettings;
