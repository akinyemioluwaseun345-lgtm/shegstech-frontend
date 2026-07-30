import React from 'react';
import Head from 'next/head';
import { DashboardLayout } from '../components/DashboardLayout';
import { MyGarage } from '../components/MyGarage';

export default function MyGaragePage() {
  return (
    <>
      <Head>
        <title>SHEGSTECH - My Garage</title>
        <meta name="description" content="Your personal gadget garage: view estimated resale values, request trade-ins, and track value history." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <DashboardLayout>
        <main className="bg-[#0B0F1A] min-h-screen text-[#F4F5F9]">
          <MyGarage />
        </main>
      </DashboardLayout>
    </>
  );
}
