# Work Mate — 100% Faithful Implementation of Figma Screenshots

A pixel-perfect, responsive React application built directly from your Figma workflow screenshots:

- **Screenshot 1:** `OnboardFinal` & `SignUp`
- **Screenshot 2:** `SignUp/Filled` & `SignUp/TnC & PP` (Terms & Conditions and Privacy Policy Modal)
- **Screenshot 3:** `SignUp/Complete` & `SignUp/EmailVerification` (OTP 6-digit Code Sheet)
- **Screenshot 4:** `SignUp/EmailVerification/Filled` & `SignUp/Success` (Welcome Modal Sheet)
- **Screenshot 5:** `SignUp/CompleteProfile`, `SignUp/WorkProfileEmpty`, & `SignUp/WorkProfileFilled`
- **Screenshot 6:** `SignUp/WorkProfileUpdate`, `SignUp/WorkProfileUpdated`, & `SignUp/WorkProfile` (with Achievements Badges)
- **Screenshot 7:** `SignUp/EmptyState` & `SignUp/Home` (Active Meetings & Today Task)

---

## 🚀 Live Preview & Running

```bash
# Install dependencies (already installed)
npm install

# Start the Vite development server
npm run dev

# Build for production
npm run build
```

- **Local URL:** [http://localhost:5173/](http://localhost:5173/) or [http://127.0.0.1:5173/](http://127.0.0.1:5173/)
- **Network URL:** Check the terminal output when running `npm run dev` (Wi-Fi IP changes dynamically every day).

---

## 📱 Dual View Modes (Top Switcher)

1. **📱 Interactive Device Mode:**
   - Real-time clickable walkthrough on an iPhone container with iOS status bar (`08:15` / `9:41`), dynamic island, and home indicator.
   - Click through the whole user journey with real button interactions and transitions:
     - Tap **"Sign Up"** ➔ Fill form ➔ Open **"terms & conditions"** ➔ Tap **"I Agree"** ➔ Tap **"Sign Up"** ➔ Enter 6-digit OTP ➔ Tap **"Submit"** ➔ Tap **"Set Up My Profile"** ➔ Toggle Photo / edit fields ➔ Tap **"Update Profile"** ➔ Tap **"Yes, Update Profile"** ➔ Tap **"Visit My Profile"** ➔ Toggle Achievements Badges ➔ Navigate to Home Screen!
   - Jump directly to any of the 14 screen states using the quick selector pills or dropdown!

2. **🗺️ Figma Canvas Flowchart Mode:**
   - Displays the entire connected workflow side-by-side with exact Figma white connector labels:
     - `Tap Sign Up`
     - `Check Agreement TnC & PP`
     - `Tap the Sign Up Button`
     - `Welcome Message`
     - `Set Up Work Profile`
     - `Fill The Information`
     - `Profile Updated`
     - `View Profile`
     - `When You Got Achievements`
     - `Active Data State`

---

## 🎨 Design Accuracy & Components

- **Typography & Colors:** Authentic Plus Jakarta Sans & Inter font stack, exact Work Mate purple `#635BFF`, pastel lavender `#EDE9FE`, rose badges `#F43F5E`, emerald indicators `#10B981`.
- **Illustrations:**
  - Illustrated character with pink beanie & glasses (`BeanieAvatar`)
  - Smiley placeholder avatar (`SmileyAvatar`)
  - CCTV surveillance camera illustration with sparkles (`CCTVIllustration`)
  - Stacked documents empty state illustration (`EmptyTasksIllustration`)
  - 6-seat meeting grid empty state illustration (`EmptyMeetingsIllustration`)
  - Achievement badges: *Production Slayer*, *Junior Of The Month*, *Employee Of The Year*, *Top Performer*.
