'use client';

import React from 'react';
import { Smartphone } from 'lucide-react';

interface EmptyStateProps {
  scrollToSelectors: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ scrollToSelectors }) => {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-zinc-800 rounded-lg">
            <Smartphone className="w-8 h-8 text-indigo-400" />
          </div>
        </div>
        <h3 className="text-lg font-bold text-white mb-2">Nothing to compare yet</h3>
        <p className="text-sm text-zinc-400 mb-4">Select two devices above to see detailed specifications</p>
        <button
          onClick={scrollToSelectors}
          className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          Add devices
        </button>
      </div>
    </div>
  );
};
