import type { Metadata } from 'next'
import './globals.css'

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
        {children}
      </body>
    </html>
  );
}
