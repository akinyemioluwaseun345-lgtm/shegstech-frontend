'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  onDemo?: () => void;
  returnTo?: string;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  title = 'Sign In to Continue',
  subtitle = 'Create a SHEGSTECH account or log in to continue with this action and protect your deal.',
  onDemo,
  returnTo,
}) => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      return;
    }

    const timer = window.setTimeout(() => setIsVisible(false), 240);
    return () => window.clearTimeout(timer);
  }, [isOpen]);

  if (!isVisible && !isOpen) {
    return null;
  }

  const buildAuthHref = (path: string) => {
    if (!returnTo) return path;
    return `${path}?returnTo=${encodeURIComponent(returnTo)}`;
  };

  const handlePrimary = () => {
    onClose();
    router.push(buildAuthHref('/auth/login'));
  };

  const handleSecondary = () => {
    onClose();
    router.push(buildAuthHref('/auth/signup'));
  };

  const handleDemo = () => {
    onClose();
    if (onDemo) {
      onDemo();
    }
  };

  return (
    <div
      className={`fixed inset-0 z-[70] bg-[#0B0F1A]/80 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
      onClick={onClose}
    >
      <div className="flex min-h-full items-end justify-center px-0 pb-0 sm:px-4 sm:pb-4">
        <div
          className={`w-full max-w-[430px] rounded-t-3xl border border-[#262E42] bg-[#151B2C] p-5 shadow-2xl transition-transform duration-300 ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <h2 className="text-base font-bold text-[#F4F5F9]">{title}</h2>
              <p className="text-xs leading-relaxed text-[#9AA3B7]">{subtitle}</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full p-2 text-[#9AA3B7] transition hover:bg-[#1E2638] hover:text-white"
              aria-label="Close auth modal"
            >
              ×
            </button>
          </div>

          <div className="space-y-2 pt-4">
            <button
              type="button"
              onClick={handlePrimary}
              className="w-full rounded-xl bg-[#6C63FF] py-3 text-center text-xs font-semibold text-white transition hover:bg-[#5b52e0]"
            >
              Log In to Account
            </button>
            <button
              type="button"
              onClick={handleSecondary}
              className="w-full rounded-xl border border-[#262E42] bg-[#1E2638] py-3 text-center text-xs font-semibold text-[#F4F5F9] transition hover:bg-[#262E42]"
            >
              Create New Account
            </button>
          </div>

          <div className="pt-4 text-center">
            <button
              type="button"
              onClick={handleDemo}
              className="text-xs text-[#9AA3B7] underline transition hover:text-[#F4F5F9]"
            >
              [Demo] Quick Sign-In as Guest Member
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
