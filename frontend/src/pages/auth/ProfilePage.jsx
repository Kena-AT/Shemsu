import React from 'react';
import { User, Settings, ShoppingBag, CreditCard, MapPin, Bell, Shield, ChevronRight, Clock, Box } from 'lucide-react';
import { useAuthStore } from '../../state/useAuthStore';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const quickLinks = [
    { title: 'Account Settings', path: '/app/settings', icon: Settings, desc: 'Personal info, security, & notifications' },
    { title: 'My Orders', path: '/app/orders', icon: ShoppingBag, desc: 'Track, return, or buy things again' },
    { title: 'Payment Methods', path: '/app/settings', icon: CreditCard, desc: 'Manage your saved credit cards' },
    { title: 'Saved Addresses', path: '/app/settings', icon: MapPin, desc: 'Edit your shipping locations' },
  ];

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 md:px-8">
      {/* Header Profile Card */}
      <div className="bg-slate-900 rounded-[2.5rem] p-10 md:p-14 mb-10 relative overflow-hidden flex flex-col md:flex-row items-center gap-8 shadow-2xl">
         {/* Background Decoration */}
         <div className="absolute -right-20 -top-20 opacity-10">
            <User size={300} className="text-white" />
         </div>
         
         <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center border-4 border-white/20 backdrop-blur-sm z-10 shrink-0">
            {user?.profilePicture ? (
                <img src={user.profilePicture} alt={user?.fullName} className="w-full h-full rounded-full object-cover" />
            ) : (
                <User size={48} className="text-white" />
            )}
         </div>

         <div className="z-10 text-center md:text-left">
            <h1 className="text-4xl font-black text-white tracking-tight mb-2">Hello, {user?.fullName || 'User'}!</h1>
            <p className="text-blue-200 text-lg mb-4">{user?.email}</p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
               <span className="bg-white/20 px-4 py-1.5 rounded-full text-xs font-bold text-white uppercase tracking-widest backdrop-blur-md flex items-center gap-1.5">
                   <Shield size={14} /> {user?.role || 'Buyer'} Account
               </span>
               {user?.isVerified && (
                   <span className="bg-green-500/20 text-green-300 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest backdrop-blur-md flex items-center gap-1.5">
                       <Shield size={14} /> Verified Member
                   </span>
               )}
            </div>
         </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        {/* Left Column: Quick Actions */}
        <div className="lg:col-span-2 space-y-10">
            <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-6 tracking-tight">Your Account</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                    {quickLinks.map((link, i) => (
                        <button 
                            key={i} 
                            onClick={() => navigate(link.path)}
                            className="bg-white p-6 rounded-3xl border border-slate-100 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50 transition-all text-left group flex flex-col h-full"
                        >
                            <div className="w-12 h-12 bg-slate-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                                <link.icon size={24} />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-1">{link.title}</h3>
                            <p className="text-sm text-slate-500 leading-relaxed mb-4 flex-1">{link.desc}</p>
                            <div className="flex items-center gap-1 text-xs font-bold text-blue-600 uppercase tracking-widest mt-auto group-hover:translate-x-2 transition-transform">
                                Manage <ChevronRight size={14} />
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Recent Orders Preview */}
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8">
                <div className="flex items-center justify-between mb-8">
                   <h2 className="text-xl font-bold text-slate-900 tracking-tight">Recent Orders</h2>
                   <button onClick={() => navigate('/app/orders')} className="text-xs font-bold text-blue-600 uppercase tracking-widest hover:underline flex items-center gap-1">
                       View All <ChevronRight size={14} />
                   </button>
                </div>
                
                <div className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed border-slate-100 rounded-3xl bg-slate-50/50">
                    <Box size={48} className="text-slate-300 mb-4 animate-bounce" />
                    <p className="text-slate-500 font-medium mb-2">No recent orders found</p>
                    <p className="text-xs text-slate-400 max-w-xs mx-auto mb-6">Looks like you haven't placed any orders recently. Discover trending items in the marketplace.</p>
                    <button onClick={() => navigate('/app')} className="bg-slate-900 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-md hover:bg-slate-800 transition-colors">Start Shopping</button>
                </div>
            </div>
        </div>

        {/* Right Column: Mini Dashboard */}
        <div className="space-y-6">
            <div className="bg-blue-50 p-8 rounded-[2.5rem] border border-blue-100 relative overflow-hidden group">
                <Box size={100} className="absolute -right-4 -bottom-4 text-blue-500/10 group-hover:scale-110 transition-transform duration-700" />
                <h3 className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-2">Current Tier</h3>
                <div className="flex items-end gap-2 mb-6">
                    <span className="text-4xl font-black tracking-tighter text-blue-900">Bronze</span>
                    <span className="text-sm font-bold text-blue-600 pb-1">Shopper</span>
                </div>
                <div className="w-full bg-blue-200/50 h-2 rounded-full mb-3 overflow-hidden">
                    <div className="bg-blue-600 h-full w-1/4 rounded-full"></div>
                </div>
                <p className="text-xs text-blue-700 font-medium leading-relaxed">Spend ETB 5,000 more to unlock <strong className="font-extrabold text-blue-900">Silver Tier</strong> benefits including free shipping.</p>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                 <h3 className="font-bold text-slate-900 mb-6 uppercase text-xs tracking-widest flex items-center gap-2">
                    <Clock size={16} className="text-slate-400" /> Recent Activity
                 </h3>
                 <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                    {/* Activity Item */}
                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full border border-white bg-slate-200 text-slate-500 group-[.is-active]:bg-blue-600 mt-0.5 md:mx-auto shrink-0 shadow">
                           <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                        </div>
                        <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.5rem)] pl-4 md:pl-0 md:pr-4 text-left md:text-right">
                           <div className="text-xs font-bold text-slate-900">Account Created</div>
                           <div className="text-[10px] text-slate-400 font-medium">Welcome to Shemsu!</div>
                        </div>
                    </div>
                 </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
