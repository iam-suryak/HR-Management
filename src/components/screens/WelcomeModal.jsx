import React from 'react';
import welcomeIcon from '../../assets/icon-welcome.png';

export default function WelcomeModal({ isOpen, onSetUpProfile, onExploreApp }) {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-40 bg-black/50 backdrop-blur-[3px] flex items-end justify-center select-none animate-in fade-in duration-200">
      
      {/* Bottom Sheet Card */}
      <div className="relative w-full bg-white rounded-t-[36px] px-6 pt-10 pb-8 shadow-2xl flex flex-col items-center text-center">
        
        {/* Floating Top Purple Icon matching Figma Screenshot 4 */}
        <div className="absolute -top-9 left-1/2 -translate-x-1/2 w-16 h-16 flex items-center justify-center drop-shadow-[0_12px_24px_rgba(99,91,255,0.4)]">
          <img 
            src={welcomeIcon} 
            alt="Welcome to Work Mate" 
            className="w-full h-full object-contain select-none"
            draggable="false"
          />
        </div>

        {/* Title & Subtitle */}
        <h3 className="text-base font-bold text-slate-900 mt-2">
          Welcome To Work Mate!
        </h3>
        <p className="text-xs text-slate-500 mt-2 leading-relaxed max-w-xs">
          To enhance your user experience, please set up your profile first. This will help us tailor the app to your needs and ensure you get the most out of our features!
        </p>

        {/* Buttons */}
        <div className="w-full mt-6 space-y-2.5">
          <button
            type="button"
            onClick={onSetUpProfile}
            className="w-full py-3.5 bg-[#635BFF] hover:bg-[#5249E8] active:scale-[0.97] text-white text-xs font-bold rounded-2xl shadow-lg shadow-[#635BFF]/30 transition-all duration-150 cursor-pointer active:shadow-sm"
          >
            Set Up My Profile
          </button>

          <button
            type="button"
            onClick={onExploreApp}
            className="w-full py-3.5 bg-white hover:bg-slate-50 active:scale-[0.97] text-slate-700 text-xs font-bold rounded-2xl border border-slate-300 transition-all duration-150 cursor-pointer active:bg-slate-100"
          >
            Explore The App First
          </button>
        </div>

      </div>
    </div>
  );
}
