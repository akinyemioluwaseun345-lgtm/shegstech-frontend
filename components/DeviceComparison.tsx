import React from 'react';

interface Device {
  id: string;
  name: string;
  storage: string;
  price: number;
  marketValue: number;
  condition: string;
  verdict: 'LEGIT' | 'SCAM' | 'OVERPRICED';
  logoUrl: string;
}

interface DeviceComparisonProps {
  devices?: Device[];
}

export const DeviceComparison: React.FC<DeviceComparisonProps> = ({
  devices = [
    {
      id: '1',
      name: 'iPhone 15 Pro Max',
      storage: '256GB',
      price: 1500000,
      marketValue: 1520000,
      condition: 'New',
      verdict: 'LEGIT',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
    },
    {
      id: '2',
      name: 'Samsung Galaxy S24 Ultra',
      storage: '256GB',
      price: 1200000,
      marketValue: 1180000,
      condition: 'Like New',
      verdict: 'OVERPRICED',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Samsung_Logo.svg',
    },
    {
      id: '3',
      name: 'Tecno Camon 30',
      storage: '128GB',
      price: 450000,
      marketValue: 480000,
      condition: 'Good',
      verdict: 'LEGIT',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/en/5/51/Tecno_Mobile_Logo.png',
    },
    {
      id: '4',
      name: 'Redmi Note 13',
      storage: '256GB',
      price: 350000,
      marketValue: 320000,
      condition: 'Fair',
      verdict: 'SCAM',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/Xiaomi_logo.svg',
    },
  ],
}) => {
  const getVerdictColor = (verdict: 'LEGIT' | 'SCAM' | 'OVERPRICED') => {
    switch (verdict) {
      case 'LEGIT':
        return 'border-emerald-200 bg-emerald-50';
      case 'SCAM':
        return 'border-red-200 bg-red-50';
      case 'OVERPRICED':
        return 'border-amber-200 bg-amber-50';
    }
  };

  const getVerdictBadgeColor = (verdict: 'LEGIT' | 'SCAM' | 'OVERPRICED') => {
    switch (verdict) {
      case 'LEGIT':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'SCAM':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'OVERPRICED':
        return 'bg-amber-100 text-amber-800 border-amber-300';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Device Comparisons</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {devices.map((device) => (
          <div
            key={device.id}
            className={`border-2 rounded-lg p-4 transition-smooth hover:shadow-md ${getVerdictColor(device.verdict)}`}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center border border-gray-200 shadow-sm">
                  <img 
                    src={device.logoUrl} 
                    alt={device.name}
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">{device.name}</h4>
                  <p className="text-xs text-gray-500">{device.storage}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded text-xs font-medium border ${getVerdictBadgeColor(device.verdict)}`}>
                {device.verdict}
              </span>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-white bg-opacity-60 rounded p-2">
                <p className="text-xs text-gray-600 mb-1">Vendor Price</p>
                <p className="font-semibold text-gray-900 text-sm">₦{(device.price / 1000000).toFixed(2)}M</p>
              </div>
              <div className="bg-white bg-opacity-60 rounded p-2">
                <p className="text-xs text-gray-600 mb-1">Market Value</p>
                <p className="font-semibold text-gray-900 text-sm">₦{(device.marketValue / 1000000).toFixed(2)}M</p>
              </div>
            </div>

            {/* Condition */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-600">Condition:</span>
              <span className="font-medium text-gray-700">{device.condition}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="text-sm font-semibold text-gray-900 mb-4">Quick Statistics</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Avg Market Value', value: '₦1.38M', subtext: 'Across all devices' },
            { label: 'Total Comparisons', value: '4', subtext: 'This session' },
            { label: 'Risk Score', value: '2/10', subtext: 'Overall market' },
            { label: 'Confidence', value: '94%', subtext: 'Data accuracy' },
          ].map((stat, idx) => (
            <div key={idx} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-xs text-gray-600 mb-1">{stat.label}</p>
              <p className="font-bold text-gray-900 text-sm mb-1">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.subtext}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
