'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { OAuthProvider } from '@/types/user';
import { fetchUserProfile } from '@/lib/userApi';
import { useRequireAuth } from '@/lib/useAuth';
import { PasswordChangeForm } from '@/components/profile/PasswordChangeForm';
import { OAuthConnections } from '@/components/profile/OAuthConnections';
import { Loader, ArrowLeft, Shield, Lock } from 'lucide-react';

export default function SecurityPage() {
  const auth = useRequireAuth();
  const [oauthProviders, setOauthProviders] = useState<OAuthProvider[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await fetchUserProfile();
        if (response.success && response.data?.oauthProviders) {
          setOauthProviders(response.data.oauthProviders);
        } else {
          setError(response.error || 'Failed to load security settings');
        }
      } catch (err) {
        setError('An error occurred while loading security settings');
        console.error('[v0] Load security settings error:', err);
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
          <p className="text-gray-400">Loading security settings...</p>
        </div>
      </div>
    );
  }

  if (!auth.isAuthenticated) {
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
          {error && (
            <div className="p-4 bg-red-900/30 border border-red-700/50 rounded-lg text-red-300">
              {error}
            </div>
          )}

          {/* Password Section */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
              <Lock className="w-5 h-5 text-indigo-400" />
              Change Password
            </h2>
            <p className="text-sm text-gray-400 mb-6">
              Update your password to keep your account secure
            </p>
            <PasswordChangeForm />
          </div>

          {/* OAuth Section */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
              <Shield className="w-5 h-5 text-indigo-400" />
              Connected Accounts
            </h2>
            <p className="text-sm text-gray-400 mb-6">
              Manage your social login connections
            </p>
            <OAuthConnections
              providers={oauthProviders}
              onUpdate={(updated) => setOauthProviders(updated)}
            />
          </div>

          {/* Security Tips */}
          <div className="bg-blue-900/20 border border-blue-800/50 rounded-lg p-6">
            <h3 className="text-sm font-semibold text-blue-300 mb-3">Security Tips</h3>
            <ul className="text-sm text-blue-200/80 space-y-2">
              <li>• Use a strong, unique password with mixed characters</li>
              <li>• Enable two-factor authentication for added security</li>
              <li>• Regularly review your connected accounts</li>
              <li>• Sign out of unused sessions</li>
              <li>• Never share your password with anyone</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
