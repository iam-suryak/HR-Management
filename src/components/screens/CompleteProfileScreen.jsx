import React, { useState } from 'react';
import { 
  ChevronLeft, ChevronRight, User, Folder, CreditCard, 
  Crown, Settings, Info, HelpCircle, LogOut, CheckCircle2 
} from 'lucide-react';
import { SmileyAvatar, BeanieAvatar, OfficialBlueTick } from '../../assets/illustrations';
import { WorkProfileUpdateModal, WorkProfileUpdatedModal } from './WorkProfileModals';

export default function CompleteProfileScreen({ 
  profileData,
  setProfileData,
  onNavigate, 
  onSetUpWorkProfile,
  onShowNotification
}) {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isUpdatedSuccessOpen, setIsUpdatedSuccessOpen] = useState(false);

  const handleItemClick = (label) => {
    if (onShowNotification) {
      onShowNotification({
        title: label,
        message: `Viewing details for ${label}.`,
        type: 'info'
      });
    }
  };

  const handleConfirmUpdate = () => {
    setIsUpdateModalOpen(false);
    setIsUpdatedSuccessOpen(true);
    if (setProfileData) {
      setProfileData((prev) => ({ ...prev, photoUploaded: true }));
    }
    if (onShowNotification) {
      onShowNotification({
        title: "Profile Saved",
        message: "Your profile and picture have been updated.",
        type: "success"
      });
    }
  };

  return (
    <div className="flex flex-col min-h-full bg-slate-50/50 pb-2 select-none overflow-x-hidden w-full relative">
      
      {/* Top Bar matching Screenshot 5 */}
      <div className="bg-[#635BFF] px-4 pt-1.5 pb-3.5 text-white relative flex-shrink-0 shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <button 
            onClick={() => onNavigate('home_active')} 
            className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition active:scale-95 cursor-pointer"
            title="Go back"
          >
            <ChevronLeft className="w-4 h-4 -ml-0.5" />
          </button>
          <span className="font-bold text-sm">My Profile</span>
          <div className="w-7" />
        </div>

        {/* User Card inside Purple Header */}
        <div className="flex flex-col items-center justify-center text-center mt-1">
          <div className="w-14 h-14 rounded-2xl bg-white p-1 shadow-sm mb-1.5 flex items-center justify-center flex-shrink-0 transition-all duration-300">
            {profileData?.photoUploaded ? (
              <BeanieAvatar className="w-full h-full" customUrl={profileData?.avatarUrl} />
            ) : (
              <SmileyAvatar className="w-full h-full" />
            )}
          </div>

          <div className="flex items-center space-x-1 justify-center max-w-full px-2">
            <h2 className="text-sm font-bold text-white truncate">Tonald Drump</h2>
            <OfficialBlueTick className="w-3.5 h-3.5 flex-shrink-0" />
          </div>
          <p className="text-[11px] text-purple-200 mt-0.5 font-medium truncate max-w-full px-2">Tonald@work.com</p>
        </div>
      </div>

      {/* Account Section */}
      <div className="px-3.5 py-2 space-y-2 w-full max-w-full overflow-hidden flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <div className="w-full">
            <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider block mb-1 px-1">
              ACCOUNT
            </span>

            <div className="bg-white rounded-2xl border border-slate-100/90 shadow-2xs divide-y divide-slate-50 overflow-hidden">
              <button
                onClick={onSetUpWorkProfile}
                className="w-full px-3.5 py-2 flex items-center justify-between hover:bg-slate-50 active:bg-slate-100 active:scale-[0.99] transition-all cursor-pointer group"
              >
                <div className="flex items-center space-x-2.5 min-w-0">
                  <User className="w-3.5 h-3.5 text-[#635BFF] flex-shrink-0" />
                  <span className="text-[11px] font-semibold text-slate-800 truncate">My Work Profile</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition flex-shrink-0" />
              </button>

              <button
                onClick={() => handleItemClick('Office Assets')}
                className="w-full px-3.5 py-2 flex items-center justify-between hover:bg-slate-50 active:bg-slate-100 active:scale-[0.99] transition-all cursor-pointer group"
              >
                <div className="flex items-center space-x-2.5 min-w-0">
                  <Folder className="w-3.5 h-3.5 text-[#635BFF] flex-shrink-0" />
                  <span className="text-[11px] font-semibold text-slate-800 truncate">Office Assets</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition flex-shrink-0" />
              </button>

              <button
                onClick={() => handleItemClick('Payroll & Tax')}
                className="w-full px-3.5 py-2 flex items-center justify-between hover:bg-slate-50 active:bg-slate-100 active:scale-[0.99] transition-all cursor-pointer group"
              >
                <div className="flex items-center space-x-2.5 min-w-0">
                  <CreditCard className="w-3.5 h-3.5 text-[#635BFF] flex-shrink-0" />
                  <span className="text-[11px] font-semibold text-slate-800 truncate">Payroll & Tax</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition flex-shrink-0" />
              </button>

              <button
                onClick={() => handleItemClick('Roles')}
                className="w-full px-3.5 py-2 flex items-center justify-between hover:bg-slate-50 active:bg-slate-100 active:scale-[0.99] transition-all cursor-pointer group"
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
                className="w-full px-3.5 py-2 flex items-center justify-between hover:bg-slate-50 active:bg-slate-100 active:scale-[0.99] transition-all cursor-pointer group"
              >
                <div className="flex items-center space-x-2.5 min-w-0">
                  <Settings className="w-3.5 h-3.5 text-[#635BFF] flex-shrink-0" />
                  <span className="text-[11px] font-semibold text-slate-800 truncate">Change Password</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition flex-shrink-0" />
              </button>

              <button 
                onClick={() => handleItemClick('Versioning (v2.4.0)')}
                className="w-full px-3.5 py-2 flex items-center justify-between hover:bg-slate-50 active:bg-slate-100 active:scale-[0.99] transition-all cursor-pointer group"
              >
                <div className="flex items-center space-x-2.5 min-w-0">
                  <Info className="w-3.5 h-3.5 text-[#635BFF] flex-shrink-0" />
                  <span className="text-[11px] font-semibold text-slate-800 truncate">Versioning</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition flex-shrink-0" />
              </button>

              <button 
                onClick={() => handleItemClick('FAQ and Help Center')}
                className="w-full px-3.5 py-2 flex items-center justify-between hover:bg-slate-50 active:bg-slate-100 active:scale-[0.99] transition-all cursor-pointer group"
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
                  onNavigate('onboard');
                }}
                className="w-full px-3.5 py-2 flex items-center justify-between hover:bg-rose-50 active:bg-rose-100 active:scale-[0.99] transition-all cursor-pointer group"
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

        {/* Update Profile Action Button */}
        <div className="pt-3 pb-3 w-full">
          <button
            type="button"
            onClick={() => setIsUpdateModalOpen(true)}
            className="w-full py-3.5 bg-[#635BFF] hover:bg-[#5249E8] active:scale-[0.98] text-white text-xs font-bold rounded-2xl shadow-lg shadow-[#635BFF]/30 transition-all duration-150 cursor-pointer active:shadow-sm"
          >
            Update Profile
          </button>
        </div>

      </div>

      {/* Update Profile Confirmation Modal */}
      <WorkProfileUpdateModal
        isOpen={isUpdateModalOpen}
        onConfirm={handleConfirmUpdate}
        onCancel={() => setIsUpdateModalOpen(false)}
      />

      {/* Profile Updated Success Modal */}
      <WorkProfileUpdatedModal
        isOpen={isUpdatedSuccessOpen}
        onVisitProfile={() => setIsUpdatedSuccessOpen(false)}
      />

    </div>
  );
}
