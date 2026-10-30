import React from 'react';
import { Sliders, ArrowRight, Sparkles, Tag } from 'lucide-react';

export default function RateSummaryCard({ rateCard, onOpenRateCard }) {
  // Show first 6 key rates
  const previewRates = rateCard.slice(0, 6);

  return (
    <div className="bg-[#121c2f] border border-[#21304c] rounded-2xl p-5 shadow-lg flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
              Active Rate Card (Prati Kapda Rate)
            </h3>
          </div>
          <button
            onClick={onOpenRateCard}
            className="flex items-center gap-1 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Customize</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {previewRates.map((rate) => (
            <div
              key={rate.id}
              onClick={onOpenRateCard}
              className="bg-[#0b1220] border border-[#1b2b47] hover:border-amber-500/40 p-2.5 rounded-xl cursor-pointer transition-all group"
            >
              <div className="text-[11px] font-semibold text-slate-300 group-hover:text-amber-300 truncate">
                {rate.itemName}
              </div>
              <div className="flex items-center justify-between mt-1 text-[10px]">
                <span className="text-slate-400">{rate.service}</span>
                <span className="font-extrabold text-amber-400 font-mono text-xs">
                  ₹{rate.price}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-[#1b2a47] flex items-center justify-between text-xs">
        <span className="text-slate-400">Total {rateCard.length} items configured</span>
        <button
          onClick={onOpenRateCard}
          className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 text-[11px]"
        >
          <span>All Rates / Add New</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
