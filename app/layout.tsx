import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '3D Cable Configurator',
  description: 'Customize and configure your perfect cable setup',
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  )
}
