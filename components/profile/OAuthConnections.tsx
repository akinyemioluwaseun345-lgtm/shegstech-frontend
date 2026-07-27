'use client';

import React, { useState } from 'react';
import { OAuthProvider } from '@/types/user';
import { connectOAuthProvider, disconnectOAuthProvider } from '@/lib/userApi';
import { Loader, Link as LinkIcon, Unlink } from 'lucide-react';

interface OAuthConnectionsProps {
  providers: OAuthProvider[];
  onUpdate: (providers: OAuthProvider[]) => void;
}

const providerConfig = {
  google: {
    name: 'Google',
    icon: '🔵',
    color: 'bg-blue-600 hover:bg-blue-700',
  },
  github: {
    name: 'GitHub',
    icon: '⚫',
    color: 'bg-gray-700 hover:bg-gray-800',
  },
  microsoft: {
    name: 'Microsoft',
    icon: '🟦',
    color: 'bg-blue-500 hover:bg-blue-600',
  },
};

export function OAuthConnections({ providers, onUpdate }: OAuthConnectionsProps) {
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleConnect = async (provider: 'google' | 'github' | 'microsoft') => {
    setLoading(provider);
    setError(null);

    try {
      const response = await connectOAuthProvider(provider);

      if (response.success && response.data) {
        const updated = providers.map(p =>
          p.provider === provider ? response.data! : p
        );
        onUpdate(updated);
      } else {
        setError(response.error || `Failed to connect ${provider}`);
      }
    } catch (err) {
      setError(`An error occurred while connecting ${provider}`);
      console.error('[v0] OAuth connect error:', err);
    } finally {
      setLoading(null);
    }
  };

  const handleDisconnect = async (provider: 'google' | 'github' | 'microsoft') => {
    if (!confirm(`Are you sure you want to disconnect ${providerConfig[provider].name}?`)) {
      return;
    }

    setLoading(provider);
    setError(null);

    try {
      const response = await disconnectOAuthProvider(provider);

      if (response.success) {
        const updated = providers.map(p =>
          p.provider === provider ? { ...p, connected: false } : p
        );
        onUpdate(updated);
      } else {
        setError(response.error || `Failed to disconnect ${provider}`);
      }
    } catch (err) {
      setError(`An error occurred while disconnecting ${provider}`);
      console.error('[v0] OAuth disconnect error:', err);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="space-y-4">
      {error && (
        <div className="p-3 bg-red-900/30 border border-red-700/50 rounded-lg text-sm text-red-300">
          {error}
        </div>
      )}

      <div className="space-y-3">
        {providers.map(provider => {
          const config = providerConfig[provider.provider];

          return (
            <div
              key={provider.provider}
              className="flex items-center justify-between p-4 bg-zinc-800 border border-zinc-700 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{config.icon}</span>
                <div>
                  <h3 className="font-medium text-white">{config.name}</h3>
                  {provider.connected && provider.email && (
                    <p className="text-sm text-gray-400">{provider.email}</p>
                  )}
                  {provider.connected && provider.connectedAt && (
                    <p className="text-xs text-gray-500">
                      Connected on {new Date(provider.connectedAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>

              {provider.connected ? (
                <button
                  onClick={() => handleDisconnect(provider.provider)}
                  disabled={loading === provider.provider}
                  className="flex items-center gap-2 px-4 py-2 bg-red-900/30 hover:bg-red-900/50 border border-red-700/50 text-red-300 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                >
                  {loading === provider.provider ? (
                    <Loader className="w-4 h-4 animate-spin" />
                  ) : (
                    <Unlink className="w-4 h-4" />
                  )}
                  {loading === provider.provider ? 'Disconnecting...' : 'Disconnect'}
                </button>
              ) : (
                <button
                  onClick={() => handleConnect(provider.provider)}
                  disabled={loading === provider.provider}
                  className={`flex items-center gap-2 px-4 py-2 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50 ${config.color}`}
                >
                  {loading === provider.provider ? (
                    <Loader className="w-4 h-4 animate-spin" />
                  ) : (
                    <LinkIcon className="w-4 h-4" />
                  )}
                  {loading === provider.provider ? 'Connecting...' : 'Connect'}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
