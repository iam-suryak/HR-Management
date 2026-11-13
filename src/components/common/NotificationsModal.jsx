import React from 'react';
import { Bell, CheckCircle2, MessageSquare, Clock, X, Calendar, Sparkles } from 'lucide-react';

export default function NotificationsModal({ isOpen, onClose, onAction }) {
  if (!isOpen) return null;

  const notifications = [
    {
      id: 1,
      title: "Upcoming Meeting",
      desc: "Townhall Meeting starts in 15 mins on Google Meet.",
      time: "10m ago",
      icon: Clock,
      unread: true,
      color: "bg-purple-100 text-[#635BFF]"
    },
    {
      id: 2,
      title: "New Task Assigned",
      desc: "Wiring Dashboard Analytics assigned to you by Alexander Vance.",
      time: "1h ago",
      icon: CheckCircle2,
      unread: true,
      color: "bg-emerald-100 text-emerald-600"
    },
    {
      id: 3,
      title: "Direct Message",
      desc: "Alexander: 'Hey Tonald, please check the Q4 design tokens handoff.'",
      time: "2h ago",
      icon: MessageSquare,
      unread: false,
      color: "bg-blue-100 text-blue-600"
    },
    {
      id: 4,
      title: "Presence Verified",
      desc: "Clock-in successful at HQ Office (Jalan Pemuda radius verified).",
      time: "Today, 08:15 AM",
      icon: Sparkles,
      unread: false,
      color: "bg-amber-100 text-amber-600"
    }
  ];

  return (
    <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-[2px] flex items-end justify-center select-none animate-in fade-in duration-200">
      <div className="w-full bg-white rounded-t-[36px] px-6 pt-5 pb-8 shadow-2xl flex flex-col max-h-[85%] border-t border-slate-100">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-xl bg-[#EDE9FE] text-[#635BFF] flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Notifications & Activity</h3>
          </div>

          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Notification List */}
        <div className="flex-1 overflow-y-auto py-3 space-y-2.5">
          {notifications.map(item => {
            const Icon = item.icon;
            return (
              <div 
                key={item.id}
                onClick={() => {
                  onAction(item.title);
                  onClose();
                }}
                className={`p-3 rounded-2xl border transition flex items-start space-x-3 cursor-pointer ${
                  item.unread 
                    ? 'bg-[#F9F8FF] border-[#635BFF]/30 hover:border-[#635BFF]' 
                    : 'bg-white border-slate-100 hover:bg-slate-50'
                }`}
              >
                <div className={`w-8 h-8 rounded-xl ${item.color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                  <Icon className="w-4 h-4" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-900 leading-snug">{item.title}</h4>
                    <span className="text-[10px] text-slate-400 font-medium">{item.time}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                    {item.desc}
                  </p>
                </div>

                {item.unread && (
                  <span className="w-2 h-2 rounded-full bg-[#635BFF] flex-shrink-0 mt-2" />
                )}
              </div>
            );
          })}
        </div>

        {/* Footer Action */}
        <div className="pt-2">
          <button
            onClick={() => {
              onAction("All notifications marked as read");
              onClose();
            }}
            className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition"
          >
            Mark All as Read
          </button>
        </div>

      </div>
    </div>
  );
}
