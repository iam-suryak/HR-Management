import React, { useState } from 'react';
import { Mail, EyeOff, Eye, ChevronDown, Check, AlertCircle } from 'lucide-react';
import { WorkMateLogo } from '../../assets/illustrations';

export default function SignUpScreen({ 
  formData, 
  setFormData, 
  onOpenTnC, 
  onSignUpSubmit, 
  onNavigate,
  onShowNotification
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Validate individual field
  const validateField = (field, value, allData = formData) => {
    switch (field) {
      case 'email': {
        const val = (value || '').trim();
        if (!val) return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(val)) return 'Please enter a valid email address (e.g. name@domain.com)';
        return '';
      }
      case 'phone': {
        const val = (value || '').trim();
        if (!val) return 'Phone number is required';
        const digits = val.replace(/\D/g, '');
        if (digits.length < 8) return 'Please enter a valid phone number (at least 8 digits)';
        return '';
      }
      case 'companyId': {
        const val = (value || '').trim();
        if (!val) return 'Company ID is required';
        if (val.length < 3) return 'Company ID must be at least 3 characters';
        return '';
      }
      case 'password': {
        if (!value) return 'Password is required';
        if (value.length < 6) return 'Password must be at least 6 characters';
        return '';
      }
      case 'confirmPassword': {
        if (!value) return 'Please confirm your password';
        if (value !== allData.password) return 'Passwords do not match';
        return '';
      }
      case 'agreed': {
        if (!value) return 'Please agree to the Terms & Conditions and Privacy Policy';
        return '';
      }
      default:
        return '';
    }
  };

  const validateAll = (data = formData) => {
    const newErrors = {};
    ['email', 'phone', 'companyId', 'password', 'confirmPassword', 'agreed'].forEach((field) => {
      const err = validateField(field, data[field], data);
      if (err) newErrors[field] = err;
    });
    return newErrors;
  };

  const handleFieldChange = (field, value) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);

    // If user already attempted to submit or this field currently has an error, validate dynamically
    if (submitted || errors[field]) {
      const err = validateField(field, value, updated);
      setErrors((prev) => {
        const next = { ...prev };
        if (err) {
          next[field] = err;
        } else {
          delete next[field];
        }
        // If password is changed, recheck confirmPassword if it's already filled
        if (field === 'password' && updated.confirmPassword) {
          const confirmErr = validateField('confirmPassword', updated.confirmPassword, updated);
          if (confirmErr) next.confirmPassword = confirmErr;
          else delete next.confirmPassword;
        }
        return next;
      });
    }
  };

  const handleBlur = (field) => {
    const err = validateField(field, formData[field], formData);
    if (err) {
      setErrors((prev) => ({ ...prev, [field]: err }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    const newErrors = validateAll(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      if (onShowNotification) {
        if (newErrors.email) {
          onShowNotification({
            title: "Invalid Email",
            message: newErrors.email,
            type: "error"
          });
        } else if (newErrors.confirmPassword) {
          onShowNotification({
            title: "Password Mismatch",
            message: newErrors.confirmPassword,
            type: "error"
          });
        } else if (newErrors.agreed) {
          onShowNotification({
            title: "Agreement Required",
            message: newErrors.agreed,
            type: "warning"
          });
        } else {
          const firstMsg = Object.values(newErrors)[0];
          onShowNotification({
            title: "Please Check Details",
            message: firstMsg || "Please correct the highlighted errors.",
            type: "error"
          });
        }
      }
      return;
    }

    onSignUpSubmit();
  };

  return (
    <div className="flex flex-col min-h-full bg-white px-6 pt-4 pb-8 select-none">
      
      {/* Brand Header */}
      <div className="flex flex-col items-center justify-center pt-2 pb-5">
        <WorkMateLogo className="w-14 h-14 mb-3" />
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">Work Mate</h1>
        <p className="text-xs text-slate-400 mt-0.5">Register Using Your Credentials</p>
      </div>

      {/* Sign Up Form */}
      <form onSubmit={handleSubmit} noValidate className="space-y-3 flex-1 flex flex-col justify-between">
        <div className="space-y-2.5">
          
          {/* Email */}
          <div>
            <label className="text-[11px] font-semibold text-slate-600 block mb-1">Email</label>
            <div className="relative">
              <div className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${errors.email ? 'text-rose-500' : 'text-slate-400'}`}>
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                placeholder="Enter Your Email"
                value={formData.email}
                onChange={(e) => handleFieldChange('email', e.target.value)}
                onBlur={() => handleBlur('email')}
                className={`w-full pl-10 pr-4 py-2.5 bg-white border rounded-2xl text-xs placeholder-slate-400 focus:outline-none transition ${
                  errors.email 
                    ? 'border-rose-400 focus:border-rose-500 bg-rose-50/20 text-rose-900 ring-1 ring-rose-300/30' 
                    : 'border-slate-200 focus:border-[#635BFF] text-slate-800'
                }`}
              />
            </div>
            {errors.email && (
              <p className="text-[10px] text-rose-500 font-medium mt-1 flex items-center space-x-1 animate-in fade-in duration-150">
                <AlertCircle className="w-3 h-3 flex-shrink-0" />
                <span>{errors.email}</span>
              </p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label className="text-[11px] font-semibold text-slate-600 block mb-1">Phone Number</label>
            <div className={`flex items-center space-x-2 border rounded-2xl px-3 py-2 bg-white transition ${
              errors.phone 
                ? 'border-rose-400 bg-rose-50/20 ring-1 ring-rose-300/30' 
                : 'border-slate-200 focus-within:border-[#635BFF]'
            }`}>
              <div className="flex items-center space-x-1 text-xs font-semibold text-slate-700 pr-2 border-r border-slate-200 cursor-pointer">
                <span>INA</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </div>
              <input
                type="tel"
                placeholder="+62 0000 0000 0000"
                value={formData.phone}
                onChange={(e) => handleFieldChange('phone', e.target.value)}
                onBlur={() => handleBlur('phone')}
                className="w-full text-xs text-slate-800 placeholder-slate-400 focus:outline-none bg-transparent"
              />
            </div>
            {errors.phone && (
              <p className="text-[10px] text-rose-500 font-medium mt-1 flex items-center space-x-1 animate-in fade-in duration-150">
                <AlertCircle className="w-3 h-3 flex-shrink-0" />
                <span>{errors.phone}</span>
              </p>
            )}
          </div>

          {/* Company ID */}
          <div>
            <label className="text-[11px] font-semibold text-slate-600 block mb-1">Company ID</label>
            <div className="relative">
              <div className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${errors.companyId ? 'text-rose-500' : 'text-slate-400'}`}>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="16" rx="3" />
                  <circle cx="12" cy="10" r="3" />
                  <path d="M7 17c0-2 2-3 5-3s5 1 5 3" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Enter Company ID"
                value={formData.companyId}
                onChange={(e) => handleFieldChange('companyId', e.target.value)}
                onBlur={() => handleBlur('companyId')}
                className={`w-full pl-10 pr-4 py-2.5 bg-white border rounded-2xl text-xs placeholder-slate-400 focus:outline-none transition ${
                  errors.companyId 
                    ? 'border-rose-400 focus:border-rose-500 bg-rose-50/20 text-rose-900 ring-1 ring-rose-300/30' 
                    : 'border-slate-200 focus:border-[#635BFF] text-slate-800'
                }`}
              />
            </div>
            {errors.companyId && (
              <p className="text-[10px] text-rose-500 font-medium mt-1 flex items-center space-x-1 animate-in fade-in duration-150">
                <AlertCircle className="w-3 h-3 flex-shrink-0" />
                <span>{errors.companyId}</span>
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="text-[11px] font-semibold text-slate-600 block mb-1">Password</label>
            <div className="relative">
              <div className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${errors.password ? 'text-rose-500' : 'text-slate-400'}`}>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2a10 10 0 0 0-10 10c0 3.3 1.6 6.3 4 8.1" />
                  <path d="M12 6a6 6 0 0 0-6 6c0 1.9 1 3.7 2.4 4.8" />
                  <path d="M12 10a2 2 0 0 0-2 2c0 .6.3 1.2.8 1.6" />
                  <path d="M12 2a10 10 0 0 1 10 10c0 3.3-1.6 6.3-4 8.1" />
                  <path d="M12 6a6 6 0 0 1 6 6c0 1.9-1 3.7-2.4 4.8" />
                  <path d="M12 10a2 2 0 0 1 2 2c0 .6-.3 1.2-.8 1.6" />
                </svg>
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="My Password"
                value={formData.password}
                onChange={(e) => handleFieldChange('password', e.target.value)}
                onBlur={() => handleBlur('password')}
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
              <p className="text-[10px] text-rose-500 font-medium mt-1 flex items-center space-x-1 animate-in fade-in duration-150">
                <AlertCircle className="w-3 h-3 flex-shrink-0" />
                <span>{errors.password}</span>
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-[11px] font-semibold text-slate-600 block mb-1">Confirm Password</label>
            <div className="relative">
              <div className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${errors.confirmPassword ? 'text-rose-500' : 'text-slate-400'}`}>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2a10 10 0 0 0-10 10c0 3.3 1.6 6.3 4 8.1" />
                  <path d="M12 6a6 6 0 0 0-6 6c0 1.9 1 3.7 2.4 4.8" />
                  <path d="M12 10a2 2 0 0 0-2 2c0 .6.3 1.2.8 1.6" />
                  <path d="M12 2a10 10 0 0 1 10 10c0 3.3-1.6 6.3-4 8.1" />
                  <path d="M12 6a6 6 0 0 1 6 6c0 1.9-1 3.7-2.4 4.8" />
                  <path d="M12 10a2 2 0 0 1 2 2c0 .6-.3 1.2-.8 1.6" />
                </svg>
              </div>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm My Password"
                value={formData.confirmPassword}
                onChange={(e) => handleFieldChange('confirmPassword', e.target.value)}
                onBlur={() => handleBlur('confirmPassword')}
                className={`w-full pl-10 pr-10 py-2.5 bg-white border rounded-2xl text-xs placeholder-slate-400 focus:outline-none transition ${
                  errors.confirmPassword 
                    ? 'border-rose-400 focus:border-rose-500 bg-rose-50/20 text-rose-900 ring-1 ring-rose-300/30' 
                    : 'border-slate-200 focus:border-[#635BFF] text-slate-800'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer active:scale-90 transition-transform p-1"
                title={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-[10px] text-rose-500 font-medium mt-1 flex items-center space-x-1 animate-in fade-in duration-150">
                <AlertCircle className="w-3 h-3 flex-shrink-0" />
                <span>{errors.confirmPassword}</span>
              </p>
            )}
          </div>

          {/* Terms & Conditions Agreement */}
          <div>
            <div className="flex items-start space-x-2.5 pt-1">
              <button
                type="button"
                onClick={() => handleFieldChange('agreed', !formData.agreed)}
                className={`w-4 h-4 rounded-md mt-0.5 flex items-center justify-center transition-all cursor-pointer active:scale-90 border ${
                  formData.agreed
                    ? 'bg-[#635BFF] border-[#635BFF] text-white'
                    : errors.agreed
                      ? 'border-rose-500 ring-2 ring-rose-200 bg-white'
                      : 'border-slate-300 bg-white hover:border-[#635BFF]'
                }`}
              >
                {formData.agreed && <Check className="w-3 h-3 stroke-[3]" />}
              </button>
              <div className="text-[11px] text-slate-500 leading-tight">
                <span>I agree with </span>
                <button
                  type="button"
                  onClick={onOpenTnC}
                  className="text-[#635BFF] font-semibold underline underline-offset-2 hover:text-[#5249E8] cursor-pointer active:opacity-70 transition-opacity"
                >
                  terms & conditions
                </button>
                <span> and </span>
                <button
                  type="button"
                  onClick={onOpenTnC}
                  className="text-[#635BFF] font-semibold underline underline-offset-2 hover:text-[#5249E8] cursor-pointer active:opacity-70 transition-opacity"
                >
                  privacy policy
                </button>
              </div>
            </div>
            {errors.agreed && (
              <p className="text-[10px] text-rose-500 font-medium mt-1 flex items-center space-x-1 animate-in fade-in duration-150">
                <AlertCircle className="w-3 h-3 flex-shrink-0" />
                <span>{errors.agreed}</span>
              </p>
            )}
          </div>
        </div>

        {/* Submit Action */}
        <div className="pt-3 space-y-2.5">
          <button
            type="submit"
            className="w-full py-3.5 bg-[#635BFF] hover:bg-[#5249E8] active:scale-[0.97] text-white text-sm font-bold rounded-2xl shadow-lg shadow-[#635BFF]/30 transition-all duration-150 cursor-pointer active:shadow-sm"
          >
            Sign Up
          </button>

          <p className="text-center text-xs text-slate-500">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => onNavigate('onboard')}
              className="text-[#635BFF] font-bold hover:underline cursor-pointer active:opacity-75 transition-opacity"
            >
              Sign in here
            </button>
          </p>
        </div>
      </form>

    </div>
  );
}
