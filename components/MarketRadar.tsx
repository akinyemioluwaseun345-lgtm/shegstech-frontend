import React, { useEffect, useMemo, useState } from 'react';

interface MarketDevice {
  id: string;
  name: string;
  logoText: string;
  currentPrice: number;
  weeklyHistory: number[];
}

const formatNaira = (value: number) => `₦${value.toLocaleString('en-NG')}`;

const mockMarketDevices: MarketDevice[] = [
  {
    id: 'iphone-15-pro-max',
    name: 'iPhone 15 Pro Max',
    logoText: '',
    currentPrice: 1520000,
    weeklyHistory: [1545000, 1530000, 1528000, 1524000, 1522000, 1518000, 1520000],
  },
  {
    id: 'samsung-s24-ultra',
    name: 'Samsung Galaxy S24 Ultra',
    logoText: 'S',
    currentPrice: 1180000,
    weeklyHistory: [1165000, 1168000, 1175000, 1172000, 1178000, 1182000, 1180000],
  },
  {
    id: 'poco-f5',
    name: 'Poco F5',
    logoText: 'P',
    currentPrice: 225000,
    weeklyHistory: [235000, 232000, 230000, 228000, 226000, 224000, 225000],
  },
  {
    id: 'google-pixel-8',
    name: 'Google Pixel 8',
    logoText: 'G',
    currentPrice: 470000,
    weeklyHistory: [468000, 469500, 470500, 471000, 470800, 470200, 470000],
  },
  {
    id: 'itel-phantom-x',
    name: 'itel Phantom X',
    logoText: 'I',
    currentPrice: 238000,
    weeklyHistory: [245000, 244500, 243000, 241000, 239500, 238500, 238000],
  },
];

const tabs = [
  { value: 'trending', label: 'Trending' },
  { value: 'drops', label: 'Biggest Drops' },
  { value: 'gains', label: 'Biggest Gains' },
] as const;

type TabValue = (typeof tabs)[number]['value'];

const getSparklinePath = (values: number[]) => {
  const width = 80;
  const height = 32;
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;

  return values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * width;
      const y = height - ((value - min) / range) * height;
      return `${index === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(' ');
};

const computeWeeklyChange = (history: number[]) => {
  if (history.length < 2) return 0;
  return history[history.length - 1] - history[0];
};

export const MarketRadar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabValue>('trending');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 600);
    return () => window.clearTimeout(timer);
  }, []);

  const devicesWithChange = useMemo(
    () =>
      mockMarketDevices.map((device) => ({
        ...device,
        weeklyChange: computeWeeklyChange(device.weeklyHistory),
        weeklyChangePct:
          device.weeklyHistory[0] > 0
            ? ((device.weeklyHistory[device.weeklyHistory.length - 1] - device.weeklyHistory[0]) / device.weeklyHistory[0]) *
              100
            : 0,
      })),
    []
  );

  const filteredDevices = useMemo(() => {
    if (activeTab === 'drops') {
      return devicesWithChange
        .filter((device) => device.weeklyChange < 0)
        .sort((a, b) => a.weeklyChange - b.weeklyChange);
    }
    if (activeTab === 'gains') {
      return devicesWithChange
        .filter((device) => device.weeklyChange > 0)
        .sort((a, b) => b.weeklyChange - a.weeklyChange);
    }
    return [...devicesWithChange].sort((a, b) => Math.abs(b.weeklyChange) - Math.abs(a.weeklyChange));
  }, [activeTab, devicesWithChange]);

  const totalDevices = devicesWithChange.length;
  const averageWeeklyChange = useMemo(() => {
    if (devicesWithChange.length === 0) return 0;
    const total = devicesWithChange.reduce((sum, device) => sum + device.weeklyChange, 0);
    return total / devicesWithChange.length;
  }, [devicesWithChange]);

  const biggestMover = useMemo(() => {
    return devicesWithChange.reduce((best, device) => {
      if (!best || Math.abs(device.weeklyChange) > Math.abs(best.weeklyChange)) {
        return device;
      }
      return best;
    }, devicesWithChange[0]);
  }, [devicesWithChange]);

  return (
    <div className="min-h-screen bg-[#0B0F1A] text-[#F4F5F9]" style={{ fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif' }}>
      <div className="w-full max-w-[430px] mx-auto px-4 py-10">
        <div className="space-y-4">
          <div>
            <h1 className="text-3xl font-bold leading-tight text-[#F4F5F9]">Market Radar</h1>
            <p className="mt-2 text-sm leading-6 text-[#9AA3B7]">Track real-time market price movements and uncover the best buying opportunities.</p>
          </div>

          <div className="-mx-4 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="inline-flex space-x-3 px-4">
              <div className="min-w-[140px] flex-shrink-0 rounded-3xl border border-[#262E42] bg-[#151B2C] p-4 text-[#F4F5F9] shadow-sm">
                <div className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#9AA3B7]">Devices tracked</div>
                <div className="mt-3 text-2xl font-bold">{totalDevices}</div>
              </div>
              <div className="min-w-[140px] flex-shrink-0 rounded-3xl border border-[#262E42] bg-[#151B2C] p-4 shadow-sm">
                <div className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#9AA3B7]">Avg weekly change</div>
                <div className={`mt-3 text-2xl font-bold ${averageWeeklyChange <= 0 ? 'text-[#34D399]' : 'text-[#EF4444]'}`}>
                  {averageWeeklyChange <= 0 ? '▼' : '▲'}{formatNaira(Math.abs(Math.round(averageWeeklyChange)))}
                </div>
              </div>
              <div className="min-w-[140px] flex-shrink-0 rounded-3xl border border-[#262E42] bg-[#151B2C] p-4 shadow-sm">
                <div className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#9AA3B7]">Biggest mover</div>
                <div className="mt-3 text-sm font-semibold text-[#F4F5F9]">{biggestMover?.name}</div>
                <div className={`mt-1 text-base font-bold ${biggestMover?.weeklyChange <= 0 ? 'text-[#34D399]' : 'text-[#EF4444]'}`}>
                  {biggestMover?.weeklyChange <= 0 ? '▼' : '▲'}{formatNaira(Math.abs(biggestMover?.weeklyChange ?? 0))}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-full border border-[#262E42] bg-[#151B2C] px-1 py-1">
            <div className="flex gap-2 overflow-x-auto whitespace-nowrap px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {tabs.map((tab) => (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => setActiveTab(tab.value)}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition ${
                    activeTab === tab.value
                      ? 'bg-[#6C63FF] text-[#F4F5F9] shadow-[0_10px_30px_rgba(108,99,255,0.18)]'
                      : 'text-[#9AA3B7] hover:text-[#F4F5F9]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="rounded-3xl border border-[#262E42] bg-[#151B2C] p-4 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-[#262E42] animate-pulse" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 w-3/5 rounded-full bg-[#262E42] animate-pulse" />
                        <div className="h-3 w-2/5 rounded-full bg-[#262E42] animate-pulse" />
                      </div>
                    </div>
                    <div className="mt-4 h-10 rounded-2xl bg-[#262E42] animate-pulse" />
                  </div>
                ))}
              </div>
            ) : filteredDevices.length > 0 ? (
              <div className="space-y-3 pb-4">
                {filteredDevices.map((device) => {
                  const change = device.weeklyChange;
                  const trendDown = change <= 0;
                  return (
                    <button
                            key={device.id}
                            type="button"
                            className="group w-full rounded-3xl border border-[#262E42] bg-[#151B2C] p-3.5 text-left shadow-sm transition hover:border-[#6C63FF]"
                          >
                            <div className="grid grid-cols-12 items-center gap-2">
                              <div className="col-span-5 flex items-center gap-2.5">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#262E42] text-lg font-semibold text-[#F4F5F9]">
                                  {device.logoText}
                                </div>
                                <div className="min-w-0">
                                  <div className="text-xs font-semibold leading-tight text-[#F4F5F9] break-words max-h-[2.8rem] overflow-hidden">
                                    {device.name}
                                  </div>
                                  <div className="mt-1 text-[10px] text-[#9AA3B7]">{formatNaira(device.currentPrice)}</div>
                                </div>
                              </div>
                              <div className="col-span-4 flex justify-center items-center">
                                <div className="overflow-hidden rounded-2xl bg-[#0B0F1A] p-1">
                                  <svg width="80" height="32" viewBox="0 0 80 32" className="h-8 w-20" role="img" aria-label="Price sparkline">
                                    <path
                                      d={getSparklinePath(device.weeklyHistory)}
                                      fill="none"
                                      stroke={trendDown ? '#34D399' : '#EF4444'}
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </div>
                              </div>
                              <div className="col-span-3 flex flex-col items-end justify-center text-right gap-1">
                                <div className="text-xs font-bold text-[#F4F5F9]">{formatNaira(device.currentPrice)}</div>
                                <span
                                  className={`rounded-md px-1.5 py-0.5 text-[10px] font-semibold ${
                                    trendDown ? 'bg-[#134E40] text-[#34D399]' : 'bg-[#7F1D1D] text-[#EF4444]'
                                  }`}
                                >
                                  {trendDown ? '▼' : '▲'}{formatNaira(Math.abs(change))}
                                </span>
                                <span className="text-[10px] uppercase tracking-[0.2em] text-[#9AA3B7]">7 DAYS</span>
                              </div>
                            </div>
                          </button>
                  );
                })}
              </div>
            ) : (
              <div className="rounded-3xl border border-dashed border-[#262E42] bg-[#151B2C] p-6 text-center text-[#9AA3B7]">
                <div className="text-sm font-semibold text-[#F4F5F9]">No devices found</div>
                <p className="mt-2 text-xs leading-5">Try a different filter to see the latest market movers.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
