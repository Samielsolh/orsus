import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import {Nav} from '../nav';
import { Suspense } from 'react';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Funding Live',
  description: 'AI-powered dealflow for venture capital and private equity',
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className="h-full">
        <Suspense>
          <Nav />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
