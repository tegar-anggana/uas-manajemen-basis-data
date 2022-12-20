import React from 'react'
import { Link } from 'react-router-dom'

export default function Welcome() {
  return (
    <div className='h-screen flex items-center font-medium'>
      <div className='mx-5 w-full'>
        <p>Win tasks with</p>
        <h1 className='mt-3 font-bold text-5xl'>Uin Task</h1>
        <Link to="/signup">
          <button className='mt-6 text-xl block px-2 py-4 w-full font-bold text-white bg-biru-euy'>Buat Akun Baru</button>
        </Link>
        <div className='mt-10'>
          <p>Sudah punya akun?</p>
          <Link to="/login">
            <button className='mt-3 text-xl block px-2 py-4 w-full bg-white border-2 border-black'>Masuk</button>
          </Link>
        </div>
      </div>
    </div>
  )
}
