import type { PropsWithChildren } from 'react'

import Header from './header/Header'

export default function DashboardLayout({
  children,
}: PropsWithChildren<unknown>) {
  return (
    <div className="h-screen">
      <Header />
      <main className="h-full">{children}</main>
    </div>
  )
}
