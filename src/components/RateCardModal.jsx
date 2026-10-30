import React, { useState } from 'react';
import { X, Plus, Trash2, Edit2, Check, IndianRupee, Sparkles, RefreshCcw } from 'lucide-react';

export default function RateCardModal({ isOpen, onClose, rateCard, onSaveRateCard, onResetDefaults }) {
  const [rates, setRates] = useState(rateCard);
  const [editingId, setEditingId] = useState(null);
  const [editPrice, setEditPrice] = useState('');

  // New custom item form
  const [newItemName, setNewItemName] = useState('');
  const [newService, setNewService] = useState('Ironing');
  const [newPrice, setNewPrice] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  if (!isOpen) return null;

  const handleStartEdit = (rate) => {
    setEditingId(rate.id);
    setEditPrice(rate.price.toString());
  };

  const handleSaveEdit = (id) => {
    const updated = rates.map((r) =>
      r.id === id ? { ...r, price: Number(editPrice) || 0 } : r
    );
    setRates(updated);
    onSaveRateCard(updated);
    setEditingId(null);
  };

  const handleDelete = (id) => {
    const updated = rates.filter((r) => r.id !== id);
    setRates(updated);
    onSaveRateCard(updated);
  };

  const handleAddNew = (e) => {
    e.preventDefault();
    if (!newItemName.trim() || !newPrice) return;

    const newEntry = {
      id: 'rate-' + Date.now(),
      itemName: newItemName.trim(),
      service: newService,
      price: Number(newPrice),
      isDefault: false
    };

    const updated = [...rates, newEntry];
    setRates(updated);
    onSaveRateCard(updated);

    // Reset inputs
    setNewItemName('');
    setNewPrice('');
    setShowAddForm(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#10192b] border border-[#23334e] w-full max-w-2xl rounded-2xl p-4 sm:p-6 shadow-2xl relative text-slate-100 max-h-[94vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-[#1d2b45]">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>Customize Rate Card (Item & Service Rates)</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Default: Normal Cloth ₹7, Saree ₹50. Kurti & Washing ke alag rate yahan set karein.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Bar */}
        <div className="py-3 flex items-center justify-between gap-3">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 transition-all shadow-md"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
            <span>+ Naya Item / Service Add Karein</span>
          </button>

          <button
            onClick={() => {
              if (confirm('Default rates restore karna chahte hain?')) {
                onResetDefaults();
                onClose();
              }
            }}
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200 transition-colors"
          >
            <RefreshCcw className="w-3 h-3" />
            <span>Reset Defaults</span>
          </button>
        </div>

        {/* Add New Custom Item Form */}
        {showAddForm && (
          <form
            onSubmit={handleAddNew}
            className="bg-[#152238] border border-amber-500/30 rounded-xl p-3.5 mb-3 space-y-3 animate-in fade-in slide-in-from-top-2"
          >
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Naya Custom Item / Service
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Item Ka Naam</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kurti, Dhoti, Bedsheet"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0c1424] border border-[#283959] rounded-lg text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Service Type</label>
                <select
                  value={newService}
                  onChange={(e) => setNewService(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0c1424] border border-[#283959] rounded-lg text-xs text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="Ironing">Ironing (Istree)</option>
                  <option value="Washing">Washing (Dhulai)</option>
                  <option value="Wash + Iron">Wash + Iron (Dono)</option>
                  <option value="Dry Cleaning">Dry Cleaning</option>
                  <option value="Roll Press / Starch">Roll Press / Charak</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Price per piece (₹)</label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-xs text-slate-400">₹</span>
                  <input
                    type="number"
                    min="1"
                    required
                    placeholder="Rate"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="w-full pl-7 pr-3 py-2 bg-[#0c1424] border border-[#283959] rounded-lg text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-3 py-1 rounded-lg text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg text-xs font-bold bg-amber-400 text-slate-950 hover:bg-amber-300"
              >
                Save Item Rate
              </button>
            </div>
          </form>
        )}

        {/* Rate Cards Table */}
        <div className="overflow-y-auto flex-1 pr-1 border border-[#1e2c45] rounded-xl bg-[#0d1526]">
          <table className="w-full text-left text-xs">
            <thead className="sticky top-0 bg-[#142036] border-b border-[#22334f] text-[11px] font-bold uppercase tracking-wider text-slate-400">
              <tr>
                <th className="py-2.5 px-3">Item Name</th>
                <th className="py-2.5 px-3">Service</th>
                <th className="py-2.5 px-3">Rate (₹ / pc)</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#17253d]">
              {rates.map((rate) => {
                const isEditing = editingId === rate.id;
                return (
                  <tr key={rate.id} className="hover:bg-[#131f33] transition-colors">
                    <td className="py-2.5 px-3 font-semibold text-slate-200">
                      {rate.itemName}
                    </td>
                    <td className="py-2.5 px-3">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        rate.service.toLowerCase().includes('wash')
                          ? 'bg-blue-950/70 text-blue-300 border border-blue-500/30'
                          : rate.service.toLowerCase().includes('dry')
                          ? 'bg-purple-950/70 text-purple-300 border border-purple-500/30'
                          : 'bg-amber-950/70 text-amber-300 border border-amber-500/30'
                      }`}>
                        {rate.service}
                      </span>
                    </td>
                    <td className="py-2.5 px-3">
                      {isEditing ? (
                        <div className="flex items-center gap-1.5">
                          <span className="text-slate-400">₹</span>
                          <input
                            type="number"
                            min="1"
                            value={editPrice}
                            onChange={(e) => setEditPrice(e.target.value)}
                            className="w-20 px-2 py-1 bg-[#090f1a] border border-amber-400 rounded text-xs text-white"
                            autoFocus
                          />
                          <button
                            onClick={() => handleSaveEdit(rate.id)}
                            className="p-1 bg-emerald-500 text-slate-950 rounded hover:bg-emerald-400"
                            title="Save"
                          >
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </button>
                        </div>
                      ) : (
                        <span className="text-sm font-extrabold text-amber-400 font-mono">
                          ₹{rate.price}
                        </span>
                      )}
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      {!isEditing && (
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleStartEdit(rate)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-amber-300 hover:bg-slate-800"
                            title="Edit Rate"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(rate.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="pt-4 mt-3 border-t border-[#1d2b45] flex justify-between items-center text-xs text-slate-400">
          <span>Rates are automatically applied when logging clothes.</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-[#1d2a42] hover:bg-[#253554] text-white transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
