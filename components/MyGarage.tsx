import React, { useMemo, useState } from 'react';
import { AuthModal } from './AuthModal';

interface GarageDevice {
  id: string;
  title: string;
  category: 'Daily Drivers' | 'Laptops' | 'Trade-In Ready';
  batteryHealth: number; // percent
  color?: string;
  value: number; // NGN
  healthText?: string;
}

const categories = ['All Devices (3)', 'Daily Drivers', 'Laptops', 'Trade-In Ready'] as const;
type Category = (typeof categories)[number];

const mockGarageDevices: GarageDevice[] = [
  {
    id: 'iphone-15-pro-max-256',
    title: 'iPhone 15 Pro Max - 256GB',
    category: 'Daily Drivers',
    batteryHealth: 91,
    color: 'Titanium Black',
    value: 1120000,
    healthText: 'Battery Health: 91% • Titanium Black',
  },
  {
    id: 'macbook-pro-m2-14',
    title: 'MacBook Pro M2 14-inch',
    category: 'Laptops',
    batteryHealth: 96,
    color: 'Space Gray',
    value: 1450000,
    healthText: 'Battery Health: 96% • Space Gray',
  },
  {
    id: 'apple-watch-series-9',
    title: 'Apple Watch Series 9',
    category: 'Trade-In Ready',
    batteryHealth: 88,
    color: 'Silver',
    value: 280000,
    healthText: 'Battery Health: 88% • Silver',
  },
];

const formatNaira = (v: number) => `₦${v.toLocaleString('en-NG')}`;

export const MyGarage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('All Devices (3)');
  const [garageDevices, setGarageDevices] = useState(mockGarageDevices);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMessage, setAuthMessage] = useState('Create a SHEGSTECH account or log in to add gadgets to your garage and request trade-ins.');
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (activeCategory === 'All Devices (3)') return garageDevices;
    return garageDevices.filter((d) => d.category === activeCategory);
  }, [activeCategory, garageDevices]);

  const totalValue = useMemo(() => garageDevices.reduce((s, d) => s + d.value, 0), [garageDevices]);

  const requestAuth = (message: string, action: () => void) => {
    if (!isLoggedIn) {
      setAuthMessage(message);
      setPendingAction(() => action);
      setAuthModalOpen(true);
      return;
    }

    action();
  };

  const handleAddGadget = () => {
    const newDevice: GarageDevice = {
      id: `demo-gadget-${Date.now()}`,
      title: 'New Gadget Added to Garage',
      category: 'Daily Drivers',
      batteryHealth: 100,
      color: 'Midnight',
      value: 400000,
      healthText: 'Battery Health: 100% • Midnight',
    };

    setGarageDevices((current) => [newDevice, ...current]);
    setStatusMessage('Added a new gadget to your SHEGSTECH garage.');
  };

  const handleTradeInRequest = (device: GarageDevice) => {
    setStatusMessage(`Trade-in quote requested for ${device.title}.`);
  };

  const handleDemoAuth = () => {
    setIsLoggedIn(true);
    setAuthModalOpen(false);
    pendingAction?.();
    setPendingAction(null);
  };

  return (
    <div className="max-w-[430px] mx-auto w-full px-4 py-4 space-y-4 text-[#F4F5F9]" style={{ fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif' }}>
      {/* Portfolio Summary Card */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-[#1E2638] to-[#151B2C] border border-[#262E42] shadow-lg relative overflow-hidden space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#9AA3B7]">My Gadget Garage</div>
          </div>
          <div className="text-[#9AA3B7]">🛡️</div>
        </div>

        <div className="space-y-1">
          <div className="text-3xl font-extrabold text-[#F4F5F9] tracking-tight">{formatNaira(totalValue)}</div>
          <div className="inline-flex items-center gap-1 text-[11px] font-medium text-[#EF4444] bg-[#EF4444]/10 border border-[#EF4444]/20 px-2.5 py-0.5 rounded-full">
            <span>↓ 3.2% depreciation this month</span>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={() => requestAuth('Create a SHEGSTECH account or log in to add gadgets to your garage and track valuations.', () => handleAddGadget())}
            className="flex-1 bg-[#6C63FF] hover:bg-[#5b52e0] text-white text-xs font-semibold py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-md"
          >
            + Add Gadget
          </button>
          <button className="bg-[#151B2C] border border-[#262E42] text-[#F4F5F9] text-xs font-semibold px-3.5 py-2.5 rounded-xl hover:bg-[#262E42] transition-colors">
            Trade-In Quote
          </button>
        </div>
      </div>

      {/* Category Chips */}
      <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap [&::-webkit-scrollbar]:hidden scrollbar-none pb-1">
        {categories.map((cat) => {
          const isActive = cat === activeCategory;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                isActive ? 'bg-[#6C63FF] text-white shadow-sm' : 'bg-[#151B2C] border border-[#262E42] text-[#9AA3B7]'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {statusMessage && (
        <div className="rounded-xl border border-[#10B981]/20 bg-[#10B981]/10 px-3 py-2 text-xs text-[#10B981]">
          {statusMessage}
        </div>
      )}

      {/* Devices list */}
      <div className="space-y-3.5">
        {filtered.length > 0 ? (
          filtered.map((d) => (
            <div key={d.id} className="p-4 rounded-2xl bg-[#151B2C] border border-[#262E42] space-y-3 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="w-16 h-16 rounded-xl bg-[#1E2638] flex-shrink-0 flex items-center justify-center relative border border-[#262E42]/50 text-2xl font-semibold">
                  {/* Placeholder thumbnail */}
                  <span>📦</span>
                </div>
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="text-[10px] font-semibold text-[#10B981] bg-[#10B981]/15 px-2 py-0.5 rounded-md inline-block">{d.category === 'Daily Drivers' ? 'Daily Driver • Pristine' : d.category}</div>
                  <div className="text-sm font-bold text-[#F4F5F9] truncate">{d.title}</div>
                  <div className="text-xs text-[#9AA3B7]">{d.healthText}</div>
                </div>
              </div>

              <div className="flex items-center justify-between py-2 border-y border-[#262E42]/60">
                <div className="text-[11px] text-[#9AA3B7]">Estimated Trade-in Value</div>
                <div className="text-sm font-bold text-[#F4F5F9]">{formatNaira(d.value)}</div>
              </div>

              <div className="flex items-center gap-2 pt-0.5">
                <button
                  onClick={() => requestAuth('Create a SHEGSTECH account or log in to request a trade-in quote for this device.', () => handleTradeInRequest(d))}
                  className="flex-1 bg-[#6C63FF]/15 hover:bg-[#6C63FF]/25 text-[#6C63FF] border border-[#6C63FF]/30 text-xs font-semibold py-2 rounded-xl text-center transition-colors"
                >
                  Request Trade-In →
                </button>
                <button className="bg-[#1E2638] text-[#F4F5F9] text-xs font-semibold px-3 py-2 rounded-xl hover:bg-[#262E42] transition-colors">
                  Value History
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 rounded-2xl border border-dashed border-[#262E42] bg-[#151B2C]/50 text-center space-y-2.5">
            <div className="text-3xl">🧰</div>
            <div className="text-sm font-semibold text-[#F4F5F9]">No devices found in this category</div>
            <p className="text-xs text-[#9AA3B7]">Try another category or add a gadget to your garage.</p>
            <button onClick={() => setActiveCategory('All Devices (3)') } className="mt-3 text-xs font-semibold text-[#6C63FF] hover:underline">Reset Filter</button>
          </div>
        )}
      </div>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        subtitle={authMessage}
        onDemo={handleDemoAuth}
        returnTo="/my-garage"
      />
    </div>
  );
};
