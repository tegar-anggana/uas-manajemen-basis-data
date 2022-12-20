import { useAtom } from 'jotai'
import React from 'react'
import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { deleteSectionWindowAtom, deleteTaskWindowAtom, sectionsDataAtom, selectedSectionAtom, tasksDataAtom, userDataAtom } from '../../state/kumpulanAtom'

export default function DeleteTask({ task }) {

  const close = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
  </svg>

  const [tasksData, setTasksData] = useAtom(tasksDataAtom)
  const [, setDeleteTaskWindow] = useAtom(deleteTaskWindowAtom)
  const [user,] = useAtom(userDataAtom)
  const navigate = useNavigate()

  const handleDelete = async (e) => {
    e.preventDefault()
    if (!user) {
      return
    }

    // const sectionId = sectionsData.find(s => s._id === selectedSection._id)._id
    const taskId = task._id

    const delTaskRes = await fetch('/api/tasks/' + taskId, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const jsonTask = await delTaskRes.json()

    if (delTaskRes.ok) {
      setTasksData(prev => prev.filter(t => t._id !== jsonTask._id))
      setDeleteTaskWindow(false)
      navigate('/')
    }
  }

  return (
    <div className='fixed z-20 inset-0 bg-black/40 p-2 border-2 border-black flex flex-col justify-center font-bold'>
      <div className='bg-white h-fit p-3 mx-2'>
        <form onSubmit={handleDelete}>
          <div className='flex flex-col gap-2'>
            <div className='relative flex items-center justify-between mb-3'>
              <p>Hapus task "{task.title}"?</p>
              <button type='button' onClick={() => setDeleteTaskWindow(false)} className='block p-1 border-2 border-black rounded-md '>
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
