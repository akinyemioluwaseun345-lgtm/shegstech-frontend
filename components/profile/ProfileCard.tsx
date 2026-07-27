'use client';

import React from 'react';
import { User } from '@/types/user';
import { Mail, Phone, Calendar, Shield, AlertCircle } from 'lucide-react';

interface ProfileCardProps {
  user: User;
}

export function ProfileCard({ user }: ProfileCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const then = new Date(dateString);
    const diffMs = now.getTime() - then.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays < 7) return `${diffDays} days ago`;
    return formatDate(dateString);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Contact Information */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Mail className="w-5 h-5 text-indigo-400" />
          Contact Information
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">
              Email
            </label>
            <p className="text-white">{user.email}</p>
          </div>

          {user.phoneNumber && (
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">
                Phone
              </label>
              <p className="text-white">{user.phoneNumber}</p>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">
              Email Status
            </label>
            <div className="flex items-center gap-2">
              <span
                className={`inline-block w-2 h-2 rounded-full ${
                  user.emailVerified ? 'bg-emerald-500' : 'bg-amber-500'
                }`}
              />
              <span className="text-sm text-gray-300">
                {user.emailVerified ? 'Verified' : 'Pending verification'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Account Information */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-indigo-400" />
          Account Information
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">
              Account ID
            </label>
            <p className="text-white font-mono text-sm">{user.id}</p>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">
              Member Since
            </label>
            <p className="text-white">{formatDate(user.createdAt)}</p>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">
              Last Login
            </label>
            <p className="text-white">{getTimeAgo(user.lastLogin)}</p>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">
              KYC Status
            </label>
            <div className="flex items-center gap-2">
              {!user.kycVerified && <AlertCircle className="w-4 h-4 text-amber-500" />}
              <span className="text-sm text-gray-300">
                {user.kycVerified ? 'Verified' : 'Not verified'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
