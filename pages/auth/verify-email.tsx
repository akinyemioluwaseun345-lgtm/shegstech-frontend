import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AuthLayout } from '../../components/AuthLayout';
import { Mail, CheckCircle, ArrowLeft } from 'lucide-react';

export default function VerifyEmail() {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) {
      const newCode = value.split('');
      setCode(newCode.slice(0, 6));
      if (newCode.length === 6) {
        handleVerify(newCode);
      }
      return;
    }

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`) as HTMLInputElement;
      nextInput?.focus();
    }
  };

  const handleVerify = async (verificationCode?: string[]) => {
    const fullCode = (verificationCode || code).join('');
    if (fullCode.length !== 6) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVerified(true);
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
    }, 1500);
  };

  const handleResend = () => {
    setResendTimer(60);
    setCode(['', '', '', '', '', '']);
  };

  if (verified) {
    return (
      <AuthLayout
        title="Email Verified!"
        subtitle="Your account has been created successfully"
      >
        <div className="text-center py-8">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-emerald-500/10 border border-emerald-500/50">
            <CheckCircle className="w-8 h-8 text-emerald-400" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">
            Ready to go!
          </h3>
          <p className="text-gray-400 text-sm mb-6">
            Redirecting you to the dashboard...
          </p>
          <div className="h-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full overflow-hidden">
            <div className="h-full w-full bg-indigo-600 animate-pulse" />
          </div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Verify Your Email"
      subtitle="We&apos;ve sent a 6-digit code to your email address"
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleVerify();
        }}
        className="space-y-6 mt-8"
      >
        <div className="bg-indigo-500/10 border border-indigo-500/50 rounded-lg p-4 text-center">
          <p className="text-indigo-300 text-sm">
            Check your email for a verification code
          </p>
        </div>

        <div className="flex gap-2 justify-center">
          {code.map((digit, index) => (
            <input
              key={index}
              id={`code-${index}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleCodeChange(index, e.target.value)}
              className="w-12 h-12 text-center text-lg font-semibold bg-zinc-800 border border-zinc-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          ))}
        </div>

        <button
          type="submit"
          disabled={loading || code.some((c) => !c)}
          className="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-600 disabled:opacity-50 text-white font-semibold rounded-lg transition-colors"
        >
          {loading ? 'Verifying...' : 'Verify Email'}
        </button>

        <div className="text-center">
          <p className="text-gray-400 text-sm mb-3">
            Didn&apos;t receive the code?
          </p>
          <button
            type="button"
            onClick={handleResend}
            disabled={resendTimer > 0}
            className="text-indigo-400 hover:text-indigo-300 text-sm font-medium disabled:text-gray-600 transition-colors"
          >
            {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend Code'}
          </button>
        </div>

        <Link
          href="/auth/login"
          className="flex items-center justify-center gap-2 text-gray-400 hover:text-gray-300 text-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Login
        </Link>
      </form>
    </AuthLayout>
  );
}
