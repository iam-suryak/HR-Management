import React from 'react';
import todayTaskImg from '../../assets/today-task-card.png';
import workingPeriodImg from '../../assets/working-period-card.png';

export default function OnboardScreen({ onNavigate, onOpenSignIn }) {
  return (
    <div className="flex flex-col h-full bg-white relative justify-between pb-6 select-none overflow-hidden">
      {/* Top Gradient Background matching Figma 100% */}
      <div className="absolute top-0 left-0 right-0 h-[430px] bg-gradient-to-b from-[#7B5EF8] via-[#8C72FF] via-45% to-white pointer-events-none" />

      {/* Floating Mockup Cards from Figma - using authentic exported Figma card assets */}
      <div className="relative z-10 w-full pt-2 px-3 flex flex-col items-center">
        <div className="relative w-full max-w-[350px] h-[260px]">
          {/* Card 1: Today Task (Upper Left) */}
          <div className="absolute top-0 left-1 w-[245px] sm:w-[255px] z-10 pointer-events-none drop-shadow-[0_16px_35px_rgba(99,91,255,0.22)]">
            <img 
              src={todayTaskImg} 
              alt="Today Task" 
              className="w-full h-auto object-contain select-none"
              draggable="false"
            />
          </div>

          {/* Card 2: Working Period (Lower Right, overlapping on top) */}
          <div className="absolute top-10 right-0 w-[275px] sm:w-[285px] z-20 pointer-events-none drop-shadow-[0_20px_40px_rgba(0,0,0,0.08)]">
            <img 
              src={workingPeriodImg} 
              alt="Working Period" 
              className="w-full h-auto object-contain select-none"
              draggable="false"
            />
          </div>
        </div>
      </div>

      {/* Bottom Content Area matching Figma 100% */}
      <div className="px-6 pt-2 pb-2 text-center z-10">
        <h2 className="text-[23px] font-extrabold text-slate-900 leading-[1.25]">
          Navigate Your Work Journey <br />
          <span>Efficient & Easy</span>
        </h2>

        <p className="text-xs text-slate-400 mt-2 px-3 leading-relaxed">
          Increase your work management & career development radically
        </p>

        {/* Buttons: Sign In (purple pill) & Sign Up (white pill with purple outline) */}
        <div className="mt-6 space-y-2.5">
          <button
            onClick={onOpenSignIn}
            className="w-full py-3.5 bg-gradient-to-r from-[#635BFF] to-[#755DFF] hover:from-[#574FF5] hover:to-[#6A52F7] active:scale-[0.98] text-white text-sm font-bold rounded-full shadow-lg shadow-[#635BFF]/30 transition-all duration-150 cursor-pointer active:shadow-sm"
          >
            Sign In
          </button>

          <button
            onClick={() => onNavigate('signup')}
            className="w-full py-3.5 bg-white hover:bg-purple-50/40 active:scale-[0.98] text-[#635BFF] text-sm font-bold rounded-full border border-[#635BFF] shadow-xs transition-all duration-150 cursor-pointer active:bg-purple-100/50"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
