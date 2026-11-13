// Shared SVG Illustrations and Avatar Assets matching Figma screenshots

import React from 'react';
import profileAvatarImg from './profile-avatar.jpg';

// Work Mate Brand Logo
export function WorkMateLogo({ className = "w-12 h-12" }) {
  return (
    <div className={`${className} rounded-2xl bg-[#635BFF] flex items-center justify-center shadow-lg shadow-[#635BFF]/30`}>
      <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
        <rect x="5" y="6" width="3" height="12" rx="1.5" />
        <rect x="10.5" y="8" width="3" height="8" rx="1.5" />
        <rect x="16" y="6" width="3" height="12" rx="1.5" />
      </svg>
    </div>
  );
}

// User Avatar: Authentic Figma Profile Picture (Boy with Pink Beanie & Round Glasses) or custom uploaded photo
export function BeanieAvatar({ className = "w-14 h-14", customUrl }) {
  return (
    <div className={`${className} rounded-2xl overflow-hidden flex items-center justify-center relative border-2 border-white shadow-xs bg-[#B8C2EE]`}>
      <img 
        src={customUrl || profileAvatarImg} 
        alt="Profile" 
        className="w-full h-full object-cover select-none"
        draggable="false"
      />
    </div>
  );
}

// Smiley Placeholder Avatar (Screenshots 5, 7)
export function SmileyAvatar({ className = "w-14 h-14" }) {
  return (
    <div className={`${className} rounded-2xl bg-[#EEF2FF] flex items-center justify-center text-[#635BFF] border-2 border-white shadow-xs`}>
      <svg viewBox="0 0 40 40" className="w-7 h-7">
        <circle cx="14" cy="18" r="2.5" fill="#635BFF" />
        <circle cx="26" cy="18" r="2.5" fill="#635BFF" />
        <path d="M15 25 Q20 29 25 25" stroke="#635BFF" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </svg>
    </div>
  );
}

// CCTV Surveillance Camera Illustration (Screenshots 7)
export function CCTVIllustration({ className = "w-16 h-16" }) {
  return (
    <div className={`${className} relative flex items-center justify-center`}>
      <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md">
        {/* Wall mount */}
        <rect x="90" y="45" width="12" height="30" rx="3" fill="#E2E8F0" />
        <path d="M80 60 L90 60" stroke="#94A3B8" strokeWidth="6" strokeLinecap="round" />
        <circle cx="80" cy="60" r="6" fill="#64748B" />
        {/* Camera body angled */}
        <g transform="rotate(-15 60 55)">
          <path d="M25 45 L75 45 L78 68 L28 68 Z" fill="#FFFFFF" />
          <path d="M25 45 L75 45 L75 48 L25 48 Z" fill="#CBD5E1" />
          {/* Lens */}
          <path d="M18 42 L25 45 L25 68 L18 71 Z" fill="#1E293B" />
          <circle cx="22" cy="56" r="3" fill="#38BDF8" />
          {/* Status LED */}
          <circle cx="34" cy="50" r="2" fill="#EF4444" className="animate-pulse" />
        </g>
      </svg>
    </div>
  );
}

// Empty State: Stack of Paper Documents (Screenshots 7)
export function EmptyTasksIllustration({ className = "w-24 h-24" }) {
  return (
    <div className={`${className} mx-auto flex items-center justify-center`}>
      <svg viewBox="0 0 100 100" className="w-full h-full opacity-90">
        <rect x="25" y="28" width="46" height="54" rx="6" fill="#E0E7FF" transform="rotate(-8 48 55)" />
        <rect x="28" y="25" width="46" height="54" rx="6" fill="#C7D2FE" transform="rotate(5 51 52)" />
        <rect x="28" y="22" width="46" height="56" rx="6" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
        {/* Document lines */}
        <rect x="36" y="32" width="30" height="3" rx="1.5" fill="#CBD5E1" />
        <rect x="36" y="40" width="24" height="3" rx="1.5" fill="#E2E8F0" />
        <rect x="36" y="48" width="28" height="3" rx="1.5" fill="#E2E8F0" />
        <rect x="36" y="56" width="18" height="3" rx="1.5" fill="#E2E8F0" />
      </svg>
    </div>
  );
}

// Empty State: Meeting Grid of 6 Users (Screenshots 7)
export function EmptyMeetingsIllustration({ className = "w-24 h-20" }) {
  return (
    <div className={`${className} mx-auto grid grid-cols-3 gap-2 p-2 bg-[#F1F5F9]/60 rounded-xl`}>
      {[...Array(6)].map((_, i) => (
        <div key={i} className="w-8 h-8 rounded-lg bg-white/90 border border-slate-200/60 flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#CBD5E1]" fill="currentColor">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </div>
      ))}
    </div>
  );
}

// Official Blue Tick (Verified Badge) matching Twitter/Meta/Instagram verified blue badge
export function OfficialBlueTick({ className = "w-3.5 h-3.5 flex-shrink-0", title = "Verified Account" }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      aria-label={title}
      className={className} 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      <path 
        d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.79-4-4-4-.495 0-.965.084-1.4.238C14.55 2.475 13.18 1.6 11.6 1.6c-1.58 0-2.95.875-3.6 2.148-.435-.154-.905-.238-1.4-.238-2.21 0-4 1.79-4 4 0 .495.084.965.238 1.4C1.575 10.45.7 11.82.7 13.4c0 1.58.875 2.95 2.148 3.6-.154.435-.238.905-.238 1.4 0 2.21 1.79 4 4 4 .495 0 .965-.084 1.4-.238 1.05 1.273 2.42 2.148 4 2.148 1.58 0 2.95-.875 3.6-2.148.435.154.905.238 1.4.238 2.21 0 4-1.79 4-4 0-.495-.084-.965-.238-1.4 1.273-1.05 2.148-2.42 2.148-4z" 
        fill="#1D9BF0" 
      />
      <path 
        d="M10.2 15.6l-3.3-3.3 1.4-1.4 1.9 1.9 5.3-5.3 1.4 1.4-6.7 6.7z" 
        fill="#FFFFFF" 
      />
    </svg>
  );
}
