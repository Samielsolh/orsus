import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Funding Live',
  description: 'AI-powered dealflow for venture capital and private equity',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <nav>
        <h1> My Nav bar </h1>
        </nav>
      </body>

    </html>
  )
}
