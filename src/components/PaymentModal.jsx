import React, { useState } from 'react';
import { X, CreditCard, Banknote, QrCode } from 'lucide-react';

export default function PaymentModal({ isOpen, onClose, onAddPayment }) {
  // 100% Manual input - starts blank
  const [amount, setAmount] = useState('');
  const [mode, setMode] = useState('UPI'); // 'UPI' or 'Cash'
  const [app, setApp] = useState('Google Pay');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState(
    new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  );
  const [reference, setReference] = useState('');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0) return;

    onAddPayment({
      id: 'pay-' + Date.now(),
      date,
      time,
      amount: Number(amount),
      mode,
      app: mode === 'UPI' ? app : 'Cash Payment',
      reference: reference.trim() || (mode === 'UPI' ? 'UPI-' + Math.floor(1000000 + Math.random() * 9000000) : 'Cash in Hand'),
      status: 'Completed',
      notes: notes.trim()
    });

    setAmount('');
    setNotes('');
    setReference('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#10192b] border border-[#23334e] w-full max-w-lg rounded-2xl p-4 sm:p-6 shadow-2xl relative text-slate-100 max-h-[94vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-[#1d2b45]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
              <CreditCard className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white">Manual Payment Entry</h2>
              <p className="text-[11px] text-slate-400">Laundry Khodiyar ko diye gaye paise darj karein</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto pr-0.5 sm:pr-1 py-3 sm:py-4 space-y-3.5">
          {/* Amount Input (Manual) */}
          <div>
            <label className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Kitne Paise Diye (Amount in ₹) *
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-base sm:text-lg font-bold text-emerald-400">₹</span>
              <input
                type="number"
                min="1"
                required
                autoFocus
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full pl-8 pr-3 py-2.5 bg-[#0c1424] border border-[#283959] rounded-xl text-lg sm:text-xl font-black text-white focus:outline-none focus:border-emerald-400"
                placeholder="Type amount (e.g. 50, 100, 200)"
              />
            </div>
          </div>

          {/* Payment Mode (Cash vs UPI) */}
          <div>
            <label className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Payment Mode
            </label>
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => setMode('UPI')}
                className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl border text-xs font-bold transition-all ${
                  mode === 'UPI'
                    ? 'bg-emerald-950/70 border-emerald-500 text-emerald-300 shadow-md shadow-emerald-500/10'
                    : 'bg-[#0c1424] border-[#22334f] text-slate-400 hover:text-slate-200'
                }`}
              >
                <QrCode className="w-4 h-4" />
                <span>UPI (GPay / PhonePe)</span>
              </button>

              <button
                type="button"
                onClick={() => setMode('Cash')}
                className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl border text-xs font-bold transition-all ${
                  mode === 'Cash'
                    ? 'bg-amber-950/70 border-amber-500 text-amber-300 shadow-md shadow-amber-500/10'
                    : 'bg-[#0c1424] border-[#22334f] text-slate-400 hover:text-slate-200'
                }`}
              >
                <Banknote className="w-4 h-4" />
                <span>Cash Diya (Nagad)</span>
              </button>
            </div>
          </div>

          {/* If UPI, choose specific App */}
          {mode === 'UPI' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 bg-[#0c1424] border border-[#1e2d48] p-2.5 rounded-xl">
              <div>
                <label className="block text-[10px] text-slate-400 mb-1">UPI App</label>
                <select
                  value={app}
                  onChange={(e) => setApp(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-[#121c30] border border-[#273859] rounded-lg text-xs text-white focus:outline-none focus:border-emerald-400 font-semibold"
                >
                  <option value="Google Pay">Google Pay</option>
                  <option value="PhonePe">PhonePe</option>
                  <option value="Paytm">Paytm</option>
                  <option value="BHIM UPI">BHIM UPI</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] text-slate-400 mb-1">Reference / UTR (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. 4029103948"
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-[#121c30] border border-[#273859] rounded-lg text-xs text-white focus:outline-none focus:border-emerald-400"
                />
              </div>
            </div>
          )}

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <div>
              <label className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Kab Diya (Date)
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 bg-[#0c1424] border border-[#283959] rounded-xl text-xs text-white focus:outline-none focus:border-emerald-400"
              />
            </div>
            <div>
              <label className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Samay (Time)
              </label>
              <input
                type="text"
                placeholder="e.g. 08:30 PM"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-3 py-2 bg-[#0c1424] border border-[#283959] rounded-xl text-xs text-white focus:outline-none focus:border-emerald-400"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Note (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. 10 kapdo ka hisaab diya"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 bg-[#0c1424] border border-[#283959] rounded-xl text-xs text-white focus:outline-none focus:border-emerald-400"
            />
          </div>

          {/* Actions */}
          <div className="pt-2.5 border-t border-[#1d2b45] flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!amount || Number(amount) <= 0}
              className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 shadow-lg shadow-emerald-500/20 active:scale-95 transition-all"
            >
              Save Payment {amount ? `(₹${amount})` : ''}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
