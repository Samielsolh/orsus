export const metadata = {
  title: 'Dashboard',
  description: 'AI-powered dealflow for venture capital and private equity',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
