import React from 'react';
import {
  Flame,
  Phone,
  MessageCircle,
  Plus,
  CreditCard,
  Sliders,
  Share2,
  RotateCcw
} from 'lucide-react';

export default function Header({
  bhaiya,
  onOpenAddBatch,
  onOpenPayment,
  onOpenRateCard,
  onOpenWhatsAppShare,
  onResetAllToZero
}) {
  return (
    <header className="border-b border-[#1f2b42] bg-[#0c1424]/95 backdrop-blur-md sticky top-0 z-30 px-3 sm:px-6 lg:px-8 py-3 sm:py-4">
      <div className="max-w-7xl mx-auto flex flex-col gap-3">
        {/* Top Row: Brand & Bhaiya Quick Contact Card */}
        <div className="flex items-center justify-between gap-2">
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-slate-950 font-black shadow-md shadow-amber-500/20 shrink-0">
              <Flame className="w-6 h-6 fill-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-lg sm:text-2xl font-black text-white tracking-tight leading-tight">
                  Istri<span className="text-amber-400">Khata</span>
                </h1>
                <span className="hidden sm:inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30">
                  Press Expense Tracker
                </span>
              </div>
              
              {/* Laundry Khodiyar Name & Number */}
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <span className="font-bold text-amber-300 text-xs sm:text-sm truncate max-w-[140px] sm:max-w-none">
                  {bhaiya?.name || 'Laundry Khodiyar'}
                </span>
                <span className="text-slate-600 hidden xs:inline">•</span>
                <span className="text-[11px] font-mono text-slate-400 hidden xs:inline">
                  +91 {bhaiya?.phone || '9725843574'}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Communication Actions + Reset */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Phone Call */}
            <a
              href={`tel:${bhaiya?.phone || '9725843574'}`}
              className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-[#142138] border border-[#24375b] text-cyan-400 hover:text-cyan-300 hover:bg-[#1a2d4d] transition-all flex items-center gap-1 text-xs font-semibold"
              title="Call Bhaiya"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden md:inline">Call</span>
            </a>

            {/* Direct WhatsApp Chat */}
            <a
              href={`https://wa.me/91${bhaiya?.phone || '9725843574'}`}
              target="_blank"
              rel="noreferrer"
              className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-[#0e2a1d] border border-emerald-500/40 text-emerald-300 hover:bg-[#143d2a] transition-all flex items-center gap-1 text-xs font-bold"
              title="WhatsApp Chat"
            >
              <MessageCircle className="w-4 h-4 fill-emerald-400/20 text-emerald-400" />
              <span className="hidden md:inline">WhatsApp</span>
            </a>

            {/* Reset to 0 */}
            <button
              onClick={onResetAllToZero}
              className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-950/30 border border-[#273859] hover:border-rose-500/40 transition-all"
              title="Sab 0 karein (Reset all)"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Action Buttons Toolbar (Wrap nicely on mobile, full width touch targets) */}
        <div className="grid grid-cols-2 sm:flex sm:items-center sm:justify-end gap-2 pt-1 border-t border-[#182338]/60">
          {/* Rate Card Customizer */}
          <button
            onClick={onOpenRateCard}
            className="flex items-center justify-center gap-1.5 px-3 py-2 sm:py-1.5 rounded-xl text-xs font-bold bg-[#152136] border border-[#27395c] text-slate-200 hover:bg-[#1c2c47] hover:border-amber-400/40 transition-all"
          >
            <Sliders className="w-3.5 h-3.5 text-amber-400" />
            <span>Rate List (₹)</span>
          </button>

          {/* WhatsApp Hisaab Button */}
          <button
            onClick={onOpenWhatsAppShare}
            className="flex items-center justify-center gap-1.5 px-3 py-2 sm:py-1.5 rounded-xl text-xs font-bold bg-[#102a20] border border-emerald-500/40 text-emerald-300 hover:bg-[#143528] transition-all shadow-sm"
          >
            <Share2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Hisaab Bhejo</span>
          </button>

          {/* Record Payment Button */}
          <button
            onClick={onOpenPayment}
            className="flex items-center justify-center gap-1.5 px-3 py-2 sm:py-1.5 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all shadow-md active:scale-95"
          >
            <CreditCard className="w-3.5 h-3.5 text-slate-950 stroke-[2.5]" />
            <span>+ Payment</span>
          </button>

          {/* Add Clothes Batch Button */}
          <button
            onClick={onOpenAddBatch}
            className="flex items-center justify-center gap-1.5 px-4 py-2 sm:py-1.5 rounded-xl text-xs font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 transition-all shadow-md active:scale-95"
          >
            <Plus className="w-4 h-4 text-slate-950 stroke-[3]" />
            <span>+ Kapde Diye</span>
          </button>
        </div>
      </div>
    </header>
  );
}
