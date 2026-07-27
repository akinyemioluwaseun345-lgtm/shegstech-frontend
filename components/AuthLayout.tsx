import React from 'react';
import Link from 'next/link';

interface AuthLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footerText?: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  title,
  subtitle,
  children,
  footerText,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-indigo-950 to-zinc-950 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600">
            <svg
              className="w-8 h-8 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2v20M2 12h20" />
              <circle cx="12" cy="12" r="10" />
            </svg>
          </div>
          <h1 className="text-2xl font-black text-white mb-1">
            SHEGS<span className="text-indigo-400">TECH</span>
          </h1>
          <p className="text-sm text-gray-400">Device Valuation Platform</p>
        </div>

        {/* Content Section */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
          {subtitle && (
            <p className="text-gray-400 text-sm mb-6">{subtitle}</p>
          )}

          {children}
        </div>

        {/* Footer */}
        {footerText && (
          <div className="text-center text-xs text-gray-400 mt-6">
            {footerText}
          </div>
        )}
      </div>
    </div>
  );
};
