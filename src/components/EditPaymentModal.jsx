import React, { useState, useEffect } from 'react';
import { X, Save, Trash2, Edit3, QrCode, Banknote } from 'lucide-react';

export default function EditPaymentModal({ isOpen, onClose, payment, onSavePayment, onDeletePayment }) {
  const [amount, setAmount] = useState('');
  const [mode, setMode] = useState('UPI');
  const [app, setApp] = useState('Google Pay');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [reference, setReference] = useState('');
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState('Completed');

  useEffect(() => {
    if (payment) {
      setAmount(payment.amount?.toString() || '');
      setMode(payment.mode || 'UPI');
      setApp(payment.app || 'Google Pay');
      setDate(payment.date || '');
      setTime(payment.time || '');
      setReference(payment.reference || '');
      setNotes(payment.notes || '');
      setStatus(payment.status || 'Completed');
    }
  }, [payment]);

  if (!isOpen || !payment) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSavePayment({
      ...payment,
      amount: Number(amount),
      mode,
      app: mode === 'UPI' ? app : 'Cash Payment',
      date,
      time,
      reference,
      notes,
      status
    });
    onClose();
  };

  const handleDelete = () => {
    if (confirm('Kya aap sach me ye payment entry delete karna chahte hain?')) {
      onDeletePayment(payment.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#10192b] border border-[#23334e] w-full max-w-lg rounded-2xl p-4 sm:p-6 shadow-2xl relative text-slate-100 max-h-[94vh] flex flex-col">
        <div className="flex items-center justify-between pb-3.5 border-b border-[#1d2b45]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0">
              <Edit3 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white">Edit Payment Entry</h2>
              <p className="text-[11px] text-slate-400">Date, amount, Cash ya UPI method badlein</p>
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
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Amount (₹)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-2.5 text-base font-bold text-emerald-400">₹</span>
              <input
                type="number"
                min="1"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full pl-8 pr-4 py-2 bg-[#0c1424] border border-[#283959] rounded-xl text-lg font-bold text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Payment Mode
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setMode('UPI')}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-xl border text-xs font-bold transition-all ${
                  mode === 'UPI'
                    ? 'bg-emerald-950/70 border-emerald-500 text-emerald-300'
                    : 'bg-[#0c1424] border-[#22334f] text-slate-400 hover:text-slate-200'
                }`}
              >
                <QrCode className="w-4 h-4" />
                <span>UPI Payment</span>
              </button>

              <button
                type="button"
                onClick={() => setMode('Cash')}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-xl border text-xs font-bold transition-all ${
                  mode === 'Cash'
                    ? 'bg-amber-950/70 border-amber-500 text-amber-300'
                    : 'bg-[#0c1424] border-[#22334f] text-slate-400 hover:text-slate-200'
                }`}
              >
                <Banknote className="w-4 h-4" />
                <span>Cash Diya</span>
              </button>
            </div>
          </div>

          {mode === 'UPI' && (
            <div className="grid grid-cols-2 gap-3 bg-[#0c1424] border border-[#1e2d48] p-3 rounded-xl">
              <div>
                <label className="block text-[10px] text-slate-400 mb-1">UPI App</label>
                <select
                  value={app}
                  onChange={(e) => setApp(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-[#121c30] border border-[#273859] rounded-lg text-xs text-white focus:outline-none"
                >
                  <option value="Google Pay">Google Pay</option>
                  <option value="PhonePe">PhonePe</option>
                  <option value="Paytm">Paytm</option>
                  <option value="BHIM UPI">BHIM UPI</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] text-slate-400 mb-1">UTR / Ref No.</label>
                <input
                  type="text"
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-[#121c30] border border-[#273859] rounded-lg text-xs text-white focus:outline-none"
                />
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Date (Kab Diya)
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 bg-[#0c1424] border border-[#283959] rounded-xl text-xs text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Time (Samay)
              </label>
              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-3 py-2 bg-[#0c1424] border border-[#283959] rounded-xl text-xs text-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Payment Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3 py-2 bg-[#0c1424] border border-[#283959] rounded-xl text-xs text-white focus:outline-none font-semibold"
            >
              <option value="Completed">Completed (Pura Diya)</option>
              <option value="Partial">Partial (Kuch Baki)</option>
              <option value="Advance">Advance Diya</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Notes
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 bg-[#0c1424] border border-[#283959] rounded-xl text-xs text-white focus:outline-none"
            />
          </div>

          <div className="pt-3 border-t border-[#1d2b45] flex items-center justify-between">
            <button
              type="button"
              onClick={handleDelete}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-950/40 hover:text-rose-300 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete Entry</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold bg-cyan-400 hover:bg-cyan-300 text-slate-950 shadow-md"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
