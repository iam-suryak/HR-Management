import React from 'react';
import { Wifi, Battery, Signal } from 'lucide-react';

export default function DeviceFrame({ 
  children, 
  time = "08:15",
  title = "Screen Preview",
  subtitle
}) {
  return (
    <div className="flex flex-col items-center">
      {/* Screen Title Pill above the phone (helpful for presentation) */}
      {title && (
        <div className="mb-3 text-center">
          <span className="text-[11px] font-mono text-purple-300 bg-purple-950/70 border border-purple-800/60 px-3 py-1 rounded-full font-semibold shadow-xs">
            {title}
          </span>
          {subtitle && (
            <p className="text-[11px] text-slate-400 mt-1 max-w-[320px]">{subtitle}</p>
          )}
        </div>
      )}

      {/* Phone Body */}
      <div className="relative w-[375px] h-[780px] bg-[#1A1A1E] rounded-[52px] p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.12)] ring-1 ring-slate-800 flex flex-col flex-shrink-0">
        
        {/* Hardware buttons on sides */}
        <div className="absolute -left-[4px] top-[110px] w-[4px] h-[26px] bg-slate-700 rounded-l-md" />
        <div className="absolute -left-[4px] top-[150px] w-[4px] h-[45px] bg-slate-700 rounded-l-md" />
        <div className="absolute -left-[4px] top-[205px] w-[4px] h-[45px] bg-slate-700 rounded-l-md" />
        <div className="absolute -right-[4px] top-[160px] w-[4px] h-[70px] bg-slate-700 rounded-r-md" />

        {/* Inner Screen */}
        <div className="relative w-full h-full bg-white rounded-[42px] overflow-hidden flex flex-col shadow-inner select-none">
          
          {/* iOS Top Status Bar matching 08:15 in Screenshots */}
          <div className="relative z-30 pt-3 px-6 pb-2 flex items-center justify-between text-slate-900 text-xs font-bold bg-transparent">
            <span>{time}</span>

            {/* Dynamic Island / Speaker notch */}
            <div className="absolute left-1/2 -translate-x-1/2 top-2.5 h-[26px] w-[100px] bg-black rounded-full flex items-center justify-between px-2.5 shadow-sm">
              <div className="w-2 h-2 rounded-full bg-[#635BFF] animate-pulse" />
              <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-700" />
            </div>

            <div className="flex items-center space-x-1.5 text-slate-800">
              <Signal className="w-3.5 h-3.5 fill-current" />
              <Wifi className="w-3.5 h-3.5" />
              <Battery className="w-4 h-4 fill-slate-900" />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden relative flex flex-col bg-white">
            {children}
          </div>

          {/* iOS Home Indicator Bar */}
          <div className="absolute bottom-1 left-0 right-0 h-4 flex items-center justify-center pointer-events-none z-40">
            <div className="w-28 h-1 bg-slate-400/40 rounded-full" />
          </div>

        </div>
      </div>
    </div>
  );
}
