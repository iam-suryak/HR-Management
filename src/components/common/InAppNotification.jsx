import React, { useEffect } from 'react';
import { Bell, CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function InAppNotification({ notification, onClose }) {
  useEffect(() => {
    if (!notification) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [notification, onClose]);

  if (!notification) return null;

  const { title, message, type = 'info' } = notification;

  return (
    <div className="absolute top-2 left-3 right-3 z-50 animate-in slide-in-from-top-4 fade-in duration-300 pointer-events-auto">
      <div className="bg-[#181920]/95 backdrop-blur-md text-white p-3 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.35)] border border-slate-700/80 flex items-start space-x-3">
        
        {/* Icon */}
        <div className="w-8 h-8 rounded-xl bg-[#635BFF] flex items-center justify-center text-white flex-shrink-0 mt-0.5 shadow-sm shadow-[#635BFF]/40">
          {type === 'success' ? (
            <CheckCircle2 className="w-4 h-4" />
          ) : type === 'warning' ? (
            <AlertCircle className="w-4 h-4 text-amber-300" />
          ) : (
            <Bell className="w-4 h-4" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 pr-1">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-white truncate">{title || "Work Mate"}</h4>
            <span className="text-[10px] text-slate-400 font-medium">Just now</span>
          </div>
          <p className="text-[11px] text-slate-300 mt-0.5 leading-snug break-words">
            {message}
          </p>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white p-1 rounded-lg transition"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
