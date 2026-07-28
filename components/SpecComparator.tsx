import React, { useState } from 'react';
import { X, Circle, Plus, Check } from 'lucide-react';

interface Device {
  id: string;
  name: string;
  storage: string;
  display: string;
  chipset: string;
  ram: string;
  mainCamera: string;
  battery: string;
  weight: string;
  releaseYear: number;
  vendorPrice: number;
  marketValue: number;
  valueScore: number;
  logoText: string;
}

type SpecKey =
  | 'display'
  | 'chipset'
  | 'ram'
  | 'mainCamera'
  | 'battery'
  | 'weight'
  | 'releaseYear'
  | 'vendorPrice'
  | 'marketValue'
  | 'valueScore';

interface SpecRow {
  label: string;
  key: SpecKey;
  compare: (left: Device, right: Device) => 'left' | 'right' | 'none';
}

const defaultDevices: Device[] = [
  {
    id: 'iphone-15-pro-max',
    name: 'iPhone 15 Pro Max',
    storage: '256GB',
    display: '6.7" OLED',
    chipset: 'A17 Pro',
    ram: '8GB',
    mainCamera: '48MP',
    battery: '4441mAh',
    weight: '221g',
    releaseYear: 2023,
    vendorPrice: 1500000,
    marketValue: 1520000,
    valueScore: 9.2,
    logoText: '',
  },
  {
    id: 'galaxy-s24-ultra',
    name: 'Samsung Galaxy S24 Ultra',
    storage: '256GB',
    display: '6.8" AMOLED',
    chipset: 'Snapdragon 8 Gen 3',
    ram: '12GB',
    mainCamera: '200MP',
    battery: '5000mAh',
    weight: '232g',
    releaseYear: 2024,
    vendorPrice: 1200000,
    marketValue: 1180000,
    valueScore: 8.9,
    logoText: 'S',
  },
];

const allDevices: Device[] = [
  ...defaultDevices,
  {
    id: 'redmi-note-13',
    name: 'Redmi Note 13',
    storage: '256GB',
    display: '6.67" AMOLED',
    chipset: 'MediaTek Dimensity 7200',
    ram: '12GB',
    mainCamera: '108MP',
    battery: '5000mAh',
    weight: '199g',
    releaseYear: 2024,
    vendorPrice: 350000,
    marketValue: 320000,
    valueScore: 7.4,
    logoText: 'R',
  },
];

const formatPrice = (value: number) => `₦${(value / 1000000).toFixed(2)}M`;
const parseNumeric = (value: string) => parseFloat(value.replace(/[^0-9.]/g, ''));
const chipsetRank: Record<string, number> = {
  'A17 Pro': 3,
  'Snapdragon 8 Gen 3': 4,
  'MediaTek Dimensity 7200': 2,
};

const specRows: SpecRow[] = [
  {
    label: 'Display',
    key: 'display',
    compare: (left, right) =>
      parseNumeric(left.display) > parseNumeric(right.display) ? 'left' : 'right',
  },
  {
    label: 'Chipset',
    key: 'chipset',
    compare: (left, right) =>
      (chipsetRank[left.chipset] || 0) > (chipsetRank[right.chipset] || 0) ? 'left' : 'right',
  },
  {
    label: 'RAM',
    key: 'ram',
    compare: (left, right) =>
      parseNumeric(left.ram) > parseNumeric(right.ram) ? 'left' : 'right',
  },
  {
    label: 'Main Camera',
    key: 'mainCamera',
    compare: (left, right) =>
      parseNumeric(left.mainCamera) > parseNumeric(right.mainCamera) ? 'left' : 'right',
  },
  {
    label: 'Battery',
    key: 'battery',
    compare: (left, right) =>
      parseNumeric(left.battery) > parseNumeric(right.battery) ? 'left' : 'right',
  },
  {
    label: 'Weight',
    key: 'weight',
    compare: (left, right) =>
      parseNumeric(left.weight) < parseNumeric(right.weight) ? 'left' : 'right',
  },
  {
    label: 'Release Year',
    key: 'releaseYear',
    compare: (left, right) => (left.releaseYear > right.releaseYear ? 'left' : 'right'),
  },
  {
    label: 'Vendor Price',
    key: 'vendorPrice',
    compare: (left, right) => (left.vendorPrice < right.vendorPrice ? 'left' : 'right'),
  },
  {
    label: 'Market Value',
    key: 'marketValue',
    compare: (left, right) => (left.marketValue > right.marketValue ? 'left' : 'right'),
  },
  {
    label: 'Value Score',
    key: 'valueScore',
    compare: (left, right) => (left.valueScore > right.valueScore ? 'left' : 'right'),
  },
];

const formatSpecValue = (device: Device, key: SpecKey) => {
  switch (key) {
    case 'vendorPrice':
      return formatPrice(device.vendorPrice);
    case 'marketValue':
      return formatPrice(device.marketValue);
    case 'valueScore':
      return `${device.valueScore.toFixed(1)}/10`;
    case 'display':
      return device.display;
    case 'chipset':
      return device.chipset;
    case 'ram':
      return device.ram;
    case 'mainCamera':
      return device.mainCamera;
    case 'battery':
      return device.battery;
    case 'weight':
      return device.weight;
    case 'releaseYear':
      return `${device.releaseYear}`;
    default:
      return '';
  }
};

export const SpecComparator: React.FC = () => {
  const [selectedDevices, setSelectedDevices] = useState<Device[]>(defaultDevices);

  const handleRemoveDevice = (id: string) => {
    setSelectedDevices((current) => current.filter((device) => device.id !== id));
  };

  const handleAddDevice = () => {
    const nextDevice = allDevices.find((device) => !selectedDevices.some((selected) => selected.id === device.id));
    if (nextDevice) {
      setSelectedDevices((current) => [...current, nextDevice]);
    }
  };

  const hasComparison = selectedDevices.length >= 2;
  const leftDevice = selectedDevices[0];
  const rightDevice = selectedDevices[1];

  return (
    <div className="space-y-8 text-slate-100">
      <div className="space-y-3">
        <div className="text-4xl font-extrabold tracking-tight">Spec Comparator</div>
        <p className="max-w-3xl text-slate-400 text-base sm:text-lg">
          Compare specifications side-by-side to see which device gives you the better value for your money.
        </p>
      </div>

      <section className="space-y-4">
        <div className="text-xs font-semibold tracking-[0.24em] uppercase text-slate-500">Devices to compare</div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {selectedDevices.map((device) => (
            <div
              key={device.id}
              className="relative rounded-3xl border border-slate-800 bg-slate-950/90 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.35)]"
            >
              <button
                onClick={() => handleRemoveDevice(device.id)}
                className="absolute right-4 top-4 h-8 w-8 rounded-full bg-slate-900/80 text-slate-300 hover:bg-slate-800 transition"
                aria-label={`Remove ${device.name}`}
              >
                <X className="h-4 w-4" />
              </button>
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-800 text-lg font-semibold text-slate-200 ring-1 ring-slate-700">
                  {device.logoText}
                </div>
                <div>
                  <div className="text-base font-bold text-white leading-tight">{device.name}</div>
                  <div className="text-sm text-slate-400 mt-1">{device.storage}</div>
                </div>
              </div>
            </div>
          ))}

          {selectedDevices.length < 3 && (
            <button
              type="button"
              onClick={handleAddDevice}
              className="group flex min-h-[148px] flex-col items-center justify-center rounded-3xl border border-dashed border-slate-700 bg-slate-950/70 px-5 py-6 text-slate-400 transition hover:border-indigo-500 hover:text-indigo-300"
            >
              <Plus className="h-5 w-5" />
              <span className="mt-3 text-sm font-medium">Add a third device to compare</span>
            </button>
          )}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_1.1fr]">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {selectedDevices.slice(0, 2).map((device) => (
            <div
              key={device.id}
              className="rounded-3xl border border-slate-800 bg-slate-950/90 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.35)]"
            >
              <div className="text-xs uppercase tracking-[0.3em] text-slate-500">Value Score</div>
              <div className="mt-6 flex items-center justify-center">
                <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-slate-900">
                  <div className="absolute inset-0 rounded-full border border-slate-800" />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 opacity-30" />
                  <div className="relative flex flex-col items-center justify-center text-center">
                    <div className="text-4xl font-bold text-white">{device.valueScore.toFixed(1)}</div>
                    <div className="text-sm text-slate-400">/10</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-950/90 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.35)]">
          <div className="mb-4 text-xs uppercase tracking-[0.24em] text-slate-500">Full Specification</div>
          {hasComparison ? (
            <>
              <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/95">
                <div className="grid grid-cols-[1.2fr_1fr_1fr] gap-4 bg-slate-950/95 px-4 py-4 text-xs uppercase tracking-[0.22em] text-slate-500">
                  <span>Spec</span>
                  <span className="text-center text-slate-300">{leftDevice.name}</span>
                  <span className="text-center text-slate-300">{rightDevice.name}</span>
                </div>
                <div className="divide-y divide-slate-800">
                  {specRows.map((row) => {
                    const best = row.compare(leftDevice, rightDevice);
                    return (
                      <div
                        key={row.label}
                        className="grid grid-cols-[1.2fr_1fr_1fr] gap-4 px-4 py-4 items-center text-sm text-slate-200"
                      >
                        <span className="text-slate-400">{row.label}</span>
                        <span
                          className={`rounded-2xl px-3 py-2 text-center transition ${
                            best === 'left' ? 'bg-indigo-500/10 text-indigo-300' : ''
                          }`}
                        >
                          {formatSpecValue(leftDevice, row.key)}
                          {best === 'left' ? <Check className="inline-block ml-2 h-4 w-4 text-indigo-400" /> : null}
                        </span>
                        <span
                          className={`rounded-2xl px-3 py-2 text-center transition ${
                            best === 'right' ? 'bg-indigo-500/10 text-indigo-300' : ''
                          }`}
                        >
                          {formatSpecValue(rightDevice, row.key)}
                          {best === 'right' ? <Check className="inline-block ml-2 h-4 w-4 text-indigo-400" /> : null}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm text-slate-400">
                <Circle className="h-4 w-4 text-indigo-400" />
                <span>highlighted = better spec in that row</span>
              </div>
            </>
          ) : (
            <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-950/70 p-10 text-center text-slate-400">
              <div className="text-lg font-semibold text-slate-200">Nothing to compare yet</div>
              <p className="mt-3 text-sm text-slate-400">
                Search and select two devices above to see how they stack up side-by-side.
              </p>
            </div>
          )}
        </div>
      </section>

      {hasComparison && (
        <div className="grid gap-3 sm:grid-cols-2">
          <button className="rounded-full border border-indigo-500/60 bg-transparent px-6 py-3 text-sm font-semibold text-indigo-300 transition hover:bg-indigo-500/10">
            Buy from SHEGSTECH
          </button>
          <button className="rounded-full border border-indigo-500/60 bg-transparent px-6 py-3 text-sm font-semibold text-indigo-300 transition hover:bg-indigo-500/10">
            Buy from SHEGSTECH
          </button>
        </div>
      )}
    </div>
  );
};
