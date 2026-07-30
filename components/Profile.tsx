import React, { useState } from 'react';
import Link from 'next/link';

export const Profile: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  if (!isLoggedIn) {
    return (
      <div className="max-w-[430px] mx-auto w-full px-4 py-4 space-y-4 text-[#F4F5F9]" style={{ fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif' }}>
        <div className="p-8 rounded-2xl bg-[#151B2C] border border-[#262E42] text-center space-y-4 my-8">
          <div className="text-4xl text-[#6C63FF]">👤</div>
          <div className="text-lg font-bold text-[#F4F5F9]">Join SHEGSTECH</div>
          <p className="text-xs text-[#9AA3B7] leading-relaxed">Sign in to access your Gadget Garage, save Hot Deals, and track appraisal valuations.</p>

          <div className="space-y-2 pt-2">
            <Link href="/auth/login">
              <a className="block w-full bg-[#6C63FF] hover:bg-[#5b52e0] text-white text-xs font-semibold py-3 rounded-xl text-center transition-colors">Log In to Your Account</a>
            </Link>

            <Link href="/auth/signup">
              <a className="block w-full bg-[#1E2638] border border-[#262E42] text-[#F4F5F9] text-xs font-semibold py-3 rounded-xl hover:bg-[#262E42] transition-colors">Create New Account</a>
            </Link>

            <button type="button" onClick={() => setIsLoggedIn(true)} className="mt-2 text-xs text-[#9AA3B7] underline">[Demo] Preview Logged-In State</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[430px] mx-auto w-full px-4 py-4 space-y-4 text-[#F4F5F9]" style={{ fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif' }}>
      {/* User Identification Card */}
      <div className="p-4 rounded-2xl bg-[#151B2C] border border-[#262E42] flex items-center gap-3.5 shadow-sm">
        <div className="w-14 h-14 rounded-full bg-[#6C63FF]/20 border-2 border-[#6C63FF] flex items-center justify-center text-lg font-bold text-[#6C63FF]">AO</div>
        <div className="flex-1 min-w-0 space-y-1">
          <div className="text-base font-bold text-[#F4F5F9] truncate">Akinyemi Oluwaseun</div>
          <div className="text-xs text-[#9AA3B7] truncate">seun@shegstech.com</div>
          <div className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#10B981] bg-[#10B981]/15 px-2 py-0.5 rounded-md mt-1">✓ Verified SHEGSTECH Member</div>
        </div>
      </div>

      {/* Quick Portfolio Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3.5 rounded-xl bg-[#151B2C] border border-[#262E42] space-y-1">
          <div className="text-[11px] text-[#9AA3B7]">Garage Value</div>
          <div className="text-sm font-bold text-[#F4F5F9]">₦1,850,000</div>
        </div>
        <div className="p-3.5 rounded-xl bg-[#151B2C] border border-[#262E42] space-y-1">
          <div className="text-[11px] text-[#9AA3B7]">Saved Deals</div>
          <div className="text-sm font-bold text-[#F4F5F9]">4 Items</div>
        </div>
      </div>

      {/* Account Navigation Menu */}
      <div className="rounded-2xl bg-[#151B2C] border border-[#262E42] overflow-hidden divide-y divide-[#262E42]/60">
        <button className="w-full flex items-center justify-between p-4 text-left hover:bg-[#1E2638]/50 transition-colors cursor-pointer">
          <div className="flex items-center gap-3 text-xs font-medium text-[#F4F5F9]"><span>🧰</span><span>My Gadget Garage</span></div>
          <div className="text-xs text-[#9AA3B7]">→</div>
        </button>

        <button className="w-full flex items-center justify-between p-4 text-left hover:bg-[#1E2638]/50 transition-colors cursor-pointer">
          <div className="flex items-center gap-3 text-xs font-medium text-[#F4F5F9]"><span>🔔</span><span>Notifications & Alerts</span></div>
          <div className="text-xs text-[#9AA3B7]">→</div>
        </button>

        <Link href="/profile/edit">
          <a className="w-full block flex items-center justify-between p-4 text-left hover:bg-[#1E2638]/50 transition-colors">
            <div className="flex items-center gap-3 text-xs font-medium text-[#F4F5F9]"><span>⚙️</span><span>Account Settings</span></div>
            <div className="text-xs text-[#9AA3B7]">→</div>
          </a>
        </Link>

        <button className="w-full flex items-center justify-between p-4 text-left hover:bg-[#1E2638]/50 transition-colors cursor-pointer">
          <div className="flex items-center gap-3 text-xs font-medium text-[#F4F5F9]"><span>🛠️</span><span>Warranty & Support</span></div>
          <div className="text-xs text-[#9AA3B7]">→</div>
        </button>
      </div>

      {/* Sign Out Button */}
      <button onClick={() => setIsLoggedIn(false)} className="w-full p-3.5 rounded-xl bg-[#EF4444]/10 border border-[#EF4444]/20 hover:bg-[#EF4444]/20 text-[#EF4444] text-xs font-semibold text-center transition-colors mt-2 cursor-pointer">
        Sign Out of Account
      </button>
    </div>
  );
};
