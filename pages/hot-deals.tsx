import React from 'react';
import Head from 'next/head';
import { DashboardLayout } from '../components/DashboardLayout';
import { HotDeals } from '../components/HotDeals';

export default function HotDealsPage() {
  return (
    <>
      <Head>
        <title>SHEGSTECH - Hot Deals</title>
        <meta name="description" content="Discover the latest certified hot deals and flash sales on SHEGSTECH." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <DashboardLayout>
        <main className="bg-[#0B0F1A] min-h-screen text-[#F4F5F9]">
          <HotDeals />
        </main>
      </DashboardLayout>
    </>
  );
}
