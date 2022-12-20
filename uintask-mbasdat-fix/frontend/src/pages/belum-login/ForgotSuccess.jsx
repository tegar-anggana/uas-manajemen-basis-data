import React from 'react'
import { Link } from 'react-router-dom'

export default function ForgotSuccess() {
  return (
    <div className='h-screen flex items-center font-medium'>
      <div className='mx-5 w-full'>
        <h1 className='mt-3 font-medium text-4xl'>Email pemulihan berhasil dikirim.</h1>
        <Link to="/">
          <button className='mt-6 text-xl block px-2 py-4 w-full font-bold text-white bg-biru-euy'>Kembali</button>
        </Link>
      </div>
    </div>
  )
}
