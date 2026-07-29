import React from 'react';
import Head from 'next/head';
import { DashboardLayout } from '../components/DashboardLayout';
import { GadgetsReviews } from '../components/GadgetsReviews';

export default function GadgetsReviewsPage() {
  return (
    <>
      <Head>
        <title>SHEGSTECH - Gadgets Reviews</title>
        <meta
          name="description"
          content="Explore SHEGSTECH's latest gadget reviews, scores, and hands-on verdicts for phones, laptops, wearables, and audio gear."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <DashboardLayout>
        <main className="bg-[#0B0F1A] min-h-screen text-[#F4F5F9]">
          <GadgetsReviews />
        </main>
      </DashboardLayout>
    </>
  );
}
