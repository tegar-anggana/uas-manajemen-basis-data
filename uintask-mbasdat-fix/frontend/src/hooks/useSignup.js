import { useAtom } from 'jotai'
import { useState } from 'react'
import { userDataAtom } from '../state/kumpulanAtom'

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const [, setUser] = useAtom(userDataAtom)

  const signup = async (email, password) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch('/api/user/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json))

      // update the auth context
      setUser(json)

      // update loading state
      setIsLoading(false)
    }
  }

  return { signup, isLoading, error }
}