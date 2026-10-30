import React, { useState } from 'react';
import { Shirt, Plus, Calendar, Clock, ChevronRight, Eye } from 'lucide-react';

export default function BatchTable({ batches, onOpenAddBatch, onSelectBatch }) {
  const [filter, setFilter] = useState('All'); // 'All', 'With Bhaiya', 'Delivered'

  const safeBatches = Array.isArray(batches) ? batches : [];
  const filtered = safeBatches.filter((b) => {
    if (filter === 'All') return true;
    return b.status === filter;
  });

  return (
    <div className="bg-[#121c2f] border border-[#21304c] rounded-2xl p-4 sm:p-5 shadow-lg flex flex-col justify-between">
      <div>
        {/* Table / Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-lg font-bold text-white tracking-tight">
                Kapde Batches (Diye Hue Kapde)
              </h2>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-bold border border-slate-700">
                {batches.length}
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">
              Tareekh, kapdo ki sankhya aur bill hisaab
            </p>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-2">
            {/* Filter Pills */}
            <div className="bg-[#0b1220] p-1 rounded-xl border border-[#1e2d49] flex items-center gap-1 text-[11px] font-bold">
              {['All', 'With Bhaiya', 'Delivered'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    filter === f
                      ? 'bg-amber-400 text-slate-950 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {f === 'With Bhaiya' ? 'In Press' : f}
                </button>
              ))}
            </div>

            <button
              onClick={onOpenAddBatch}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 transition-all shadow-md active:scale-95 shrink-0"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
              <span>+ Kapde</span>
            </button>
          </div>
        </div>

        {/* --- MOBILE CARDS VIEW (Visible only on < sm screens) --- */}
        <div className="sm:hidden space-y-2.5">
          {filtered.map((batch) => {
            const isDelivered = batch.status === 'Delivered';
            const itemsSummary = batch.items
              ?.map((it) => `${it.qty} ${it.itemName.split(' ')[0]}`)
              .join(', ');

            return (
              <div
                key={batch.id}
                onClick={() => onSelectBatch(batch)}
                className="bg-[#0b1220] border border-[#1d2b47] rounded-xl p-3.5 hover:border-amber-400/50 transition-all active:scale-[0.99] cursor-pointer"
              >
                {/* Mobile Card Top: Date & Status */}
                <div className="flex items-center justify-between pb-2 border-b border-[#16233b]">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-200">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    <span>{batch.dateGiven}</span>
                  </div>

                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                    isDelivered
                      ? 'bg-emerald-950/80 text-emerald-400 border-emerald-500/30'
                      : batch.status === 'Ready'
                      ? 'bg-blue-950/80 text-blue-400 border-blue-500/30'
                      : 'bg-amber-950/80 text-amber-400 border-amber-500/30'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${isDelivered ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'}`}></span>
                    {batch.status}
                  </span>
                </div>

                {/* Mobile Card Middle: Items list & Notes */}
                <div className="py-2.5">
                  <div className="text-xs text-slate-200 font-medium">
                    {itemsSummary || 'Clothes'}
                  </div>
                  {batch.notes && (
                    <div className="text-[10px] text-amber-300/80 truncate mt-1">
                      Note: {batch.notes}
                    </div>
                  )}
                </div>

                {/* Mobile Card Bottom: Pieces, Amount & View Button */}
                <div className="flex items-center justify-between pt-2 border-t border-[#16233b] text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-300 bg-[#121c2e] px-2 py-0.5 rounded border border-[#21324d] text-[11px]">
                      {batch.totalPieces} pcs
                    </span>
                    <span className="font-black text-sm text-white font-mono">
                      ₹{batch.totalAmount?.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-cyan-400 text-xs font-semibold">
                    <span>Details</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* --- DESKTOP TABLE VIEW (Visible on >= sm screens) --- */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#1b2b48] text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th className="pb-3 pr-3 font-semibold">Tareekh (Date)</th>
                <th className="pb-3 pr-3 font-semibold">Kapde Items</th>
                <th className="pb-3 pr-3 font-semibold text-center">Pieces</th>
                <th className="pb-3 pr-3 font-semibold">Bill Amount</th>
                <th className="pb-3 pr-3 font-semibold">Status</th>
                <th className="pb-3 text-right font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#18263f]">
              {filtered.map((batch) => {
                const isDelivered = batch.status === 'Delivered';
                const itemsSummary = batch.items
                  ?.map((it) => `${it.qty} ${it.itemName.split(' ')[0]}`)
                  .join(', ');

                return (
                  <tr
                    key={batch.id}
                    onClick={() => onSelectBatch(batch)}
                    className="hover:bg-[#16233b] transition-colors cursor-pointer group"
                  >
                    {/* Date */}
                    <td className="py-3.5 pr-3">
                      <div className="font-semibold text-slate-100 group-hover:text-amber-300 transition-colors flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-500" />
                        <span>{batch.dateGiven}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        Exp: {batch.expectedDate || '1-2 days'}
                      </div>
                    </td>

                    {/* Items */}
                    <td className="py-3.5 pr-3 max-w-[200px]">
                      <div className="font-medium text-slate-200 truncate">
                        {itemsSummary || 'Clothes'}
                      </div>
                      {batch.notes && (
                        <div className="text-[10px] text-amber-300/80 truncate mt-0.5">
                          Note: {batch.notes}
                        </div>
                      )}
                    </td>

                    {/* Pieces */}
                    <td className="py-3.5 pr-3 text-center">
                      <span className="font-bold text-slate-200 bg-[#0c1424] px-2.5 py-1 rounded-lg border border-[#1e2e4b]">
                        {batch.totalPieces} pcs
                      </span>
                    </td>

                    {/* Bill Amount */}
                    <td className="py-3.5 pr-3 font-extrabold text-sm text-white font-mono">
                      ₹{batch.totalAmount?.toLocaleString('en-IN')}
                    </td>

                    {/* Status */}
                    <td className="py-3.5 pr-3">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                        isDelivered
                          ? 'bg-emerald-950/70 text-emerald-400 border-emerald-500/30'
                          : batch.status === 'Ready'
                          ? 'bg-blue-950/70 text-blue-400 border-blue-500/30'
                          : 'bg-amber-950/70 text-amber-400 border-amber-500/30'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          isDelivered ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'
                        }`}></span>
                        <span>{batch.status}</span>
                      </span>
                    </td>

                    {/* Action */}
                    <td className="py-3.5 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectBatch(batch);
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-amber-300 hover:bg-slate-800 transition-colors"
                        title="View details"
                      >
                        <Eye className="w-4 h-4" />
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
            Koi kapde batch nahi mila. "+ Kapde" button dabakar naya record jodein.
          </div>
        )}
      </div>
    </div>
  );
}
