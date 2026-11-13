import React, { useState } from 'react';
import { 
  MessageSquare, Bell, CheckCircle2, Clock, Calendar, 
  Play, Zap, Flag, MessageCircle, Home, Layers, CreditCard 
} from 'lucide-react';
import { 
  BeanieAvatar, SmileyAvatar, CCTVIllustration, 
  EmptyTasksIllustration, EmptyMeetingsIllustration,
  OfficialBlueTick
} from '../../assets/illustrations';
import CalendarTab from './tabs/CalendarTab';
import TasksTab from './tabs/TasksTab';
import PayrollTab from './tabs/PayrollTab';
import RolesTab from './tabs/RolesTab';

export default function HomeScreen({ 
  isEmptyState = false, 
  profileData, 
  onNavigateProfile,
  onToggleEmptyState,
  onNavigate,
  onOpenNotifications,
  onShowNotification,
  initialTab = 'home'
}) {
  const [activeTab, setActiveTab] = useState(initialTab);
  return (
    <div className="flex flex-col min-h-full bg-[#F6F7FB] select-none relative justify-between overflow-x-hidden w-full">
      
      {/* Top Header Bar matching Screenshot 7 */}
      <div className="sticky top-0 z-20 bg-white border-b border-slate-100/90 px-4 pt-3 pb-3 flex items-center justify-between shadow-xs">
        
        {/* User Identity */}
        <div 
          onClick={onNavigateProfile}
          className="flex items-center space-x-2.5 cursor-pointer group active:scale-[0.98] transition-all p-1 rounded-xl hover:bg-slate-50"
          title="Open Profile"
        >
          {isEmptyState || !profileData?.photoUploaded ? (
            <div className="w-10 h-10 rounded-full bg-[#F0EEFF] p-0.5 border border-slate-100 flex items-center justify-center">
              <SmileyAvatar className="w-full h-full rounded-full" />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200/80 shadow-xs flex-shrink-0">
              <BeanieAvatar className="w-full h-full" customUrl={profileData?.avatarUrl} />
            </div>
          )}

          <div className="min-w-0">
            <div className="flex items-center space-x-1">
              <h2 className="text-xs font-bold text-slate-900 group-hover:text-[#635BFF] transition truncate">
                {profileData.firstName} {profileData.lastName}
              </h2>
              <OfficialBlueTick className="w-3.5 h-3.5 flex-shrink-0" />
            </div>
            
            <p className="text-[11px] leading-tight truncate">
              {activeTab === 'calendar' ? (
                <span className="text-[#635BFF] font-semibold">Calendar & Schedule</span>
              ) : activeTab === 'tasks' ? (
                <span className="text-[#635BFF] font-semibold">Tasks & Backlog</span>
              ) : activeTab === 'payroll' ? (
                <span className="text-[#635BFF] font-semibold">Payroll & Salary</span>
              ) : activeTab === 'roles' ? (
                <span className="text-[#635BFF] font-semibold">Organization & Roles</span>
              ) : isEmptyState ? (
                <span className="text-slate-400 font-medium">Tonald@work.com</span>
              ) : (
                <span className="text-[#635BFF] font-semibold">{profileData.position}</span>
              )}
            </p>
          </div>
        </div>

        {/* Right Action Icons (Message & Bell) */}
        <div className="flex items-center space-x-2 flex-shrink-0">
          {/* Quick Data State Toggle on Home Tab */}
          {activeTab === 'home' && (
            <button 
              onClick={() => {
                onToggleEmptyState();
                onShowNotification({
                  title: isEmptyState ? "Active Data Loaded" : "Empty State Mode",
                  message: isEmptyState ? "Displaying active schedule and assigned tasks." : "Displaying blank dashboard state.",
                  type: "info"
                });
              }}
              className="text-[10px] bg-slate-100 hover:bg-slate-200 active:scale-90 text-slate-700 px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer shadow-2xs"
              title="Toggle between Empty State and Active Data State"
            >
              {isEmptyState ? 'Load Data' : 'Empty State'}
            </button>
          )}

          {/* Messages */}
          <button 
            onClick={onOpenNotifications}
            className="w-8 h-8 rounded-full bg-slate-100/90 hover:bg-slate-200 flex items-center justify-center text-slate-700 relative transition-all active:scale-90 cursor-pointer"
            title="Messages"
          >
            <MessageSquare className="w-4 h-4 text-slate-600" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#635BFF] rounded-full ring-1 ring-white" />
          </button>

          {/* Notifications Bell */}
          <button 
            onClick={onOpenNotifications}
            className="w-8 h-8 rounded-full bg-slate-100/90 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-all active:scale-90 cursor-pointer"
            title="Notifications"
          >
            <Bell className="w-4 h-4 text-slate-600" />
          </button>
        </div>
      </div>

      {/* Main Content Area based on Active Tab */}
      {activeTab === 'home' && (
        <div className="flex-1 px-4 py-3.5 space-y-4 animate-in fade-in duration-200">
        
        {/* Banner: My Work Summary matching Screenshot 7 */}
        <div className="relative overflow-hidden rounded-[22px] bg-gradient-to-r from-[#5E48E8] via-[#6650F0] to-[#7B66FA] p-4 text-white shadow-md shadow-[#5E48E8]/20 flex items-center justify-between">
          <div className="z-10 pr-2">
            <h3 className="text-sm font-bold tracking-tight text-white">My Work Summary</h3>
            <p className="text-[11px] text-purple-100 mt-0.5 font-medium">Today task & presence activity</p>
          </div>

          <div className="relative z-10 flex-shrink-0">
            <CCTVIllustration className="w-16 h-14" />
          </div>

          {/* Sparkles */}
          <div className="absolute top-2.5 right-16 w-1.5 h-1.5 bg-white/50 rounded-full blur-[0.5px]" />
          <div className="absolute bottom-2.5 left-28 w-1 h-1 bg-white/50 rounded-full" />
        </div>

        {/* Section 1: Today Meeting */}
        <div className="space-y-2">
          <div>
            <div className="flex items-center space-x-1.5">
              <h4 className="text-xs font-bold text-slate-900">Today Meeting</h4>
              {!isEmptyState && (
                <span className="w-4 h-4 rounded-full bg-[#EDE9FE] text-[#635BFF] text-[10px] font-bold flex items-center justify-center">
                  2
                </span>
              )}
            </div>
            <p className="text-[10px] text-slate-400 mt-0.5">Your schedule for the day</p>
          </div>

          {isEmptyState ? (
            /* Empty State for Meetings */
            <div className="bg-white rounded-2xl p-5 border border-slate-100 text-center shadow-xs">
              <EmptyMeetingsIllustration className="w-28 h-14 mb-2" />
              <h5 className="text-xs font-bold text-slate-800">No Meeting Available</h5>
              <p className="text-[10px] text-slate-400 mt-1 max-w-[260px] mx-auto leading-relaxed">
                It looks like you don't have any meetings scheduled at the moment. This space will be updated as new meetings are added!
              </p>
            </div>
          ) : (
            /* Active Meetings List matching Screenshot 7 */
            <div className="space-y-2">
              {/* Meeting 1: Townhall Meeting */}
              <div className="bg-white rounded-2xl p-3 border border-slate-100/90 shadow-xs flex items-center justify-between">
                <div className="flex items-center space-x-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-[#635BFF] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                    <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                  </div>
                  <div className="min-w-0">
                    <h5 className="text-xs font-bold text-slate-900 leading-tight truncate">Townhall Meeting</h5>
                    <div className="flex items-center space-x-1 text-[10px] text-slate-400 mt-0.5 font-medium">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>01:30 AM - 02:00 AM</span>
                    </div>
                    <div className="flex items-center -space-x-1 mt-1">
                      <img className="w-4 h-4 rounded-full ring-1 ring-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&auto=format&fit=crop&q=80" alt="avatar" />
                      <img className="w-4 h-4 rounded-full ring-1 ring-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&auto=format&fit=crop&q=80" alt="avatar" />
                      <img className="w-4 h-4 rounded-full ring-1 ring-white object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&auto=format&fit=crop&q=80" alt="avatar" />
                      <span className="text-[9px] text-slate-500 font-bold ml-1.5">+3</span>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => onShowNotification({
                    title: "Joining Meeting",
                    message: "Connecting to Townhall Meeting room on Google Meet...",
                    type: "success"
                  })}
                  className="px-3.5 py-1.5 rounded-full bg-[#635BFF] hover:bg-[#5249E8] active:scale-90 text-white text-[11px] font-bold shadow-xs transition-all duration-150 cursor-pointer flex-shrink-0 active:shadow-none"
                >
                  Join Meet
                </button>
              </div>

              {/* Meeting 2: Dashboard Report */}
              <div className="bg-white rounded-2xl p-3 border border-slate-100/90 shadow-xs flex items-center justify-between">
                <div className="flex items-center space-x-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-[#635BFF] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                    <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                  </div>
                  <div className="min-w-0">
                    <h5 className="text-xs font-bold text-slate-900 leading-tight truncate">Dashboard Report</h5>
                    <div className="flex items-center space-x-1 text-[10px] text-slate-400 mt-0.5 font-medium">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>01:30 AM - 02:00 AM</span>
                    </div>
                    <div className="flex items-center -space-x-1 mt-1">
                      <img className="w-4 h-4 rounded-full ring-1 ring-white object-cover" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&auto=format&fit=crop&q=80" alt="avatar" />
                      <img className="w-4 h-4 rounded-full ring-1 ring-white object-cover" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=50&auto=format&fit=crop&q=80" alt="avatar" />
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => onShowNotification({
                    title: "Joining Meeting",
                    message: "Connecting to Dashboard Report review...",
                    type: "success"
                  })}
                  className="px-3.5 py-1.5 rounded-full bg-[#635BFF] hover:bg-[#5249E8] active:scale-90 text-white text-[11px] font-bold shadow-xs transition-all duration-150 cursor-pointer flex-shrink-0 active:shadow-none"
                >
                  Join Meet
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Section 2: Today Task */}
        <div className="space-y-2 pb-2">
          <div>
            <div className="flex items-center space-x-1.5">
              <h4 className="text-xs font-bold text-slate-900">Today Task</h4>
              {!isEmptyState && (
                <span className="w-4 h-4 rounded-full bg-[#EDE9FE] text-[#635BFF] text-[10px] font-bold flex items-center justify-center">
                  1
                </span>
              )}
            </div>
            <p className="text-[10px] text-slate-400 mt-0.5">The tasks assigned to you for today</p>
          </div>

          {isEmptyState ? (
            /* Empty State for Tasks */
            <div className="bg-white rounded-2xl p-5 border border-slate-100 text-center shadow-xs">
              <EmptyTasksIllustration className="w-20 h-16 mb-1" />
              <h5 className="text-xs font-bold text-slate-800">No Tasks Assigned</h5>
              <p className="text-[10px] text-slate-400 mt-1 max-w-[260px] mx-auto leading-relaxed">
                It looks like you don't have any tasks assigned to you right now. Don't worry, this space will be updated as new tasks become available.
              </p>
            </div>
          ) : (
            /* Active Task Card matching Screenshot 7 */
            <div 
              onClick={() => onShowNotification({
                title: "Wiring Dashboard Analytics",
                message: "High priority task due on 27 April. In Progress (85% completed).",
                type: "info"
              })}
              className="bg-white rounded-2xl p-3.5 border border-slate-100/90 shadow-xs space-y-2.5 cursor-pointer active:scale-[0.98] hover:border-[#635BFF]/30 transition-all duration-150"
              title="View Task Details"
            >
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 rounded-full bg-[#635BFF] text-white flex items-center justify-center flex-shrink-0">
                  <Zap className="w-3 h-3 fill-current" />
                </div>
                <h5 className="text-xs font-bold text-slate-900 truncate">Wiring Dashboard Analytics</h5>
              </div>

              {/* Status & Priority Pills */}
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                  <span>In Progress</span>
                </span>

                <span className="text-[10px] font-semibold bg-[#EF4444] text-white px-2 py-0.5 rounded-full flex items-center space-x-1">
                  <Flag className="w-2.5 h-2.5 fill-current" />
                  <span>High</span>
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#635BFF] h-full w-[85%] rounded-full" />
              </div>

              {/* Card Footer: Avatars, Date, Comments */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex -space-x-1.5">
                  <img className="w-4 h-4 rounded-full ring-1 ring-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&auto=format&fit=crop&q=80" alt="avatar" />
                  <img className="w-4 h-4 rounded-full ring-1 ring-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&auto=format&fit=crop&q=80" alt="avatar" />
                  <img className="w-4 h-4 rounded-full ring-1 ring-white object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&auto=format&fit=crop&q=80" alt="avatar" />
                </div>

                <div className="flex items-center space-x-3 text-[10px] text-slate-400 font-semibold">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    <span>27 April</span>
                  </div>

                  <div className="flex items-center space-x-1">
                    <MessageCircle className="w-3 h-3 text-slate-400" />
                    <span>2</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )}

      {/* Tab 2: Calendar & Schedule */}
      {activeTab === 'calendar' && (
        <CalendarTab onShowNotification={onShowNotification} />
      )}

      {/* Tab 3: Tasks & Projects */}
      {activeTab === 'tasks' && (
        <TasksTab onShowNotification={onShowNotification} />
      )}

      {/* Tab 4: Payroll & Salary */}
      {activeTab === 'payroll' && (
        <PayrollTab onShowNotification={onShowNotification} profileData={profileData} />
      )}

      {/* Tab 5: Organization & Roles */}
      {activeTab === 'roles' && (
        <RolesTab 
          profileData={profileData} 
          onNavigateProfile={onNavigateProfile} 
          onShowNotification={onShowNotification} 
        />
      )}

      {/* Dark Bottom Navigation Bar matching Screenshot 7 & uploaded buttons */}
      <div className="sticky bottom-0 left-0 right-0 bg-[#16171B] px-6 py-2.5 flex items-center justify-between z-30 shadow-2xl border-t border-slate-800/40 select-none">
        {/* Tab 1: Home */}
        <button 
          type="button"
          onClick={() => {
            setActiveTab('home');
            onShowNotification?.({
              title: "Home Dashboard",
              message: "Viewing daily presence and live dashboard.",
              type: "info"
            });
          }}
          className={`p-2 rounded-xl transition-all flex flex-col items-center cursor-pointer active:scale-90 select-none ${
            activeTab === 'home' ? 'text-white' : 'text-slate-400 hover:text-white hover:bg-white/10'
          }`}
          title="Home Dashboard"
        >
          <Home className="w-5 h-5 stroke-[2.2]" />
          {activeTab === 'home' && <span className="w-1 h-1 bg-white rounded-full mt-0.5 shadow-sm" />}
        </button>

        {/* Tab 2: Calendar */}
        <button 
          type="button"
          onClick={() => {
            setActiveTab('calendar');
            onShowNotification?.({
              title: "Calendar & Schedule",
              message: "Viewing meetings, timeline and time-off balance.",
              type: "info"
            });
          }}
          className={`p-2 rounded-xl transition-all flex flex-col items-center cursor-pointer active:scale-90 select-none ${
            activeTab === 'calendar' ? 'text-white' : 'text-slate-400 hover:text-white hover:bg-white/10'
          }`}
          title="Calendar Schedule"
        >
          <Calendar className="w-5 h-5 stroke-[2.2]" />
          {activeTab === 'calendar' && <span className="w-1 h-1 bg-white rounded-full mt-0.5 shadow-sm" />}
        </button>

        {/* Tab 3: Tasks */}
        <button 
          type="button"
          onClick={() => {
            setActiveTab('tasks');
            onShowNotification?.({
              title: "Tasks & Projects",
              message: "Viewing active sprint tasks, priority and progress.",
              type: "info"
            });
          }}
          className={`p-2 rounded-xl transition-all flex flex-col items-center cursor-pointer active:scale-90 select-none ${
            activeTab === 'tasks' ? 'text-white' : 'text-slate-400 hover:text-white hover:bg-white/10'
          }`}
          title="Tasks & Backlog"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="4" />
            <line x1="8" y1="9" x2="16" y2="9" />
            <line x1="8" y1="14" x2="13" y2="14" />
          </svg>
          {activeTab === 'tasks' && <span className="w-1 h-1 bg-white rounded-full mt-0.5 shadow-sm" />}
        </button>

        {/* Tab 4: Payroll & Finance */}
        <button 
          type="button"
          onClick={() => {
            setActiveTab('payroll');
            onShowNotification?.({
              title: "Payroll & Salary",
              message: "Viewing salary breakdown, deductions and claims.",
              type: "info"
            });
          }}
          className={`p-2 rounded-xl transition-all flex flex-col items-center cursor-pointer active:scale-90 select-none ${
            activeTab === 'payroll' ? 'text-white' : 'text-slate-400 hover:text-white hover:bg-white/10'
          }`}
          title="Payroll & Salary"
        >
          <CreditCard className="w-5 h-5 stroke-[2.2]" />
          {activeTab === 'payroll' && <span className="w-1 h-1 bg-white rounded-full mt-0.5 shadow-sm" />}
        </button>

        {/* Tab 5: Organization & Roles */}
        <button 
          type="button"
          onClick={() => {
            setActiveTab('roles');
            onShowNotification?.({
              title: "Organization & Roles",
              message: "Viewing company directory, assigned assets and profile.",
              type: "info"
            });
          }}
          className={`p-2 rounded-xl transition-all flex flex-col items-center cursor-pointer active:scale-90 select-none ${
            activeTab === 'roles' ? 'text-white' : 'text-slate-400 hover:text-white hover:bg-white/10'
          }`}
          title="Organization & Roles"
        >
          <Layers className="w-5 h-5 stroke-[2.2]" />
          {activeTab === 'roles' && <span className="w-1 h-1 bg-white rounded-full mt-0.5 shadow-sm" />}
        </button>
      </div>

    </div>
  );
}
