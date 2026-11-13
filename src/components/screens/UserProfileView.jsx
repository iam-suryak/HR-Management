import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, ChevronRight, Mail, MapPin, User, Folder, 
  CreditCard, Crown, Settings, Info, HelpCircle, LogOut, 
  CheckCircle2, Sparkles, Award 
} from 'lucide-react';
import { BeanieAvatar, OfficialBlueTick } from '../../assets/illustrations';
import { BADGES } from '../../assets/badges';

export default function UserProfileView({ 
  profileData, 
  onBack, 
  onNavigateHome,
  showAchievements = false,
  setShowAchievements,
  onShowNotification
}) {
  const [internalBadges, setInternalBadges] = useState(showAchievements);

  // Sync with prop when prop changes
  useEffect(() => {
    setInternalBadges(showAchievements);
  }, [showAchievements]);

  const handleToggleBadges = () => {
    const nextState = !internalBadges;
    setInternalBadges(nextState);
    if (setShowAchievements) {
      setShowAchievements(nextState);
    }
    if (onShowNotification) {
      onShowNotification({
        title: nextState ? "Achievements Unlocked" : "Contact Details View",
        message: nextState 
          ? "Displaying 4 company achievement badges: Production Slayer, Junior Of The Month, Employee Of The Year, and Top Performer." 
          : "Displaying employee contact info.",
        type: "success"
      });
    }
  };

  const handleBadgeClick = (badge) => {
    if (onShowNotification) {
      onShowNotification({
        title: `🏆 ${badge.name}`,
        message: badge.description,
        type: 'success'
      });
    }
  };

  const handleItemClick = (label) => {
    if (onShowNotification) {
      onShowNotification({
        title: label,
        message: `Viewing details for ${label}.`,
        type: 'info'
      });
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50/50 select-none overflow-hidden w-full justify-between">
      
      {/* Top Purple Header matching Screenshot */}
      <div className="bg-[#635BFF] px-4 pt-1.5 pb-2.5 sm:pb-3 text-white relative flex-shrink-0 shadow-xs">
        <div className="flex items-center justify-between mb-1.5 sm:mb-2 gap-2">
          <button 
            onClick={onBack}
            className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-all flex-shrink-0 active:scale-90 cursor-pointer"
            title="Go back"
          >
            <ChevronLeft className="w-4 h-4 -ml-0.5" />
          </button>
          
          <span className="font-bold text-sm truncate text-center flex-1">My Profile</span>
          
          {/* Responsive Show/Hide Badges Button matching screenshot */}
          <button
            type="button"
            onClick={handleToggleBadges}
            className={`text-[10px] px-2.5 py-1 rounded-full font-semibold transition-all duration-150 flex items-center space-x-1 cursor-pointer active:scale-90 shadow-2xs border ${
              internalBadges 
                ? 'bg-white text-[#635BFF] border-white shadow-xs active:bg-slate-100' 
                : 'bg-white/20 hover:bg-white/30 text-white border-white/25 active:bg-white/35'
            }`}
            title={internalBadges ? "Switch to Contact Details" : "Show Achievement Badges"}
          >
            <Sparkles className="w-3 h-3 fill-current" />
            <span>{internalBadges ? 'Show Contact' : 'Show Badges'}</span>
          </button>
        </div>

        {/* User Avatar & Name */}
        <div className="flex flex-col items-center justify-center text-center mt-0.5">
          <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-white p-1 shadow-sm mb-1 flex items-center justify-center flex-shrink-0">
            <BeanieAvatar className="w-full h-full" customUrl={profileData?.avatarUrl} />
          </div>

          <div className="flex items-center space-x-1 justify-center max-w-full px-2">
            <h2 className="text-sm font-bold text-white truncate">{profileData.firstName} {profileData.lastName}</h2>
            <OfficialBlueTick className="w-3.5 h-3.5 flex-shrink-0" />
          </div>
          <p className="text-[10.5px] sm:text-[11px] text-purple-200 mt-0.5 font-medium truncate max-w-full px-2">{profileData.position}</p>
        </div>
      </div>

      <div className="px-3.5 py-1.5 sm:py-2 w-full max-w-full overflow-hidden flex-1 flex flex-col justify-between">
        
        {/* Dynamic Section: Toggles between Achievements and Contact (Screenshot 6) */}
        {internalBadges ? (
          <div className="w-full bg-white rounded-2xl p-2.5 sm:p-3 border border-slate-100/90 shadow-2xs animate-in fade-in duration-200">
            <h3 className="text-xs sm:text-[13px] font-bold text-slate-900 mb-1.5 px-0.5 tracking-tight">
              Achievement
            </h3>

            <div className="grid grid-cols-4 gap-1 sm:gap-1.5 w-full">
              {BADGES.map((badge) => (
                <div 
                  key={badge.id}
                  onClick={() => handleBadgeClick(badge)}
                  className="min-w-0 flex flex-col items-center text-center cursor-pointer group active:scale-95 transition-all p-1 rounded-xl hover:bg-slate-50 select-none"
                  title={`${badge.name}: ${badge.description}`}
                >
                  <div className="w-11 h-12 sm:w-12 sm:h-13 flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-105 group-hover:-translate-y-0.5">
                    <img 
                      src={badge.icon} 
                      alt={badge.name} 
                      className="w-full h-full object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.08)]"
                      loading="eager"
                      draggable="false"
                    />
                  </div>
                  <div className="mt-1 text-[8.5px] sm:text-[9.5px] font-bold text-slate-800 leading-[1.15] text-center w-full">
                    <div className="truncate">{badge.titleLine1}</div>
                    <div className="truncate">{badge.titleLine2}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Contact Section (Screenshot 6 middle-right) */
          <div className="w-full animate-in fade-in duration-200">
            <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider block mb-1 px-1">
              CONTACT
            </span>

            <div className="bg-white rounded-2xl border border-slate-100/90 shadow-2xs divide-y divide-slate-50 overflow-hidden">
              <div className="px-3.5 py-2 flex items-center space-x-2.5 text-xs text-slate-700 min-w-0">
                <Mail className="w-3.5 h-3.5 text-[#635BFF] flex-shrink-0" />
                <span className="font-semibold text-slate-800 text-[11px] truncate">Tonald@gmail.com</span>
              </div>
              <div className="px-3.5 py-2 flex items-center space-x-2.5 text-xs text-slate-700 min-w-0">
                <MapPin className="w-3.5 h-3.5 text-[#635BFF] flex-shrink-0" />
                <span className="font-semibold text-slate-800 text-[11px] truncate">{profileData.address || "Taman Anggrek"}</span>
              </div>
            </div>
          </div>
        )}

        {/* Account Section */}
        <div className="w-full">
          <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider block mb-1 px-1">
            ACCOUNT
          </span>

          <div className="bg-white rounded-2xl border border-slate-100/90 shadow-2xs divide-y divide-slate-50 overflow-hidden">
            <button 
              onClick={() => handleItemClick('Personal Data')}
              className="w-full px-3.5 py-2 flex items-center justify-between hover:bg-slate-50 active:bg-slate-100 transition-all cursor-pointer group"
            >
              <div className="flex items-center space-x-2.5 min-w-0">
                <User className="w-3.5 h-3.5 text-[#635BFF] flex-shrink-0" />
                <span className="text-[11px] font-semibold text-slate-800 truncate">Personal Data</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition flex-shrink-0" />
            </button>

            <button 
              onClick={() => handleItemClick('Office Assets')}
              className="w-full px-3.5 py-2 flex items-center justify-between hover:bg-slate-50 active:bg-slate-100 transition-all cursor-pointer group"
            >
              <div className="flex items-center space-x-2.5 min-w-0">
                <Folder className="w-3.5 h-3.5 text-[#635BFF] flex-shrink-0" />
                <span className="text-[11px] font-semibold text-slate-800 truncate">Office Assets</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition flex-shrink-0" />
            </button>

            <button 
              onClick={() => handleItemClick('Payroll & Tax')}
              className="w-full px-3.5 py-2 flex items-center justify-between hover:bg-slate-50 active:bg-slate-100 transition-all cursor-pointer group"
            >
              <div className="flex items-center space-x-2.5 min-w-0">
                <CreditCard className="w-3.5 h-3.5 text-[#635BFF] flex-shrink-0" />
                <span className="text-[11px] font-semibold text-slate-800 truncate">Payroll & Tax</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition flex-shrink-0" />
            </button>

            <button 
              onClick={() => handleItemClick('Roles')}
              className="w-full px-3.5 py-2 flex items-center justify-between hover:bg-slate-50 active:bg-slate-100 transition-all cursor-pointer group"
            >
              <div className="flex items-center space-x-2.5 min-w-0">
                <Crown className="w-3.5 h-3.5 text-[#635BFF] flex-shrink-0" />
                <span className="text-[11px] font-semibold text-slate-800 truncate">Roles</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition flex-shrink-0" />
            </button>
          </div>
        </div>

        {/* Settings Section */}
        <div className="w-full">
          <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider block mb-1 px-1">
            SETTINGS
          </span>

          <div className="bg-white rounded-2xl border border-slate-100/90 shadow-2xs divide-y divide-slate-50 overflow-hidden">
            <button 
              onClick={() => handleItemClick('Change Password')}
              className="w-full px-3.5 py-2 flex items-center justify-between hover:bg-slate-50 active:bg-slate-100 transition-all cursor-pointer group"
            >
              <div className="flex items-center space-x-2.5 min-w-0">
                <Settings className="w-3.5 h-3.5 text-[#635BFF] flex-shrink-0" />
                <span className="text-[11px] font-semibold text-slate-800 truncate">Change Password</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition flex-shrink-0" />
            </button>

            <button 
              onClick={() => handleItemClick('Versioning (v2.4.0)')}
              className="w-full px-3.5 py-2 flex items-center justify-between hover:bg-slate-50 active:bg-slate-100 transition-all cursor-pointer group"
            >
              <div className="flex items-center space-x-2.5 min-w-0">
                <Info className="w-3.5 h-3.5 text-[#635BFF] flex-shrink-0" />
                <span className="text-[11px] font-semibold text-slate-800 truncate">Versioning</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition flex-shrink-0" />
            </button>

            <button 
              onClick={() => handleItemClick('FAQ and Help Center')}
              className="w-full px-3.5 py-2 flex items-center justify-between hover:bg-slate-50 active:bg-slate-100 transition-all cursor-pointer group"
            >
              <div className="flex items-center space-x-2.5 min-w-0">
                <HelpCircle className="w-3.5 h-3.5 text-[#635BFF] flex-shrink-0" />
                <span className="text-[11px] font-semibold text-slate-800 truncate">FAQ and Help</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition flex-shrink-0" />
            </button>

            <button
              onClick={() => {
                if (onShowNotification) {
                  onShowNotification({
                    title: "Logged Out",
                    message: "You have signed out of Work Mate.",
                    type: "info"
                  });
                }
                onNavigateHome ? onNavigateHome() : onBack();
              }}
              className="w-full px-3.5 py-2 flex items-center justify-between hover:bg-rose-50 active:bg-rose-100 transition-all cursor-pointer group"
            >
              <div className="flex items-center space-x-2.5 min-w-0">
                <LogOut className="w-3.5 h-3.5 text-rose-500 flex-shrink-0" />
                <span className="text-[11px] font-semibold text-rose-500 truncate">Logout</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-rose-300 group-hover:translate-x-0.5 transition flex-shrink-0" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
