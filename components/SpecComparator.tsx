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
  const [selectedDevices, setSelectedDevices] = useState<Device[]>([]);
  const [pickerSlot, setPickerSlot] = useState<number | null>(null);
  const [pickerQuery, setPickerQuery] = useState('');

  const selectedCount = selectedDevices.length;
  const nextAddText =
    selectedCount === 0
      ? '+ Add first device to compare'
      : selectedCount === 1
      ? '+ Add second device to compare'
      : '+ Add third device to compare';

  const availableDevices = allDevices.filter(
    (device) => !selectedDevices.some((selected) => selected.id === device.id)
  );

  const filteredDevices = availableDevices.filter((device) => {
    const query = pickerQuery.trim().toLowerCase();
    if (!query) return true;
    return (
      device.name.toLowerCase().includes(query) ||
      device.display.toLowerCase().includes(query) ||
      device.chipset.toLowerCase().includes(query)
    );
  });

  const handleRemoveDevice = (index: number) => {
    setSelectedDevices((current) => current.filter((_, idx) => idx !== index));
  };

  const handleStartPicker = (slotIndex: number) => {
    setPickerSlot(slotIndex);
    setPickerQuery('');
  };

  const handleSelectDevice = (device: Device) => {
    if (pickerSlot === null) return;

    setSelectedDevices((current) => {
      const updated = [...current];
      if (pickerSlot >= updated.length) {
        updated.push(device);
      } else {
        updated[pickerSlot] = device;
      }
      return updated;
    });
    setPickerSlot(null);
  };

  const getBestIndex = (row: SpecRow) => {
    if (selectedDevices.length === 0) {
      return -1;
    }
    let bestIndex = 0;
    for (let idx = 1; idx < selectedDevices.length; idx += 1) {
      const result = row.compare(selectedDevices[bestIndex], selectedDevices[idx]);
      if (result === 'right') {
        bestIndex = idx;
      }
    }
    return bestIndex;
  };

  const hasComparison = selectedDevices.length >= 2;
  const tableTemplate = selectedDevices.length > 0 ? `1.2fr repeat(${selectedDevices.length}, minmax(0,1fr))` : '1fr';
  const tableMinWidth = 180 + selectedDevices.length * 180;

  return (
    <div className="space-y-6 text-slate-100">
      <div className="space-y-2">
        <div className="text-3xl font-extrabold tracking-tight">Spec Comparator</div>
        <p className="max-w-xl text-slate-400 text-sm leading-6 sm:text-base">
          Compare specifications side-by-side to see which device gives you the better value for your money.
        </p>
      </div>

      <section className="space-y-4">
        <div className="text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-slate-500">
          Devices to compare
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {selectedDevices.map((device, index) => (
            <div
              key={device.id}
              className="rounded-3xl border border-slate-800 bg-slate-950/90 p-4 shadow-[0_16px_40px_rgba(15,23,42,0.35)]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-800 text-lg font-semibold text-slate-200 ring-1 ring-slate-700">
                    {device.logoText}
                  </div>
                  <div className="min-w-0">
                    <div className="text-base font-bold text-white leading-snug">{device.name}</div>
                    <div className="text-xs text-slate-400 mt-1">{device.storage}</div>
                  </div>
                </div>
                <div className="rounded-2xl bg-slate-800/90 px-3 py-2 text-right text-xs font-semibold text-indigo-300">
                  {device.valueScore.toFixed(1)}/10
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => handleStartPicker(index)}
                  className="rounded-full border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-semibold text-slate-100 transition hover:border-indigo-500 hover:text-indigo-300"
                >
                  Change device
                </button>
                <button
                  type="button"
                  onClick={() => handleRemoveDevice(index)}
                  className="rounded-full border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-semibold text-slate-100 transition hover:border-red-500 hover:text-red-300"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {selectedDevices.length < 3 && (
            <button
              type="button"
              onClick={() => handleStartPicker(selectedDevices.length)}
              className="group flex min-h-[140px] flex-col items-center justify-center rounded-3xl border border-dashed border-slate-700 bg-slate-950/70 px-4 py-6 text-slate-400 transition hover:border-indigo-500 hover:text-indigo-300"
            >
              <Plus className="h-5 w-5" />
              <span className="mt-3 text-sm font-semibold leading-tight text-slate-100 text-center">
                {nextAddText}
              </span>
              <span className="mt-2 text-xs text-slate-500">Search / select device</span>
            </button>
          )}
        </div>
      </section>

      {pickerSlot !== null && (
        <section className="space-y-3 rounded-3xl border border-slate-800 bg-slate-950/95 p-4 shadow-[0_16px_40px_rgba(15,23,42,0.35)]">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-slate-500">Select device</div>
              <div className="text-sm font-semibold text-slate-100">Choose a phone for slot {pickerSlot + 1}</div>
            </div>
            <button
              type="button"
              onClick={() => {
                setPickerSlot(null);
                setPickerQuery('');
              }}
              className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-slate-300 transition hover:bg-slate-800"
            >
              Cancel
            </button>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 px-3 py-3">
            <input
              value={pickerQuery}
              onChange={(event) => setPickerQuery(event.target.value)}
              placeholder="Search devices"
              className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-1 gap-3">
            {filteredDevices.length > 0 ? (
              filteredDevices.map((device) => (
                <button
                  key={device.id}
                  type="button"
                  onClick={() => handleSelectDevice(device)}
                  className="rounded-3xl border border-slate-800 bg-slate-900 px-4 py-4 text-left text-sm text-slate-100 transition hover:border-indigo-500 hover:bg-slate-950"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-sm font-semibold text-white">{device.name}</div>
                      <div className="mt-1 text-xs text-slate-400">{device.storage} • {device.display}</div>
                    </div>
                    <div className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
                      {device.valueScore.toFixed(1)}/10
                    </div>
                  </div>
                </button>
              ))
            ) : (
              <div className="rounded-3xl border border-slate-800 bg-slate-900 px-4 py-6 text-sm text-slate-400">
                No matching devices found.
              </div>
            )}
          </div>
        </section>
      )}

      <section className="space-y-4">
        <div className="text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-slate-500">
          Full specification
        </div>

        {selectedDevices.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-950/70 p-8 text-center text-slate-400">
            <div className="text-base font-semibold text-slate-200">Nothing to compare yet</div>
            <p className="mt-2 text-sm leading-6">Search and select two devices above to see how they stack up side-by-side.</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-3xl border border-slate-800 bg-slate-950/90 p-1 shadow-[0_16px_40px_rgba(15,23,42,0.35)]">
            <div className="min-w-full" style={{ minWidth: `${tableMinWidth}px` }}>
              <div
                className="grid gap-4 rounded-3xl bg-slate-900 px-4 py-4 text-xs uppercase tracking-[0.2em] text-slate-500"
                style={{ gridTemplateColumns: tableTemplate }}
              >
                <span>Spec</span>
                {selectedDevices.map((device) => (
                  <span key={device.id} className="text-center text-slate-300">
                    {device.name}
                  </span>
                ))}
              </div>
              <div className="divide-y divide-slate-800">
                {specRows.map((row) => {
                  const bestIndex = getBestIndex(row);
                  return (
                    <div
                      key={row.label}
                      className="grid gap-4 px-4 py-4 items-center text-sm text-slate-200"
                      style={{ gridTemplateColumns: tableTemplate }}
                    >
                      <span className="text-slate-400">{row.label}</span>
                      {selectedDevices.map((device, index) => (
                        <span
                          key={device.id}
                          className={`rounded-2xl px-3 py-2 text-center transition ${
                            index === bestIndex ? 'bg-indigo-500/10 text-indigo-300' : ''
                          }`}
                        >
                          {formatSpecValue(device, row.key)}
                          {index === bestIndex ? (
                            <Check className="inline-block ml-2 h-4 w-4 text-indigo-400" />
                          ) : null}
                        </span>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </section>

      {hasComparison && (
        <div className="grid gap-3 sm:grid-cols-2">
          <button className="rounded-full border border-indigo-500/60 bg-transparent px-5 py-3 text-sm font-semibold text-indigo-300 transition hover:bg-indigo-500/10">
            Buy from SHEGSTECH
          </button>
          <button className="rounded-full border border-indigo-500/60 bg-transparent px-5 py-3 text-sm font-semibold text-indigo-300 transition hover:bg-indigo-500/10">
            Buy from SHEGSTECH
          </button>
        </div>
      )}
    </div>
  );
};
