import React, { useState, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../contexts/user'
import Link from 'next/link'
import { Input } from '@nextui-org/react'
import { Spinner } from '@nextui-org/react'

const SignUpForm = () => {
  const { signIn } = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isButtonDisabled, setButtonDisabled] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword || password.length < 8) {
      alert('Passwords do not match or password is less than 8 characters')
      return
    }

    try {
      setButtonDisabled(true)
      setIsLoading(true)

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND}/api/signup`,
        {
          email,
          password,
        }
      )

      // If sign up successful, automatically sign in the user
      if (response.status === 201) {
        await signIn(email, password)
      }
    } catch (error) {
      console.error('Error signing up:', error)

      // Handle error, e.g., display an error message to the user
    } finally {
      setIsLoading(false)

      setButtonDisabled(false)
    }
  }

  return (
    <div className="container max-w-[400px] h-[500px] p-[40px] mx-[10px] bg-gray-300 rounded-md mb-10">
      <form onSubmit={handleSubmit} autoComplete="on">
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
          className="text-lg font-bold text-black p-2 my-1"
        />

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
          className="text-lg font-bold text-black p-2 my-1"
        />

        <Input
          isRequired
          type="password"
          id="password"
          name="password"
          label="Confirm Password"
          autoComplete="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          size="lg"
          className="text-lg font-bold text-black p-2 my-1"
        />
        <button
          className="bg-blue-500 p-2 mt-4 text-white rounded-lg hover:bg-blue-800 font-semibold block mx-auto"
          type="submit"
          value="register"
          disabled={isButtonDisabled}
        >
          Register
        </button>
      </form>
      <div className="text-center mt-3">
        <p className="text-lg font-medium">
          Already a user?{' '}
          <Link
            className="transition text-blue-600 decoration-sky-500 hover:text-blue-900  p-[3px] text-lg font-medium"
            href="/sign-in"
          >
            Login here
          </Link>
        </p>
      </div>
      <div className="flex justify-center mt-3">{isLoading && <Spinner />}</div>
    </div>
  )
}

export default SignUpForm
