import React, { useState } from 'react';
import { X, Send, Copy, Check, MessageCircle, Phone } from 'lucide-react';

export default function WhatsAppShareModal({
  isOpen,
  onClose,
  bhaiya,
  totalExpense,
  totalPaid,
  pendingDue,
  clothesInPress,
  totalClothesCount
}) {
  const [copied, setCopied] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(bhaiya.phone || '9725843574');

  if (!isOpen) return null;

  const messageText = `*Istri / Press Ka Hisaab* 🧺✨
Namaste ${bhaiya.name || 'Bhaiya'}! 🙏

Aapke kapdo aur payment ka hisaab:
• Kul Kapde (Total): ${totalClothesCount} pcs
• Kul Kharcha (Total Bill): ₹${totalExpense.toLocaleString('en-IN')}
• Paid Kiya (Cash/UPI): ₹${totalPaid.toLocaleString('en-IN')}
-----------------------------
*Baki Rashi (Pending Due): ₹${Math.max(0, pendingDue).toLocaleString('en-IN')}*
-----------------------------
Kapde abhi press me: ${clothesInPress} pcs

Dhanyawad!`;

  const handleCopy = () => {
    navigator.clipboard.writeText(messageText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendWhatsApp = () => {
    const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');
    const encoded = encodeURIComponent(messageText);
    const url = `https://wa.me/91${cleanPhone}?text=${encoded}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#10192b] border border-[#23334e] w-full max-w-lg rounded-2xl p-4 sm:p-6 shadow-2xl relative text-slate-100 max-h-[94vh] flex flex-col">
        <div className="flex items-center justify-between pb-3.5 border-b border-[#1d2b45]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
              <MessageCircle className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white">WhatsApp Hisaab Share</h2>
              <p className="text-[11px] text-slate-400">Laundry Khodiyar ko message bhejein</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto pr-0.5 sm:pr-1 py-3 sm:py-4 space-y-3.5">
          {/* Phone Number Field */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Bhaiya Ka WhatsApp Number
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-xs text-slate-400 font-mono">+91</span>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full pl-12 pr-4 py-2 bg-[#0c1424] border border-[#283959] rounded-xl text-sm font-mono text-white focus:outline-none focus:border-emerald-400"
              />
            </div>
          </div>

          {/* Message Preview Box */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Message Preview
            </label>
            <div className="bg-[#0c1424] border border-[#1e2d48] rounded-xl p-3.5 text-xs font-mono text-slate-200 whitespace-pre-wrap leading-relaxed">
              {messageText}
            </div>
          </div>

          {/* Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={handleCopy}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#182438] border border-[#283b5e] hover:bg-[#202f49] text-slate-200 transition-all"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Message</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleSendWhatsApp}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold bg-[#25D366] hover:bg-[#20ba59] text-slate-950 transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
            >
              <Send className="w-4 h-4" />
              <span>WhatsApp Pe Bhejo (+91 {phoneNumber})</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
