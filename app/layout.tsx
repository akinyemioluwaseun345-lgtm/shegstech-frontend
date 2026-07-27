import type { Metadata } from 'next';
import '@/styles/globals.css';
import RootLayoutClient from './layout-client';

export const metadata: Metadata = {
  title: 'SHEGSTECH - Device Valuation Platform',
  description: 'Evaluate device pricing and get instant market valuations',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#09090b" />
      </head>
      <body>
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}
