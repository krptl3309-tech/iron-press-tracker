import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, Calendar, Shirt } from 'lucide-react';

export default function AddBatchModal({ isOpen, onClose, rateCard, onAddBatch }) {
  const [dateGiven, setDateGiven] = useState(new Date().toISOString().split('T')[0]);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const [expectedDate, setExpectedDate] = useState(tomorrow.toISOString().split('T')[0]);
  const [status, setStatus] = useState('With Bhaiya');
  const [notes, setNotes] = useState('');

  // Items in this batch
  const [items, setItems] = useState([
    {
      rateId: rateCard[0]?.id || '',
      itemName: rateCard[0]?.itemName || 'Normal Cloth',
      service: rateCard[0]?.service || 'Ironing',
      unitPrice: rateCard[0]?.price || 7,
      qty: 10,
      subtotal: (rateCard[0]?.price || 7) * 10
    }
  ]);

  if (!isOpen) return null;

  const handleSelectItem = (index, rateId) => {
    const selectedRate = rateCard.find((r) => r.id === rateId);
    if (!selectedRate) return;

    const updated = [...items];
    updated[index] = {
      ...updated[index],
      rateId: selectedRate.id,
      itemName: selectedRate.itemName,
      service: selectedRate.service,
      unitPrice: selectedRate.price,
      subtotal: selectedRate.price * updated[index].qty
    };
    setItems(updated);
  };

  const handleQtyChange = (index, newQty) => {
    const qty = Math.max(1, Number(newQty) || 1);
    const updated = [...items];
    updated[index].qty = qty;
    updated[index].subtotal = updated[index].unitPrice * qty;
    setItems(updated);
  };

  const handlePriceChange = (index, newPrice) => {
    const price = Math.max(0, Number(newPrice) || 0);
    const updated = [...items];
    updated[index].unitPrice = price;
    updated[index].subtotal = price * updated[index].qty;
    setItems(updated);
  };

  const handleAddItemRow = () => {
    const nextRate = rateCard[1] || rateCard[0];
    setItems([
      ...items,
      {
        rateId: nextRate?.id || '',
        itemName: nextRate?.itemName || 'Saree',
        service: nextRate?.service || 'Ironing',
        unitPrice: nextRate?.price || 50,
        qty: 1,
        subtotal: nextRate?.price || 50
      }
    ]);
  };

  const handleRemoveRow = (index) => {
    if (items.length <= 1) return;
    setItems(items.filter((_, i) => i !== index));
  };

  const totalPieces = items.reduce((sum, item) => sum + (Number(item.qty) || 0), 0);
  const totalAmount = items.reduce((sum, item) => sum + (Number(item.subtotal) || 0), 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (items.length === 0) return;

    onAddBatch({
      id: 'batch-' + Date.now(),
      dateGiven,
      expectedDate,
      status,
      items,
      totalPieces,
      totalAmount,
      notes
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#10192b] border border-[#23334e] w-full max-w-2xl rounded-2xl p-4 sm:p-6 shadow-2xl relative text-slate-100 max-h-[94vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-[#1d2b45]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
              <Shirt className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white">Kapde Dena (New Batch)</h2>
              <p className="text-[11px] text-slate-400">Laundry Khodiyar ko diye kapde</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto pr-0.5 sm:pr-1 py-3 sm:py-4 space-y-4">
          {/* Dates & Status Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
            <div>
              <label className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Kab Diye (Given Date)
              </label>
              <input
                type="date"
                required
                value={dateGiven}
                onChange={(e) => setDateGiven(e.target.value)}
                className="w-full px-3 py-2 bg-[#0c1424] border border-[#283959] rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Delivery Target
              </label>
              <input
                type="date"
                value={expectedDate}
                onChange={(e) => setExpectedDate(e.target.value)}
                className="w-full px-3 py-2 bg-[#0c1424] border border-[#283959] rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Current Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2 bg-[#0c1424] border border-[#283959] rounded-xl text-xs text-white focus:outline-none focus:border-amber-400 font-semibold"
              >
                <option value="With Bhaiya">🟡 With Bhaiya (Pressing)</option>
                <option value="Ready">🔵 Ready for Pickup</option>
                <option value="Delivered">🟢 Delivered (Kapde Aa Gaye)</option>
              </select>
            </div>
          </div>

          {/* Clothes Items Breakdown Section */}
          <div className="border border-[#1e2d48] rounded-xl p-3 bg-[#0c1424]">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-[11px] sm:text-xs font-bold text-amber-400 uppercase tracking-wider">
                Kapdo Ki List (Items)
              </span>
              <button
                type="button"
                onClick={handleAddItemRow}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-[#17253d] text-amber-300 hover:bg-[#203252] border border-[#263c63]"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Kapda Jodein</span>
              </button>
            </div>

            <div className="space-y-2.5">
              {items.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#111c30] p-3 rounded-xl border border-[#1b2a47] space-y-2.5"
                >
                  {/* Row 1: Item Selection & Delete */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex-1">
                      <select
                        value={item.rateId}
                        onChange={(e) => handleSelectItem(idx, e.target.value)}
                        className="w-full px-2.5 py-2 bg-[#080e1b] border border-[#273859] rounded-lg text-xs font-semibold text-white focus:outline-none focus:border-amber-400"
                      >
                        {rateCard.map((r) => (
                          <option key={r.id} value={r.id}>
                            {r.itemName} ({r.service}) - ₹{r.price}
                          </option>
                        ))}
                      </select>
                    </div>

                    {items.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveRow(idx)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors shrink-0"
                        title="Remove Item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {/* Row 2: Touch Quantity Stepper, Rate, and Subtotal */}
                  <div className="flex items-center justify-between gap-2 pt-1 border-t border-[#17243c]">
                    {/* Pieces Stepper with touch buttons */}
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] text-slate-400 uppercase font-semibold mr-0.5">Pcs:</span>
                      <button
                        type="button"
                        onClick={() => handleQtyChange(idx, item.qty - 1)}
                        className="w-7 h-7 rounded-lg bg-[#080e1b] border border-[#273859] text-slate-200 flex items-center justify-center hover:bg-slate-800 active:scale-95"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={item.qty}
                        onChange={(e) => handleQtyChange(idx, e.target.value)}
                        className="w-11 px-1 py-1 bg-[#080e1b] border border-[#273859] rounded-lg text-xs text-white text-center font-bold"
                      />
                      <button
                        type="button"
                        onClick={() => handleQtyChange(idx, item.qty + 1)}
                        className="w-7 h-7 rounded-lg bg-[#080e1b] border border-[#273859] text-slate-200 flex items-center justify-center hover:bg-slate-800 active:scale-95"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Rate per pc */}
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] text-slate-400">Rate:</span>
                      <div className="relative">
                        <span className="absolute left-1.5 top-1 text-[10px] text-slate-400">₹</span>
                        <input
                          type="number"
                          min="0"
                          value={item.unitPrice}
                          onChange={(e) => handlePriceChange(idx, e.target.value)}
                          className="w-14 pl-4 pr-1 py-1 bg-[#080e1b] border border-[#273859] rounded-lg text-xs text-amber-400 font-bold text-center"
                        />
                      </div>
                    </div>

                    {/* Total for this item */}
                    <div className="text-right">
                      <span className="text-xs sm:text-sm font-black text-white font-mono">
                        ₹{item.subtotal}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Total Summary Footer Box */}
            <div className="mt-3 pt-2.5 border-t border-[#1b2b48] flex items-center justify-between text-xs">
              <span className="text-slate-300 font-semibold">
                Total Pieces: <span className="text-amber-400 font-bold">{totalPieces} pcs</span>
              </span>
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400 text-[11px]">Total:</span>
                <span className="text-base font-black text-white bg-slate-900/90 px-2.5 py-0.5 rounded-lg border border-[#27395b]">
                  ₹{totalAmount.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Instructions / Notes (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. White shirts kadak starch press"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 bg-[#0c1424] border border-[#283959] rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Modal Actions */}
          <div className="pt-3 border-t border-[#1d2b45] flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-lg shadow-amber-400/20 active:scale-95"
            >
              Save Batch (₹{totalAmount})
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
