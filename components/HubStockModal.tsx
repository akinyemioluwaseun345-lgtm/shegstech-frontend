'use client';

import React from 'react';

interface HubStockModalProps {
  isOpen: boolean;
  onClose: () => void;
  hubName?: string;
}

export const HubStockModal: React.FC<HubStockModalProps> = ({ isOpen, onClose, hubName }) => {
  if (!isOpen) return null;

  const waMessage = `Hello SHEGSTECH, I am checking available stock at ${hubName || 'this hub'}.`;
  const waHref = `https://wa.me/2347071468009?text=${encodeURIComponent(waMessage)}`;

  return (
    <div className="fixed inset-0 z-60 flex items-end justify-center bg-[#0B0F1A]/80 backdrop-blur-sm px-3 pb-3">
      <div className="w-full max-w-[430px] rounded-t-3xl border border-[#262E42] bg-[#151B2C] p-4 shadow-2xl">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            <div className="text-base font-bold text-[#F4F5F9]">{hubName ? `${hubName} — Available Stock` : 'Hub — Available Stock'}</div>
            <div className="text-xs text-[#9AA3B7]">Certified pre-owned & lab-tested devices currently in stock at this hub.</div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-[#262E42] bg-[#1E2638] px-2.5 py-1 text-sm text-[#9AA3B7] transition hover:text-white"
            aria-label="Close hub stock"
          >
            ×
          </button>
        </div>

        <div className="space-y-3 max-h-[400px] overflow-y-auto pt-2 pr-1">
          <div className="flex items-center justify-between rounded-xl border border-[#262E42] bg-[#1E2638] p-3.5">
            <div>
              <div className="text-[10px] font-semibold text-[#10B981]">Pristine • 94% Battery</div>
              <div className="text-xs font-bold text-[#F4F5F9]">iPhone 15 Pro - 256GB (Natural Titanium)</div>
            </div>
            <div className="text-xs font-extrabold text-[#F4F5F9]">₦1,350,000</div>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-[#262E42] bg-[#1E2638] p-3.5">
            <div>
              <div className="text-[10px] font-semibold text-[#10B981]">Open Box • 100% Battery</div>
              <div className="text-xs font-bold text-[#F4F5F9]">MacBook Air M2 - 16GB/512GB (Midnight)</div>
            </div>
            <div className="text-xs font-extrabold text-[#F4F5F9]">₦1,620,000</div>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-[#262E42] bg-[#1E2638] p-3.5">
            <div>
              <div className="text-[10px] font-semibold text-[#10B981]">UK Used • Clean</div>
              <div className="text-xs font-bold text-[#F4F5F9]">Samsung Galaxy S24 Ultra - 512GB</div>
            </div>
            <div className="text-xs font-extrabold text-[#F4F5F9]">₦1,480,000</div>
          </div>
        </div>

        <div className="pt-3 border-t border-[#262E42]/60">
          <a href={waHref} target="_blank" rel="noreferrer noopener" className="w-full inline-block rounded-xl bg-[#6C63FF] py-3 text-center text-xs font-semibold text-white hover:bg-[#5b52e0] transition-colors">
            Inquire About Hub Stock via WhatsApp →
          </a>
        </div>
      </div>
    </div>
  );
};
