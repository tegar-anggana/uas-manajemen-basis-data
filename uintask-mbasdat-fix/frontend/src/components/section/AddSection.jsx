import { useAtom } from 'jotai'
import React from 'react'
import { useState } from 'react'
import { addSectionWindowAtom, sectionsDataAtom, selectedSectionAtom, userDataAtom } from '../../state/kumpulanAtom'

export default function AddSection() {

  const close = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
  </svg>

  const [, setAddSectionWindow] = useAtom(addSectionWindowAtom)
  const [, setSectionsData] = useAtom(sectionsDataAtom)
  const [title, setTitle] = useState('')
  const [error, setError] = useState(null)
  const [user, setUser] = useAtom(userDataAtom)
  const [selectedSection, setSelectedSection] = useAtom(selectedSectionAtom)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) {
      setError('Anda harus login')
      return
    }

    const section = { title }

    const response = await fetch('/api/sections', {
      method: 'POST',
      body: JSON.stringify(section),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setTitle('')
      setError(null)
      setEmptyFields([])
      setSelectedSection(json)
      setSectionsData(sections => [json, ...sections])
      setAddSectionWindow(false)
    }
  }

  return (
    <div className='fixed z-20 inset-0 bg-black/40 p-2 border-2 border-black flex flex-col justify-center font-bold'>
      <div className='bg-white h-fit p-3 mx-2'>
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col gap-2'>
            <div className='relative flex items-center justify-between mb-3'>
              <p>Tambah section</p>
              <button type='button' onClick={() => setAddSectionWindow(false)} className='block p-1 border-2 border-black rounded-md '>
                {close}
              </button>
            </div>
            <input
              type="text"
              className='block w-full border-1 font-semibold border-black px-2 py-2'
              placeholder='Nama section'
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              maxLength={40}
            />
            {error && <div className="mt-2 border-1 font-semibold border-red-800 bg-red-50 p-2">{error}</div>}
          </div>
          <div className='flex justify-center gap-10'>
            <button type='submit' className='mt-5 block bg-biru-euy text-white font-semibold w-fit p-3'>Tambah Section</button>
          </div>
        </form>
      </div>
    </div>
  )
}
