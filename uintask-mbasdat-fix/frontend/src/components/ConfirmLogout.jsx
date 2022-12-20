import { useAtom } from 'jotai'
import React from 'react'
import { useLogout } from '../hooks/useLogout'
import { showConfirmLogoutAtom, showUserInfoAtom, userDataAtom } from '../state/kumpulanAtom'

export default function ConfirmLogout() {
  const [, setShowConfirmLogout] = useAtom(showConfirmLogoutAtom)
  const [, setShowUserInfo] = useAtom(showUserInfoAtom)
  const [user] = useAtom(userDataAtom)
  const { logout } = useLogout()

  const handleKeluar = () => {
    logout()
    setShowConfirmLogout(false)
    setShowUserInfo(false)
  }

  return (
    <div className='fixed z-20 inset-0 bg-black/40 p-2 border-2 border-black flex flex-col justify-center'>
      <div className='bg-white h-fit flex flex-col py-10'>
        <p className='text-center text-lg font-bold mt-2'>Yakin ingin keluar dari akun {user.email}?</p>
        <div className='flex justify-center gap-5 mt-3'>
          <button onClick={handleKeluar} className='mt-5 block bg-beureum text-white font-semibold w-fit text-xl p-3'>Keluar</button>
          <button onClick={() => setShowConfirmLogout(false)} className='mt-5 block bg-biru-euy text-white font-semibold w-fit text-xl p-3'>Kembali</button>
        </div>
      </div>
    </div>
  )
}
