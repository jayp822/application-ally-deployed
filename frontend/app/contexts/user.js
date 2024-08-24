'use client'
import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [token, setToken] = useState(null)
  const router = useRouter()

  const signIn = async (email, password) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND}/api/signin`,
        {
          email,
          password,
        }
      )
      const authToken = response.data.token
      localStorage.setItem('token', authToken)
      setToken(authToken)
      setIsLoggedIn(true)
      localStorage.setItem('userID', response.data.userId)
      router.push('/applications')
    } catch (error) {
      alert('Wrong Email or Password')
      console.error('Error signing in:', error)
    }
  }

  // Function to handle sign out
  const signOut = () => {
    localStorage.removeItem('token') // Remove the token from localStorage
    localStorage.removeItem('userID')
    setToken(null)
    setIsLoggedIn(false)
    router.push('/') // Redirect after successful sign-out
  }

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
      setToken(storedToken)
      setIsLoggedIn(true)
    }
  }, [])

  return (
    <AuthContext.Provider value={{ isLoggedIn, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
