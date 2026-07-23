import React, { useState } from 'react';

interface FormData {
  deviceModel: string;
  storage: string;
  condition: string;
  vendorPrice: string;
}

interface CalculatorFormProps {
  onCalculate?: (data: FormData) => void;
  loading?: boolean;
  onClose?: () => void;
}

export const CalculatorForm: React.FC<CalculatorFormProps> = ({ onCalculate, loading = false, onClose }) => {
  const [formData, setFormData] = useState<FormData>({
    deviceModel: '',
    storage: '',
    condition: '',
    vendorPrice: '',
  });

  const deviceModels = [
    'iPhone 15 Pro Max',
    'iPhone 15 Pro',
    'iPhone 15',
    'Samsung Galaxy S24',
    'Samsung Galaxy A54',
    'Tecno Camon 30',
    'Redmi Note 13',
  ];

  const storageOptions = ['64GB', '128GB', '256GB', '512GB', '1TB'];
  const conditions = ['New', 'Like New', 'Good', 'Fair'];

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onCalculate) {
      onCalculate(formData);
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg border border-stone-200 dark:border-zinc-800 p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Device Valuation</h3>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Device Model Search */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Device Model
          </label>
          <div className="relative">
            <svg
              className="absolute left-3 top-2.5 w-5 h-5 text-gray-400 dark:text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              value={formData.deviceModel}
              onChange={(e) => handleChange('deviceModel', e.target.value)}
              placeholder="Search device..."
              className="w-full pl-10 pr-3 py-2 border border-stone-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-smooth"
              required
            />
          </div>
        </div>

        {/* Storage Capacity */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Storage Capacity
          </label>
          <select
            value={formData.storage}
            onChange={(e) => handleChange('storage', e.target.value)}
            className="w-full px-3 py-2 border border-stone-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-smooth appearance-none"
            required
          >
            <option value="">Select storage...</option>
            {storageOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* Device Condition */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Device Condition
          </label>
          <div className="flex gap-2">
            {conditions.map((cond) => (
              <button
                key={cond}
                type="button"
                onClick={() => handleChange('condition', cond)}
                className={`flex-1 py-2 px-3 rounded-lg border transition-smooth text-sm font-medium ${
                  formData.condition === cond
                    ? 'bg-indigo-600 border-indigo-600 text-white'
                    : 'bg-white dark:bg-zinc-800 border-stone-300 dark:border-zinc-700 text-gray-700 dark:text-gray-300 hover:border-indigo-300'
                }`}
              >
                {cond}
              </button>
            ))}
          </div>
        </div>

        {/* Vendor Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Vendor Price (₦)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-gray-500 dark:text-gray-400 text-sm font-medium">₦</span>
            <input
              type="number"
              value={formData.vendorPrice}
              onChange={(e) => handleChange('vendorPrice', e.target.value)}
              placeholder="0.00"
              className="w-full pl-6 pr-3 py-2 border border-stone-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-smooth"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 mt-6 shadow-md hover:shadow-lg hover:-translate-y-0.5"
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Calculating...
            </div>
          ) : (
            'Calculate Market Value'
          )}
        </button>
      </form>

      {/* Info Section */}
      <div className="mt-6 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900/40 rounded-lg">
        <p className="text-xs text-blue-800 dark:text-blue-300">
          ℹ️ <span className="font-medium">Real-time pricing data</span> based on current market analysis and device specifications.
        </p>
      </div>
    </div>
  );
};
