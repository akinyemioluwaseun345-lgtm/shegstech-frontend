'use client';

import React, { useRef, useState } from 'react';
import { uploadAvatar } from '@/lib/userApi';
import { Upload, AlertCircle, CheckCircle, Loader, X } from 'lucide-react';

interface AvatarUploaderProps {
  currentAvatar: string;
  onSuccess: (url: string) => void;
}

export function AvatarUploader({ currentAvatar, onSuccess }: AvatarUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPreview(result);
      setError(null);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!fileInputRef.current?.files?.[0]) return;

    const file = fileInputRef.current.files[0];
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await uploadAvatar(file);

      if (response.success && response.data?.url) {
        setSuccess(true);
        onSuccess(response.data.url);
        setPreview(null);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError(response.error || 'Failed to upload avatar');
      }
    } catch (err) {
      setError('An error occurred while uploading your avatar');
      console.error('[v0] Avatar upload error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setPreview(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (preview) {
    return (
      <div className="space-y-4">
        <div className="flex justify-center">
          <img
            src={preview}
            alt="Preview"
            className="w-32 h-32 rounded-full object-cover border-4 border-indigo-600"
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleUpload}
            disabled={isLoading}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-600/50 text-white rounded-lg font-medium transition-colors"
          >
            {isLoading && <Loader className="w-4 h-4 animate-spin" />}
            {isLoading ? 'Uploading...' : 'Upload'}
          </button>

          <button
            onClick={handleCancel}
            disabled={isLoading}
            className="flex-1 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-gray-300 rounded-lg font-medium transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div
        onClick={() => fileInputRef.current?.click()}
        className="flex flex-col items-center justify-center w-full p-8 border-2 border-dashed border-zinc-700 rounded-lg cursor-pointer hover:border-indigo-600 hover:bg-indigo-600/5 transition-colors"
      >
        <Upload className="w-8 h-8 text-gray-400 mb-2" />
        <p className="text-sm font-medium text-gray-300">Click to upload or drag and drop</p>
        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {error && (
        <div className="flex items-center gap-3 p-3 bg-red-900/30 border border-red-700/50 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
          <p className="text-sm text-red-300">{error}</p>
        </div>
      )}

      {success && (
        <div className="flex items-center gap-3 p-3 bg-emerald-900/30 border border-emerald-700/50 rounded-lg">
          <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <p className="text-sm text-emerald-300">Avatar uploaded successfully!</p>
        </div>
      )}
    </div>
  );
}
