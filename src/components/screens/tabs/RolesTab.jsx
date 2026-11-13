import React from 'react';
import { 
  Layers, User, Briefcase, Laptop, ShieldCheck, ChevronRight, 
  Building2, Users, FileText, Award, Key, Sparkles, ExternalLink 
} from 'lucide-react';
import { BeanieAvatar, SmileyAvatar, OfficialBlueTick } from '../../../assets/illustrations';

export default function RolesTab({ profileData, onNavigateProfile, onShowNotification }) {
  const handlePortalClick = (title, message) => {
    onShowNotification?.({
      title,
      message,
      type: 'info'
    });
  };

  return (
    <div className="flex-1 p-3.5 space-y-3.5 overflow-y-auto animate-in fade-in duration-200">
      
      {/* Profile Shortcut Card with Direct Navigation */}
      <div 
        onClick={onNavigateProfile}
        className="bg-white rounded-2xl p-3.5 border border-slate-100/90 shadow-2xs hover:border-[#635BFF]/40 cursor-pointer active:scale-[0.98] transition-all flex items-center justify-between group"
        title="Open Full Profile & Achievements"
      >
        <div className="flex items-center space-x-3 min-w-0">
          <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-[#635BFF]/20 flex-shrink-0 bg-[#F0EEFF] p-0.5 shadow-2xs">
            {profileData?.photoUploaded ? (
              <BeanieAvatar className="w-full h-full" customUrl={profileData?.avatarUrl} />
            ) : (
              <SmileyAvatar className="w-full h-full" />
            )}
          </div>

          <div className="min-w-0">
            <div className="flex items-center space-x-1">
              <h3 className="text-xs font-bold text-slate-900 group-hover:text-[#635BFF] transition truncate">
                {profileData.firstName} {profileData.lastName}
              </h3>
              <OfficialBlueTick className="w-3.5 h-3.5 flex-shrink-0" />
            </div>
            <div className="text-[10.5px] text-[#635BFF] font-semibold truncate mt-0.5">
              {profileData.position}
            </div>
            <span className="text-[9.5px] text-slate-400 font-medium">ID #1015015 • Engineering</span>
          </div>
        </div>

        <div className="flex items-center space-x-1 text-[#635BFF] flex-shrink-0 pl-2">
          <span className="text-[11px] font-bold">Profile</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition" />
        </div>
      </div>

      {/* Organization & Team Hierarchy */}
      <div className="bg-white rounded-2xl p-3.5 border border-slate-100/90 shadow-2xs space-y-2.5">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
          ORGANIZATION & SQUAD
        </span>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium flex items-center space-x-1.5">
              <Building2 className="w-3.5 h-3.5 text-[#635BFF]" />
              <span>Division</span>
            </span>
            <span className="font-bold text-slate-800">Product & Technology</span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium flex items-center space-x-1.5">
              <Users className="w-3.5 h-3.5 text-[#635BFF]" />
              <span>Squad</span>
            </span>
            <span className="font-bold text-slate-800">Squad Titan (Core UI)</span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium flex items-center space-x-1.5">
              <Briefcase className="w-3.5 h-3.5 text-[#635BFF]" />
              <span>Direct Manager</span>
            </span>
            <span className="font-bold text-slate-800">Sarah Jenkins (Lead Architect)</span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium flex items-center space-x-1.5">
              <Award className="w-3.5 h-3.5 text-[#635BFF]" />
              <span>Employment Tier</span>
            </span>
            <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full text-[10px]">
              Full-time Permanent
            </span>
          </div>
        </div>
      </div>

      {/* Assigned Office Assets */}
      <div className="bg-white rounded-2xl p-3.5 border border-slate-100/90 shadow-2xs space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            OFFICE ASSETS & HARDWARE
          </span>
          <span className="text-[10px] font-semibold text-slate-400">3 Devices</span>
        </div>

        <div className="divide-y divide-slate-50">
          <div className="py-2 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
                <Laptop className="w-4 h-4 text-[#635BFF]" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-800">MacBook Pro 16" M3 Max</div>
                <div className="text-[10px] text-slate-400">Tag: #WM-8821 • 36GB / 1TB</div>
              </div>
            </div>
            <span className="text-[9.5px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
              Active
            </span>
          </div>

          <div className="py-2 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
                <Layers className="w-4 h-4 text-[#635BFF]" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-800">Dual 27" Dell 4K Monitors</div>
                <div className="text-[10px] text-slate-400">Tag: #WM-4491 • Desk Station 14</div>
              </div>
            </div>
            <span className="text-[9.5px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
              Active
            </span>
          </div>

          <div className="py-2 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
                <Key className="w-4 h-4 text-[#635BFF]" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-800">Digital Access NFC Keycard</div>
                <div className="text-[10px] text-slate-400">Key ID: #1015015 • 24/7 Access</div>
              </div>
            </div>
            <span className="text-[9.5px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
              Verified
            </span>
          </div>
        </div>
      </div>

      {/* HR Tools & Portals */}
      <div className="bg-white rounded-2xl p-3.5 border border-slate-100/90 shadow-2xs space-y-2">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
          HR SERVICES & HANDBOOK
        </span>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => handlePortalClick("Company Directory", "Opening corporate employee roster and contact directory.")}
            className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-left transition active:scale-95 cursor-pointer border border-slate-100"
          >
            <div className="text-xs font-bold text-slate-900">Org Directory</div>
            <div className="text-[9.5px] text-slate-400 mt-0.5">Search all staff</div>
          </button>

          <button
            type="button"
            onClick={() => handlePortalClick("Company Handbook", "Opening Work Mate code of conduct, remote policy and safety guide.")}
            className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-left transition active:scale-95 cursor-pointer border border-slate-100"
          >
            <div className="text-xs font-bold text-slate-900">Policies & FAQ</div>
            <div className="text-[9.5px] text-slate-400 mt-0.5">Employee manual</div>
          </button>
        </div>
      </div>

    </div>
  );
}
