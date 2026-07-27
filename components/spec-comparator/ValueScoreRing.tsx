'use client';

import React from 'react';

interface ValueScoreRingProps {
  score: number;
  verdict: 'LEGIT' | 'SCAM' | 'OVERPRICED';
  deviceName?: string;
}

export const ValueScoreRing: React.FC<ValueScoreRingProps> = ({ score, verdict, deviceName }) => {
  const getVerdictColor = (v: 'LEGIT' | 'SCAM' | 'OVERPRICED') => {
    switch (v) {
      case 'LEGIT':
        return { bg: 'bg-emerald-900/30', border: 'border-emerald-700', text: 'text-emerald-400', badge: 'bg-emerald-900/50 text-emerald-400 border-emerald-800' };
      case 'SCAM':
        return { bg: 'bg-red-900/30', border: 'border-red-700', text: 'text-red-400', badge: 'bg-red-900/50 text-red-400 border-red-800' };
      case 'OVERPRICED':
        return { bg: 'bg-amber-900/30', border: 'border-amber-700', text: 'text-amber-400', badge: 'bg-amber-900/50 text-amber-400 border-amber-800' };
    }
  };

  const colors = getVerdictColor(verdict);
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (score / 10) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-28 h-28">
        {/* Background circle */}
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#27272a"
            strokeWidth="8"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#6C63FF"
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.5s ease' }}
          />
        </svg>

        {/* Score text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-2xl font-bold text-white">{score.toFixed(1)}</p>
            <p className="text-xs text-zinc-400">/10</p>
          </div>
        </div>
      </div>

      {/* Verdict badge */}
      <div className={`mt-3 px-3 py-1 rounded-full border text-xs font-medium ${colors.badge}`}>
        {verdict}
      </div>

      {/* Device name */}
      {deviceName && <p className="mt-2 text-xs text-zinc-400 text-center truncate max-w-24">{deviceName}</p>}
    </div>
  );
};
