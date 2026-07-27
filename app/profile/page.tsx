'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User } from '@/types/user';
import { fetchUserProfile, sendVerificationEmail } from '@/lib/userApi';
import { useRequireAuth } from '@/lib/useAuth';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { ProfileCard } from '@/components/profile/ProfileCard';
import { Loader, Mail } from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const auth = useRequireAuth();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [verificationSent, setVerificationSent] = useState(false);

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

  const handleSignOut = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_email');
    router.push('/auth/login');
  };

  const handleSendVerification = async () => {
    try {
      await sendVerificationEmail();
      setVerificationSent(true);
      setTimeout(() => setVerificationSent(false), 3000);
    } catch (err) {
      console.error('[v0] Send verification error:', err);
    }
  };

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
        <div className="max-w-4xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-black text-white">
              SHEGS<span className="text-indigo-400">TECH</span>
            </h1>
            <Link
              href="/"
              className="text-sm text-gray-400 hover:text-gray-300 transition-colors"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {error && (
          <div className="mb-6 p-4 bg-red-900/30 border border-red-700/50 rounded-lg text-red-300">
            {error}
          </div>
        )}

        {/* Profile Header */}
        <ProfileHeader user={user} onSignOut={handleSignOut} />

        {/* Email Verification Banner */}
        {!user.emailVerified && (
          <div className="mb-6 p-4 bg-amber-900/30 border border-amber-700/50 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-amber-400" />
              <div>
                <p className="text-sm font-medium text-amber-300">Email not verified</p>
                <p className="text-xs text-amber-200">
                  Verify your email to unlock full platform access
                </p>
              </div>
            </div>
            <button
              onClick={handleSendVerification}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium rounded-lg transition-colors whitespace-nowrap"
            >
              {verificationSent ? 'Sent!' : 'Send Verification'}
            </button>
          </div>
        )}

        {/* Profile Cards */}
        <ProfileCard user={user} />
      </main>
    </div>
  );
}
