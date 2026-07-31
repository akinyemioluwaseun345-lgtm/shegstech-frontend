'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { User } from 'lucide-react';
import { NotificationsSheet } from './NotificationsSheet';

interface HeaderProps {
  onMenuToggle?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const hasUnread = true; // replace with real unread state when available

  return (
    <header className="sticky top-0 z-40 bg-[#0B0F1A] border-b border-[#262E42] shadow-sm">
      <div className="flex items-center justify-between px-3 sm:px-4 md:px-6 h-16">
        {/* Left: Logo and Menu Toggle */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 hover:bg-[#151B2C] text-[#F4F5F9] rounded-lg transition-smooth"
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="flex items-center gap-0">
            <span className="font-black text-xs sm:text-lg tracking-tight text-[#F4F5F9] whitespace-nowrap">
              SHEGS<span className="text-[#6C63FF]">TECH</span>
            </span>
          </div>
        </div>

        {/* Center: (hidden on mobile) */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search phone, laptop, tablet..."
              className="w-full px-4 py-2 bg-[#151B2C] border border-[#262E42] text-[#F4F5F9] rounded-lg text-sm placeholder-[#9AA3B7] focus:outline-none focus:ring-2 focus:ring-[#6C63FF] transition-smooth"
            />
            <svg className="absolute right-3 top-2.5 w-4 h-4 text-[#9AA3B7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Right: Notifications, Profile */}
        <div className="flex items-center gap-2">
          <button
            aria-label="Notifications"
            onClick={() => setNotificationsOpen(true)}
            className="relative p-1.5 sm:p-2 text-[#F4F5F9] hover:bg-[#151B2C] rounded-lg transition-smooth"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            {hasUnread && <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-[#10B981] rounded-full ring-1 ring-[#0B0F1A]"></span>}
          </button>

          <Link href="/profile" className="flex items-center gap-2 p-1.5 sm:p-2 hover:bg-[#151B2C] rounded-lg transition-smooth">
            <div className="w-8 h-8 bg-[#151B2C] border border-[#262E42] rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-[#6C63FF]" />
            </div>
          </Link>
        </div>
      </div>

      <NotificationsSheet isOpen={notificationsOpen} onClose={() => setNotificationsOpen(false)} />
    </header>
  );
};
