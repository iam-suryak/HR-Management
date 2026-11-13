import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, X, AlertCircle } from 'lucide-react';
import { WorkMateLogo } from '../../assets/illustrations';

export default function SignInModal({ isOpen, onClose, onSignInSuccess, onGoToSignUp }) {
  if (!isOpen) return null;

  const [email, setEmail] = useState('Tonald@work.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (mail, pass) => {
    const errs = {};
    const trimmed = (mail || '').trim();
    if (!trimmed) {
      errs.email = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmed)) {
        errs.email = 'Please enter a valid email address';
      }
    }

    if (!pass) {
      errs.password = 'Password is required';
    } else if (pass.length < 6) {
      errs.password = 'Password must be at least 6 characters';
    }
    return errs;
  };

  const handleEmailChange = (val) => {
    setEmail(val);
    if (submitted || errors.email) {
      const errs = validate(val, password);
      setErrors((prev) => ({ ...prev, email: errs.email }));
    }
  };

  const handlePasswordChange = (val) => {
    setPassword(val);
    if (submitted || errors.password) {
      const errs = validate(email, val);
      setErrors((prev) => ({ ...prev, password: errs.password }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    const errs = validate(email, password);
    setErrors(errs);

    if (Object.keys(errs).length > 0) {
      return;
    }

    onSignInSuccess({
      email,
      name: "Tonald Drump",
    });
  };

  return (
    <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-[2px] flex items-end justify-center select-none animate-in fade-in duration-200">
      <div className="w-full bg-white rounded-t-[36px] px-6 pt-6 pb-8 shadow-2xl flex flex-col border-t border-slate-100">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3">
          <div className="flex items-center space-x-2.5">
            <WorkMateLogo className="w-8 h-8 rounded-xl" />
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Welcome Back</h3>
              <p className="text-[10px] text-slate-400">Sign in to your Work Mate account</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 active:scale-90 flex items-center justify-center text-slate-600 transition-all cursor-pointer"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate className="space-y-3 mt-2">
          {/* Email */}
          <div>
            <label className="text-[11px] font-semibold text-slate-600 block mb-1">Email</label>
            <div className="relative">
              <Mail className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none ${
                errors.email ? 'text-rose-500' : 'text-slate-400'
              }`} />
              <input
                type="email"
                value={email}
                onChange={(e) => handleEmailChange(e.target.value)}
                placeholder="Tonald@work.com"
                className={`w-full pl-10 pr-4 py-2.5 bg-white border rounded-2xl text-xs placeholder-slate-400 focus:outline-none transition ${
                  errors.email 
                    ? 'border-rose-400 focus:border-rose-500 bg-rose-50/20 text-rose-900 ring-1 ring-rose-300/30' 
                    : 'border-slate-200 focus:border-[#635BFF] text-slate-800'
                }`}
              />
            </div>
            {errors.email && (
              <p className="text-[10.5px] text-rose-500 font-medium mt-1 flex items-center space-x-1 animate-in fade-in duration-150">
                <AlertCircle className="w-3 h-3 flex-shrink-0" />
                <span>{errors.email}</span>
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="text-[11px] font-semibold text-slate-600 block mb-1">Password</label>
            <div className="relative">
              <Lock className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none ${
                errors.password ? 'text-rose-500' : 'text-slate-400'
              }`} />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => handlePasswordChange(e.target.value)}
                placeholder="••••••••"
                className={`w-full pl-10 pr-10 py-2.5 bg-white border rounded-2xl text-xs placeholder-slate-400 focus:outline-none transition ${
                  errors.password 
                    ? 'border-rose-400 focus:border-rose-500 bg-rose-50/20 text-rose-900 ring-1 ring-rose-300/30' 
                    : 'border-slate-200 focus:border-[#635BFF] text-slate-800'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer active:scale-90 transition-transform p-1"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-[10.5px] text-rose-500 font-medium mt-1 flex items-center space-x-1 animate-in fade-in duration-150">
                <AlertCircle className="w-3 h-3 flex-shrink-0" />
                <span>{errors.password}</span>
              </p>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => {
                onSignInSuccess({
                  email,
                  name: "Tonald Drump",
                });
              }}
              className="text-[11px] text-[#635BFF] font-semibold hover:underline cursor-pointer active:opacity-75 transition-opacity"
            >
              Forgot Password?
            </button>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full py-3.5 bg-[#635BFF] hover:bg-[#5249E8] active:scale-[0.97] text-white text-xs font-bold rounded-2xl shadow-lg shadow-[#635BFF]/30 transition-all duration-150 cursor-pointer active:shadow-sm mt-1"
          >
            Sign In
          </button>

          <p className="text-center text-xs text-slate-500 pt-1">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={() => {
                onClose();
                onGoToSignUp();
              }}
              className="text-[#635BFF] font-bold hover:underline cursor-pointer active:opacity-75 transition-opacity"
            >
              Register here
            </button>
          </p>
        </form>

      </div>
    </div>
  );
}
