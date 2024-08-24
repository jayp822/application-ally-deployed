import Link from 'next/link'
import React, { useState, useContext } from 'react'
import { AuthContext } from '../contexts/user'
import { Input } from '@nextui-org/react'
import { Spinner } from '@nextui-org/react'

const SignInForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isButtonDisabled, setButtonDisabled] = useState(false)
  const { signIn, isLoggedIn } = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      setButtonDisabled(true)
      await signIn(email, password)
    } catch (error) {
      console.error('Error signing in:', error)
    } finally {
      setButtonDisabled(false)
      setIsLoading(false)
    }
  }

  return (
    <div className="container md:w-[400px] md:h-[400px] p-[40px] bg-gray-300 rounded-md flex flex-col justify-start gap-5 mb-10">
      <form onSubmit={handleLogin} autoComplete="on">
        <Input
          isRequired
          type="email"
          label="Email"
          id="email"
          name="email"
          value={email}
          autoComplete="email"
          onChange={(e) => setEmail(e.target.value)}
          size="lg"
          className="text-lg font-bold text-black"
        />
        <br />

        <Input
          isRequired
          type="password"
          id="password"
          name="password"
          label="Password"
          value={password}
          autoComplete="password"
          onChange={(e) => setPassword(e.target.value)}
          size="lg"
          className="text-lg font-bold text-black mb-2"
        />
        <button
          className="bg-blue-500 p-2 mt-4 text-white rounded-lg hover:bg-blue-800 font-semibold block mx-auto"
          type="submit"
          value="Log In"
          disabled={isButtonDisabled}
        >
          Log In
        </button>
      </form>
      <p className="text-lg font-medium text-center">
        Not a user?
        <Link
          className="transition text-blue-600 decoration-sky-500 hover:text-blue-900  p-[3px] text-lg font-medium"
          href="/sign-up"
        >
          Sign Up here
        </Link>
      </p>
      <div className="flex justify-center">{isLoading && <Spinner />}</div>
    </div>
  )
}

export default SignInForm
