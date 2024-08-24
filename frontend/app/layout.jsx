import '@/app/globals.css'
import { montserrat } from '@/app/fonts'
import { AuthProvider } from './contexts/user'
import React from 'react'

export const metadata = {
  title: 'Application Ally',
  description: 'Your personalized job and internship applications tracker',
}

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={`${montserrat.className} antialiased`}>
          {children}
        </body>
      </html>
    </AuthProvider>
  )
}
