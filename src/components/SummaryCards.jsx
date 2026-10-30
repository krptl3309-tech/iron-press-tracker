import React from 'react';
import { IndianRupee, CheckCircle, AlertTriangle, Shirt, ArrowUpRight } from 'lucide-react';

export default function SummaryCards({
  totalExpense,
  totalPaid,
  pendingDue,
  clothesInPress,
  totalClothesCount,
  onQuickSettle
}) {
  const formatINR = (val) => '₹' + Number(val || 0).toLocaleString('en-IN');
  const isFullySettled = pendingDue <= 0;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 lg:gap-5">
      {/* 1. Total Expense Card */}
      <div className="bg-[#121c2f] border border-[#21304c] rounded-2xl p-3.5 sm:p-5 flex flex-col justify-between shadow-lg relative overflow-hidden group hover:border-[#2f4369] transition-all">
        <div className="flex items-center justify-between">
          <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Kul Kharcha
          </span>
          <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-xl bg-blue-950/60 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
            <IndianRupee className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
        </div>
        <div className="mt-2 sm:mt-4">
          <div className="text-xl sm:text-3xl font-black text-white tracking-tight truncate">
            {formatINR(totalExpense)}
          </div>
          <div className="mt-1 sm:mt-2 text-[10px] sm:text-xs text-slate-400 flex items-center gap-1 truncate">
            <span>Kapde:</span>
            <span className="text-slate-200 font-bold">{totalClothesCount} pcs</span>
          </div>
        </div>
      </div>

      {/* 2. Total Paid Card */}
      <div className="bg-[#121c2f] border border-[#21304c] rounded-2xl p-3.5 sm:p-5 flex flex-col justify-between shadow-lg relative overflow-hidden group hover:border-emerald-500/30 transition-all">
        <div className="flex items-center justify-between">
          <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Paid Kar Diya
          </span>
          <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-xl bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
            <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
        </div>
        <div className="mt-2 sm:mt-4">
          <div className="text-xl sm:text-3xl font-black text-emerald-400 tracking-tight truncate">
            {formatINR(totalPaid)}
          </div>
          <div className="mt-1 sm:mt-2 text-[10px] sm:text-xs text-emerald-400/90 font-medium truncate">
            Cash / UPI diya
          </div>
        </div>
      </div>

      {/* 3. Pending Due Card (Key Highlight!) */}
      <div className={`border rounded-2xl p-3.5 sm:p-5 flex flex-col justify-between shadow-lg transition-all ${
        isFullySettled
          ? 'bg-[#12241e] border-emerald-500/40'
          : 'bg-[#221419] border-rose-500/50 glow-rose'
      }`}>
        <div className="flex items-center justify-between">
          <span className={`text-[10px] sm:text-[11px] font-bold uppercase tracking-wider ${
            isFullySettled ? 'text-emerald-300' : 'text-rose-300'
          }`}>
            Kitna Baki Hai
          </span>
          <div className={`w-7 h-7 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center shrink-0 ${
            isFullySettled
              ? 'bg-emerald-950 border border-emerald-500/50 text-emerald-400'
              : 'bg-rose-950 border border-rose-500/50 text-rose-400 animate-pulse'
          }`}>
            <AlertTriangle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
        </div>
        <div className="mt-2 sm:mt-4">
          <div className={`text-xl sm:text-3xl font-black tracking-tight truncate ${
            isFullySettled ? 'text-emerald-400' : 'text-rose-400'
          }`}>
            {formatINR(Math.max(0, pendingDue))}
          </div>
          <div className="mt-1 sm:mt-2 flex items-center justify-between">
            <span className="text-[10px] sm:text-xs text-slate-400 font-medium truncate">
              {isFullySettled ? '🎉 Barabar' : 'Dene baki'}
            </span>
            {!isFullySettled && (
              <button
                onClick={onQuickSettle}
                className="text-[10px] sm:text-[11px] font-bold text-rose-300 hover:text-white underline flex items-center shrink-0"
              >
                <span>Chukayein</span>
                <ArrowUpRight className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 4. Clothes in Press Card */}
      <div className="bg-[#121c2f] border border-[#21304c] rounded-2xl p-3.5 sm:p-5 flex flex-col justify-between shadow-lg relative overflow-hidden group hover:border-amber-400/40 transition-all">
        <div className="flex items-center justify-between">
          <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Press Me Kapde
          </span>
          <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-xl bg-amber-950/60 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
            <Shirt className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
        </div>
        <div className="mt-2 sm:mt-4">
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl sm:text-3xl font-black text-amber-400 tracking-tight">
              {clothesInPress}
            </span>
            <span className="text-xs font-semibold text-slate-400">pcs</span>
          </div>
          <div className="mt-1 sm:mt-2 text-[10px] sm:text-xs text-slate-400 truncate">
            {clothesInPress > 0 ? 'Abhi laundry me' : 'Sabhi aa gaye'}
          </div>
        </div>
      </div>
    </div>
  );
}
