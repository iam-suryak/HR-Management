import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, 
  MapPin, Users, Video, Plus, CheckCircle2, AlertCircle, ArrowUpRight 
} from 'lucide-react';

export default function CalendarTab({ onShowNotification }) {
  const [selectedDate, setSelectedDate] = useState(27);
  const [filter, setFilter] = useState('all');

  const daysOfWeek = [
    { day: 'Sun', date: 25, isWeekend: true },
    { day: 'Mon', date: 26, isWeekend: false },
    { day: 'Tue', date: 27, isWeekend: false, isToday: true },
    { day: 'Wed', date: 28, isWeekend: false },
    { day: 'Thu', date: 29, isWeekend: false },
    { day: 'Fri', date: 30, isWeekend: false },
    { day: 'Sat', date: 1, isWeekend: true, nextMonth: true },
  ];

  const meetings = [
    {
      id: 1,
      title: "Daily Standup & Sprint Sync",
      time: "09:00 - 10:00",
      location: "Room 4B • Zoom",
      isOnline: true,
      tag: "Engineering",
      tagColor: "bg-purple-100 text-[#635BFF]",
      attendees: [
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&auto=format&fit=crop&q=80"
      ],
      status: "Upcoming",
      statusColor: "text-emerald-600 bg-emerald-50 border-emerald-200"
    },
    {
      id: 2,
      title: "Design System Architecture Review",
      time: "11:30 - 12:30",
      location: "Design Studio & Figma Live",
      isOnline: true,
      tag: "UI/UX",
      tagColor: "bg-indigo-100 text-indigo-700",
      attendees: [
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&auto=format&fit=crop&q=80"
      ],
      status: "Confirmed",
      statusColor: "text-blue-600 bg-blue-50 border-blue-200"
    },
    {
      id: 3,
      title: "1-on-1 Performance Check-in",
      time: "14:00 - 14:45",
      location: "Manager Office • Room 2C",
      isOnline: false,
      tag: "HR & 1-on-1",
      tagColor: "bg-amber-100 text-amber-800",
      attendees: [
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&auto=format&fit=crop&q=80"
      ],
      status: "Scheduled",
      statusColor: "text-amber-700 bg-amber-50 border-amber-200"
    },
    {
      id: 4,
      title: "QA Production Release Window",
      time: "16:30 - 17:15",
      location: "DevOps War Room",
      isOnline: false,
      tag: "Deployment",
      tagColor: "bg-emerald-100 text-emerald-800",
      attendees: [
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&auto=format&fit=crop&q=80"
      ],
      status: "Pending",
      statusColor: "text-slate-600 bg-slate-100 border-slate-200"
    }
  ];

  const handleDaySelect = (dayObj) => {
    setSelectedDate(dayObj.date);
    if (onShowNotification) {
      onShowNotification({
        title: `Calendar: ${dayObj.day}, ${dayObj.date} April`,
        message: dayObj.isWeekend 
          ? "Weekend • Off Duty" 
          : "Work day: 08:30 - 17:30. 4 meetings scheduled.",
        type: "info"
      });
    }
  };

  const handleJoinMeeting = (meeting) => {
    if (onShowNotification) {
      onShowNotification({
        title: `Joining: ${meeting.title}`,
        message: `Connecting to ${meeting.location}...`,
        type: "success"
      });
    }
  };

  const handleRequestLeave = () => {
    if (onShowNotification) {
      onShowNotification({
        title: "Leave Request Submitted",
        message: "Your time-off request was sent to HR & Manager for approval.",
        type: "success"
      });
    }
  };

  return (
    <div className="flex-1 p-3.5 space-y-3.5 overflow-y-auto animate-in fade-in duration-200">
      
      {/* Month Header with Navigation */}
      <div className="bg-white rounded-2xl p-3 border border-slate-100/90 shadow-2xs flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            SCHEDULE & TIMELINE
          </span>
          <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-1.5">
            <span>April 2026</span>
            <span className="text-[10px] font-semibold bg-[#EEF2FF] text-[#635BFF] px-2 py-0.5 rounded-full">
              Week 17
            </span>
          </h3>
        </div>

        <div className="flex items-center space-x-1">
          <button 
            type="button"
            onClick={() => onShowNotification?.({ title: "Calendar", message: "Viewing previous week", type: "info" })}
            className="w-7 h-7 rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-90 flex items-center justify-center text-slate-600 transition cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button 
            type="button"
            onClick={() => onShowNotification?.({ title: "Calendar", message: "Viewing next week", type: "info" })}
            className="w-7 h-7 rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-90 flex items-center justify-center text-slate-600 transition cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 7-Day Interactive Date Carousel */}
      <div className="bg-white rounded-2xl p-2.5 border border-slate-100/90 shadow-2xs">
        <div className="grid grid-cols-7 gap-1">
          {daysOfWeek.map((d, idx) => {
            const isSelected = selectedDate === d.date;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleDaySelect(d)}
                className={`flex flex-col items-center py-2 px-1 rounded-xl transition-all cursor-pointer select-none active:scale-95 ${
                  isSelected 
                    ? 'bg-[#635BFF] text-white shadow-md shadow-[#635BFF]/30 scale-102 font-bold' 
                    : d.isWeekend 
                      ? 'bg-slate-50 text-slate-400 hover:bg-slate-100' 
                      : 'hover:bg-slate-50 text-slate-700'
                }`}
              >
                <span className={`text-[10px] ${isSelected ? 'text-purple-100 font-medium' : 'text-slate-400'}`}>
                  {d.day}
                </span>
                <span className={`text-xs mt-0.5 font-bold ${isSelected ? 'text-white' : 'text-slate-800'}`}>
                  {d.date}
                </span>
                {d.isToday && (
                  <span className={`w-1 h-1 rounded-full mt-1 ${isSelected ? 'bg-white' : 'bg-[#635BFF]'}`} />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Day Status & Summary */}
      <div className="bg-gradient-to-r from-[#635BFF]/10 via-[#7B5EF8]/10 to-indigo-50 border border-[#635BFF]/20 rounded-2xl p-3 flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#635BFF] text-white flex items-center justify-center shadow-xs flex-shrink-0">
            <CalendarIcon className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900">Tuesday, 27 April 2026</div>
            <div className="text-[10.5px] text-[#635BFF] font-semibold flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Working Day (08:30 - 17:30) • 4 Events</span>
            </div>
          </div>
        </div>

        <button 
          type="button"
          onClick={handleRequestLeave}
          className="text-[10.5px] font-bold bg-white text-[#635BFF] hover:bg-slate-50 active:scale-95 px-2.5 py-1.5 rounded-xl border border-[#635BFF]/30 shadow-2xs cursor-pointer transition flex items-center space-x-1 flex-shrink-0"
        >
          <Plus className="w-3 h-3 stroke-[2.5]" />
          <span>Leave</span>
        </button>
      </div>

      {/* Meetings List */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            TODAY'S SCHEDULE
          </span>
          <span className="text-[10.5px] font-bold text-slate-500">
            {meetings.length} Meetings
          </span>
        </div>

        {meetings.map((m) => (
          <div 
            key={m.id}
            className="bg-white rounded-2xl p-3 border border-slate-100/90 shadow-2xs hover:border-[#635BFF]/30 transition-all duration-150 space-y-2 group"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <div className="flex items-center space-x-1.5 mb-1">
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md ${m.tagColor}`}>
                    {m.tag}
                  </span>
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md border ${m.statusColor}`}>
                    {m.status}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 truncate group-hover:text-[#635BFF] transition">
                  {m.title}
                </h4>
              </div>

              <button
                type="button"
                onClick={() => handleJoinMeeting(m)}
                className="w-7 h-7 rounded-xl bg-slate-100 group-hover:bg-[#635BFF] text-slate-600 group-hover:text-white flex items-center justify-center transition active:scale-90 flex-shrink-0 cursor-pointer shadow-2xs"
                title="Join / View Meeting"
              >
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center justify-between text-[10.5px] text-slate-500 pt-1 border-t border-slate-50">
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3 text-slate-400" />
                <span className="font-semibold text-slate-700">{m.time}</span>
              </div>

              <div className="flex items-center space-x-1 truncate max-w-[150px]">
                {m.isOnline ? <Video className="w-3 h-3 text-[#635BFF]" /> : <MapPin className="w-3 h-3 text-slate-400" />}
                <span className="truncate">{m.location}</span>
              </div>

              <div className="flex -space-x-1.5 flex-shrink-0">
                {m.attendees.map((att, i) => (
                  <img 
                    key={i} 
                    src={att} 
                    alt="Attendee" 
                    className="w-4 h-4 rounded-full ring-1 ring-white object-cover" 
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Leave Balance & Public Holidays Card */}
      <div className="bg-white rounded-2xl p-3 border border-slate-100/90 shadow-2xs space-y-2">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
          TIME-OFF & HOLIDAYS
        </span>

        <div className="grid grid-cols-2 gap-2">
          <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-100">
            <span className="text-[10px] text-slate-500 block">Annual Leave</span>
            <div className="flex items-baseline space-x-1 mt-0.5">
              <span className="text-base font-bold text-slate-900">12</span>
              <span className="text-[10px] text-slate-400 font-medium">/ 14 Days Left</span>
            </div>
          </div>

          <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-100">
            <span className="text-[10px] text-slate-500 block">Next Holiday</span>
            <div className="text-xs font-bold text-[#635BFF] mt-0.5 truncate">
              Labour Day
            </div>
            <span className="text-[9.5px] text-slate-400 block">01 May 2026</span>
          </div>
        </div>
      </div>

    </div>
  );
}
