import React from 'react';
import Head from 'next/head';
import { DashboardLayout } from '../components/DashboardLayout';
import { VerifiedVendors } from '../components/VerifiedVendors';

export default function VerifiedVendorsPage() {
  return (
    <>
      <Head>
        <title>SHEGSTECH - Verified Vendors</title>
        <meta name="description" content="Browse SHEGSTECH official verified vendor hubs and trusted distribution centers." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <DashboardLayout>
        <main className="bg-[#0B0F1A] min-h-screen text-[#F4F5F9]">
          <VerifiedVendors />
        </main>
      </DashboardLayout>
    </>
  );
}
