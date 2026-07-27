import React, { useState } from 'react';
import Link from 'next/link';
import { AuthLayout } from '../../components/AuthLayout';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please enter your email address');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  if (submitted) {
    return (
      <AuthLayout
        title="Check Your Email"
        subtitle="We&apos;ve sent you a password reset link"
      >
        <div className="text-center py-8">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-500/10 border border-indigo-500/50">
            <Mail className="w-8 h-8 text-indigo-400" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">
            Email Sent
          </h3>
          <p className="text-gray-400 text-sm mb-6">
            We&apos;ve sent a password reset link to <br />
            <span className="text-indigo-400 font-medium">{email}</span>
          </p>
          <p className="text-gray-500 text-xs mb-8">
            The link will expire in 24 hours
          </p>

          <div className="space-y-3">
            <button
              onClick={() => window.location.href = '/auth/login'}
              className="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors"
            >
              Back to Login
            </button>
            <button
              onClick={() => {
                setEmail('');
                setSubmitted(false);
              }}
              className="w-full px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-100 font-semibold rounded-lg transition-colors"
            >
              Try Another Email
            </button>
          </div>

          <p className="text-gray-500 text-xs mt-8">
            Check your spam folder if you don&apos;t see the email
          </p>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Reset Your Password"
      subtitle="Enter your email address and we&apos;ll send you a password reset link"
    >
      <form onSubmit={handleSubmit} className="space-y-4 mt-6">
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
          <p className="text-xs text-gray-500 mt-1">
            We&apos;ll send you a secure link to reset your password
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-600 disabled:opacity-50 text-white font-semibold rounded-lg transition-colors mt-6"
        >
          {loading ? 'Sending...' : 'Send Reset Link'}
        </button>

        <Link
          href="/auth/login"
          className="flex items-center justify-center gap-2 text-gray-400 hover:text-gray-300 text-sm transition-colors mt-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Login
        </Link>
      </form>

      <div className="mt-8 pt-6 border-t border-zinc-700">
        <h4 className="text-sm font-semibold text-white mb-3">Need Help?</h4>
        <ul className="space-y-2 text-xs text-gray-400">
          <li>
            <Link href="#" className="text-indigo-400 hover:text-indigo-300">
              Contact Support
            </Link>
          </li>
          <li>
            <Link href="#" className="text-indigo-400 hover:text-indigo-300">
              View FAQ
            </Link>
          </li>
          <li>
            <Link href="#" className="text-indigo-400 hover:text-indigo-300">
              Report an Issue
            </Link>
          </li>
        </ul>
      </div>
    </AuthLayout>
  );
}
