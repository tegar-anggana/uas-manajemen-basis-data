import { useAtom } from 'jotai'
import React from 'react'
import { showConfirmLogoutAtom, showUserInfoAtom, userDataAtom } from '../state/kumpulanAtom'

export default function UserInfo() {
  const close = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
  </svg>

  const person = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-24 h-24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>

  const [, setShowUserInfo] = useAtom(showUserInfoAtom)
  const [, setShowConfirmLogout] = useAtom(showConfirmLogoutAtom)
  const [user,] = useAtom(userDataAtom)

  return (
    <div className='fixed z-10 inset-0 bg-black/40 p-2 border-2 border-black flex flex-col justify-center'>
      <div className='bg-white h-fit flex flex-col pb-3'>
        <div className='mx-2 flex items-center justify-center font-bold text-lg relative border-b-1 border-black'>
          <h1 className='py-3'>Akun</h1>
          <button onClick={() => setShowUserInfo(false)} className='p-1 border-2 border-black rounded-md absolute right-0'>
            {close}
          </button>
        </div>
        <div className='flex flex-col items-center'>
          <div className='mt-5 flex flex-col items-center font-bold text-xl'>
            {person}
            <p>{user.email}</p>
          </div>
          <button onClick={() => setShowConfirmLogout(true)} className='mt-5 block bg-beureum text-white font-semibold w-fit text-xl p-3'>Keluar</button>
        </div>
      </div>
    </div>
  )
}
