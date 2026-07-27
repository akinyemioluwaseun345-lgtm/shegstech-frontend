'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { User } from '@/types/user';
import { fetchUserProfile } from '@/lib/userApi';
import { useRequireAuth } from '@/lib/useAuth';
import { EditableForm } from '@/components/profile/EditableForm';
import { AvatarUploader } from '@/components/profile/AvatarUploader';
import { Loader, ArrowLeft } from 'lucide-react';

export default function EditProfilePage() {
  const auth = useRequireAuth();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await fetchUserProfile();
        if (response.success && response.data?.user) {
          setUser(response.data.user);
        } else {
          setError(response.error || 'Failed to load profile');
        }
      } catch (err) {
        setError('An error occurred while loading your profile');
        console.error('[v0] Load profile error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (!auth.isLoading && auth.isAuthenticated) {
      loadProfile();
    }
  }, [auth.isLoading, auth.isAuthenticated]);

  if (auth.isLoading || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-indigo-950 to-zinc-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader className="w-8 h-8 text-indigo-400 animate-spin" />
          <p className="text-gray-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!auth.isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-indigo-950 to-zinc-950">
      {/* Header */}
      <div className="bg-zinc-900/50 border-b border-zinc-800">
        <div className="max-w-2xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/profile"
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-300 transition-colors w-fit"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Profile
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Avatar Section */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Profile Picture</h2>
            <AvatarUploader
              currentAvatar={user.avatar || ''}
              onSuccess={(url) => {
                setUser(prev => prev ? { ...prev, avatar: url } : null);
              }}
            />
          </div>

          {/* Edit Form Section */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Personal Information</h2>
            {error && (
              <div className="mb-4 p-3 bg-red-900/30 border border-red-700/50 rounded-lg text-sm text-red-300">
                {error}
              </div>
            )}
            <EditableForm
              user={user}
              onSuccess={(updatedUser) => {
                setUser(updatedUser);
              }}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
