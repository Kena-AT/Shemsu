import React from 'react';
import { Landmark, CreditCard, Building2, TrendingUp, ArrowDownLeft, ArrowUpRight, DollarSign, ShieldCheck, HelpCircle, ChevronRight } from 'lucide-react';
import Button from '../../../components/common/Button';

const SellerBankDetails = () => {
  const transactions = [
    { id: 'TRX-9482', type: 'Payout', amount: -1420.00, date: 'Oct 24, 2023', status: 'Completed' },
    { id: 'TRX-9421', type: 'Sales Revenue', amount: 3200.50, date: 'Oct 22, 2023', status: 'Processing' },
    { id: 'TRX-9388', type: 'Refund Debit', amount: -45.00, date: 'Oct 20, 2023', status: 'Completed' },
    { id: 'TRX-9311', type: 'Sales Revenue', amount: 150.00, date: 'Oct 19, 2023', status: 'Completed' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
           <h1 className="text-3xl font-black text-slate-900 tracking-tight">Financial Hub</h1>
           <p className="text-slate-500 mt-2">Manage your earnings, payouts, and bank settlement accounts.</p>
        </div>
        <Button variant="primary" className="bg-slate-900 text-white rounded-2xl px-8 py-4 font-bold flex items-center gap-2 shadow-xl shadow-slate-200">
            <ArrowUpRight size={20} /> Request Payout
        </Button>
      </div>

      {/* Financial Overview Tags */}
      <div className="grid md:grid-cols-3 gap-6">
         <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden group">
            <div className="relative z-10">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Available Balance</p>
                <h3 className="text-4xl font-black text-slate-900 tracking-tighter">$14,204.50</h3>
                <div className="flex items-center gap-2 mt-4 text-green-600 font-bold text-xs">
                    <TrendingUp size={14} /> +12.5% this month
                </div>
            </div>
            <DollarSign className="absolute -right-4 -bottom-4 w-32 h-32 text-slate-50 opacity-50 group-hover:scale-110 transition-transform duration-700" />
         </div>

         <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden group">
            <div className="relative z-10">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Pending Clearance</p>
                <h3 className="text-4xl font-black tracking-tighter text-blue-600">$3,200.00</h3>
                <p className="text-[10px] text-slate-300 mt-4 font-medium uppercase tracking-widest flex items-center gap-1.5 leading-none bg-slate-50 px-2 py-1.5 rounded-full w-fit">
                    <CreditCard size={10} /> Escrow Protected
                </p>
            </div>
         </div>

         <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-900">
                    <Landmark size={24} />
                </div>
                <button className="text-[10px] font-bold text-blue-600 uppercase tracking-widest hover:underline">Change</button>
            </div>
            <div>
                 <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Settlement Account</p>
                 <h4 className="font-bold text-slate-900">Commercial Bank of Ethiopia</h4>
                 <p className="text-xs text-slate-400 font-mono mt-1">**** 9482</p>
            </div>
         </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Transaction History */}
        <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">Recent Activity</h3>
                <button className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1 hover:text-slate-900">View All Transaction History</button>
            </div>
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="bg-slate-50/50 border-b border-slate-50">
                            <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">ID / Date</th>
                            <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Category</th>
                            <th className="px-8 py-5 text-right text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                            <th className="px-8 py-5 text-right text-[10px] font-black uppercase tracking-widest text-slate-400">Amount</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {transactions.map(trx => (
                            <tr key={trx.id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-8 py-5">
                                    <p className="text-sm font-bold text-slate-900">{trx.id}</p>
                                    <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mt-0.5">{trx.date}</p>
                                </td>
                                <td className="px-8 py-5">
                                    <span className="text-xs font-bold text-slate-600">{trx.type}</span>
                                </td>
                                <td className="px-8 py-5 text-right">
                                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${trx.status === 'Completed' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'}`}>
                                        <div className={`w-1.5 h-1.5 rounded-full ${trx.status === 'Completed' ? 'bg-green-600' : 'bg-blue-600 animate-pulse'}`} />
                                        {trx.status}
                                    </div>
                                </td>
                                <td className={`px-8 py-5 text-right font-black text-sm tracking-tight ${trx.amount < 0 ? 'text-slate-900' : 'text-blue-600'}`}>
                                    {trx.amount < 0 ? '-' : '+'}${Math.abs(trx.amount).toFixed(2)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

        {/* Security & Support Panel */}
        <div className="space-y-6">
             <div className="bg-slate-900 p-10 rounded-[2.5rem] text-white space-y-8">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center">
                    <ShieldCheck size={28} />
                </div>
                <div>
                   <h4 className="text-xl font-bold mb-3">Finance Shield</h4>
                   <p className="text-sm text-slate-400 leading-relaxed">Shemsu Finance uses end-to-end encryption for all bank settlements. Your data is protected by bank-grade security protocols.</p>
                </div>
                <button className="w-full flex items-center justify-between p-5 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors group">
                    <span className="text-sm font-bold">Security Settings</span>
                    <ChevronRight size={18} className="text-slate-500 group-hover:translate-x-1 transition-transform" />
                </button>
             </div>

             <div className="bg-blue-50 p-10 rounded-[2.5rem] border border-blue-100 flex flex-col gap-6">
                <div className="flex items-center gap-3">
                    <HelpCircle className="text-blue-600" size={24} />
                    <h4 className="font-bold text-blue-900">Financial Support</h4>
                </div>
                <p className="text-xs text-blue-600 leading-relaxed">Have questions about payouts or taxes? Our financial support desk is available 24/7 for premium sellers.</p>
                <Button variant="primary" className="bg-blue-600 text-white rounded-xl py-3 text-xs font-black uppercase tracking-widest">Open Finance Ticket</Button>
             </div>
        </div>
      </div>
    </div>
  );
};

export default SellerBankDetails;
