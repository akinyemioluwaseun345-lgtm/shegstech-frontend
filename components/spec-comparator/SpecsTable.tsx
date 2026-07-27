'use client';

import React from 'react';
import { Check } from 'lucide-react';

interface Device {
  id: string;
  name: string;
  storage: string;
  price: number;
  marketValue: number;
  condition: string;
  verdict: 'LEGIT' | 'SCAM' | 'OVERPRICED';
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
}

interface SpecsTableProps {
  devices: Device[];
}

const SPEC_ROWS = [
  { key: 'display', label: 'Display', type: 'text' },
  { key: 'chipset', label: 'Chipset', type: 'text' },
  { key: 'ram', label: 'RAM', type: 'value', compare: 'higher' },
  { key: 'storage', label: 'Storage', type: 'value', compare: 'higher' },
  { key: 'mainCamera', label: 'Main Camera', type: 'value', compare: 'higher' },
  { key: 'battery', label: 'Battery', type: 'value', compare: 'higher' },
  { key: 'os', label: 'OS', type: 'text' },
  { key: 'weight', label: 'Weight', type: 'text' },
  { key: 'connectivity', label: '5G', type: 'text' },
  { key: 'releaseYear', label: 'Release Year', type: 'value', compare: 'higher' },
  { key: 'vendorPrice', label: 'Vendor Price', type: 'price', compare: 'lower' },
  { key: 'marketValue', label: 'Market Value', type: 'price', compare: 'lower' },
  { key: 'valueScore', label: 'Value Score', type: 'score', compare: 'higher' },
];

const formatPrice = (price: number) => {
  if (price >= 1000000) return `₦${(price / 1000000).toFixed(1)}M`;
  if (price >= 1000) return `₦${(price / 1000).toFixed(0)}K`;
  return `₦${price}`;
};

const getValue = (device: Device, key: string): string | number | null => {
  if (key === 'vendorPrice') return device.price;
  if (key === 'marketValue') return device.marketValue;
  if (key === 'valueScore') return device.valueScore ?? 0;
  return device.specs?.[key as keyof typeof device.specs] ?? null;
};

const isBetter = (value1: string | number | null, value2: string | number | null, compareType: 'higher' | 'lower'): boolean => {
  if (value1 === null || value2 === null) return false;

  const num1 = typeof value1 === 'string' ? parseFloat(value1) : value1;
  const num2 = typeof value2 === 'string' ? parseFloat(value2) : value2;

  if (isNaN(num1) || isNaN(num2)) return false;

  return compareType === 'higher' ? num1 > num2 : num1 < num2;
};

const getDisplayValue = (value: string | number | null, rowType: string): string => {
  if (value === null) return 'N/A';
  if (rowType === 'price') return formatPrice(value as number);
  if (rowType === 'score') return `${value}/10`;
  if (rowType === 'value') {
    const str = String(value);
    return str.includes('GB') || str.includes('MP') ? str : `${value}`;
  }
  return String(value);
};

export const SpecsTable: React.FC<SpecsTableProps> = ({ devices }) => {
  if (devices.length === 0) return null;

  return (
    <div className="bg-zinc-900 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-zinc-800 border-b border-zinc-700">
              <th className="sticky left-0 bg-zinc-800 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-zinc-400 z-10">
                Specification
              </th>
              {devices.map((device) => (
                <th key={device.id} className="px-4 py-3 text-left text-xs font-medium text-zinc-300 whitespace-nowrap min-w-32">
                  {device.name}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {SPEC_ROWS.map((row, idx) => {
              const values = devices.map((d) => getValue(d, row.key));
              const bestValueIdx = row.type === 'text' ? -1 : values.reduce((maxIdx: number, val, currIdx: number) => {
                if (maxIdx >= 0 && values[maxIdx] === null) return currIdx;
                if (val === null) return maxIdx;
                const compareType = (row as any).compare || 'higher';
                return isBetter(val, values[maxIdx], compareType) ? currIdx : maxIdx;
              }, 0);

              return (
                <tr key={row.key} className={idx % 2 === 0 ? 'bg-zinc-900' : 'bg-zinc-800/50'}>
                  <td className="sticky left-0 bg-inherit px-4 py-3 text-xs font-medium text-zinc-400 z-10">
                    {row.label}
                  </td>
                  {values.map((value, idx) => (
                    <td
                      key={`${row.key}-${devices[idx].id}`}
                      className={`px-4 py-3 text-xs ${
                        idx === bestValueIdx && row.type !== 'text'
                          ? 'text-indigo-400 font-semibold'
                          : 'text-zinc-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span>{getDisplayValue(value, row.type)}</span>
                        {idx === bestValueIdx && row.type !== 'text' && (
                          <Check className="w-4 h-4 text-emerald-400" />
                        )}
                      </div>
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="px-4 py-3 bg-zinc-800/50 border-t border-zinc-700 text-xs text-zinc-400">
        <p>✓ Indicates the best value in each category</p>
      </div>
    </div>
  );
};
