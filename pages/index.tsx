import React, { useState } from 'react';
import Head from 'next/head';
import { DashboardLayout } from '../components/DashboardLayout';
import { CalculatorForm } from '../components/CalculatorForm';
import { ResultCard } from '../components/ResultCard';
import { DeviceComparison } from '../components/DeviceComparison';

interface FormData {
  deviceModel: string;
  storage: string;
  condition: string;
  vendorPrice: string;
}

interface ResultData {
  score: number;
  verdict: 'LEGIT' | 'SCAM' | 'OVERPRICED';
  analysis: string;
  marketValue: number;
  vendorPrice: number;
  difference: number;
  confidence: number;
}

export default function Home() {
  const [result, setResult] = useState<ResultData | undefined>({
    score: 8.2,
    verdict: 'LEGIT',
    analysis: 'Vendor price falls within expected market range. Based on current device valuation, iPhone 15 Pro Max with 256GB storage in New condition is fairly priced.',
    marketValue: 1520000,
    vendorPrice: 1500000,
    difference: 20000,
    confidence: 92,
  });
  const [loading, setLoading] = useState(false);

  const handleCalculate = async (formData: FormData) => {
    setLoading(true);
    
    // Simulate API call with mock data
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const vendorPrice = parseInt(formData.vendorPrice);
    const marketValue = vendorPrice * (0.95 + Math.random() * 0.15);
    const difference = marketValue - vendorPrice;
    let verdict: 'LEGIT' | 'SCAM' | 'OVERPRICED' = 'LEGIT';

    if (vendorPrice > marketValue * 1.1) {
      verdict = 'SCAM';
    } else if (vendorPrice > marketValue * 1.02) {
      verdict = 'OVERPRICED';
    }

    const score = Math.max(2, Math.min(10, 7 + Math.random() * 2.5 - (verdict === 'SCAM' ? 1.5 : 0)));
    const confidence = Math.floor(85 + Math.random() * 15);

    setResult({
      score,
      verdict,
      analysis:
        verdict === 'LEGIT'
          ? `Vendor price falls within expected market range. Based on current device valuation, ${formData.deviceModel} with ${formData.storage} storage in ${formData.condition} condition is fairly priced.`
          : verdict === 'SCAM'
            ? `⚠️ Warning: This price appears significantly above market value. Exercise caution with this vendor. Market analysis suggests overvaluation of ₦${Math.abs(difference).toLocaleString()}.`
            : `The vendor price is slightly higher than market value. Consider negotiating or checking other vendors for better deals.`,
      marketValue: Math.round(marketValue),
      vendorPrice,
      difference: Math.round(difference),
      confidence,
    });

    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>SHEGSTECH - Naira Value Calculator</title>
        <meta name="description" content="Evaluate vendor pricing against market value using real-time data analysis" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <DashboardLayout>
        {/* Page Header */}
        <div className="px-4 md:px-6 py-8 border-b border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Naira Value Calculator</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Evaluate vendor pricing against estimated market value. Get instant analysis and verdicts.
          </p>
        </div>

        {/* Main Content */}
        <div className="px-4 md:px-6 py-8 bg-gray-50 dark:bg-zinc-950">
          {/* Desktop: 3-column layout (1-2 split) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Left Column: Calculator Form */}
            <div className="lg:col-span-1">
              <CalculatorForm onCalculate={handleCalculate} loading={loading} />
            </div>

            {/* Right Column: Results */}
            <div className="lg:col-span-2">
              <ResultCard data={result} loading={loading} />
            </div>
          </div>

          {/* Device Comparison Section */}
          <div className="mb-8">
            <DeviceComparison />
          </div>

          {/* Additional Info Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* How It Works */}
            <div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">How It Works</h3>
              <ol className="space-y-3">
                {[
                  'Select your device model and specifications',
                  'Enter the vendor price you are quoted',
                  'Our algorithm analyzes real-time market data',
                  'Receive instant verdict: LEGIT, OVERPRICED, or SCAM',
                  'Review detailed market intelligence',
                ].map((step, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-xs font-semibold">
                      {idx + 1}
                    </span>
                    <span className="text-sm text-gray-700 dark:text-gray-300 pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Key Features */}
            <div className="bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Key Features</h3>
              <ul className="space-y-3">
                {[
                  'Real-time market data analysis',
                  'AI-powered price prediction',
                  'Vendor reliability scoring',
                  'Historical trend analysis',
                  'Device condition assessment',
                  'Confidence-based verdicts',
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-emerald-500 dark:text-emerald-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}
