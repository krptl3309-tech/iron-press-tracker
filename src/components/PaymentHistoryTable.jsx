import React, { useState } from 'react';
import { CreditCard, QrCode, Banknote, Edit2, Plus, Calendar } from 'lucide-react';

export default function PaymentHistoryTable({ payments, onOpenAddPayment, onEditPayment }) {
  const [modeFilter, setModeFilter] = useState('All'); // 'All', 'UPI', 'Cash'

  const filtered = payments.filter((p) => {
    if (modeFilter === 'All') return true;
    return p.mode === modeFilter;
  });

  return (
    <div className="bg-[#121c2f] border border-[#21304c] rounded-2xl p-4 sm:p-5 shadow-lg flex flex-col justify-between">
      <div>
        {/* Table / Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-lg font-bold text-white tracking-tight">
                Payment History (Diye Hue Paise)
              </h2>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 font-bold border border-emerald-500/30">
                {payments.length}
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">
              Cash aur UPI payment ka pura khata (Editable)
            </p>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-2">
            {/* Filter pills */}
            <div className="bg-[#0b1220] p-1 rounded-xl border border-[#1e2d49] flex items-center gap-1 text-[11px] font-bold">
              {['All', 'UPI', 'Cash'].map((m) => (
                <button
                  key={m}
                  onClick={() => setModeFilter(m)}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    modeFilter === m
                      ? 'bg-emerald-500 text-slate-950 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>

            <button
              onClick={onOpenAddPayment}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all shadow-md active:scale-95 shrink-0"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
              <span>+ Payment</span>
            </button>
          </div>
        </div>

        {/* --- MOBILE CARDS VIEW (Visible only on < sm screens) --- */}
        <div className="sm:hidden space-y-2.5">
          {filtered.map((pay) => {
            const isUPI = pay.mode === 'UPI';
            return (
              <div
                key={pay.id}
                className="bg-[#0b1220] border border-[#1d2b47] rounded-xl p-3.5 flex items-center justify-between gap-3 hover:border-emerald-500/40 transition-all"
              >
                {/* Left: Amount & Method */}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-black text-emerald-400 font-mono">
                      ₹{pay.amount?.toLocaleString('en-IN')}
                    </span>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold border ${
                      isUPI
                        ? 'bg-cyan-950 text-cyan-300 border-cyan-500/30'
                        : 'bg-amber-950 text-amber-300 border-amber-500/30'
                    }`}>
                      {isUPI ? <QrCode className="w-2.5 h-2.5" /> : <Banknote className="w-2.5 h-2.5" />}
                      <span>{isUPI ? pay.app : 'Cash'}</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      {pay.date}
                    </span>
                    {pay.time && <span>• {pay.time}</span>}
                  </div>

                  {pay.notes && (
                    <div className="text-[10px] text-slate-400 truncate max-w-[200px] mt-0.5">
                      {pay.notes}
                    </div>
                  )}
                </div>

                {/* Right: Touch Edit button */}
                <button
                  onClick={() => onEditPayment(pay)}
                  className="px-3 py-1.5 rounded-lg bg-[#142138] border border-[#233559] text-cyan-300 text-xs font-bold flex items-center gap-1 hover:bg-[#1b2c4c] shrink-0"
                >
                  <Edit2 className="w-3 h-3" />
                  <span>Edit</span>
                </button>
              </div>
            );
          })}
        </div>

        {/* --- DESKTOP TABLE VIEW (Visible on >= sm screens) --- */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#1b2b48] text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th className="pb-3 pr-3 font-semibold">Tareekh & Samay</th>
                <th className="pb-3 pr-3 font-semibold">Method (Cash / UPI)</th>
                <th className="pb-3 pr-3 font-semibold">Amount Diya</th>
                <th className="pb-3 pr-3 font-semibold">Status</th>
                <th className="pb-3 text-right font-semibold">Edit / Change</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#18263f]">
              {filtered.map((pay) => {
                const isUPI = pay.mode === 'UPI';
                return (
                  <tr
                    key={pay.id}
                    className="hover:bg-[#16233b] transition-colors group"
                  >
                    {/* Date & Time */}
                    <td className="py-3.5 pr-3">
                      <div className="font-semibold text-slate-100 group-hover:text-emerald-300 transition-colors">
                        {pay.date}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        {pay.time || 'N/A'}
                      </div>
                    </td>

                    {/* Mode & App */}
                    <td className="py-3.5 pr-3">
                      <div className="flex items-center gap-1.5">
                        {isUPI ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                            <QrCode className="w-3 h-3" />
                            <span>{pay.app || 'UPI'}</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-950 text-amber-300 border border-amber-500/30">
                            <Banknote className="w-3 h-3" />
                            <span>Cash</span>
                          </span>
                        )}
                      </div>
                      {pay.reference && (
                        <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                          {pay.reference}
                        </div>
                      )}
                    </td>

                    {/* Amount */}
                    <td className="py-3.5 pr-3 font-black text-sm text-emerald-400 font-mono">
                      ₹{pay.amount?.toLocaleString('en-IN')}
                    </td>

                    {/* Status */}
                    <td className="py-3.5 pr-3">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                        {pay.status || 'Completed'}
                      </span>
                      {pay.notes && (
                        <div className="text-[10px] text-slate-400 truncate max-w-[150px] mt-0.5">
                          {pay.notes}
                        </div>
                      )}
                    </td>

                    {/* Action */}
                    <td className="py-3.5 text-right">
                      <button
                        onClick={() => onEditPayment(pay)}
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-cyan-400 hover:text-cyan-300 hover:bg-[#1a2845] px-2.5 py-1 rounded-lg border border-[#25395c] transition-all"
                        title="Edit payment entry"
                      >
                        <Edit2 className="w-3 h-3" />
                        <span>Edit</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="py-8 text-center text-xs text-slate-400">
            Koi payment entry nahi mili. "+ Payment" button se log karein.
          </div>
        )}
      </div>
    </div>
  );
}
