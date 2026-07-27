'use client';

import React from 'react';
import Link from 'next/link';
import { User } from '@/types/user';
import { CheckCircle, LogOut, Settings, Edit3 } from 'lucide-react';

interface ProfileHeaderProps {
  user: User;
  onSignOut: () => void;
}

export function ProfileHeader({ user, onSignOut }: ProfileHeaderProps) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 mb-6">
      <div className="flex items-start gap-6">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <img
            src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.firstName}`}
            alt={`${user.firstName} ${user.lastName}`}
            className="w-24 h-24 rounded-full border-2 border-indigo-600"
          />
        </div>

        {/* User Info */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold text-white">
              {user.firstName} {user.lastName}
            </h1>
            {user.emailVerified && (
              <div className="flex items-center gap-1" title="Email verified">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
              </div>
            )}
          </div>

          <p className="text-gray-400 text-sm mb-4">{user.email}</p>

          {user.phoneNumber && (
            <p className="text-gray-400 text-sm mb-2">{user.phoneNumber}</p>
          )}

          <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
            <span>Member since {new Date(user.createdAt).toLocaleDateString()}</span>
          </div>

          {!user.emailVerified && (
            <div className="inline-block px-3 py-1 bg-amber-900/30 border border-amber-700/50 rounded text-xs text-amber-200">
              Email verification pending
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2">
          <Link
            href="/profile/edit"
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors"
          >
            <Edit3 className="w-4 h-4" />
            Edit
          </Link>

          <Link
            href="/profile/security"
            className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-gray-300 rounded-lg text-sm font-medium transition-colors"
          >
            <Settings className="w-4 h-4" />
            Security
          </Link>

          <button
            onClick={onSignOut}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-red-400 rounded-lg text-sm font-medium transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
