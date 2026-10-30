import React from 'react';
import { CheckCircle2, X } from 'lucide-react';

export default function NotificationToast({ notification, onClose }) {
  if (!notification) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 px-4 py-3 bg-[#132238] border border-amber-400/50 rounded-xl shadow-2xl shadow-black/80 animate-in slide-in-from-bottom-5 duration-200">
      <div className="text-amber-400">
        <CheckCircle2 className="w-5 h-5" />
      </div>
      <div>
        <p className="text-xs font-bold text-white">{notification.title}</p>
        <p className="text-[11px] text-slate-300">{notification.message}</p>
      </div>
      <button
        onClick={onClose}
        className="ml-2 text-slate-400 hover:text-white p-1"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
