'use client';

import React, { useState, useMemo } from 'react';
import { ChangePasswordPayload } from '@/types/user';
import { changePassword } from '@/lib/userApi';
import { AlertCircle, CheckCircle, Loader, Eye, EyeOff } from 'lucide-react';

export function PasswordChangeForm() {
  const [formData, setFormData] = useState<ChangePasswordPayload>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Password strength calculation
  const passwordStrength = useMemo(() => {
    const password = formData.newPassword;
    let strength = 0;

    if (!password) return { level: 'none', score: 0, label: '' };

    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[!@#$%^&*]/.test(password)) strength++;

    const levels = ['weak', 'fair', 'good', 'strong', 'very-strong'];
    const labels = ['Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];

    return {
      level: levels[strength - 1] || 'weak',
      score: strength,
      label: labels[strength - 1] || 'Weak',
    };
  }, [formData.newPassword]);

  const passwordsMatch = formData.newPassword === formData.confirmPassword && formData.newPassword !== '';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    setError(null);
    setSuccess(false);
  };

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await changePassword(formData);

      if (response.success) {
        setSuccess(true);
        setFormData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError(response.error || 'Failed to change password');
      }
    } catch (err) {
      setError('An error occurred while changing your password');
      console.error('[v0] Change password error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Current Password */}
      <div>
        <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-300 mb-2">
          Current Password
        </label>
        <div className="relative">
          <input
            type={showPasswords.current ? 'text' : 'password'}
            id="currentPassword"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors pr-10"
            required
          />
          <button
            type="button"
            onClick={() => togglePasswordVisibility('current')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
          >
            {showPasswords.current ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* New Password */}
      <div>
        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-300 mb-2">
          New Password
        </label>
        <div className="relative">
          <input
            type={showPasswords.new ? 'text' : 'password'}
            id="newPassword"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors pr-10"
            required
          />
          <button
            type="button"
            onClick={() => togglePasswordVisibility('new')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
          >
            {showPasswords.new ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Password Strength Indicator */}
        {formData.newPassword && (
          <div className="mt-2">
            <div className="flex items-center gap-2 mb-1">
              <div className="flex-1 h-1.5 bg-zinc-700 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all ${
                    passwordStrength.score === 1 ? 'w-1/5 bg-red-500' :
                    passwordStrength.score === 2 ? 'w-2/5 bg-amber-500' :
                    passwordStrength.score === 3 ? 'w-3/5 bg-yellow-500' :
                    passwordStrength.score === 4 ? 'w-4/5 bg-emerald-500' :
                    'w-full bg-emerald-600'
                  }`}
                />
              </div>
              <span className={`text-xs font-medium ${
                passwordStrength.score === 1 ? 'text-red-400' :
                passwordStrength.score === 2 ? 'text-amber-400' :
                passwordStrength.score === 3 ? 'text-yellow-400' :
                'text-emerald-400'
              }`}>
                {passwordStrength.label}
              </span>
            </div>
            <p className="text-xs text-gray-400">
              Use 8+ characters, mix of uppercase, numbers, and special characters
            </p>
          </div>
        )}
      </div>

      {/* Confirm Password */}
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
          Confirm Password
        </label>
        <div className="relative">
          <input
            type={showPasswords.confirm ? 'text' : 'password'}
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors pr-10"
            required
          />
          <button
            type="button"
            onClick={() => togglePasswordVisibility('confirm')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
          >
            {showPasswords.confirm ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
          {formData.confirmPassword && (
            <div className="absolute right-12 top-1/2 -translate-y-1/2">
              {passwordsMatch ? (
                <CheckCircle className="w-5 h-5 text-emerald-500" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-500" />
              )}
            </div>
          )}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-3 p-3 bg-red-900/30 border border-red-700/50 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
          <p className="text-sm text-red-300">{error}</p>
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="flex items-center gap-3 p-3 bg-emerald-900/30 border border-emerald-700/50 rounded-lg">
          <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <p className="text-sm text-emerald-300">Password changed successfully!</p>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading || !passwordsMatch || passwordStrength.score < 3}
        className="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-600/50 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
      >
        {isLoading && <Loader className="w-4 h-4 animate-spin" />}
        {isLoading ? 'Updating...' : 'Change Password'}
      </button>
    </form>
  );
}
