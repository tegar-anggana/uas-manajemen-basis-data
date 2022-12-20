import React from 'react'
import { Link } from 'react-router-dom'

export default function ForgotPassword() {
  return (
    <div className='h-screen flex items-center font-medium'>
      <form className='mx-5 w-full'>
        <div className='mt-3'>
          <h1 className='font-bold text-4xl'>Pulihkan Kata Sandi</h1>
        </div>
        <div className='mt-8'>
          <p>Masukkan email untuk mereset kata sandi</p>
          <input type="email" className='mt-3 text-base block px-4 py-4 w-full bg-white border-2 border-black' placeholder='Email Anda' />
        </div>
        <button className='mt-2 text-xl block px-2 py-4 w-full font-bold text-white bg-biru-euy'>Kirim Email Pemulihan</button>
        <p className='mt-6 text-center'>
          <Link to="/login"><span className='underline'>Kembali</span></Link>
        </p>
      </form>
    </div>
  )
}
