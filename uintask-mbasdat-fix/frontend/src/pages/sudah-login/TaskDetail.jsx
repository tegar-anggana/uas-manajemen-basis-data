import { useAtom } from 'jotai'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { deleteTaskWindowAtom, editTaskWindowAtom, selectedTaskAtom, showConfirmSelesaiTaskAtom, userDataAtom } from '../../state/kumpulanAtom'
import dateFormat from "dateformat"
import ConfirmTaskSelesai from '../../components/ConfirmTaskSelesai'
import DeleteTask from '../../components/task/DeleteTask'
import EditTask from '../../components/task/EditTask'

export default function TaskDetail() {

  const arrowLeft = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
  </svg>

  const trash = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
  </svg>

  const pencil = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
  </svg>

  const checked = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
  </svg>

  const cross = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>


  const params = useParams()
  const [user, setUser] = useAtom(userDataAtom)
  const [selectedTask, setSelectedTask] = useAtom(selectedTaskAtom)
  const [showConfirmSelesaiTask, setShowConfirmSelesaiTask] = useAtom(showConfirmSelesaiTaskAtom)
  const [deleteTaskWindow, setDeleteTaskWindow] = useAtom(deleteTaskWindowAtom)
  const [editTaskWindow, setEditTaskWindow] = useAtom(editTaskWindowAtom)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchTask = async () => {
      const response = await fetch('/api/tasks/' + params.id, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${user.token}` }
      })
      const json = await response.json()

      if (response.ok) {
        // dispatch({ type: 'SET_WORKOUTS', payload: json })
        setSelectedTask({ ...json })
      }

      if (!response.ok) {
        navigate('/')
      }
    }

    if (user) {
      fetchTask()
    }
  }, [])
  // console.log(selectedTask.title ? selectedTask.title : '')

  return (
    <div>
      {deleteTaskWindow && <DeleteTask task={selectedTask} />}
      {showConfirmSelesaiTask && <ConfirmTaskSelesai />}
      {editTaskWindow && <EditTask />}
      {selectedTask && <div className='text-sm flex flex-col gap-2 overflow-auto'>
        <div className='bg-white py-2 px-1 mt-2 mx-2 gap-2 drop-shadow-md flex border-1 border-black/30 rounded-md'>
          <div>
            <Link to='/tasks'>
              <div className='py-1 px-2'>
                {arrowLeft}
              </div>
            </Link>
          </div>
          <div className='flex flex-col gap-4 w-full'>
            <p className='text-base font-semibold'>{selectedTask.title}</p>
            <div className='flex gap-2 mr-3 flex-wrap'>
              <button onClick={() => setDeleteTaskWindow(true)} className='p-1 pr-2 bg-gray-500 text-white rounded-lg flex items-center text-normal gap-1'>
                <div>{trash}</div>
                <p>Hapus</p>
              </button>
              <button onClick={() => setEditTaskWindow(true)} className='p-1 pr-3 pl-2 bg-yellow-600 text-white rounded-lg flex items-center text-normal gap-1'>
                <div>{pencil}</div>
                <p>Edit</p>
              </button>
              {selectedTask.title && <button onClick={() => setShowConfirmSelesaiTask(true)} className={(selectedTask.status_selesai === 'Belum' ? 'p-1 pr-3 pl-2 bg-red-400 text-white rounded-lg flex items-center text-normal gap-1' : 'p-1 pr-3 pl-2 bg-green-400 text-white rounded-lg flex items-center text-normal gap-1')}>
                <div>{(selectedTask.status_selesai === 'Belum' ? cross : checked)}</div>
                <p>{selectedTask.status_selesai}</p>
              </button>}

            </div>
          </div>
        </div>
        <div className='bg-white py-2 px-3 mt-2 mx-2 gap-5 drop-shadow-md flex items-center border-1 border-black/30 rounded-md'>
          <div className='flex flex-col w-full'>
            <p className='text-base font-semibold border-b-1 pb-1 border-black'>Detail</p>
            <div className='flex flex-col gap-3 p-2 bg-gray-100'>
              <div className='w-full'>
                <div className=' w-full pr-2 font-semibold'>Judul</div>
                <p className='mt-1'>{selectedTask.title}</p>
              </div>
              <div className='w-full'>
                <div className=' w-full pr-2 font-semibold'>Tanggal</div>
                <p className='mt-1'>{dateFormat(selectedTask.date, "dddd, d mmmm yyyy") || '-'}</p>
              </div>
              <div className='w-full'>
                <div className=' w-full pr-2 font-semibold'>Section</div>
                <p className='mt-1'>{selectedTask.sectionTitle}</p>
              </div>
            </div>
          </div>
        </div>
        <div className='bg-white py-2 px-3 mt-2 mx-2 gap-5 drop-shadow-md flex items-center border-1 border-black/30 rounded-md'>
          <div className='flex flex-col gap-4'>
            <p className='text-base font-semibold'>Subtask</p>
          </div>
        </div>
        <div className='mb-20'></div>
      </div>}
    </div>
  )
}
