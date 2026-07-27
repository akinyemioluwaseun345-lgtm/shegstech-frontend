import React, { useState } from 'react';
import Link from 'next/link';
import { AuthLayout } from '../../components/AuthLayout';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      if (email && password) {
        // Redirect to dashboard
        window.location.href = '/';
      } else {
        setError('Please fill in all fields');
      }
    }, 1000);
  };

  const handleGoogleLogin = () => {
    setLoading(true);
    // Simulate Google OAuth flow
    setTimeout(() => {
      window.location.href = '/';
    }, 1000);
  };

  return (
    <AuthLayout
      title="Login To Shegs Tech"
      subtitle="Welcome back to your device valuation dashboard"
      footerText={
        <>
          Don&apos;t have an account?{' '}
          <Link href="/auth/signup" className="text-indigo-400 hover:text-indigo-300 transition-colors">
            Sign up or learn more
          </Link>
        </>
      }
    >
      <div className="space-y-4">
        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full px-4 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-600 disabled:opacity-50 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>

        {/* Email Login */}
        <button
          onClick={() => document.getElementById('email-form')?.classList.toggle('hidden')}
          className="w-full px-4 py-3 bg-gray-800 hover:bg-gray-700 text-gray-100 font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <Mail className="w-5 h-5" />
          Continue with Email
        </button>

        {/* Passkey Login */}
        <button
          className="w-full px-4 py-3 bg-gray-800 hover:bg-gray-700 text-gray-100 font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <Lock className="w-5 h-5" />
          Log in with Passkey
        </button>
      </div>

      {/* Email Form (Initially Hidden) */}
      <form id="email-form" className="hidden mt-6 space-y-4 pt-6 border-t border-zinc-700">
        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 bg-zinc-800 border border-zinc-700 rounded focus:ring-2 focus:ring-indigo-500"
            />
            <span className="text-gray-400">Remember me</span>
          </label>
          <Link href="/auth/forgot-password" className="text-indigo-400 hover:text-indigo-300">
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          onClick={handleEmailLogin}
          disabled={loading}
          className="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-600 disabled:opacity-50 text-white font-semibold rounded-lg transition-colors"
        >
          {loading ? 'Logging in...' : 'Log In'}
        </button>
      </form>
    </AuthLayout>
  );
}
