'use client';

import React from 'react';

interface NotificationsSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationsSheet: React.FC<NotificationsSheetProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const alerts = [
    {
      icon: '🔥',
      title: 'Price Drop Alert',
      body: 'iPhone 14 Pro Max 256GB dropped by ₦45,000 in UK Used market!',
      time: '2 hours ago',
    },
    {
      icon: '⚡',
      title: 'Flash Sale Live',
      body: 'Only 2 units left: MacBook Air M2 clearance drop is now live.',
      time: '5 hours ago',
    },
    {
      icon: '🚗',
      title: 'Garage Valuation Update',
      body: 'Your iPhone 15 Pro Max estimated resale value updated to ₦1,120,000.',
      time: '1 day ago',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#0B0F1A]/80 backdrop-blur-sm px-3 pb-3">
      <div className="w-full max-w-[430px] rounded-t-3xl border border-[#262E42] bg-[#151B2C] p-4 shadow-2xl">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <div className="text-base font-bold text-[#F4F5F9]">Notifications & Price Alerts</div>
            <div className="text-xs text-[#9AA3B7]">Stay ahead of the best SHEGSTECH deals.</div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-[#262E42] bg-[#1E2638] px-2.5 py-1 text-sm text-[#9AA3B7] transition hover:text-white"
            aria-label="Close notifications"
          >
            ×
          </button>
        </div>

        <div className="space-y-2.5 max-h-[350px] overflow-y-auto pr-1">
          {alerts.map((alert) => (
            <div key={alert.title} className="space-y-1 rounded-xl border border-[#262E42] bg-[#1E2638] p-3">
              <div className="flex items-center justify-between gap-2">
                <div className="text-sm font-semibold text-[#F4F5F9]">{alert.icon} {alert.title}</div>
                <div className="text-[10px] text-[#9AA3B7]">{alert.time}</div>
              </div>
              <div className="text-xs leading-relaxed text-[#9AA3B7]">{alert.body}</div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-4 w-full py-2.5 text-center text-xs font-semibold text-[#6C63FF] transition hover:underline"
        >
          Mark All as Read
        </button>
      </div>
    </div>
  );
};
