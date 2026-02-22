import React from 'react';
import { PackageSearch, Users, ShieldCheck, History, Settings } from 'lucide-react';

const AdminPlaceholder = ({ title, icon: Icon }) => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
    <div className="w-20 h-20 bg-slate-900 border border-slate-800 rounded-3xl flex items-center justify-center text-slate-500 mb-6">
      <Icon size={40} />
    </div>
    <h2 className="text-2xl font-black text-white uppercase italic tracking-tight">{title}</h2>
    <p className="text-slate-500 mt-2 max-w-sm mx-auto">
      This module is under construction. Advanced platform controls for {title.toLowerCase()} will be available in the next release.
    </p>
  </div>
);

export const SellerVerification = () => <AdminPlaceholder title="Seller Verification" icon={ShieldCheck} />;
export const ProductModeration = () => <AdminPlaceholder title="Product Moderation" icon={PackageSearch} />;
export const AuditLogs = () => <AdminPlaceholder title="Audit Logs" icon={History} />;
export const SystemSettings = () => <AdminPlaceholder title="System Settings" icon={Settings} />;
