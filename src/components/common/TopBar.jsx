import React from 'react';
import { OfficialBlueTick } from '../../assets/illustrations';

export default function TopBar() {
  return (
    <header className="sticky top-0 z-50 bg-[#16171B]/95 backdrop-blur-md border-b border-slate-800 text-white px-4 py-2.5 shadow-lg select-none flex-shrink-0">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
        
        {/* Brand identity */}
        <div className="flex items-center space-x-2.5">
          <div className="w-7 h-7 rounded-xl bg-[#635BFF] flex items-center justify-center shadow-md shadow-[#635BFF]/30">
            <span className="font-extrabold text-xs text-white">WM</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1.5">
              <span className="font-bold text-xs sm:text-sm text-white">Work Mate</span>
              <OfficialBlueTick className="w-3.5 h-3.5" title="Verified App" />
            </div>
            <span className="text-[10px] bg-sky-500/10 text-sky-400 border border-sky-500/20 px-2 py-0.5 rounded-full font-bold hidden sm:inline-flex items-center">
              <span>Real App Mode</span>
            </span>
          </div>
        </div>

      </div>
    </header>
  );
}
