import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'

import Middleware from '@/components/dashboard-layout/Middleware'
import './globals.css'
import Provider from './provider'

const font = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Корпоративный портал | Архитектура',
  description: 'Корпоративный портал',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <div className="background"></div>
        {/* <Middleware /> */}
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
