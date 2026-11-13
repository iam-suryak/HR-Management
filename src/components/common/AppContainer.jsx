import React, { useRef, useEffect } from 'react';
import { Wifi, Battery, Signal } from 'lucide-react';

export default function AppContainer({ 
  children, 
  time = "08:15",
  currentScreen
}) {
  const contentRef = useRef(null);

  // Scroll to top whenever screen changes so the view is always properly positioned
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [currentScreen]);

  // Purple header screens match the Figma status bar top style
  const isPurpleHeader = ['onboard', 'complete_profile', 'user_profile_view', 'user_profile_achievements'].includes(currentScreen);
  const isOnboard = currentScreen === 'onboard';

  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-0 sm:p-2 overflow-hidden select-none">
      
      {/* Real Responsive App Viewport: Exactly matches the attached screenshot with authentic device chassis */}
      <div className="w-full sm:w-[392px] sm:max-w-[calc(100vw-16px)] h-full sm:h-[min(96vh,820px)] sm:max-h-[820px] bg-white sm:rounded-[48px] shadow-[0_25px_70px_rgba(0,0,0,0.85)] flex flex-col relative overflow-hidden sm:border-[8px] sm:border-[#0A0A0D] sm:ring-1 sm:ring-white/10">
        
        {/* Sleek iOS Status Bar matching Figma 100% (No Dynamic Island, clean time + icons) */}
        <div className={`w-full pt-3 px-6 pb-1.5 flex items-center justify-between text-xs font-bold z-30 select-none flex-shrink-0 transition-colors ${
          isOnboard
            ? 'bg-[#7B5EF8] text-white'
            : isPurpleHeader 
              ? 'bg-[#635BFF] text-white' 
              : 'bg-white text-slate-900 border-b border-slate-100/60'
        }`}>
          {/* Time (08:15 / 9:41) */}
          <span className="font-semibold text-[13px] tracking-tight">{time}</span>

          {/* Clean space (100% faithful to Figma - no notch / no dynamic island) */}
          <div className="flex-1" />

          {/* Right Status Icons (Signal, Wifi, Battery) */}
          <div className="flex items-center space-x-2">
            {/* 4 Signal Bars */}
            <div className="flex items-end space-x-0.5 h-3">
              <div className={`w-[2.5px] h-1 rounded-xs ${isPurpleHeader ? 'bg-white' : 'bg-slate-900'}`} />
              <div className={`w-[2.5px] h-1.5 rounded-xs ${isPurpleHeader ? 'bg-white' : 'bg-slate-900'}`} />
              <div className={`w-[2.5px] h-2 rounded-xs ${isPurpleHeader ? 'bg-white' : 'bg-slate-900'}`} />
              <div className={`w-[2.5px] h-2.5 rounded-xs ${isPurpleHeader ? 'bg-white' : 'bg-slate-900'}`} />
            </div>

            {/* Wifi Icon */}
            <Wifi className={`w-3.5 h-3.5 stroke-[2.3] ${isPurpleHeader ? 'text-white' : 'text-slate-900'}`} />

            {/* iOS Battery with Terminal Nub and Full Level Fill */}
            <div className="flex items-center">
              <div className={`w-5 h-2.5 rounded-[4px] border ${isPurpleHeader ? 'border-white' : 'border-slate-800'} p-0.5 flex items-center`}>
                <div className={`h-full w-full rounded-[2px] ${isPurpleHeader ? 'bg-white' : 'bg-slate-900'}`} />
              </div>
              <div className={`w-0.5 h-1 rounded-r-xs ${isPurpleHeader ? 'bg-white' : 'bg-slate-800'} -ml-[1px]`} />
            </div>
          </div>
        </div>

        {/* Scrollable Screen Content with smooth independent vertical scrolling and ZERO visible scrollbars */}
        <div 
          ref={contentRef}
          className="flex-1 overflow-y-auto overflow-x-hidden relative flex flex-col bg-white overscroll-contain no-scrollbar"
        >
          {children}
        </div>

        {/* Bottom Home Indicator */}
        <div className="w-full h-4 bg-white flex items-center justify-center flex-shrink-0 pointer-events-none select-none z-30 pb-1">
          <div className="w-32 h-1 bg-slate-300 rounded-full" />
        </div>

      </div>
    </div>
  );
}
