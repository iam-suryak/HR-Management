import React, { useState, useRef } from 'react';
import emailVerificationIcon from '../../assets/icon-email-verification.png';

export default function EmailVerificationModal({ isOpen, email = "Hello@work.com", onSubmit, onClose, onShowNotification }) {
  if (!isOpen) return null;

  const [otp, setOtp] = useState(['0', '0', '0', '0', '0', '0']);
  const inputsRef = useRef([]);

  const handleChange = (val, index) => {
    const digit = val.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    // auto focus next
    if (digit && index < 5 && inputsRef.current[index + 1]) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  return (
    <div className="absolute inset-0 z-40 bg-black/50 backdrop-blur-[3px] flex items-end justify-center select-none animate-in fade-in duration-200">
      
      {/* Bottom Sheet Card */}
      <div className="relative w-full bg-white rounded-t-[36px] px-6 pt-10 pb-8 shadow-2xl flex flex-col items-center text-center">
        
        {/* Floating Top Purple Icon matching Figma Screenshot 3 & 4 */}
        <div className="absolute -top-9 left-1/2 -translate-x-1/2 w-16 h-16 flex items-center justify-center drop-shadow-[0_12px_24px_rgba(99,91,255,0.4)]">
          <img 
            src={emailVerificationIcon} 
            alt="Email Verification" 
            className="w-full h-full object-contain select-none"
            draggable="false"
          />
        </div>

        {/* Title & Subtitle */}
        <h3 className="text-base font-bold text-slate-900 mt-2">
          Email Verification Sent!
        </h3>
        <p className="text-xs text-slate-500 mt-1.5 leading-relaxed max-w-xs">
          A verification code will be sent to the email <strong className="text-slate-700">{email}</strong> for your account verification process.
        </p>

        {/* 6 OTP Code Rounded Input Boxes */}
        <div className="flex items-center justify-center space-x-2 my-6">
          {otp.map((digit, idx) => (
            <input
              key={idx}
              ref={(el) => (inputsRef.current[idx] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className="w-10 h-12 rounded-2xl border border-slate-200 text-center font-bold text-base text-slate-800 bg-white focus:outline-none focus:border-[#635BFF] focus:ring-1 focus:ring-[#635BFF] shadow-xs transition"
            />
          ))}
        </div>

        {/* Resend Link */}
        <p className="text-xs text-slate-500 mb-6">
          Haven't received the verification code?{' '}
          <button
            type="button"
            onClick={() => {
              if (onShowNotification) {
                onShowNotification({
                  title: "Code Resent",
                  message: `A new 6-digit verification code was sent to ${email}.`,
                  type: "info"
                });
              }
            }}
            className="text-[#635BFF] font-semibold hover:underline cursor-pointer active:opacity-75 transition-opacity"
          >
            Resend it.
          </button>
        </p>

        {/* Submit Button */}
        <button
          type="button"
          onClick={onSubmit}
          className="w-full py-3.5 bg-[#635BFF] hover:bg-[#5249E8] active:scale-[0.97] text-white text-xs font-bold rounded-2xl shadow-lg shadow-[#635BFF]/30 transition-all duration-150 cursor-pointer active:shadow-sm"
        >
          Submit
        </button>

      </div>
    </div>
  );
}
