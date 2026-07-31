'use client';

import React, { useState } from 'react';

export const Settings: React.FC = () => {
  const [fullName, setFullName] = useState('Akinyemi Oluwaseun');
  const [email, setEmail] = useState('seun@shegstech.com');
  const [phone, setPhone] = useState('+234 707 146 8009');
  const [marketAlerts, setMarketAlerts] = useState(true);
  const [whatsappAlerts, setWhatsappAlerts] = useState(true);

  return (
    <div className="max-w-[430px] mx-auto w-full px-4 py-4 space-y-4 text-[#F4F5F9]" style={{ fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif' }}>
      <div className="space-y-1">
        <div className="text-xl font-bold text-[#F4F5F9]">Account Settings</div>
        <p className="text-xs text-[#9AA3B7]">Manage your profile, preferences, and security.</p>
      </div>

      <div className="rounded-2xl border border-[#262E42] bg-[#151B2C] p-4 space-y-3.5">
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9AA3B7]">Personal Information</div>
        <div className="space-y-3">
          <label className="block text-[11px] font-medium text-[#9AA3B7]">
            <div className="mb-1.5">Full Name</div>
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full rounded-xl border border-[#262E42] bg-[#1E2638] px-3 py-2 text-xs text-[#F4F5F9] outline-none"
            />
          </label>
          <label className="block text-[11px] font-medium text-[#9AA3B7]">
            <div className="mb-1.5">Email Address</div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-[#262E42] bg-[#1E2638] px-3 py-2 text-xs text-[#F4F5F9] outline-none"
            />
          </label>
          <label className="block text-[11px] font-medium text-[#9AA3B7]">
            <div className="mb-1.5">Phone Number</div>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-xl border border-[#262E42] bg-[#1E2638] px-3 py-2 text-xs text-[#F4F5F9] outline-none"
            />
          </label>
        </div>
      </div>

      <div className="rounded-2xl border border-[#262E42] bg-[#151B2C] p-4 space-y-3.5">
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9AA3B7]">Preferences & Display</div>
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div className="text-xs font-medium text-[#F4F5F9]">Default Currency</div>
            <div className="inline-flex items-center rounded-full border border-[#6C63FF]/30 bg-[#6C63FF]/10 px-2.5 py-1 text-[10px] font-semibold text-[#6C63FF]">
              ₦ Naira (NGN)
            </div>
          </div>

          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-xs font-medium text-[#F4F5F9]">Market Radar Alerts</div>
              <div className="text-[10px] text-[#9AA3B7]">Get notified on market shifts.</div>
            </div>
            <button
              type="button"
              onClick={() => setMarketAlerts((value) => !value)}
              className={`flex h-6 w-11 items-center rounded-full p-1 transition-colors ${marketAlerts ? 'bg-[#10B981]' : 'bg-[#1E2638] border border-[#262E42]'}`}
            >
              <span className={`h-4 w-4 rounded-full bg-white transition-transform ${marketAlerts ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>

          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-xs font-medium text-[#F4F5F9]">WhatsApp Deal Notifications</div>
              <div className="text-[10px] text-[#9AA3B7]">Receive urgent deal alerts.</div>
            </div>
            <button
              type="button"
              onClick={() => setWhatsappAlerts((value) => !value)}
              className={`flex h-6 w-11 items-center rounded-full p-1 transition-colors ${whatsappAlerts ? 'bg-[#10B981]' : 'bg-[#1E2638] border border-[#262E42]'}`}
            >
              <span className={`h-4 w-4 rounded-full bg-white transition-transform ${whatsappAlerts ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-[#262E42] bg-[#151B2C] p-4 space-y-3.5">
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9AA3B7]">Security & Privacy</div>
        <div className="space-y-3">
          <button className="flex w-full items-center justify-between rounded-xl border border-[#262E42] bg-[#1E2638] px-3 py-2.5 text-left text-xs font-medium text-[#F4F5F9]">
            <span>Change Password</span>
            <span className="text-[#9AA3B7]">→</span>
          </button>
          <div className="flex items-center justify-between rounded-xl border border-[#262E42] bg-[#1E2638] px-3 py-2.5">
            <span className="text-xs font-medium text-[#F4F5F9]">Two-Factor Authentication (2FA)</span>
            <span className="rounded-full bg-[#1E2638] px-2 py-0.5 text-[10px] text-[#9AA3B7]">Disabled</span>
          </div>
        </div>
      </div>

      <button className="w-full rounded-xl bg-[#6C63FF] py-3 text-center text-xs font-semibold text-white transition-colors hover:bg-[#5b52e0]">
        Save Changes
      </button>
    </div>
  );
};
