import React, { useState, useRef } from 'react';
import Head from 'next/head';
import { Plus } from 'lucide-react';
import { DashboardLayout } from '../components/DashboardLayout';
import { DeviceSelector } from '../components/spec-comparator/DeviceSelector';
import { ValueScoreRing } from '../components/spec-comparator/ValueScoreRing';
import { SpecsTable } from '../components/spec-comparator/SpecsTable';
import { EmptyState } from '../components/spec-comparator/EmptyState';

interface Device {
  id: string;
  name: string;
  storage: string;
  price: number;
  marketValue: number;
  condition: string;
  verdict: 'LEGIT' | 'SCAM' | 'OVERPRICED';
  logoUrl?: string;
  specs?: {
    display?: string;
    chipset?: string;
    ram?: string;
    storage?: string;
    mainCamera?: string;
    battery?: string;
    os?: string;
    weight?: string;
    connectivity?: string;
    releaseYear?: number;
  };
  valueScore?: number;
  inStock?: boolean;
}

const AVAILABLE_DEVICES: Device[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max',
    storage: '256GB',
    price: 1500000,
    marketValue: 1520000,
    condition: 'New',
    verdict: 'LEGIT',
    logoUrl: 'https://cdn.simpleicons.org/apple',
    specs: {
      display: '6.7" Super Retina XDR',
      chipset: 'A17 Pro',
      ram: '8GB',
      storage: '256GB',
      mainCamera: '48MP',
      battery: '4685 mAh',
      os: 'iOS 17',
      weight: '221g',
      connectivity: 'Yes',
      releaseYear: 2023,
    },
    valueScore: 8.2,
    inStock: true,
  },
  {
    id: '2',
    name: 'Samsung Galaxy S24 Ultra',
    storage: '256GB',
    price: 1200000,
    marketValue: 1180000,
    condition: 'Like New',
    verdict: 'OVERPRICED',
    logoUrl: 'https://cdn.simpleicons.org/samsung',
    specs: {
      display: '6.8" Dynamic AMOLED',
      chipset: 'Snapdragon 8 Gen 3',
      ram: '12GB',
      storage: '256GB',
      mainCamera: '200MP',
      battery: '5000 mAh',
      os: 'Android 14',
      weight: '232g',
      connectivity: 'Yes',
      releaseYear: 2024,
    },
    valueScore: 7.1,
    inStock: true,
  },
  {
    id: '3',
    name: 'Tecno Camon 30',
    storage: '128GB',
    price: 450000,
    marketValue: 480000,
    condition: 'Good',
    verdict: 'LEGIT',
    specs: {
      display: '6.7" IPS LCD',
      chipset: 'MediaTek Helio G99',
      ram: '8GB',
      storage: '128GB',
      mainCamera: '50MP',
      battery: '5000 mAh',
      os: 'Android 13',
      weight: '196g',
      connectivity: 'Yes',
      releaseYear: 2023,
    },
    valueScore: 8.5,
    inStock: true,
  },
  {
    id: '4',
    name: 'Redmi Note 13',
    storage: '256GB',
    price: 350000,
    marketValue: 320000,
    condition: 'Fair',
    verdict: 'SCAM',
    logoUrl: 'https://cdn.simpleicons.org/xiaomi',
    specs: {
      display: '6.67" IPS LCD',
      chipset: 'Snapdragon 685',
      ram: '6GB',
      storage: '256GB',
      mainCamera: '50MP',
      battery: '5000 mAh',
      os: 'Android 13',
      weight: '202g',
      connectivity: 'No',
      releaseYear: 2023,
    },
    valueScore: 5.2,
    inStock: false,
  },
];

export default function SpecComparator() {
  const [selectedDevices, setSelectedDevices] = useState<(Device | null)[]>([null, null]);
  const [showThirdSlot, setShowThirdSlot] = useState(false);
  const selectorsRef = useRef<HTMLDivElement>(null);

  const handleDeviceSelect = (index: number, device: Device) => {
    const newDevices = [...selectedDevices];
    newDevices[index] = device;
    setSelectedDevices(newDevices);
  };

  const handleRemoveDevice = (index: number) => {
    const newDevices = [...selectedDevices];
    newDevices[index] = null;
    setSelectedDevices(newDevices);
    if (index === 2) setShowThirdSlot(false);
  };

  const scrollToSelectors = () => {
    selectorsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const activeDevices = selectedDevices.filter((d) => d !== null) as Device[];
  const getAvailableDevices = (excludeIds: string[]) => {
    return AVAILABLE_DEVICES.filter((d) => !excludeIds.includes(d.id));
  };

  const excludeIds = activeDevices.map((d) => d.id);

  return (
    <>
      <Head>
        <title>Spec Comparator | SHEGSTECH</title>
        <meta name="description" content="Compare device specifications and prices" />
      </Head>

      <DashboardLayout>
        <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-950 to-indigo-950/20">
          <div className="max-w-4xl mx-auto px-4 py-8">
            {/* Hero Block */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight">
                Spec Comparator
              </h1>
              <p className="text-zinc-400">Compare device specifications, prices, and value scores side by side</p>
            </div>

            {/* Devices to Compare Section */}
            <div className="mb-12" ref={selectorsRef}>
              <h2 className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-4">Devices to Compare</h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                {selectedDevices.slice(0, 2).map((device, idx) => (
                  <DeviceSelector
                    key={idx}
                    device={device}
                    onSelect={(d) => handleDeviceSelect(idx, d)}
                    onRemove={() => handleRemoveDevice(idx)}
                    availableDevices={getAvailableDevices(excludeIds)}
                  />
                ))}
              </div>

              {/* Third device slot */}
              {showThirdSlot && selectedDevices[2] && (
                <div className="mb-4">
                  <DeviceSelector
                    device={selectedDevices[2]}
                    onSelect={(d) => handleDeviceSelect(2, d)}
                    onRemove={() => handleRemoveDevice(2)}
                    availableDevices={getAvailableDevices(excludeIds)}
                  />
                </div>
              )}

              {/* Add third device button */}
              {!showThirdSlot && activeDevices.length >= 2 && (
                <button
                  onClick={() => setShowThirdSlot(true)}
                  className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  Add a third device to compare
                </button>
              )}
            </div>

            {/* Content sections */}
            {activeDevices.length > 0 ? (
              <>
                {/* Value Score Section */}
                <div className="mb-12">
                  <h2 className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-6">Value Score</h2>
                  <div className={`grid gap-6 ${activeDevices.length === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
                    {activeDevices.map((device) => (
                      <ValueScoreRing
                        key={device.id}
                        score={device.valueScore ?? 0}
                        verdict={device.verdict}
                        deviceName={device.name}
                      />
                    ))}
                  </div>
                </div>

                {/* Full Specifications Section */}
                <div className="mb-12">
                  <h2 className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-6">Full Specification</h2>
                  <SpecsTable devices={activeDevices} />
                </div>

                {/* CTA Row */}
                <div className={`grid gap-4 mb-12 ${activeDevices.length === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
                  {activeDevices.map((device) => (
                    device.inStock && (
                      <button
                        key={device.id}
                        className="px-4 py-3 border-2 border-indigo-600 text-indigo-400 rounded-lg font-medium text-sm hover:bg-indigo-600/10 transition-colors"
                      >
                        Buy from SHEGSTECH
                      </button>
                    )
                  ))}
                </div>
              </>
            ) : (
              <EmptyState scrollToSelectors={scrollToSelectors} />
            )}
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}
