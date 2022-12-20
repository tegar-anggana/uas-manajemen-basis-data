import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSignup } from '../../hooks/useSignup'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signup, error, isLoading } = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(email, password)
  }

  return (
    <div className='h-screen flex items-center font-medium'>
      <form className='mx-5 w-full' onSubmit={handleSubmit}>
        <div className='mt-3'>
          <h1 className='font-bold text-4xl text-center'>Buat Akun Baru</h1>
        </div>
        <div className='mt-8'>
          <input
            type="email"
            className='mt-3 text-base block px-4 py-4 w-full bg-white border-2 border-black' placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className=''>
          <input
            type="password"
            className='mt-3 text-base block px-4 py-4 w-full bg-white border-2 border-black' placeholder='Kata Sandi'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <button
          className='mt-10 text-xl block px-2 py-4 w-full font-bold text-white bg-biru-euy'
          disabled={isLoading}
        >
          Daftar
        </button>
        {error && <div className="mt-2 border-1 border-red-800 bg-red-50 p-2">{error}</div>}
        <p className='mt-12 text-center'>
          Sudah punya akun? <Link to="/login"><span className='underline'>Login</span></Link>
        </p>
      </form>
    </div>
  )
}
