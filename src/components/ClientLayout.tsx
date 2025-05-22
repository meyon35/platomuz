"use client"

import React from 'react'
import { Navigation } from './Navigation'
import { Footer } from './Footer'

export const ClientLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-black">
        {children}
      </main>
      <Footer />
    </>
  )
} 