import { useAtom } from 'jotai'
import React from 'react'
import { useState } from 'react'
import { deleteSectionWindowAtom, sectionsDataAtom, selectedSectionAtom, tasksDataAtom, userDataAtom } from '../../state/kumpulanAtom'

export default function DeleteSection() {

  const close = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
  </svg>

  const [sectionsData, setSectionsData] = useAtom(sectionsDataAtom)
  const [tasksData, setTasksData] = useAtom(tasksDataAtom)
  const [selectedSection, setSelectedSection] = useAtom(selectedSectionAtom)
  const [, setDeleteSectionWindow] = useAtom(deleteSectionWindowAtom)
  const [user,] = useAtom(userDataAtom)

  const handleDelete = async (e) => {
    e.preventDefault()
    if (!user) {
      return
    }

    // const sectionId = sectionsData.find(s => s._id === selectedSection._id)._id
    const sectionId = selectedSection._id
    const sectionTitle = selectedSection.title

    const delSectionRes = await fetch('/api/sections/' + sectionId, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const jsonSection = await delSectionRes.json()

    const delTasksRes = await fetch('/api/tasks/deleteBySection/' + sectionTitle, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const jsonTasks = await delTasksRes.json()

    if (delSectionRes.ok) {
      setSectionsData(prev => prev.filter(s => s._id !== jsonSection._id))
      if (tasksData.length !== 0) {
        setTasksData(prev => prev.filter(t => t.sectionTitle !== sectionTitle))
      }
      setSelectedSection(null)
      setDeleteSectionWindow(false)
    }
  }

  return (
    <div className='fixed z-20 inset-0 bg-black/40 p-2 border-2 border-black flex flex-col justify-center font-bold'>
      <div className='bg-white h-fit p-3 mx-2'>
        <form onSubmit={handleDelete}>
          <div className='flex flex-col gap-2'>
            <div className='relative flex items-center justify-between mb-3'>
              <p>Hapus section "{selectedSection.title}"?</p>
              <button type='button' onClick={() => setDeleteSectionWindow(false)} className='block p-1 border-2 border-black rounded-md '>
                {close}
              </button>
            </div>
          </div>
          <div className='flex justify-center gap-10'>
            <button type='submit' className='mt-5 block bg-beureum text-white font-semibold w-fit p-3'>Hapus</button>
          </div>
        </form>
      </div>
    </div>
  )
}
