'use client';

import React, { useState } from 'react';
import { X, Plus, Smartphone } from 'lucide-react';

interface Device {
  id: string;
  name: string;
  storage: string;
  price: number;
  marketValue: number;
  condition: string;
  verdict: 'LEGIT' | 'SCAM' | 'OVERPRICED';
  logoUrl?: string;
}

interface DeviceSelectorProps {
  device: Device | null;
  onSelect: (device: Device) => void;
  onRemove: () => void;
  placeholder?: string;
  availableDevices: Device[];
}

export const DeviceSelector: React.FC<DeviceSelectorProps> = ({
  device,
  onSelect,
  onRemove,
  placeholder = 'Add device to compare',
  availableDevices,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSelect = (selectedDevice: Device) => {
    onSelect(selectedDevice);
    setShowDropdown(false);
  };

  if (device) {
    return (
      <div className="relative bg-zinc-900 border border-zinc-800 rounded-lg p-4">
        <button
          onClick={onRemove}
          className="absolute top-2 right-2 p-1 hover:bg-zinc-800 rounded transition-colors"
          aria-label="Remove device"
        >
          <X className="w-4 h-4 text-zinc-400" />
        </button>

        <div className="flex items-center gap-3 pr-8">
          {device.logoUrl ? (
            <img
              src={device.logoUrl}
              alt={device.name}
              className="w-10 h-10 rounded-full"
            />
          ) : (
            <div className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center">
              <Smartphone className="w-5 h-5 text-indigo-400" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{device.name}</p>
            <p className="text-xs text-zinc-400">{device.storage}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="w-full border-2 border-dashed border-zinc-700 rounded-lg p-6 hover:border-indigo-600 hover:bg-zinc-900/50 transition-colors flex flex-col items-center gap-2 text-center"
      >
        <Plus className="w-6 h-6 text-zinc-500" />
        <span className="text-sm text-zinc-400">{placeholder}</span>
      </button>

      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-zinc-800 border border-zinc-700 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
          {availableDevices.map((dev) => (
            <button
              key={dev.id}
              onClick={() => handleSelect(dev)}
              className="w-full text-left px-4 py-3 hover:bg-zinc-700 transition-colors flex items-center gap-3 border-b border-zinc-700 last:border-0"
            >
              {dev.logoUrl ? (
                <img
                  src={dev.logoUrl}
                  alt={dev.name}
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <div className="w-8 h-8 bg-zinc-700 rounded-full flex items-center justify-center">
                  <Smartphone className="w-4 h-4 text-indigo-400" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{dev.name}</p>
                <p className="text-xs text-zinc-400">{dev.storage}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
