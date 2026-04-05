import React from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen bg-background overflow-hidden text-text-main">
      <Sidebar />
      <div className="flex-1 flex flex-col relative z-10 overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-surface md:rounded-tl-2xl border border-border md:mr-2 md:mb-2 shadow-sm">
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout
