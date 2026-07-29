import React from 'react';
import Head from 'next/head';
import { DashboardLayout } from '../components/DashboardLayout';
import { MarketRadar } from '../components/MarketRadar';

export default function MarketRadarPage() {
  return (
    <>
      <Head>
        <title>SHEGSTECH - Market Radar</title>
        <meta
          name="description"
          content="Track real-time price movement for devices in the SHEGSTECH marketplace."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <DashboardLayout>
        <div className="min-h-screen bg-[#0B0F1A] text-[#F4F5F9]">
          <MarketRadar />
        </div>
      </DashboardLayout>
    </>
  );
}
