import React, { useState } from 'react';
import { 
  Globe, 
  Mail, 
  Lock, 
  BellRing, 
  Database, 
  Share2, 
  Save, 
  RotateCcw,
  CheckCircle,
  AlertTriangle,
  Info
} from 'lucide-react';
import { useAdmin } from '../../../hooks/useAdmin';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

const SystemSettings = () => {
  const { useGetSettings, updateSettings } = useAdmin();
  const { data: settings, isLoading } = useGetSettings();
  const [formData, setFormData] = useState(null);

  // Initialize form data when settings are loaded
  React.useEffect(() => {
    if (settings) {
      setFormData(settings);
    }
  }, [settings]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const reason = window.prompt('Please provide a reason for these system-wide configuration changes:');
    if (!reason) return;

    updateSettings.mutate({ settings: formData, reason }, {
      onSuccess: () => toast.success('Platform configuration updated and logged successfully.'),
      onError: (err) => toast.error(err.response?.data?.message || 'Update failed')
    });
  };

  const toggleNotification = (key) => {
    setFormData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key]
      }
    }));
  };

  if (isLoading || !formData) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">System Configuration</h1>
          <p className="text-slate-500 text-sm mt-1">Manage your multi-vendor marketplace core features and localization.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setFormData(settings)}
            className="px-4 py-2 text-sm font-bold text-slate-500 hover:text-slate-700 transition-colors uppercase tracking-widest"
          >
            Discard
          </button>
          <button 
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl text-sm font-bold transition-all shadow-sm shadow-blue-200 flex items-center gap-2 uppercase tracking-widest"
          >
            <Save className="w-4 h-4" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* General Information */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
            <Globe className="w-5 h-5 text-blue-600" />
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">General Information</h3>
          </div>
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">Platform Name</label>
                <input 
                  type="text" 
                  value={formData.platformName || ''}
                  onChange={(e) => setFormData({ ...formData, platformName: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">Time Zone</label>
                <select 
                  value={formData.timezone || ''}
                  onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all font-bold text-slate-600"
                >
                  <option value="UTC">(GMT+00:00) UTC</option>
                  <option value="EAT">(GMT+03:00) East Africa Time</option>
                  <option value="EST">(GMT-05:00) Eastern Time</option>
                </select>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">Support Email</label>
                <input 
                  type="email" 
                  value={formData.supportEmail || ''}
                  onChange={(e) => setFormData({ ...formData, supportEmail: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">Platform Status</label>
                <div className="flex items-center gap-4 p-2 bg-slate-50 rounded-xl border border-slate-100">
                   <div className={`w-3 h-3 rounded-full ${formData.maintenanceMode ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`}></div>
                   <span className="text-xs font-bold text-slate-700 uppercase tracking-widest">
                     {formData.maintenanceMode ? 'Maintenance Mode Active' : 'Marketplace Operational'}
                   </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Financial Settings */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-blue-600" />
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Financial & Commissions</h3>
          </div>
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">Base Commission Rate (%)</label>
              <div className="relative group">
                <input 
                  type="number" 
                  value={formData.commissionRate || 0}
                  onChange={(e) => setFormData({ ...formData, commissionRate: parseFloat(e.target.value) })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all font-bold text-slate-900"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">%</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-2 font-medium">Applied to all transactions by default unless overridden at seller level.</p>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">Minimum Payout Threshold</label>
              <div className="relative group">
                <input 
                  type="number" 
                  value={formData.minPayout || 0}
                  onChange={(e) => setFormData({ ...formData, minPayout: parseFloat(e.target.value) })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all font-bold text-slate-900"
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">Br</span>
              </div>
            </div>
          </div>
        </section>

        {/* Global Notifications */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
            <BellRing className="w-5 h-5 text-blue-600" />
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Communication & Notifications</h3>
          </div>
          <div className="p-8 space-y-6">
            {[
              { id: 'newVendorAlert', label: 'New Vendor Registration', desc: 'Alert administrative team on every new seller application.' },
              { id: 'flaggedProductAlert', label: 'Safety Moderation Alerts', desc: 'Immediate notification when a listing is flagged for review.' },
              { id: 'lowStockWarning', label: 'Global Stock Warnings', desc: 'Notify inventory managers when products hit critical stock levels.' },
            ].map((item) => (
              <div key={item.id} className="flex items-center justify-between group">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{item.label}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                </div>
                <button 
                  onClick={() => toggleNotification(item.id)}
                  className={`w-12 h-6 rounded-full relative p-1 transition-all duration-300 ${formData.notifications?.[item.id] ? 'bg-blue-600' : 'bg-slate-200'}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full shadow-md transition-transform duration-300 ${formData.notifications?.[item.id] ? 'translate-x-6' : 'translate-x-0'}`} />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Maintenance / Security Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
                <Lock className="w-5 h-5 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Access Controls</h3>
              </div>
              <div className="p-8 space-y-6">
                 <div>
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-1">Max Login Attempts</h4>
                    <input 
                      type="number" 
                      value={formData.maxLoginAttempts || 5}
                      onChange={(e) => setFormData({ ...formData, maxLoginAttempts: parseInt(e.target.value) })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm font-bold"
                    />
                 </div>
                 <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="text-xs font-bold text-slate-600">Enforce MFA</span>
                    <div className="w-10 h-5 bg-slate-200 rounded-full"></div>
                 </div>
              </div>
           </section>

           <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Maintenance Logic</h3>
              </div>
              <div className="p-8 space-y-4">
                 <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Active Lockdown</h4>
                      <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tight">Restrict all non-admin traffic</p>
                    </div>
                    <button 
                      onClick={() => setFormData({ ...formData, maintenanceMode: !formData.maintenanceMode })}
                      className={`w-12 h-6 rounded-full relative p-1 transition-all ${formData.maintenanceMode ? 'bg-amber-600' : 'bg-slate-200'}`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full shadow-md transition-transform ${formData.maintenanceMode ? 'translate-x-6' : 'translate-x-0'}`} />
                    </button>
                 </div>
                 <textarea 
                   rows={3} 
                   className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/10"
                   placeholder="Maintenance message shown to users..."
                   value={formData.maintenanceMessage || ''}
                   onChange={(e) => setFormData({ ...formData, maintenanceMessage: e.target.value })}
                 />
              </div>
           </section>
        </div>

        {/* Change Ledger Status */}
        <div className="bg-slate-900 text-white p-6 rounded-3xl flex items-center justify-between shadow-xl shadow-slate-200">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/10 rounded-xl">
              <RotateCcw className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider italic">Session Integrity</h4>
              <p className="text-xs text-slate-400 mt-0.5">Configurations modified during this session will be logged to audit history.</p>
            </div>
          </div>
          <button 
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl text-sm font-bold transition-all shadow-lg shadow-blue-900/40 uppercase tracking-widest"
          >
            Apply Config
          </button>
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;
