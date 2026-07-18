import React, { useState } from 'react';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

interface NavItem {
  label: string;
  icon: React.ReactNode;
  active?: boolean;
  badge?: string | number;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen = true, onClose }) => {
  const navSections: NavSection[] = [
    {
      title: 'Core Utilities',
      items: [
        { label: 'Value Calculator', icon: null },
        { label: 'Spec Comparator', icon: null },
        { label: 'Market Radar', icon: null },
      ],
    },
    {
      title: 'Media & Market',
      items: [
        { label: 'Gadgets Reviews', icon: null },
        { label: 'Verified Vendors', icon: null },
        { label: 'Hot Deals', icon: null },
      ],
    },
    {
      title: 'User Engine',
      items: [
        { label: 'My Garage (Saved Items)', icon: null },
        { label: 'Settings', icon: null },
        { label: 'Sign Out', icon: null },
      ],
    },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-30"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 bottom-0 w-64 bg-black text-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0 z-40 flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <h2 className="text-lg font-bold">SHEGS TECH</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors lg:hidden"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-8 flex-1">
          {navSections.map((section) => (
            <div key={section.title}>
              <h3 className="px-2 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.items.map((item, idx) => (
                  <li key={idx}>
                    <button
                      className="w-full text-left px-2 py-2 text-sm font-medium text-white hover:text-indigo-400 transition-colors"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-800">
          <p className="text-xs text-gray-500 text-center">App Version v1.0.0</p>
        </div>
      </aside>
    </>
  );
};
