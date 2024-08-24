'use client'
import '@/app/globals.css'

import Navbar from '../components/navbar'
import SignInForm from '../components/signInForm'
import Footer from '../components/footer'
import { AuthContext } from '../contexts/user'
import React, { useContext } from 'react'
import RestrictedPage from '../components/restrictedPage'

export default function Page() {
  const { isLoggedIn } = useContext(AuthContext)
  if (!isLoggedIn) {
    return (
      <div className="flex flex-col min-h-screen bg-neutral-900">
        <Navbar />
        <div className="flex flex-col gap-10 mx-auto items-center">
          <p className="gradient-text text-transparent text-5xl font-bold animate-gradient mt-[4rem] p-2">
            Sign In
          </p>
          <SignInForm />
        </div>
        <Footer />
      </div>
    )
  }
  return <RestrictedPage heading="You are already signed in" />
}
