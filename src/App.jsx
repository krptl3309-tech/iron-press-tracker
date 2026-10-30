import React, { useState, useEffect, useMemo } from 'react';
import {
  defaultBhaiyaDetails,
  defaultRateCard,
  defaultBatches,
  defaultPayments
} from './data/defaultData';
import Header from './components/Header';
import SummaryCards from './components/SummaryCards';
import BatchTable from './components/BatchTable';
import PaymentHistoryTable from './components/PaymentHistoryTable';
import RateSummaryCard from './components/RateSummaryCard';
import AddBatchModal from './components/AddBatchModal';
import PaymentModal from './components/PaymentModal';
import EditPaymentModal from './components/EditPaymentModal';
import RateCardModal from './components/RateCardModal';
import WhatsAppShareModal from './components/WhatsAppShareModal';
import BatchDetailsModal from './components/BatchDetailsModal';
import NotificationToast from './components/NotificationToast';
import { MessageCircle, CreditCard, Sparkles, AlertCircle, ArrowRight } from 'lucide-react';

export default function App() {
  // Safe helper to read LocalStorage
  const getStored = (key, fallback) => {
    try {
      const item = localStorage.getItem(key);
      if (!item || item === 'undefined' || item === 'null') return fallback;
      const parsed = JSON.parse(item);
      return parsed !== null && parsed !== undefined ? parsed : fallback;
    } catch {
      return fallback;
    }
  };

  // LocalStorage-backed state with bulletproof fallbacks
  const [bhaiya, setBhaiya] = useState(() => {
    const val = getStored('istri_bhaiya', defaultBhaiyaDetails);
    return val && typeof val === 'object' ? val : defaultBhaiyaDetails;
  });

  const [rateCard, setRateCard] = useState(() => {
    const val = getStored('istri_rates', defaultRateCard);
    return Array.isArray(val) && val.length > 0 ? val : defaultRateCard;
  });

  const [batches, setBatches] = useState(() => {
    const val = getStored('istri_batches', []);
    return Array.isArray(val) ? val : [];
  });

  const [payments, setPayments] = useState(() => {
    const val = getStored('istri_payments', []);
    return Array.isArray(val) ? val : [];
  });

  // Save to LocalStorage on updates
  useEffect(() => {
    try {
      localStorage.setItem('istri_bhaiya', JSON.stringify(bhaiya || defaultBhaiyaDetails));
    } catch (e) {
      console.error(e);
    }
  }, [bhaiya]);

  useEffect(() => {
    try {
      localStorage.setItem('istri_rates', JSON.stringify(rateCard || defaultRateCard));
    } catch (e) {
      console.error(e);
    }
  }, [rateCard]);

  useEffect(() => {
    try {
      localStorage.setItem('istri_batches', JSON.stringify(batches || []));
    } catch (e) {
      console.error(e);
    }
  }, [batches]);

  useEffect(() => {
    try {
      localStorage.setItem('istri_payments', JSON.stringify(payments || []));
    } catch (e) {
      console.error(e);
    }
  }, [payments]);

  // Modal states
  const [isAddBatchOpen, setIsAddBatchOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isRateCardOpen, setIsRateCardOpen] = useState(false);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [editingPayment, setEditingPayment] = useState(null);
  const [notification, setNotification] = useState(null);

  const showToast = (title, message) => {
    setNotification({ title, message });
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  // Safe Computations (Will NEVER throw on null/undefined)
  const safeBatches = Array.isArray(batches) ? batches : [];
  const safePayments = Array.isArray(payments) ? payments : [];

  const totalExpense = useMemo(() => {
    return safeBatches.reduce((sum, b) => sum + (Number(b?.totalAmount) || 0), 0);
  }, [safeBatches]);

  const totalPaid = useMemo(() => {
    return safePayments.reduce((sum, p) => sum + (Number(p?.amount) || 0), 0);
  }, [safePayments]);

  const pendingDue = totalExpense - totalPaid;

  const totalClothesCount = useMemo(() => {
    return safeBatches.reduce((sum, b) => sum + (Number(b?.totalPieces) || 0), 0);
  }, [safeBatches]);

  const clothesInPress = useMemo(() => {
    return safeBatches
      .filter((b) => b?.status !== 'Delivered')
      .reduce((sum, b) => sum + (Number(b?.totalPieces) || 0), 0);
  }, [safeBatches]);

  // Handlers
  const handleAddBatch = (newBatch) => {
    setBatches([newBatch, ...batches]);
    showToast('Kapde Batch Added', `${newBatch.totalPieces} pieces diye gaye (₹${newBatch.totalAmount})`);
  };

  const handleUpdateBatchStatus = (batchId, status) => {
    setBatches(batches.map((b) => (b.id === batchId ? { ...b, status } : b)));
    if (selectedBatch && selectedBatch.id === batchId) {
      setSelectedBatch({ ...selectedBatch, status });
    }
    showToast('Status Updated', `Batch status changed to ${status}`);
  };

  const handleDeleteBatch = (batchId) => {
    setBatches(batches.filter((b) => b.id !== batchId));
    showToast('Batch Deleted', 'Batch record hata diya gaya');
  };

  const handleAddPayment = (newPayment) => {
    setPayments([newPayment, ...payments]);
    showToast('Payment Saved', `₹${newPayment.amount} via ${newPayment.app || newPayment.mode} record ho gaya`);
  };

  const handleSavePayment = (updatedPayment) => {
    setPayments(payments.map((p) => (p.id === updatedPayment.id ? updatedPayment : p)));
    showToast('Payment Updated', `Payment details safaltapoorvak update ho gaye`);
  };

  const handleDeletePayment = (paymentId) => {
    setPayments(payments.filter((p) => p.id !== paymentId));
    showToast('Payment Deleted', 'Payment entry delete kar di gayi');
  };

  const handleSaveRateCard = (updatedRates) => {
    setRateCard(updatedRates);
    showToast('Rates Updated', 'Rate list update ho gayi');
  };

  const handleResetDefaults = () => {
    setRateCard(defaultRateCard);
    showToast('Rates Reset', 'Default ₹7 per cloth & ₹50 saree restore ho gaya');
  };

  const handleResetAllToZero = () => {
    if (confirm('Kya aap sach me sabhi batches aur payments 0 karna chahte hain? Sab khata fresh shuru hoga.')) {
      setBatches([]);
      setPayments([]);
      setBhaiya(defaultBhaiyaDetails);
      localStorage.setItem('istri_scratch_clean_v3', 'true');
      localStorage.setItem('istri_batches', JSON.stringify([]));
      localStorage.setItem('istri_payments', JSON.stringify([]));
      localStorage.setItem('istri_bhaiya', JSON.stringify(defaultBhaiyaDetails));
      showToast('Khata Reset to 0', 'Sab history aur payment 0 ho gayi!');
    }
  };

  return (
    <div className="min-h-screen bg-[#090f1d] text-slate-100 flex flex-col font-sans">
      {/* Top Navbar */}
      <Header
        bhaiya={bhaiya}
        onOpenAddBatch={() => setIsAddBatchOpen(true)}
        onOpenPayment={() => setIsPaymentOpen(true)}
        onOpenRateCard={() => setIsRateCardOpen(true)}
        onOpenWhatsAppShare={() => setIsWhatsAppOpen(true)}
        onResetAllToZero={handleResetAllToZero}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-6 lg:p-8 space-y-3.5 sm:space-y-6 pb-24 sm:pb-8">
        {/* KPI Summary Cards */}
        <SummaryCards
          totalExpense={totalExpense}
          totalPaid={totalPaid}
          pendingDue={pendingDue}
          clothesInPress={clothesInPress}
          totalClothesCount={totalClothesCount}
          onQuickSettle={() => setIsPaymentOpen(true)}
        />

        {/* Quick Alert & WhatsApp Banner */}
        <div className="bg-[#121c2e] border border-[#21304a] rounded-2xl p-3.5 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h3 className="text-xs sm:text-base font-bold text-white">
                Laundry Khodiyar Ka Hisaab WhatsApp Bhejna Hai?
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">
                Number <strong className="text-slate-200">+91 {bhaiya.phone}</strong> save hai. 1-click me summary send karein.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:flex sm:items-center gap-2">
            <button
              onClick={() => setIsWhatsAppOpen(true)}
              className="flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-[#25D366] hover:bg-[#20ba59] text-slate-950 transition-all shadow-md active:scale-95"
            >
              <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-slate-950" />
              <span>WhatsApp Hisaab</span>
            </button>
            {pendingDue > 0 ? (
              <button
                onClick={() => setIsPaymentOpen(true)}
                className="flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 transition-all shadow-md active:scale-95"
              >
                <CreditCard className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-950" />
                <span>Chukayein (₹{pendingDue})</span>
              </button>
            ) : (
              <button
                onClick={() => setIsPaymentOpen(true)}
                className="flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-[#17253d] text-slate-200 hover:bg-[#1f3252] border border-[#263c63]"
              >
                <CreditCard className="w-3.5 h-3.5 text-slate-400" />
                <span>+ Payment Diya</span>
              </button>
            )}
          </div>
        </div>

        {/* Main Content Layout: Batches on Left/Top, Payments on Right/Bottom */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-start">
          {/* Batches Table (7 Cols) */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6">
            <BatchTable
              batches={batches}
              onOpenAddBatch={() => setIsAddBatchOpen(true)}
              onSelectBatch={(batch) => setSelectedBatch(batch)}
            />
          </div>

          {/* Right Column: Payments Table + Rate Summary (5 Cols) */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-6">
            <PaymentHistoryTable
              payments={payments}
              onOpenAddPayment={() => setIsPaymentOpen(true)}
              onEditPayment={(pay) => setEditingPayment(pay)}
            />

            <RateSummaryCard
              rateCard={rateCard}
              onOpenRateCard={() => setIsRateCardOpen(true)}
            />
          </div>
        </div>
      </main>

      {/* Mobile Sticky Bottom Quick Action Bar */}
      <div className="sm:hidden fixed bottom-0 inset-x-0 bg-[#0a1120]/95 backdrop-blur-lg border-t border-[#1f2b42] px-3 py-2 z-40 flex items-center justify-around gap-2 shadow-2xl">
        <button
          onClick={() => setIsAddBatchOpen(true)}
          className="flex-1 flex items-center justify-center gap-1 py-2 rounded-xl bg-amber-400 text-slate-950 text-xs font-bold shadow-md active:scale-95"
        >
          <Plus className="w-3.5 h-3.5 stroke-[3]" />
          <span>+ Kapde Diye</span>
        </button>

        <button
          onClick={() => setIsPaymentOpen(true)}
          className="flex-1 flex items-center justify-center gap-1 py-2 rounded-xl bg-emerald-500 text-slate-950 text-xs font-bold shadow-md active:scale-95"
        >
          <CreditCard className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>+ Payment</span>
        </button>

        <button
          onClick={() => setIsWhatsAppOpen(true)}
          className="p-2 rounded-xl bg-[#25D366] text-slate-950 font-bold active:scale-95 shrink-0"
          title="WhatsApp Hisaab"
        >
          <MessageCircle className="w-4 h-4 fill-slate-950" />
        </button>
      </div>

      {/* Footer */}
      <footer className="border-t border-[#182338] py-4 text-center text-[11px] text-slate-400">
        <p>IstriKhata • Laundry Khodiyar Expense Tracker • Localhost:5174</p>
      </footer>

      {/* Modals */}
      <AddBatchModal
        isOpen={isAddBatchOpen}
        onClose={() => setIsAddBatchOpen(false)}
        rateCard={rateCard}
        onAddBatch={handleAddBatch}
      />

      <PaymentModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        onAddPayment={handleAddPayment}
      />

      <EditPaymentModal
        isOpen={!!editingPayment}
        payment={editingPayment}
        onClose={() => setEditingPayment(null)}
        onSavePayment={handleSavePayment}
        onDeletePayment={handleDeletePayment}
      />

      <RateCardModal
        isOpen={isRateCardOpen}
        onClose={() => setIsRateCardOpen(false)}
        rateCard={rateCard}
        onSaveRateCard={handleSaveRateCard}
        onResetDefaults={handleResetDefaults}
      />

      <WhatsAppShareModal
        isOpen={isWhatsAppOpen}
        onClose={() => setIsWhatsAppOpen(false)}
        bhaiya={bhaiya}
        totalExpense={totalExpense}
        totalPaid={totalPaid}
        pendingDue={pendingDue}
        clothesInPress={clothesInPress}
        totalClothesCount={totalClothesCount}
      />

      <BatchDetailsModal
        isOpen={!!selectedBatch}
        batch={selectedBatch}
        onClose={() => setSelectedBatch(null)}
        onUpdateStatus={handleUpdateBatchStatus}
        onDeleteBatch={handleDeleteBatch}
      />

      {/* Notification Toast */}
      <NotificationToast
        notification={notification}
        onClose={() => setNotification(null)}
      />
    </div>
  );
}
