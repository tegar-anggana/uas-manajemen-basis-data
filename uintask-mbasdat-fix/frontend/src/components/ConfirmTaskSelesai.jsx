import { useAtom } from 'jotai'
import React from 'react'
import { useState } from 'react'
import { selectedTaskAtom, showConfirmSelesaiTaskAtom, tasksDataAtom, userDataAtom } from '../state/kumpulanAtom'

export default function ConfirmTaskSelesai() {

  const close = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
  </svg>

  const [, setTasksData] = useAtom(tasksDataAtom)
  const [, setConfirmTaskSelesai] = useAtom(showConfirmSelesaiTaskAtom)
  const [selectedTask, setSelectedTask] = useAtom(selectedTaskAtom)
  const [statusSelesai, setStatusSelesai] = useState('')
  const [user,] = useAtom(userDataAtom)

  const handleClick = async (e) => {
    e.preventDefault()
    if (!user) {
      return
    }

    const task = { status_selesai: statusSelesai }

    const response = await fetch('/api/tasks/' + selectedTask._id, {
      method: 'PATCH',
      body: JSON.stringify(task),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      // replacing the old task to updated task
      setTasksData((prev) => prev.map(t => {
        if (t._id === json._id) {
          return { ...t, status_selesai: statusSelesai }
        } else {
          return t
        }
      }))
      setSelectedTask(prev => ({ ...prev, status_selesai: statusSelesai }))
      setStatusSelesai('')
      setConfirmTaskSelesai(false)
    }
  }

  return (
    <div className='fixed z-20 inset-0 bg-black/40 p-2 border-2 border-black flex flex-col justify-center font-bold'>
      <div className='bg-white h-fit p-3 mx-2'>
        <form onSubmit={handleClick}>
          <div className='flex flex-col gap-2'>
            <div className='relative flex items-center justify-between mb-3'>
              <p>Ubah status selesai "{selectedTask.title}"</p>
              <button type='button' onClick={() => setConfirmTaskSelesai(false)} className='block p-1 border-2 border-black rounded-md '>
                {close}
              </button>
            </div>
          </div>
          <div className='flex justify-center gap-10'>
            <button onClick={() => setStatusSelesai('Belum')} type='submit' className='mt-5 block bg-red-400 rounded-lg text-white px-4 font-semibold w-fit p-3'>Belum</button>
            <button onClick={() => setStatusSelesai('Sudah')} type='submit' className='mt-5 block bg-green-400 rounded-lg text-white px-4 font-semibold w-fit p-3'>Sudah</button>
          </div>
        </form>
      </div>
    </div>
  )
}
