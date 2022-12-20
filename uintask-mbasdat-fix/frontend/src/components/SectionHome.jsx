import { useAtom } from 'jotai'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { sectionsAtom, selectedSectionAtom, selectedTaskAtom, showConfirmSelesaiTaskAtom, showUserInfoAtom, tasksDataAtom } from '../state/kumpulanAtom'
import BottomBar from './BottomBar'

export default function SectionHome() {

  const chevron = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5 pt-1">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>

  const person = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.7} stroke="currentColor" className="w-8 h-8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>

  const filter = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5" />
  </svg>


  const sort = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm8.25 5.25a.75.75 0 01.75-.75h8.25a.75.75 0 010 1.5H12a.75.75 0 01-.75-.75z" clipRule="evenodd" />
  </svg>

  const search = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-black">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>

  const [tasksData,] = useAtom(tasksDataAtom)
  const [, setShowSection] = useAtom(sectionsAtom)
  const [, setShowUserInfo] = useAtom(showUserInfoAtom)
  const [filterSelesai, setFilterSelesai] = useState('Semua')
  const [selectedSection, setSelectedSection] = useAtom(selectedSectionAtom)
  const [showConfirmTaskSelesai, setShowConfirmTaskSelesai] = useAtom(showConfirmSelesaiTaskAtom)
  const [selectedTask, setSelectedTask] = useAtom(selectedTaskAtom)

  const [searchField, setSearchField] = useState('')

  let hasilCari
  hasilCari = tasksData.filter(
    task => {
      const taskKeys = Object.keys(task)
      let isAda = false
      for (let key of taskKeys) {
        if (String(task[key]).toLowerCase().includes(String(searchField).toLowerCase())) {
          isAda = true
          break
        }
      }
      return isAda
    }
  )

  const handleSearch = e => {
    setSearchField(e.target.value)
    console.log(searchField)
  }

  return (
    <div className='px-3 relative'>
      <div className='flex w-full items-center justify-between'>
        <div onClick={() => setShowSection(true)} className='flex items-center pb-4 pt-3'>
          <h1 className='font-bold text-xl'>{selectedSection ? selectedSection.title : 'Semua'}</h1>
          <span className='ml-2'>
            {chevron}
          </span>
        </div>
        <button className='block pb-4 px-1 pt-3' onClick={() => setShowUserInfo(true)}>
          {person}
        </button>
      </div>
      <div className='flex w-full h-full gap-3 items-center '>
        {/* <button className='block bg-biru-euy h-full p-2 text-white'>
          {filter}
        </button>
        <button className='block bg-hejo h-full p-2 text-white'>
          {sort}
        </button> */}
        <div className='flex w-full justify-between'>
          <input onChange={handleSearch} type="search" className='w-full bg-white text-sm px-2' />
          <button disabled className='block bg-white h-full p-2'>
            {search}
          </button>
        </div>
      </div>
      <div className='flex text-center gap-5 mt-5 px-2 font-bold text-sm text-coklat-tua'>
        <button
          onClick={() => setFilterSelesai('Semua')}
          className={(filterSelesai === 'Semua') ? 'block grow pb-2 border-b-4 border-coklat-tua' : 'block grow pb-2 border-b-4 border-hejo-muda'}
        >
          Semua
        </button>
        <button
          onClick={() => setFilterSelesai('Belum')}
          className={(filterSelesai === 'Belum') ? 'block grow pb-2 border-b-4 border-coklat-tua' : 'block grow pb-2 border-b-4 border-hejo-muda'}
        >
          Belum
        </button>
        <button
          onClick={() => setFilterSelesai('Sudah')}
          className={(filterSelesai === 'Sudah') ? 'block grow pb-2 border-b-4 border-coklat-tua' : 'block grow pb-2 border-b-4 border-hejo-muda'}
        >
          Sudah
        </button>
      </div>
      <div className='mt-2 text-sm flex flex-col gap-2 overflow-auto h-gede'>
        {tasksData && hasilCari.filter(t =>
          (selectedSection ? (t.sectionTitle === selectedSection.title) : t)
        ).filter(t =>
          (filterSelesai !== 'Semua' ? (t.status_selesai === filterSelesai) : t)
        ).map(t => (
          <div key={t._id} className='bg-white px-3 gap-3 drop-shadow-md flex justify-between items-center border-1 border-black/30 rounded-md'>
            <Link onClick={() => setSelectedTask(t)} className='grow py-3' to={'/tasks/detail/' + t._id}>
              <p>{t.title}</p>
            </Link>
            <p onClick={() => { setShowConfirmTaskSelesai(true); setSelectedTask(t) }} className={t.status_selesai === 'Belum' ? 'bg-red-300 rounded-lg text-white py-1 px-2 font-semibold' : 'bg-green-300 rounded-lg text-white py-1 px-2 font-semibold'}>{t.status_selesai}</p>
          </div>
        ))}
        <div className='mb-20'></div>
      </div>
      <BottomBar />
    </div>
  )
}
