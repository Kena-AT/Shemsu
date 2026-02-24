import React, { useState } from 'react';
import { 
  History, 
  Search, 
  Filter, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  Shield, 
  User, 
  Database, 
  Lock, 
  Eye,
  AlertCircle,
  EyeOff
} from 'lucide-react';
import { useAdmin } from '../../../hooks/useAdmin';
import { useAuthStore } from '../../../state/useAuthStore';
import { exportToCSV } from '../../../lib/exportUtils';
import { toast } from 'react-hot-toast';

const PAGE_SIZE = 20;

const EVENT_TYPES = [
  { value: '', label: 'All Event Types' },
  { value: 'security', label: 'Security Events' },
  { value: 'user_management', label: 'User Management' },
  { value: 'moderation', label: 'Moderation Actions' },
  { value: 'settings', label: 'Settings Changes' },
];

const AuditLogs = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [eventType, setEventType] = useState('');
  const [typeDropdownOpen, setTypeDropdownOpen] = useState(false);
  const [showSensitiveFields, setShowSensitiveFields] = useState(false);

  const { user } = useAuthStore();
  const isSuperAdmin = user?.role === 'super_admin';

  const { useGetAuditLogs } = useAdmin();
  const { data, isLoading } = useGetAuditLogs({ 
    search, 
    type: eventType, 
    page, 
    limit: PAGE_SIZE 
  });

  const logs = data?.logs || data || [];
  const totalPages = data?.totalPages || 1;
  const totalCount = data?.total || logs.length;

  const handleExport = () => {
    if (!logs || !logs.length) return toast.error('No audit data available for export');
    const exportData = logs.map(log => ({
      timestamp: new Date(log.createdAt).toISOString(),
      admin: log.admin?.email || 'System',
      action: log.action,
      targetType: log.targetType,
      targetId: log.targetId,
      reason: log.reason || '',
      ...(isSuperAdmin && showSensitiveFields ? { ip: log.ipAddress, userAgent: log.userAgent } : {})
    }));
    exportToCSV(exportData, `shemsu_audit_logs_${new Date().toISOString().split('T')[0]}.csv`);
    toast.success('Audit trail export initiated');
  };

  const getLogIcon = (type) => {
    switch (type) {
      case 'security': return <Lock className="w-4 h-4 text-rose-600" />;
      case 'user_management': return <User className="w-4 h-4 text-blue-600" />;
      case 'moderation': return <Shield className="w-4 h-4 text-emerald-600" />;
      default: return <Database className="w-4 h-4 text-slate-400" />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 font-sans text-slate-900">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">System Audit History</h1>
          <p className="text-slate-500 text-sm mt-1 font-medium italic">Immutable ledger of all administrative decisions and security events.</p>
        </div>
        <div className="flex items-center gap-3">
          {isSuperAdmin && (
            <button
              onClick={() => setShowSensitiveFields(!showSensitiveFields)}
              title={showSensitiveFields ? 'Hide IP & User Agent' : 'Show IP & User Agent (Super Admin)'}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all uppercase tracking-widest border shadow-sm ${
                showSensitiveFields 
                  ? 'bg-amber-50 border-amber-200 text-amber-700' 
                  : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
              }`}
            >
              {showSensitiveFields ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              {showSensitiveFields ? 'Sensitive Fields On' : 'Sensitive Fields'}
            </button>
          )}
          <button 
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all uppercase tracking-widest bg-white shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>Export Archive</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Filter by admin or target..." 
              className="bg-slate-50 border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/10 w-64 transition-all font-medium"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            />
          </div>
          <div className="relative">
            <button 
              onClick={() => setTypeDropdownOpen(!typeDropdownOpen)}
              className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all uppercase tracking-widest bg-white"
            >
              <Filter className="w-4 h-4 text-slate-400" />
              <span>{EVENT_TYPES.find(t => t.value === eventType)?.label || 'All Event Types'}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            {typeDropdownOpen && (
              <div className="absolute top-full mt-2 left-0 bg-white border border-slate-200 rounded-2xl shadow-lg z-20 w-48 py-1 overflow-hidden">
                {EVENT_TYPES.map(type => (
                  <button 
                    key={type.value} 
                    onClick={() => { setEventType(type.value); setPage(1); setTypeDropdownOpen(false); }}
                    className={`w-full text-left px-4 py-2.5 text-xs font-bold transition-colors uppercase tracking-widest ${
                      eventType === type.value ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{totalCount} events found</p>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Timestamp</th>
                <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Administrator</th>
                <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Action Performed</th>
                <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Target Resource</th>
                <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Admin Reason</th>
                {isSuperAdmin && showSensitiveFields && (
                  <th className="px-6 py-5 text-[10px] font-bold text-amber-500 uppercase tracking-widest">IP / Agent</th>
                )}
                <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">View</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {logs?.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/30 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-700">{new Date(log.createdAt).toLocaleDateString()}</span>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                        {new Date(log.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-[10px] font-black text-slate-600">
                        {log.admin?.email?.charAt(0).toUpperCase() || 'S'}
                      </div>
                      <span className="text-xs font-bold text-slate-900 line-clamp-1">{log.admin?.email || 'System'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-white border border-slate-100 shadow-sm">
                        {getLogIcon(log.type)}
                      </div>
                      <span className="text-xs font-bold text-slate-700 uppercase tracking-tight">
                        {log.action?.replace(/_/g, ' ')}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Type: {log.targetType}</span>
                      <span className="text-xs font-bold text-blue-600 line-clamp-1">#{log.targetId}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 min-w-[200px]">
                    <div className="bg-slate-50/50 p-2 rounded-lg border border-slate-100">
                      <p className="text-[11px] text-slate-600 italic leading-relaxed">"{log.reason || 'No justification recorded.'}"</p>
                    </div>
                  </td>
                  {isSuperAdmin && showSensitiveFields && (
                    <td className="px-6 py-5 min-w-[180px]">
                      <div className="space-y-1">
                        <span className="block text-[10px] font-mono text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-100 truncate">
                          {log.ipAddress || '—'}
                        </span>
                        <span 
                          className="block text-[9px] font-mono text-slate-400 truncate max-w-[160px]" 
                          title={log.userAgent}
                        >
                          {log.userAgent ? log.userAgent.substring(0, 28) + '…' : '—'}
                        </span>
                      </div>
                    </td>
                  )}
                  <td className="px-6 py-5 text-right">
                    <button className="p-2 text-slate-400 hover:text-slate-900 rounded-lg hover:bg-white transition-all border border-transparent hover:border-slate-200 shadow-sm">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {logs?.length === 0 && (
                <tr>
                  <td 
                    colSpan={isSuperAdmin && showSensitiveFields ? 7 : 6} 
                    className="px-6 py-12 text-center text-xs text-slate-400 italic"
                  >
                    No administrative actions have been recorded yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Page {page} of {totalPages} · {totalCount} total events
          </p>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setPage(p => Math.max(1, p - 1))} 
              disabled={page === 1}
              className="p-2 text-slate-400 hover:text-slate-600 disabled:opacity-30 rounded-lg hover:bg-white border border-transparent hover:border-slate-200 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = page <= 3 ? i + 1 : page - 2 + i;
              if (pageNum > totalPages) return null;
              return (
                <button 
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={`w-8 h-8 rounded-lg text-[10px] font-black transition-all ${
                    page === pageNum 
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-200' 
                      : 'text-slate-500 hover:bg-white border border-transparent hover:border-slate-200'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            <button 
              onClick={() => setPage(p => Math.min(totalPages, p + 1))} 
              disabled={page === totalPages}
              className="p-2 text-slate-400 hover:text-slate-600 disabled:opacity-30 rounded-lg hover:bg-white border border-transparent hover:border-slate-200 transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Audit Reminder */}
      <div className="bg-slate-900 text-white p-7 rounded-[2rem] flex items-center justify-between shadow-2xl shadow-slate-200 border border-slate-800">
        <div className="flex items-center gap-5">
          <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-md">
            <AlertCircle className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-blue-400">Policy Adherence</h4>
            <p className="text-xs text-slate-400 mt-1 font-medium leading-relaxed max-w-md">
              Audit logs are stored for 180 days. IP address and User Agent data are classified as sensitive and restricted to super-admin access only.
            </p>
          </div>
        </div>
        <button 
          onClick={() => window.print()} 
          className="bg-white text-slate-900 font-black text-[10px] uppercase tracking-widest px-8 py-3.5 rounded-xl hover:bg-slate-100 transition-all shadow-lg active:scale-95"
        >
          Print Full Report
        </button>
      </div>
    </div>
  );
};

export default AuditLogs;
