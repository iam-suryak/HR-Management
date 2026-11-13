import React from 'react';
import DeviceFrame from './DeviceFrame';

// Screens
import OnboardScreen from '../screens/OnboardScreen';
import SignUpScreen from '../screens/SignUpScreen';
import TnCModal from '../screens/TnCModal';
import EmailVerificationModal from '../screens/EmailVerificationModal';
import WelcomeModal from '../screens/WelcomeModal';
import CompleteProfileScreen from '../screens/CompleteProfileScreen';
import WorkProfileScreen from '../screens/WorkProfileScreen';
import { WorkProfileUpdateModal, WorkProfileUpdatedModal } from '../screens/WorkProfileModals';
import UserProfileView from '../screens/UserProfileView';
import HomeScreen from '../screens/HomeScreen';

export default function FlowOverview({ formData, setFormData, profileData, setProfileData, onSelectScreen }) {
  return (
    <div className="w-full overflow-x-auto py-8 px-6 bg-[#0E0F12] min-h-[90vh]">
      <div className="mb-6 flex items-center justify-between max-w-7xl mx-auto">
        <div>
          <h2 className="text-lg font-bold text-white tracking-tight">Figma Flowchart & Screen Transitions</h2>
          <p className="text-xs text-slate-400">100% faithful representation of your 7 uploaded Figma workflow screenshots.</p>
        </div>
        <span className="text-xs font-mono bg-purple-950/80 text-purple-300 border border-purple-800 px-3 py-1 rounded-full">
          Scroll horizontally ➔
        </span>
      </div>

      {/* Horizontal Flow Container */}
      <div className="flex items-start space-x-8 pb-10 min-w-max">
        
        {/* Step 1: OnboardFinal */}
        <div className="flex items-center space-x-6">
          <div onClick={() => onSelectScreen('onboard')} className="cursor-pointer">
            <DeviceFrame title="OnboardFinal" time="08:15">
              <OnboardScreen onNavigate={onSelectScreen} />
            </DeviceFrame>
          </div>

          {/* Figma Arrow Connector */}
          <div className="flex flex-col items-center">
            <span className="bg-white text-slate-900 text-xs font-bold px-3 py-1.5 rounded-lg shadow-md mb-2">
              Tap Sign Up
            </span>
            <div className="flex items-center">
              <div className="w-16 h-0.5 bg-white/70" />
              <div className="w-2 h-2 border-t-2 border-r-2 border-white/70 transform rotate-45 -ml-1" />
            </div>
          </div>
        </div>

        {/* Step 2: SignUp */}
        <div className="flex items-center space-x-6">
          <div onClick={() => onSelectScreen('signup')} className="cursor-pointer">
            <DeviceFrame title="SignUp" time="08:15">
              <SignUpScreen 
                formData={formData} 
                setFormData={setFormData}
                onOpenTnC={() => onSelectScreen('tnc')}
                onSignUpSubmit={() => onSelectScreen('otp')}
                onNavigate={onSelectScreen}
              />
            </DeviceFrame>
          </div>

          {/* Figma Arrow Connector */}
          <div className="flex flex-col items-center">
            <span className="bg-white text-slate-900 text-xs font-bold px-3 py-1.5 rounded-lg shadow-md mb-2">
              Check Agreement TnC & PP
            </span>
            <div className="flex items-center">
              <div className="w-16 h-0.5 bg-white/70" />
              <div className="w-2 h-2 border-t-2 border-r-2 border-white/70 transform rotate-45 -ml-1" />
            </div>
          </div>
        </div>

        {/* Step 3: Terms & Conditions Modal */}
        <div className="flex items-center space-x-6">
          <div onClick={() => onSelectScreen('tnc')} className="cursor-pointer">
            <DeviceFrame title="SignUp/TnC & PP" time="08:15">
              <div className="relative h-full">
                <SignUpScreen formData={formData} setFormData={setFormData} />
                <TnCModal isOpen={true} onAgree={() => onSelectScreen('signup_filled')} onDecline={() => onSelectScreen('signup')} />
              </div>
            </DeviceFrame>
          </div>

          {/* Figma Arrow Connector */}
          <div className="flex flex-col items-center">
            <span className="bg-white text-slate-900 text-xs font-bold px-3 py-1.5 rounded-lg shadow-md mb-2">
              Tap the Sign Up Button
            </span>
            <div className="flex items-center">
              <div className="w-16 h-0.5 bg-white/70" />
              <div className="w-2 h-2 border-t-2 border-r-2 border-white/70 transform rotate-45 -ml-1" />
            </div>
          </div>
        </div>

        {/* Step 4: Email Verification Sent */}
        <div className="flex items-center space-x-6">
          <div onClick={() => onSelectScreen('otp')} className="cursor-pointer">
            <DeviceFrame title="SignUp/EmailVerification" time="08:15">
              <div className="relative h-full">
                <SignUpScreen formData={formData} setFormData={setFormData} />
                <EmailVerificationModal isOpen={true} onSubmit={() => onSelectScreen('welcome')} />
              </div>
            </DeviceFrame>
          </div>

          {/* Figma Arrow Connector */}
          <div className="flex flex-col items-center">
            <span className="bg-white text-slate-900 text-xs font-bold px-3 py-1.5 rounded-lg shadow-md mb-2">
              Welcome Message
            </span>
            <div className="flex items-center">
              <div className="w-16 h-0.5 bg-white/70" />
              <div className="w-2 h-2 border-t-2 border-r-2 border-white/70 transform rotate-45 -ml-1" />
            </div>
          </div>
        </div>

        {/* Step 5: Welcome Modal */}
        <div className="flex items-center space-x-6">
          <div onClick={() => onSelectScreen('welcome')} className="cursor-pointer">
            <DeviceFrame title="SignUp/Success" time="08:15">
              <div className="relative h-full">
                <HomeScreen isEmptyState={true} profileData={profileData} />
                <WelcomeModal 
                  isOpen={true} 
                  onSetUpProfile={() => onSelectScreen('complete_profile')}
                  onExploreApp={() => onSelectScreen('home_empty')}
                />
              </div>
            </DeviceFrame>
          </div>

          {/* Figma Arrow Connector */}
          <div className="flex flex-col items-center">
            <span className="bg-white text-slate-900 text-xs font-bold px-3 py-1.5 rounded-lg shadow-md mb-2">
              Set Up Work Profile
            </span>
            <div className="flex items-center">
              <div className="w-16 h-0.5 bg-white/70" />
              <div className="w-2 h-2 border-t-2 border-r-2 border-white/70 transform rotate-45 -ml-1" />
            </div>
          </div>
        </div>

        {/* Step 6: Complete Profile Screen */}
        <div className="flex items-center space-x-6">
          <div onClick={() => onSelectScreen('complete_profile')} className="cursor-pointer">
            <DeviceFrame title="SignUp/CompleteProfile" time="9:41">
              <CompleteProfileScreen 
                onNavigate={onSelectScreen}
                onSetUpWorkProfile={() => onSelectScreen('work_profile_empty')}
              />
            </DeviceFrame>
          </div>

          {/* Figma Arrow Connector */}
          <div className="flex flex-col items-center">
            <span className="bg-white text-slate-900 text-xs font-bold px-3 py-1.5 rounded-lg shadow-md mb-2">
              Set Up Work Profile
            </span>
            <div className="flex items-center">
              <div className="w-16 h-0.5 bg-white/70" />
              <div className="w-2 h-2 border-t-2 border-r-2 border-white/70 transform rotate-45 -ml-1" />
            </div>
          </div>
        </div>

        {/* Step 7: Work Profile Form (Empty) */}
        <div className="flex items-center space-x-6">
          <div onClick={() => onSelectScreen('work_profile_empty')} className="cursor-pointer">
            <DeviceFrame title="SignUp/WorkProfileEmpty" time="08:15">
              <WorkProfileScreen 
                profileData={{ ...profileData, photoUploaded: false }} 
                setProfileData={setProfileData}
                onBack={() => onSelectScreen('complete_profile')}
                onTriggerUpdateModal={() => onSelectScreen('work_profile_filled')}
              />
            </DeviceFrame>
          </div>

          {/* Figma Arrow Connector */}
          <div className="flex flex-col items-center">
            <span className="bg-white text-slate-900 text-xs font-bold px-3 py-1.5 rounded-lg shadow-md mb-2">
              Fill The Information
            </span>
            <div className="flex items-center">
              <div className="w-16 h-0.5 bg-white/70" />
              <div className="w-2 h-2 border-t-2 border-r-2 border-white/70 transform rotate-45 -ml-1" />
            </div>
          </div>
        </div>

        {/* Step 8: Work Profile Form (Filled) */}
        <div className="flex items-center space-x-6">
          <div onClick={() => onSelectScreen('work_profile_filled')} className="cursor-pointer">
            <DeviceFrame title="SignUp/WorkProfileFilled" time="08:15">
              <WorkProfileScreen 
                profileData={{ ...profileData, photoUploaded: true }} 
                setProfileData={setProfileData}
                onBack={() => onSelectScreen('complete_profile')}
                onTriggerUpdateModal={() => onSelectScreen('confirm_update')}
              />
            </DeviceFrame>
          </div>

          {/* Figma Arrow Connector */}
          <div className="flex items-center">
            <div className="w-12 h-0.5 bg-white/70" />
            <div className="w-2 h-2 border-t-2 border-r-2 border-white/70 transform rotate-45 -ml-1" />
          </div>
        </div>

        {/* Step 9: Confirm Update Modal */}
        <div className="flex items-center space-x-6">
          <div onClick={() => onSelectScreen('confirm_update')} className="cursor-pointer">
            <DeviceFrame title="SignUp/WorkProfileUpdate" time="08:15">
              <div className="relative h-full">
                <WorkProfileScreen profileData={{ ...profileData, photoUploaded: true }} setProfileData={setProfileData} />
                <WorkProfileUpdateModal 
                  isOpen={true} 
                  onConfirm={() => onSelectScreen('update_success')} 
                  onCancel={() => onSelectScreen('work_profile_filled')} 
                />
              </div>
            </DeviceFrame>
          </div>

          {/* Figma Arrow Connector */}
          <div className="flex flex-col items-center">
            <span className="bg-white text-slate-900 text-xs font-bold px-3 py-1.5 rounded-lg shadow-md mb-2">
              Profile Updated
            </span>
            <div className="flex items-center">
              <div className="w-16 h-0.5 bg-white/70" />
              <div className="w-2 h-2 border-t-2 border-r-2 border-white/70 transform rotate-45 -ml-1" />
            </div>
          </div>
        </div>

        {/* Step 10: Update Success Modal */}
        <div className="flex items-center space-x-6">
          <div onClick={() => onSelectScreen('update_success')} className="cursor-pointer">
            <DeviceFrame title="SignUp/WorkProfileUpdated..." time="08:15">
              <div className="relative h-full">
                <WorkProfileScreen profileData={{ ...profileData, photoUploaded: true }} setProfileData={setProfileData} />
                <WorkProfileUpdatedModal isOpen={true} onVisitProfile={() => onSelectScreen('user_profile_view')} />
              </div>
            </DeviceFrame>
          </div>

          {/* Figma Arrow Connector */}
          <div className="flex flex-col items-center">
            <span className="bg-white text-slate-900 text-xs font-bold px-3 py-1.5 rounded-lg shadow-md mb-2">
              View Profile
            </span>
            <div className="flex items-center">
              <div className="w-16 h-0.5 bg-white/70" />
              <div className="w-2 h-2 border-t-2 border-r-2 border-white/70 transform rotate-45 -ml-1" />
            </div>
          </div>
        </div>

        {/* Step 11: User Profile Contact View */}
        <div className="flex items-center space-x-6">
          <div onClick={() => onSelectScreen('user_profile_view')} className="cursor-pointer">
            <DeviceFrame title="SignUp/WorkProfile" time="9:41">
              <UserProfileView 
                profileData={{ ...profileData, photoUploaded: true }}
                showAchievements={false}
                setShowAchievements={() => {}}
                onBack={() => onSelectScreen('home_active')}
                onNavigateHome={() => onSelectScreen('home_active')}
              />
            </DeviceFrame>
          </div>

          {/* Figma Arrow Connector */}
          <div className="flex flex-col items-center">
            <span className="bg-white text-slate-900 text-xs font-bold px-3 py-1.5 rounded-lg shadow-md mb-2">
              When You Got Achievements
            </span>
            <div className="flex items-center">
              <div className="w-16 h-0.5 bg-white/70" />
              <div className="w-2 h-2 border-t-2 border-r-2 border-white/70 transform rotate-45 -ml-1" />
            </div>
          </div>
        </div>

        {/* Step 12: User Profile with Achievements */}
        <div className="flex items-center space-x-6">
          <div onClick={() => onSelectScreen('user_profile_achievements')} className="cursor-pointer">
            <DeviceFrame title="SignUp/WorkProfile" time="08:15">
              <UserProfileView 
                profileData={{ ...profileData, photoUploaded: true }}
                showAchievements={true}
                setShowAchievements={() => {}}
                onBack={() => onSelectScreen('home_active')}
                onNavigateHome={() => onSelectScreen('home_active')}
              />
            </DeviceFrame>
          </div>

          {/* Figma Arrow Connector */}
          <div className="flex flex-col items-center">
            <span className="bg-white text-slate-900 text-xs font-bold px-3 py-1.5 rounded-lg shadow-md mb-2">
              Go To Home
            </span>
            <div className="flex items-center">
              <div className="w-16 h-0.5 bg-white/70" />
              <div className="w-2 h-2 border-t-2 border-r-2 border-white/70 transform rotate-45 -ml-1" />
            </div>
          </div>
        </div>

        {/* Step 10: Home Screen Empty State */}
        <div className="flex items-center space-x-6">
          <div onClick={() => onSelectScreen('home_empty')} className="cursor-pointer">
            <DeviceFrame title="SignUp/EmptyState" time="08:15">
              <HomeScreen 
                isEmptyState={true}
                profileData={profileData}
                onNavigateProfile={() => onSelectScreen('user_profile_view')}
                onToggleEmptyState={() => onSelectScreen('home_active')}
              />
            </DeviceFrame>
          </div>

          {/* Figma Arrow Connector */}
          <div className="flex flex-col items-center">
            <span className="bg-white text-slate-900 text-xs font-bold px-3 py-1.5 rounded-lg shadow-md mb-2">
              Active Data State
            </span>
            <div className="flex items-center">
              <div className="w-16 h-0.5 bg-white/70" />
              <div className="w-2 h-2 border-t-2 border-r-2 border-white/70 transform rotate-45 -ml-1" />
            </div>
          </div>
        </div>

        {/* Step 11: Home Screen Active Data */}
        <div className="flex items-center space-x-6">
          <div onClick={() => onSelectScreen('home_active')} className="cursor-pointer">
            <DeviceFrame title="SignUp/Home" time="08:15">
              <HomeScreen 
                isEmptyState={false}
                profileData={profileData}
                onNavigateProfile={() => onSelectScreen('user_profile_view')}
                onToggleEmptyState={() => onSelectScreen('home_empty')}
              />
            </DeviceFrame>
          </div>
        </div>

      </div>
    </div>
  );
}
