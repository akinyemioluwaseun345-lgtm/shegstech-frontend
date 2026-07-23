import React from 'react';

interface ResultData {
  score: number;
  verdict: 'LEGIT' | 'SCAM' | 'OVERPRICED';
  analysis: string;
  marketValue: number;
  vendorPrice: number;
  difference: number;
  confidence: number;
}

const formatCurrency = (value: number): string => {
  if (value >= 1000000) {
    return `₦${(value / 1000000).toFixed(2)}M`;
  }
  return `₦${(value / 1000).toFixed(0)}K`;
};

interface ResultCardProps {
  data?: ResultData;
  loading?: boolean;
}

const VerdictBadge: React.FC<{ verdict: 'LEGIT' | 'SCAM' | 'OVERPRICED' }> = ({ verdict }) => {
  const variants = {
    LEGIT: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-400 border-emerald-300 dark:border-emerald-700',
    SCAM: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 border-red-300 dark:border-red-700',
    OVERPRICED: 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400 border-amber-300 dark:border-amber-700',
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold border ${variants[verdict]}`}
    >
      {verdict === 'LEGIT' && (
        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      )}
      {verdict === 'SCAM' && (
        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      )}
      {verdict === 'OVERPRICED' && (
        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      )}
      {verdict}
    </span>
  );
};

const ScoreCircle: React.FC<{ score: number }> = ({ score }) => {
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (score / 10) * circumference;

  return (
    <div className="relative w-32 h-32 mx-auto mb-6">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" stroke="#e5e7eb" strokeWidth="4" fill="none" />
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="#6366f1"
          strokeWidth="4"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-gray-900 dark:text-white">{score.toFixed(1)}</span>
        <span className="text-xs text-gray-500 dark:text-gray-300">/10</span>
      </div>
    </div>
  );
};

export const ResultCard: React.FC<ResultCardProps> = ({ data, loading }) => {
  if (loading) {
    return (
      <div className="bg-white dark:bg-zinc-900 rounded-lg border border-stone-200 dark:border-zinc-800 p-6 shadow-sm">
        <div className="flex items-center justify-center h-96">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-gray-200 dark:border-zinc-700 border-t-indigo-600 rounded-full animate-spin" />
            <p className="text-gray-600 dark:text-gray-400 text-sm">Analyzing market data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-white dark:bg-zinc-900 rounded-lg border border-stone-200 dark:border-zinc-800 p-6 shadow-sm">
        <div className="flex flex-col items-center justify-center h-96 text-center">
          <svg className="w-16 h-16 text-gray-300 dark:text-gray-700 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Enter device details and click Calculate to see results</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 overflow-hidden">
      {/* Score Card */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg border border-stone-200 dark:border-zinc-800 p-6 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-4">Value Score</h3>
        <ScoreCircle score={data.score} />
        <div className="text-center">
          <p className="text-xs text-gray-500">Measures price fairness and seller reliability.</p>
        </div>
      </div>

      {/* Verdict Card */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg border border-stone-200 dark:border-zinc-800 p-6 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-4">Verdict</h3>
        <div className="flex justify-center mb-4">
          <VerdictBadge verdict={data.verdict} />
        </div>
        <p className="text-center text-sm text-gray-700 dark:text-gray-300 leading-relaxed bg-gray-50 dark:bg-zinc-800 p-3 rounded-lg">
          {data.analysis}
        </p>
      </div>

      {/* Market Intelligence */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg border border-stone-200 dark:border-zinc-800 p-6 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-4">Market Intelligence</h3>

        <div className="space-y-3">
          {/* Market Value */}
          <div className="flex items-center justify-between p-3 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-900/40 rounded-lg">
            <span className="text-sm text-gray-700 dark:text-gray-300">Estimated Market Value</span>
            <span className="font-semibold text-indigo-600 dark:text-indigo-400">{formatCurrency(data.marketValue)}</span>
          </div>

          {/* Vendor Price */}
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg">
            <span className="text-sm text-gray-700 dark:text-gray-300">Vendor Price</span>
            <span className="font-semibold text-gray-900 dark:text-gray-100">{formatCurrency(data.vendorPrice)}</span>
          </div>

          {/* Difference - Fixed Logic */}
          {(() => {
            const isDifferenceLower = data.vendorPrice < data.marketValue;
            const absoluteDifference = Math.abs(data.vendorPrice - data.marketValue);
            const percentage = ((absoluteDifference / data.marketValue) * 100).toFixed(1);
            
            return (
              <div className={`flex flex-col p-3 rounded-lg border ${
                isDifferenceLower
                  ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-900/40'
                  : 'bg-amber-50 dark:bg-amber-900/20 border-amber-100 dark:border-amber-900/40'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 dark:text-gray-300">Difference</span>
                  <span className={`font-semibold ${
                    isDifferenceLower ? 'text-emerald-600' : 'text-amber-600'
                  }`}>
                    {isDifferenceLower ? '−' : '+'}₦{formatCurrency(absoluteDifference).substring(1)}
                  </span>
                </div>
                <p className={`text-xs mt-1 ${
                  isDifferenceLower ? 'text-emerald-600' : 'text-amber-600'
                }`}>
                  {isDifferenceLower 
                    ? `−₦${formatCurrency(absoluteDifference).substring(1)} (${percentage}% below market)`
                    : `+₦${formatCurrency(absoluteDifference).substring(1)} (${percentage}% above market)`
                  }
                </p>
              </div>
            );
          })()}

          {/* Confidence Score */}
          <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/40 rounded-lg">
            <span className="text-sm text-gray-700 dark:text-gray-300">Confidence Level</span>
            <div className="flex items-center gap-2">
              <div className="w-16 h-1.5 bg-blue-200 dark:bg-blue-900/40 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 dark:bg-blue-500 rounded-full transition-all duration-500"
                  style={{ width: `${data.confidence}%` }}
                />
              </div>
              <span className="font-semibold text-blue-600 dark:text-blue-400 text-sm">{data.confidence}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Trend Chart */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg border border-stone-200 dark:border-zinc-800 p-6 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-4">Market Trend</h3>
        <div className="flex gap-2">
          {/* Y-axis labels */}
          <div className="flex flex-col justify-between text-xs text-gray-500 pr-2">
            <span>{formatCurrency(data.marketValue * 1.1)}</span>
            <span>{formatCurrency(data.marketValue)}</span>
            <span>{formatCurrency(data.marketValue * 0.9)}</span>
          </div>
          
          {/* Chart */}
          <div className="flex-1">
            <svg viewBox="0 0 300 100" className="w-full h-24">
              {/* Grid lines */}
              <line x1="0" y1="25" x2="300" y2="25" stroke="#e5e7eb" strokeWidth="1" />
              <line x1="0" y1="50" x2="300" y2="50" stroke="#e5e7eb" strokeWidth="1" />
              <line x1="0" y1="75" x2="300" y2="75" stroke="#e5e7eb" strokeWidth="1" />

              {/* Trend line */}
              <polyline
                points="10,60 50,45 90,50 130,35 170,40 210,25 250,30 290,20"
                stroke="#6366f1"
                strokeWidth="2"
                fill="none"
                vectorEffect="non-scaling-stroke"
              />

              {/* Area under curve */}
              <polygon
                points="10,60 50,45 90,50 130,35 170,40 210,25 250,30 290,20 290,100 10,100"
                fill="#6366f1"
                opacity="0.1"
              />
            </svg>
            
            {/* X-axis labels */}
            <div className="flex justify-between text-xs text-gray-500 mt-2 pl-1">
              <span>Jan</span>
              <span>Now</span>
            </div>
          </div>
        </div>
        <p className="text-xs text-gray-500 text-center mt-4">Price trend over last 30 days</p>
      </div>
    </div>
  );
};
