import React from 'react';

export default function TnCModal({ isOpen, onAgree, onDecline }) {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-40 bg-black/40 backdrop-blur-[2px] flex items-end justify-center select-none animate-in fade-in duration-200">
      <div className="w-full bg-white rounded-t-[36px] px-6 pt-6 pb-8 shadow-2xl flex flex-col max-h-[85%] border-t border-slate-100">
        
        {/* Title */}
        <h3 className="text-center font-bold text-slate-900 text-base leading-snug px-4 mb-4">
          Terms & Conditions and <br /> Privacy Policy
        </h3>

        {/* Scrollable Terms Content */}
        <div className="flex-1 overflow-y-auto pr-2 space-y-4 text-[11px] text-slate-600 leading-relaxed border border-slate-100 p-4 rounded-2xl bg-slate-50/50">
          <div>
            <h4 className="font-bold text-slate-800 mb-1">Terms and Conditions:</h4>
            <p className="mb-2"><strong>Acceptance:</strong> By using the Re-Dus app, you agree to comply with all applicable terms and conditions.</p>
            <p className="mb-2"><strong>Usage:</strong> This app is for personal use only and may not be used for commercial purposes without permission.</p>
            <p className="mb-2"><strong>Account:</strong> You are responsible for the security of your account and all activities that occur within it.</p>
            <p className="mb-2"><strong>Content:</strong> You must not upload content that violates copyright, privacy, or applicable laws.</p>
            <p className="mb-2"><strong>Changes:</strong> We reserve the right to change the terms and conditions at any time and will notify you of these changes through the app or via email.</p>
          </div>

          <div>
            <h4 className="font-bold text-slate-800 mb-1">Privacy Policy:</h4>
            <p className="mb-2"><strong>Data Collection:</strong> We collect personal data such as name, email, and location to process transactions and improve our services.</p>
            <p className="mb-2"><strong>Data Usage:</strong> Your data is used for internal purposes such as account management, usage analysis, and service offerings.</p>
            <p className="mb-2"><strong>Security:</strong> We protect your data with appropriate security measures to prevent unauthorized access.</p>
            <p className="mb-2"><strong>Data Sharing:</strong> We do not share your personal data with third parties without your consent, except as required by law.</p>
            <p className="mb-2"><strong>Your Rights:</strong> You can access, update, or delete your personal data at anytime through the app settings or by contacting our team.</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 space-y-2.5">
          <button
            type="button"
            onClick={onAgree}
            className="w-full py-3.5 bg-[#635BFF] hover:bg-[#5249E8] active:scale-[0.97] text-white text-xs font-bold rounded-2xl shadow-lg shadow-[#635BFF]/30 transition-all duration-150 cursor-pointer active:shadow-sm"
          >
            I Agree
          </button>

          <button
            type="button"
            onClick={onDecline}
            className="w-full py-3.5 bg-white hover:bg-slate-50 active:scale-[0.97] text-slate-700 text-xs font-bold rounded-2xl border border-slate-300 transition-all duration-150 cursor-pointer active:bg-slate-100"
          >
            Decline
          </button>
        </div>

      </div>
    </div>
  );
}
