import React from 'react';
import { X, Shirt, Calendar, Clock, Trash2, CheckCircle2 } from 'lucide-react';

export default function BatchDetailsModal({ isOpen, onClose, batch, onUpdateStatus, onDeleteBatch }) {
  if (!isOpen || !batch) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#10192b] border border-[#23334e] w-full max-w-lg rounded-2xl p-4 sm:p-6 shadow-2xl relative text-slate-100 max-h-[94vh] flex flex-col">
        <div className="flex items-center justify-between pb-3.5 border-b border-[#1d2b45]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
              <Shirt className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white">Batch Details ({batch.id})</h2>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                  batch.status === 'Delivered'
                    ? 'bg-emerald-950 text-emerald-400 border-emerald-500/40'
                    : batch.status === 'Ready'
                    ? 'bg-blue-950 text-blue-400 border-blue-500/40'
                    : 'bg-amber-950 text-amber-400 border-amber-500/40'
                }`}>
                  {batch.status}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">Given on {batch.dateGiven}</p>
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
          {/* Timeline & Status Changer */}
          <div className="bg-[#0c1424] border border-[#1e2d48] rounded-xl p-3 flex items-center justify-between">
            <span className="text-xs text-slate-400">Update Status:</span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => onUpdateStatus(batch.id, 'With Bhaiya')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${
                  batch.status === 'With Bhaiya'
                    ? 'bg-amber-950 text-amber-300 border-amber-500'
                    : 'text-slate-400 border-slate-700 hover:bg-slate-800'
                }`}
              >
                With Bhaiya
              </button>
              <button
                onClick={() => onUpdateStatus(batch.id, 'Ready')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${
                  batch.status === 'Ready'
                    ? 'bg-blue-950 text-blue-300 border-blue-500'
                    : 'text-slate-400 border-slate-700 hover:bg-slate-800'
                }`}
              >
                Ready
              </button>
              <button
                onClick={() => onUpdateStatus(batch.id, 'Delivered')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${
                  batch.status === 'Delivered'
                    ? 'bg-emerald-950 text-emerald-300 border-emerald-500'
                    : 'text-slate-400 border-slate-700 hover:bg-slate-800'
                }`}
              >
                Delivered
              </button>
            </div>
          </div>

          {/* Items breakdown list */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Kapdo Ki List ({batch.totalPieces} pieces)
            </div>
            <div className="bg-[#0c1424] border border-[#1e2d48] rounded-xl divide-y divide-[#17243b] overflow-hidden">
              {batch.items?.map((item, idx) => (
                <div key={idx} className="p-3 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-slate-200">{item.itemName}</span>
                    <span className="text-slate-400 ml-2">({item.service})</span>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      {item.qty} pcs × ₹{item.unitPrice}
                    </div>
                  </div>
                  <div className="text-sm font-bold text-white font-mono">
                    ₹{item.subtotal}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Batch Bill & Dates Summary */}
          <div className="grid grid-cols-2 gap-3 bg-[#0c1424] border border-[#1e2d48] p-3 rounded-xl text-xs">
            <div>
              <span className="text-slate-400 block mb-0.5">Expected Delivery:</span>
              <span className="font-semibold text-slate-200">{batch.expectedDate || 'N/A'}</span>
            </div>
            <div className="text-right">
              <span className="text-slate-400 block mb-0.5">Total Batch Cost:</span>
              <span className="text-base font-extrabold text-amber-400 font-mono">
                ₹{batch.totalAmount?.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {batch.notes && (
            <div className="p-3 bg-[#0c1424] border border-[#1e2d48] rounded-xl text-xs text-slate-300">
              <span className="text-slate-400 font-medium">Notes: </span>
              {batch.notes}
            </div>
          )}

          {/* Delete Option */}
          <div className="pt-3 border-t border-[#1d2b45] flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                if (confirm('Kya aap is batch ko delete karna chahte hain?')) {
                  onDeleteBatch(batch.id);
                  onClose();
                }
              }}
              className="flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 px-3 py-1.5 rounded-lg transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete Batch</span>
            </button>

            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl text-xs font-bold bg-[#1d2a42] hover:bg-[#253554] text-white"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
