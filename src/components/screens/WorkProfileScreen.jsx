import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronDown, User, Calendar, Briefcase, Upload, RotateCw, MapPin } from 'lucide-react';
import { BeanieAvatar } from '../../assets/illustrations';

export default function WorkProfileScreen({ 
  profileData, 
  setProfileData, 
  onBack, 
  onTriggerUpdateModal 
}) {
  const fileInputRef = useRef(null);
  const isFilled = profileData.photoUploaded;

  const processFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert("Please select a valid image file (.jpeg, .png, .webp).");
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    if (setProfileData) {
      setProfileData((prev) => ({
        ...prev,
        photoUploaded: true,
        avatarUrl: objectUrl,
        avatarFileName: file.name
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleOpenFolder = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="flex flex-col min-h-full bg-white pb-12 select-none overflow-x-hidden w-full">
      
      {/* Top Bar */}
      <div className="px-5 pt-3 pb-3 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10 flex-shrink-0">
        <button 
          onClick={onBack}
          className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-700 transition-all active:scale-90 cursor-pointer"
          title="Go back"
        >
          <ChevronLeft className="w-5 h-5 -ml-0.5" />
        </button>
        <span className="font-bold text-sm text-slate-900">My Work Profile</span>
        <div className="w-8" />
      </div>

      <div className="px-5 py-4 space-y-4 w-full max-w-full overflow-hidden">
        
        {/* Section 1: Personal Data Information */}
        <div>
          <h2 className="text-xs font-bold text-slate-900">Personal Data Information</h2>
          <p className="text-[10px] text-slate-400 mt-0.5">Your personal data information</p>

          {/* Upload Photo Area */}
          <div className="mt-3 flex flex-col items-center justify-center">
            {/* Hidden real file input that triggers system folder / file picker dialog */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png, image/jpeg, image/jpg, image/webp"
              onChange={handleFileChange}
              className="hidden"
            />

            {!isFilled ? (
              <div 
                onClick={handleOpenFolder}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className="w-full max-w-[200px] border-2 border-dashed border-slate-200 rounded-3xl p-5 flex flex-col items-center justify-center text-center cursor-pointer hover:border-[#635BFF] transition-all active:scale-95 group bg-slate-50/50"
                title="Click to select a photo from your computer folders"
              >
                <div className="relative mb-2">
                  <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-[#635BFF] group-hover:border-[#635BFF]/40 transition">
                    <Upload className="w-5 h-5" />
                  </div>
                  <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#635BFF] text-white rounded-full flex items-center justify-center text-[9px] font-bold shadow-xs">
                    ↑
                  </span>
                </div>
                <span className="text-xs font-bold text-slate-700 group-hover:text-[#635BFF] transition">Upload Photo</span>
                <span className="text-[9px] text-slate-400 mt-1 leading-tight">
                  Format should be in .jpeg .png atleast 800×800px and less than 5MB
                </span>
              </div>
            ) : (
              <div className="relative flex flex-col items-center">
                <div 
                  onClick={handleOpenFolder}
                  className="relative cursor-pointer group"
                  title="Click to choose another photo from folder"
                >
                  <BeanieAvatar className="w-24 h-24" customUrl={profileData.avatarUrl} />
                  <button 
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenFolder();
                    }}
                    className="absolute top-0 -right-1 w-6 h-6 rounded-full bg-[#635BFF] text-white flex items-center justify-center shadow-md border-2 border-white hover:bg-[#5249E8] transition-all active:scale-90 active:rotate-180 cursor-pointer"
                    title="Change Photo from folder"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="text-xs font-bold text-slate-700 mt-2">Upload Photo</span>
                <span className="text-[9px] text-slate-400 mt-0.5 text-center max-w-[200px] leading-tight">
                  Format should be in .jpeg .png atleast 800×800px and less than 5MB
                </span>
              </div>
            )}
          </div>

          {/* Form Fields */}
          <div className="mt-4 space-y-3">
            {/* First Name */}
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">First Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Tonald"
                  value={profileData.firstName}
                  onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#635BFF] transition"
                />
              </div>
            </div>

            {/* Last Name */}
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">Last Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Drump"
                  value={profileData.lastName}
                  onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#635BFF] transition"
                />
              </div>
            </div>

            {/* Date of Birth */}
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">Date of Birth</label>
              <div className="relative flex items-center">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="10 December 1997"
                  value={profileData.dob}
                  onChange={(e) => setProfileData({ ...profileData, dob: e.target.value })}
                  className="w-full pl-10 pr-9 py-2.5 bg-white border border-slate-200 rounded-2xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#635BFF] transition"
                />
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Position */}
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">Position</label>
              <div className="relative flex items-center">
                <Briefcase className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Junior Full Stack Developer"
                  value={profileData.position}
                  onChange={(e) => setProfileData({ ...profileData, position: e.target.value })}
                  className="w-full pl-10 pr-9 py-2.5 bg-white border border-slate-200 rounded-2xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#635BFF] transition"
                />
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Address */}
        <div>
          <h2 className="text-xs font-bold text-slate-900">Address</h2>
          <p className="text-[10px] text-slate-400 mt-0.5">Your current domicile</p>

          <div className="mt-2.5 relative">
            <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Taman Anggrek"
              value={profileData.address}
              onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#635BFF] transition"
            />
          </div>
        </div>

        {/* Update Profile Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={onTriggerUpdateModal}
            className="w-full py-3.5 bg-[#635BFF] hover:bg-[#5249E8] active:scale-[0.97] text-white text-xs font-bold rounded-2xl shadow-lg shadow-[#635BFF]/30 transition-all duration-150 cursor-pointer active:shadow-sm"
          >
            Update Profile
          </button>
        </div>

      </div>

    </div>
  );
}
