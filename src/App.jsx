import React, { useState } from 'react';
import AppContainer from './components/common/AppContainer';
import InAppNotification from './components/common/InAppNotification';
import NotificationsModal from './components/common/NotificationsModal';

// Screens
import OnboardScreen from './components/screens/OnboardScreen';
import SignUpScreen from './components/screens/SignUpScreen';
import SignInModal from './components/screens/SignInModal';
import TnCModal from './components/screens/TnCModal';
import EmailVerificationModal from './components/screens/EmailVerificationModal';
import WelcomeModal from './components/screens/WelcomeModal';
import CompleteProfileScreen from './components/screens/CompleteProfileScreen';
import WorkProfileScreen from './components/screens/WorkProfileScreen';
import { WorkProfileUpdateModal, WorkProfileUpdatedModal } from './components/screens/WorkProfileModals';
import UserProfileView from './components/screens/UserProfileView';
import HomeScreen from './components/screens/HomeScreen';

export default function App() {
  const getInitialScreen = () => {
    try {
      const params = new URLSearchParams(window.location.search);
      const s = params.get('screen');
      if (s) return s;
      const h = window.location.hash.replace('#', '');
      if (h) return h;
    } catch (e) {}
    return 'onboard';
  };

  const [currentScreen, setCurrentScreen] = useState(getInitialScreen);
  const [showAchievements, setShowAchievements] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [inAppNotification, setInAppNotification] = useState(null);

  // Sync screen in URL query param so refresh / deep links preserve state seamlessly
  React.useEffect(() => {
    try {
      const url = new URL(window.location);
      url.searchParams.set('screen', currentScreen);
      window.history.replaceState({}, '', url);
    } catch (e) {}
  }, [currentScreen]);

  // Form State matching Screenshot 2 & 3
  const [formData, setFormData] = useState({
    email: 'Tonald@work.com',
    phone: '+62 82150005000',
    companyId: '1015015',
    password: 'password123',
    confirmPassword: 'password123',
    agreed: false,
  });

  // Profile Data matching Screenshot 5 & 6
  const [profileData, setProfileData] = useState({
    firstName: 'Tonald',
    lastName: 'Drump',
    dob: '10 December 1997',
    position: 'Junior Full Stack Developer',
    address: 'Taman Anggrek',
    photoUploaded: false, // Default is false (Smiley placeholder) until user updates their profile!
    avatarUrl: null,
  });

  const showNotification = ({ title, message, type = 'info' }) => {
    setInAppNotification({ title, message, type });
  };

  const screensList = [
    { id: 'onboard', label: '1. Onboarding (OnboardFinal)' },
    { id: 'signup', label: '2. Register Form (SignUp)' },
    { id: 'tnc', label: '3. Terms & Conditions Modal' },
    { id: 'otp', label: '4. Email Verification OTP Modal' },
    { id: 'welcome', label: '5. Welcome to Work Mate Modal' },
    { id: 'complete_profile', label: '6. Account Menu (CompleteProfile)' },
    { id: 'work_profile_empty', label: '7. Work Profile Form (Empty)' },
    { id: 'work_profile_filled', label: '8. Work Profile Form (Filled)' },
    { id: 'confirm_update', label: '9. Confirm Update Profile Modal' },
    { id: 'update_success', label: '10. Profile Updated Success Modal' },
    { id: 'user_profile_view', label: '11. My Profile (Contact Details)' },
    { id: 'user_profile_achievements', label: '12. My Profile (With Achievements)' },
    { id: 'home_empty', label: '13. Home Screen (Empty State)' },
    { id: 'home_active', label: '14. Home Screen (Active Data State)' },
  ];

  const getTimeForScreen = () => {
    if (['complete_profile', 'user_profile_view', 'user_profile_achievements'].includes(currentScreen)) {
      return '9:41';
    }
    return '08:15';
  };

  const handleSignInSuccess = (user) => {
    setIsSignInOpen(false);
    setCurrentScreen('home_active');
    showNotification({
      title: "Login Successful",
      message: `Welcome back, ${user.name}! You are signed in as ${profileData.position}.`,
      type: "success"
    });
  };

  return (
    <div className="h-screen h-[100dvh] w-screen bg-[#0E0F12] text-slate-900 flex items-center justify-center overflow-hidden font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* Real App Container */}
      <AppContainer time={getTimeForScreen()} currentScreen={currentScreen}>
        
        {/* In-App Notification (Top iOS Push Banner) */}
        <InAppNotification
          notification={inAppNotification}
          onClose={() => setInAppNotification(null)}
        />

        {/* In-App Notifications Center Modal */}
        <NotificationsModal
          isOpen={isNotificationsOpen}
          onClose={() => setIsNotificationsOpen(false)}
          onAction={(title) => {
            showNotification({
              title: "Activity Opened",
              message: title,
              type: "info"
            });
          }}
        />

          {/* Sign In Sheet Modal */}
          <SignInModal
            isOpen={isSignInOpen}
            onClose={() => setIsSignInOpen(false)}
            onSignInSuccess={handleSignInSuccess}
            onGoToSignUp={() => setCurrentScreen('signup')}
          />

          {/* Screen 1: OnboardFinal */}
          {currentScreen === 'onboard' && (
            <OnboardScreen 
              onNavigate={(screen) => setCurrentScreen(screen)}
              onOpenSignIn={() => setIsSignInOpen(true)}
            />
          )}

          {/* Screen 2: SignUp */}
          {currentScreen === 'signup' && (
            <SignUpScreen
              formData={formData}
              setFormData={setFormData}
              onOpenTnC={() => setCurrentScreen('tnc')}
              onSignUpSubmit={() => {
                setCurrentScreen('otp');
                showNotification({
                  title: "Verification Sent",
                  message: `A 6-digit code was sent to ${formData.email}.`,
                  type: "info"
                });
              }}
              onNavigate={(screen) => setCurrentScreen(screen)}
              onShowNotification={showNotification}
            />
          )}

          {/* Screen 3: Terms & Conditions Modal */}
          {currentScreen === 'tnc' && (
            <div className="relative h-full flex flex-col flex-1">
              <SignUpScreen
                formData={formData}
                setFormData={setFormData}
                onOpenTnC={() => {}}
                onSignUpSubmit={() => {}}
                onNavigate={() => {}}
              />
              <TnCModal
                isOpen={true}
                onAgree={() => {
                  setFormData({ ...formData, agreed: true });
                  setCurrentScreen('signup');
                  showNotification({
                    title: "Terms Accepted",
                    message: "Terms and Privacy Policy agreement confirmed.",
                    type: "success"
                  });
                }}
                onDecline={() => {
                  setCurrentScreen('signup');
                  showNotification({
                    title: "Declined",
                    message: "You declined the terms agreement.",
                    type: "warning"
                  });
                }}
              />
            </div>
          )}

          {/* Screen 4: Email Verification OTP */}
          {currentScreen === 'otp' && (
            <div className="relative h-full flex flex-col flex-1">
              <SignUpScreen
                formData={formData}
                setFormData={setFormData}
                onOpenTnC={() => {}}
                onSignUpSubmit={() => {}}
                onNavigate={() => {}}
              />
              <EmailVerificationModal
                isOpen={true}
                email={formData.email}
                onSubmit={() => {
                  setCurrentScreen('welcome');
                  showNotification({
                    title: "Email Verified",
                    message: "Account verification code confirmed successfully.",
                    type: "success"
                  });
                }}
                onClose={() => setCurrentScreen('signup')}
                onShowNotification={showNotification}
              />
            </div>
          )}

          {/* Screen 5: Welcome Modal */}
          {currentScreen === 'welcome' && (
            <div className="relative h-full flex flex-col flex-1">
              <HomeScreen
                isEmptyState={true}
                profileData={profileData}
                onNavigateProfile={() => setCurrentScreen('user_profile_view')}
                onToggleEmptyState={() => {}}
                onNavigate={(screen) => setCurrentScreen(screen)}
                onOpenNotifications={() => setIsNotificationsOpen(true)}
                onShowNotification={showNotification}
              />
              <WelcomeModal
                isOpen={true}
                onSetUpProfile={() => {
                  setProfileData(prev => ({ ...prev, photoUploaded: false, avatarUrl: null }));
                  setCurrentScreen('complete_profile');
                }}
                onExploreApp={() => {
                  setCurrentScreen('home_empty');
                  showNotification({
                    title: "Welcome To Work Mate!",
                    message: "Exploring the dashboard in empty state mode.",
                    type: "info"
                  });
                }}
              />
            </div>
          )}

          {/* Screen 6: Complete Profile Menu */}
          {currentScreen === 'complete_profile' && (
            <CompleteProfileScreen
              profileData={profileData}
              setProfileData={setProfileData}
              onNavigate={(screen) => setCurrentScreen(screen)}
              onSetUpWorkProfile={() => setCurrentScreen('work_profile_empty')}
              onShowNotification={showNotification}
            />
          )}

          {/* Screen 7: Work Profile Form (Empty) */}
          {currentScreen === 'work_profile_empty' && (
            <WorkProfileScreen
              profileData={{ ...profileData, photoUploaded: false }}
              setProfileData={setProfileData}
              onBack={() => setCurrentScreen('complete_profile')}
              onTriggerUpdateModal={() => setCurrentScreen('confirm_update')}
            />
          )}

          {/* Screen 8: Work Profile Form (Filled) */}
          {currentScreen === 'work_profile_filled' && (
            <WorkProfileScreen
              profileData={{ ...profileData, photoUploaded: true }}
              setProfileData={setProfileData}
              onBack={() => setCurrentScreen('complete_profile')}
              onTriggerUpdateModal={() => setCurrentScreen('confirm_update')}
            />
          )}

          {/* Screen 9: Confirm Update Modal */}
          {currentScreen === 'confirm_update' && (
            <div className="relative h-full flex flex-col flex-1">
              <WorkProfileScreen
                profileData={profileData}
                setProfileData={setProfileData}
                onBack={() => {}}
                onTriggerUpdateModal={() => {}}
              />
              <WorkProfileUpdateModal
                isOpen={true}
                onConfirm={() => {
                  setProfileData(prev => ({ ...prev, photoUploaded: true }));
                  setCurrentScreen('update_success');
                  showNotification({
                    title: "Profile Saved",
                    message: "Personal information and profile picture were updated.",
                    type: "success"
                  });
                }}
                onCancel={() => setCurrentScreen('work_profile_filled')}
              />
            </div>
          )}

          {/* Screen 10: Update Success Modal */}
          {currentScreen === 'update_success' && (
            <div className="relative h-full flex flex-col flex-1">
              <WorkProfileScreen
                profileData={profileData}
                setProfileData={setProfileData}
                onBack={() => {}}
                onTriggerUpdateModal={() => {}}
              />
              <WorkProfileUpdatedModal
                isOpen={true}
                onVisitProfile={() => setCurrentScreen('user_profile_view')}
              />
            </div>
          )}

          {/* Screen 11: User Profile View (Contact) */}
          {currentScreen === 'user_profile_view' && (
            <UserProfileView
              profileData={profileData}
              showAchievements={showAchievements}
              setShowAchievements={setShowAchievements}
              onBack={() => setCurrentScreen('home_active')}
              onNavigateHome={() => setCurrentScreen('onboard')}
              onShowNotification={showNotification}
            />
          )}

          {/* Screen 12: User Profile View (With Achievements) */}
          {currentScreen === 'user_profile_achievements' && (
            <UserProfileView
              profileData={profileData}
              showAchievements={true}
              setShowAchievements={setShowAchievements}
              onBack={() => setCurrentScreen('home_active')}
              onNavigateHome={() => setCurrentScreen('onboard')}
              onShowNotification={showNotification}
            />
          )}

          {/* Screen 13: Home Screen Empty State */}
          {currentScreen === 'home_empty' && (
            <HomeScreen
              isEmptyState={true}
              profileData={profileData}
              onNavigateProfile={() => setCurrentScreen('complete_profile')}
              onToggleEmptyState={() => setCurrentScreen('home_active')}
              onNavigate={(screen) => setCurrentScreen(screen)}
              onOpenNotifications={() => setIsNotificationsOpen(true)}
              onShowNotification={showNotification}
            />
          )}

          {/* Screen 14: Home Screen Active State */}
          {currentScreen === 'home_active' && (
            <HomeScreen
              isEmptyState={false}
              profileData={profileData}
              onNavigateProfile={() => setCurrentScreen('user_profile_view')}
              onToggleEmptyState={() => setCurrentScreen('home_empty')}
              onNavigate={(screen) => setCurrentScreen(screen)}
              onOpenNotifications={() => setIsNotificationsOpen(true)}
              onShowNotification={showNotification}
            />
          )}
        </AppContainer>

    </div>
  );
}
