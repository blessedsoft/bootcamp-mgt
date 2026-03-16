import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Bootcamp App',
  description: 'Simple Next.js + NestJS + PostgreSQL app',
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
