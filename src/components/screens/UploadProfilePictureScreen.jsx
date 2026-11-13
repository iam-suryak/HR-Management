import React, { useState, useRef } from 'react';
import { 
  ChevronLeft, Upload, Camera, Trash2, Check, RefreshCw, 
  Image as ImageIcon, Sparkles, AlertCircle, ArrowUpRight 
} from 'lucide-react';
import { BeanieAvatar, SmileyAvatar } from '../../assets/illustrations';
import profileAvatarImg from '../../assets/profile-avatar.jpg';

export default function UploadProfilePictureScreen({ 
  profileData, 
  setProfileData, 
  onBack, 
  onSaveSuccess,
  onShowNotification 
}) {
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  
  // Current preview: could be existing custom avatar, preset, or newly uploaded
  const [selectedAvatarType, setSelectedAvatarType] = useState(
    profileData?.avatarUrl ? 'custom' : profileData?.photoUploaded ? 'beanie' : 'smiley'
  );
  const [customImagePreview, setCustomImagePreview] = useState(profileData?.avatarUrl || null);
  const [fileName, setFileName] = useState(profileData?.avatarFileName || '');
  const [fileSize, setFileSize] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Handle local file selection
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    processFile(file);
  };

  const processFile = (file) => {
    // Validate type
    if (!file.type.startsWith('image/')) {
      if (onShowNotification) {
        onShowNotification({
          title: "Invalid File Type",
          message: "Please choose an image (.jpeg, .png, .webp).",
          type: "error"
        });
      }
      return;
    }

    // Validate size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      if (onShowNotification) {
        onShowNotification({
          title: "File Too Large",
          message: "Please upload an image smaller than 5MB.",
          type: "error"
        });
      }
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setCustomImagePreview(objectUrl);
    setSelectedAvatarType('custom');
    setFileName(file.name);
    setFileSize((file.size / (1024 * 1024)).toFixed(2) + ' MB');

    if (onShowNotification) {
      onShowNotification({
        title: "Photo Loaded",
        message: `${file.name} ready for preview.`,
        type: "info"
      });
    }
  };

  // Drag and drop handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleSave = () => {
    setIsSaving(true);

    setTimeout(() => {
      let updatedData = { ...profileData };

      if (selectedAvatarType === 'custom' && customImagePreview) {
        updatedData.photoUploaded = true;
        updatedData.avatarUrl = customImagePreview;
        updatedData.avatarFileName = fileName;
      } else if (selectedAvatarType === 'beanie') {
        updatedData.photoUploaded = true;
        updatedData.avatarUrl = null;
        updatedData.avatarFileName = '';
      } else {
        // smiley / empty
        updatedData.photoUploaded = false;
        updatedData.avatarUrl = null;
        updatedData.avatarFileName = '';
      }

      setProfileData(updatedData);
      setIsSaving(false);

      if (onShowNotification) {
        onShowNotification({
          title: "Profile Picture Updated",
          message: "Your new avatar has been applied across Work Mate.",
          type: "success"
        });
      }

      if (onSaveSuccess) {
        onSaveSuccess();
      } else if (onBack) {
        onBack();
      }
    }, 300);
  };

  const handleRemovePhoto = () => {
    setCustomImagePreview(null);
    setFileName('');
    setFileSize('');
    setSelectedAvatarType('smiley');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#FAFAFC] overflow-y-auto select-none">
      
      {/* Header matching Work Mate style */}
      <div className="px-5 pt-3 pb-3 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-10 flex-shrink-0">
        <button 
          onClick={onBack}
          type="button"
          className="w-8 h-8 rounded-full border border-slate-200/80 flex items-center justify-center text-slate-700 hover:bg-slate-50 active:scale-95 transition cursor-pointer"
          title="Go Back"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="font-bold text-sm text-slate-900">Upload Profile Picture</span>
        <div className="w-8" />
      </div>

      <div className="px-5 py-4 space-y-4 w-full max-w-full overflow-hidden flex-1 flex flex-col justify-between">
        
        <div className="space-y-4">
          {/* Subtitle */}
          <div>
            <h2 className="text-xs font-bold text-slate-900">Personal Photo</h2>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Choose or upload a photo to personalize your Work Mate account.
            </p>
          </div>

          {/* Interactive Upload Card / Preview Zone */}
          <div 
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`relative rounded-3xl p-5 border-2 transition-all duration-200 flex flex-col items-center justify-center text-center ${
              dragActive 
                ? 'border-[#635BFF] bg-[#635BFF]/5 ring-4 ring-[#635BFF]/10' 
                : 'border-dashed border-slate-200 bg-white hover:border-[#635BFF]/50 shadow-2xs'
            }`}
          >
            {/* Hidden Real File Input */}
            <input 
              ref={fileInputRef}
              type="file"
              accept="image/png, image/jpeg, image/jpg, image/webp"
              onChange={handleFileChange}
              className="hidden"
            />

            {/* Circular Preview Container */}
            <div className="relative mb-3 group">
              <div className="w-28 h-28 rounded-3xl overflow-hidden p-1 bg-white border-2 border-slate-200 shadow-md flex items-center justify-center relative">
                {selectedAvatarType === 'custom' && customImagePreview ? (
                  <img 
                    src={customImagePreview} 
                    alt="Preview" 
                    className="w-full h-full object-cover rounded-2xl"
                  />
                ) : selectedAvatarType === 'beanie' ? (
                  <BeanieAvatar className="w-full h-full" />
                ) : (
                  <SmileyAvatar className="w-full h-full" />
                )}
              </div>

              {/* Quick Change Badge */}
              <button 
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-[#635BFF] hover:bg-[#5249E8] active:scale-90 text-white flex items-center justify-center shadow-lg border-2 border-white transition-all cursor-pointer"
                title="Browse New Image"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>

            {/* Status / File Name */}
            {selectedAvatarType === 'custom' && customImagePreview ? (
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-800 block truncate max-w-[220px]">
                  {fileName || "Custom Uploaded Photo"}
                </span>
                {fileSize && (
                  <span className="text-[10px] text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full font-medium inline-block">
                    ✓ {fileSize}
                  </span>
                )}
                <div className="pt-2 flex items-center justify-center space-x-2">
                  <button 
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-[11px] font-semibold text-[#635BFF] hover:underline flex items-center space-x-1 cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Change Photo</span>
                  </button>
                  <span className="text-slate-300">•</span>
                  <button 
                    type="button"
                    onClick={handleRemovePhoto}
                    className="text-[11px] font-semibold text-rose-500 hover:underline flex items-center space-x-1 cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 bg-[#635BFF]/10 text-[#635BFF] hover:bg-[#635BFF]/15 active:scale-95 text-xs font-bold rounded-xl transition cursor-pointer inline-flex items-center space-x-1.5"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Browse From Computer</span>
                </button>
                <p className="text-[10px] text-slate-400 mt-2">
                  or drag and drop your photo right here
                </p>
              </div>
            )}
          </div>

          {/* Preset Avatar Selection */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-700 block">
              Or Choose A Preset Avatar
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              
              {/* Preset 1: Authentic Figma Beanie Avatar */}
              <div 
                onClick={() => setSelectedAvatarType('beanie')}
                className={`p-2.5 rounded-2xl border transition-all cursor-pointer flex items-center space-x-2.5 ${
                  selectedAvatarType === 'beanie'
                    ? 'border-[#635BFF] bg-[#635BFF]/5 shadow-xs ring-1 ring-[#635BFF]'
                    : 'border-slate-200/80 bg-white hover:border-slate-300'
                }`}
              >
                <div className="w-10 h-10 rounded-xl overflow-hidden border border-slate-100 flex-shrink-0">
                  <BeanieAvatar className="w-full h-full" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[11px] font-bold text-slate-800 block truncate">Original Beanie</span>
                  <span className="text-[9px] text-slate-400 block">Figma Default</span>
                </div>
                {selectedAvatarType === 'beanie' && (
                  <div className="w-4 h-4 rounded-full bg-[#635BFF] text-white flex items-center justify-center flex-shrink-0">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                )}
              </div>

              {/* Preset 2: Smiley Placeholder */}
              <div 
                onClick={() => setSelectedAvatarType('smiley')}
                className={`p-2.5 rounded-2xl border transition-all cursor-pointer flex items-center space-x-2.5 ${
                  selectedAvatarType === 'smiley'
                    ? 'border-[#635BFF] bg-[#635BFF]/5 shadow-xs ring-1 ring-[#635BFF]'
                    : 'border-slate-200/80 bg-white hover:border-slate-300'
                }`}
              >
                <div className="w-10 h-10 rounded-xl overflow-hidden border border-slate-100 flex-shrink-0">
                  <SmileyAvatar className="w-full h-full" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[11px] font-bold text-slate-800 block truncate">Minimal Smiley</span>
                  <span className="text-[9px] text-slate-400 block">Placeholder</span>
                </div>
                {selectedAvatarType === 'smiley' && (
                  <div className="w-4 h-4 rounded-full bg-[#635BFF] text-white flex items-center justify-center flex-shrink-0">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* Photo Guidelines Card */}
          <div className="bg-[#EDE9FE]/40 border border-[#635BFF]/20 rounded-2xl p-3 flex items-start space-x-2.5">
            <AlertCircle className="w-4 h-4 text-[#635BFF] flex-shrink-0 mt-0.5" />
            <div className="text-[10px] text-slate-600 space-y-0.5 leading-relaxed">
              <span className="font-bold text-slate-800 block">Upload Requirements:</span>
              <p>• Accepted formats: <strong className="text-slate-800">.jpeg, .png, .webp</strong></p>
              <p>• Dimensions: At least <strong className="text-slate-800">800×800 px</strong> (square ratio 1:1)</p>
              <p>• File size limit: <strong className="text-slate-800">Less than 5MB</strong></p>
            </div>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="pt-3 pb-2 space-y-2">
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="w-full py-3.5 bg-[#635BFF] hover:bg-[#5249E8] active:scale-[0.98] text-white text-xs font-bold rounded-2xl shadow-lg shadow-[#635BFF]/30 transition-all duration-150 cursor-pointer disabled:opacity-50 flex items-center justify-center space-x-1.5"
          >
            {isSaving ? (
              <span>Saving Picture...</span>
            ) : (
              <>
                <Check className="w-4 h-4 stroke-[2.5]" />
                <span>Save Profile Picture</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onBack}
            className="w-full py-3 bg-white hover:bg-slate-50 active:scale-[0.98] text-slate-600 text-xs font-bold rounded-2xl border border-slate-200 transition-all duration-150 cursor-pointer"
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
}
