import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addSectionWindowAtom, addTaskWindowAtom, editTaskWindowAtom, sectionsDataAtom, selectedSectionAtom, selectedTaskAtom, tasksDataAtom, userDataAtom } from '../../state/kumpulanAtom'

export default function EditTask() {

  const close = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
  </svg>

  const [, setEditTaskWindow] = useAtom(editTaskWindowAtom)
  const [tasksData, setTasksData] = useAtom(tasksDataAtom)
  const [sectionsData,] = useAtom(sectionsDataAtom)
  const [selectedTask, setSelectedTask] = useAtom(selectedTaskAtom)
  const [user,] = useAtom(userDataAtom)

  const [selectedSection, setSelectedSection] = useAtom(selectedSectionAtom)
  const [title, setTitle] = useState(selectedTask.title)
  const [date, setDate] = useState(selectedTask.date ? selectedTask.date : '')
  const [sectionTitle, setSectionTitle] = useState(selectedTask.sectionTitle)
  // const [sectionTitle, setSectionTitle] = useState(selectedSection ? selectedSection.title : '')
  const [deskripsi, setDeskripsi] = useState(selectedTask.deskripsi ? selectedTask.deskripsi : '')
  const [error, setError] = useState(null)
  const [, setEmptyFields] = useState([])

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('Anda harus login')
      return
    }

    const task = { title, date, sectionTitle, deskripsi }

    const response = await fetch('/api/tasks/' + selectedTask._id, {
      method: 'PATCH',
      body: JSON.stringify(task),
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
      setTasksData(previous => previous.map(t => {
        if (t._id === json._id) {
          return { ...t, ...json }
        } else {
          return t
        }
      }))
      setSelectedTask(prev => ({ ...prev, ...task }))
      setTitle('')
      setDate('')
      setSectionTitle('')
      setDeskripsi('')
      setError(null)
      setEmptyFields([])
      setEditTaskWindow(false)
    }
  }

  // useEffect(() => {
  //   // if (sectionsData.length === 1) {
  //   //   setSectionTitle(sectionsData[0].title)
  //   // }
  //   // if (sectionsData.length > 1) {
  //   //   setSectionTitle(selectedSection.title)
  //   // }
  // }, [])

  return (
    <div className='fixed z-20 inset-0 bg-black/40 p-2 border-2 border-black'>
      <div className='bg-white h-full flex flex-col justify-between'>
        <div className='overflow-auto'>
          <div className='mx-2 flex items-center justify-center font-bold text-lg relative border-b-1 border-black'>
            <h1 className='py-3'>Edit Task</h1>
            <button onClick={() => setEditTaskWindow(false)} className='p-1 border-2 border-black rounded-md absolute right-0'>
              {close}
            </button>
          </div>

          <form onSubmit={handleSubmit} className='mt-8 mx-5 font-semibold'>
            <div className='overflow-auto max-h-gede flex flex-col gap-4 pb-4'>
              <div className='flex flex-col gap-2'>
                <p>Judul</p>
                <input
                  type="text"
                  className='block w-full border-1 border-black px-2 py-2'
                  placeholder='Judul task'
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />
              </div>
              <div className='flex flex-col gap-2'>
                <p>Tanggal</p>
                <input
                  type="date"
                  className='block w-full border-1 border-black px-2 py-2'
                  onChange={(e) => setDate(e.target.value)}
                  value={date}
                />
              </div>
              <div className='flex flex-col gap-2'>
                <p>Section</p>
                {sectionsData.length > 0 && <select
                  name='sectionTitle'
                  className='block w-full border-1 border-black px-2 py-2'
                  onChange={(e) => { setSectionTitle(e.target.value) }}
                  value={sectionTitle}
                >
                  {sectionsData.map(s => (
                    <option key={s._id} value={s.title}>{s.title}</option>
                  ))}
                </select>}
              </div>
              <div className='flex flex-col gap-2'>
                <p>Deskripsi</p>
                <textarea
                  type="text"
                  className='block w-full border-1 border-black px-2 py-2'
                  placeholder='Tambahkan deskripsi...'
                  rows={5}
                  onChange={(e) => setDeskripsi(e.target.value)}
                  value={deskripsi}
                />
              </div>
            </div>
            <div className='flex flex-col items-center'>
              {error && <div className="mt-4 border-1 border-red-800 bg-red-50 p-2">{error}</div>}
              <button type='submit' className={error ? 'mt-1 mb-2' : 'mt-8'}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-14 h-14">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}