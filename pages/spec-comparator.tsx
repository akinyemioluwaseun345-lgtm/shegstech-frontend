import React from 'react';
import Head from 'next/head';
import { DashboardLayout } from '../components/DashboardLayout';
import { SpecComparator } from '../components/SpecComparator';

export default function SpecComparatorPage() {
  return (
    <>
      <Head>
        <title>SHEGSTECH - Spec Comparator</title>
        <meta
          name="description"
          content="Compare device specifications, prices, and market valuations side-by-side with SHEGSTECH's spec comparator."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <DashboardLayout>
        <main className="px-4 md:px-6 py-10 bg-slate-950 min-h-screen text-slate-100">
          <SpecComparator />
        </main>
      </DashboardLayout>
    </>
  );
}
