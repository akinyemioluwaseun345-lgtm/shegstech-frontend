'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { NotificationsSheet } from './NotificationsSheet';

export const Profile: React.FC = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const savedState = window.localStorage.getItem('shegstech-auth-state');
    if (savedState === 'logged-out') {
      setIsLoggedIn(false);
    }
  }, []);

  const persistAuthState = (value: boolean) => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('shegstech-auth-state', value ? 'logged-in' : 'logged-out');
    }
  };

  const handleLoginPreview = () => {
    setIsLoggedIn(true);
    persistAuthState(true);
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    persistAuthState(false);
    router.push('/auth/login');
  };

  const openSupportChat = () => {
    const message = 'Hello SHEGSTECH Support, I need help with my account, garage, or a device valuation.';
    const url = `https://wa.me/2347071468009?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (!isLoggedIn) {
    return (
      <div className="max-w-[430px] mx-auto w-full px-4 py-4 space-y-4 text-[#F4F5F9]" style={{ fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif' }}>
        <div className="my-8 rounded-2xl border border-[#262E42] bg-[#151B2C] p-8 text-center space-y-4">
          <div className="text-4xl text-[#6C63FF]">👤</div>
          <div className="text-lg font-bold text-[#F4F5F9]">Join SHEGSTECH</div>
          <p className="text-xs leading-relaxed text-[#9AA3B7]">Sign in to access your Gadget Garage, save Hot Deals, and track appraisal valuations.</p>

          <div className="space-y-2 pt-2">
            <Link href="/auth/login" className="block w-full rounded-xl bg-[#6C63FF] px-4 py-3 text-center text-xs font-semibold text-white transition-colors hover:bg-[#5b52e0]">
              Log In to Your Account
            </Link>

            <Link href="/auth/signup" className="block w-full rounded-xl border border-[#262E42] bg-[#1E2638] px-4 py-3 text-center text-xs font-semibold text-[#F4F5F9] transition-colors hover:bg-[#262E42]">
              Create New Account
            </Link>

            <button type="button" onClick={handleLoginPreview} className="mt-2 text-xs text-[#9AA3B7] underline">
              [Demo] Preview Logged-In State
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[430px] mx-auto w-full px-4 py-4 space-y-4 text-[#F4F5F9]" style={{ fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif' }}>
      <div className="flex items-center gap-3.5 rounded-2xl border border-[#262E42] bg-[#151B2C] p-4 shadow-sm">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#6C63FF] bg-[#6C63FF]/20 text-lg font-bold text-[#6C63FF]">AO</div>
        <div className="flex-1 min-w-0 space-y-1">
          <div className="truncate text-base font-bold text-[#F4F5F9]">Akinyemi Oluwaseun</div>
          <div className="truncate text-xs text-[#9AA3B7]">seun@shegstech.com</div>
          <div className="mt-1 inline-flex items-center gap-1 rounded-md bg-[#10B981]/15 px-2 py-0.5 text-[10px] font-semibold text-[#10B981]">✓ Verified SHEGSTECH Member</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1 rounded-xl border border-[#262E42] bg-[#151B2C] p-3.5">
          <div className="text-[11px] text-[#9AA3B7]">Garage Value</div>
          <div className="text-sm font-bold text-[#F4F5F9]">₦1,850,000</div>
        </div>
        <div className="space-y-1 rounded-xl border border-[#262E42] bg-[#151B2C] p-3.5">
          <div className="text-[11px] text-[#9AA3B7]">Saved Deals</div>
          <div className="text-sm font-bold text-[#F4F5F9]">4 Items</div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#262E42] bg-[#151B2C] divide-y divide-[#262E42]/60">
        <Link href="/garage" className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-[#1E2638]/50">
          <div className="flex items-center gap-3 text-xs font-medium text-[#F4F5F9]"><span>🧰</span><span>My Gadget Garage</span></div>
          <div className="text-xs text-[#9AA3B7]">→</div>
        </Link>

        <button type="button" onClick={() => setNotificationsOpen(true)} className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-[#1E2638]/50">
          <div className="flex items-center gap-3 text-xs font-medium text-[#F4F5F9]"><span>🔔</span><span>Notifications & Alerts</span></div>
          <div className="text-xs text-[#9AA3B7]">→</div>
        </button>

        <Link href="/settings" className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-[#1E2638]/50">
          <div className="flex items-center gap-3 text-xs font-medium text-[#F4F5F9]"><span>⚙️</span><span>Account Settings</span></div>
          <div className="text-xs text-[#9AA3B7]">→</div>
        </Link>

        <button type="button" onClick={openSupportChat} className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-[#1E2638]/50">
          <div className="flex items-center gap-3 text-xs font-medium text-[#F4F5F9]"><span>🛠️</span><span>Warranty & Support</span></div>
          <div className="text-xs text-[#9AA3B7]">→</div>
        </button>
      </div>

      <button onClick={handleSignOut} className="mt-2 w-full rounded-xl border border-[#EF4444]/20 bg-[#EF4444]/10 p-3.5 text-center text-xs font-semibold text-[#EF4444] transition-colors hover:bg-[#EF4444]/20">
        Sign Out of Account
      </button>

      <NotificationsSheet isOpen={notificationsOpen} onClose={() => setNotificationsOpen(false)} />
    </div>
  );
};
