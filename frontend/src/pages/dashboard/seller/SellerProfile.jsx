import React, { useState } from 'react';
import { User, Store, MapPin, Mail, Phone, Camera, Save, Shield } from 'lucide-react';
import { useAuthStore } from '../../../state/useAuthStore';
import Button from '../../../components/common/Button';
import Input from '../../../components/common/Input';
import toast from 'react-hot-toast';

const SellerProfile = () => {
  const { user } = useAuthStore();
  
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Store Profile</h1>
        <p className="text-slate-500 mt-2">View and manage your public store presence.</p>
      </div>

      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-8 md:p-12">
         {/* Store Header */}
         <div className="flex flex-col md:flex-row items-center gap-8 mb-12 pb-10 border-b border-slate-50">
             <div className="relative group shrink-0">
                 <div className="w-32 h-32 bg-blue-50 rounded-full flex items-center justify-center border-4 border-slate-50 shadow-xl overflow-hidden">
                     {user?.profilePicture ? (
                         <img src={user.profilePicture} alt={user?.fullName} className="w-full h-full object-cover" />
                     ) : (
                         <Store size={48} className="text-blue-600" />
                     )}
                 </div>
                 <button className="absolute bottom-0 right-0 bg-slate-900 text-white p-2.5 rounded-full shadow-lg hover:scale-110 transition-transform border-4 border-white">
                     <Camera size={16} />
                 </button>
             </div>
             
             <div className="text-center md:text-left">
                 <h2 className="text-2xl font-black text-slate-900 mb-1">{user?.fullName || 'Store Name'}</h2>
                 <p className="text-blue-600 font-bold mb-4">shemsu.com/store/{user?.fullName?.toLowerCase().replace(/\s+/g, '') || 'shop'}</p>
                 
                 <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                     <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                         <Store size={12} /> Seller Account
                     </span>
                     {user?.verificationStatus === 'approved' && (
                         <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                             <Shield size={12} /> Verified Merchant
                         </span>
                     )}
                 </div>
             </div>
         </div>

         {/* Store Details Form Idea */}
         <form className="grid md:grid-cols-2 gap-8">
             <div className="md:col-span-2">
                 <Input 
                    label="STORE NAME / FULL NAME" 
                    defaultValue={user?.fullName} 
                    className="rounded-2xl bg-slate-50 border-slate-100 py-4 font-bold"
                    labelClassName="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1"
                 />
             </div>
             <Input 
                label="CONTACT EMAIL" 
                defaultValue={user?.email} 
                icon={Mail}
                readOnly
                className="rounded-2xl bg-slate-50 border-slate-100 py-4 font-bold opacity-70 cursor-not-allowed"
                labelClassName="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1"
             />
             <Input 
                label="BUSINESS PHONE" 
                placeholder="+251 ..." 
                icon={Phone}
                className="rounded-2xl bg-slate-50 border-slate-100 py-4 font-bold"
                labelClassName="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1"
             />
             <div className="md:col-span-2">
                 <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 mb-2">Store Description</label>
                 <textarea 
                     rows="4"
                     className="w-full rounded-2xl bg-slate-50 border border-slate-100 py-4 px-4 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                     placeholder="Tell buyers about your store, what you sell, and your business history..."
                 ></textarea>
             </div>
         </form>

         <div className="mt-10 pt-8 flex justify-end gap-3 border-t border-slate-50">
             <Button variant="outline" className="px-8 rounded-xl font-bold">Discard</Button>
             <Button onClick={(e) => { e.preventDefault(); toast.success('Store profile updated!'); }} className="px-8 rounded-xl bg-slate-900 text-white font-bold flex items-center gap-2">
                 <Save size={18} /> Save Changes
             </Button>
         </div>
      </div>
    </div>
  );
};

export default SellerProfile;
