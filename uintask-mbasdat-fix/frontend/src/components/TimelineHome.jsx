import { useAtom } from 'jotai'
import React from 'react'
import { selectedTaskAtom, showConfirmSelesaiTaskAtom, tasksDataAtom } from '../state/kumpulanAtom'
import BottomBar from './BottomBar'
import dateFormat, { i18n } from "dateformat"
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function TimelineHome() {

  i18n.dayNames = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
  ];

  i18n.monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const [tasksData, setTasksData] = useAtom(tasksDataAtom)
  const [filterSelesai, setFilterSelesai] = useState('Semua')
  const [, setSelectedTask] = useAtom(selectedTaskAtom)
  const [, setShowConfirmTaskSelesai] = useAtom(showConfirmSelesaiTaskAtom)

  let sorted = [...tasksData].sort((a, b) => (new Date(a.date) - new Date(b.date)))
  sorted = sorted.filter(t =>
    (filterSelesai !== 'Semua' ? (t.status_selesai === filterSelesai) : t)
  )
  let curDate = ''
  let dates = ['null']
  sorted.forEach(e => {
    if (e.date && !dates.includes(e.date)) {
      curDate = e.date
      dates.push(e.date)
    }
  })

  return (
    <div className='px-3 relative pt-5'>
      <div className='flex text-center gap-5 px-2 font-bold text-sm text-coklat-tua'>
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
      <div className='mt-3 text-sm flex flex-col gap-2 overflow-auto h-gede-pisan'>
        <div>
          {/* {tasksData && tasksData.map(task => (
            <div key={task._id} className='bg-white py-4 px-3 drop-shadow-md'>{task.title}</div>
          ))} */}
          {dates.map((e, i) => (
            <div key={i} className='mb-3 pb-1 font-semibold text-coklat-tua w-full'>
              <div className='border-b-1 border-coklat-tua mb-2'>
                {(e === 'null') ? 'Tanpa tanggal' : dateFormat(e, "dddd, d mmmm yyyy")}
              </div>
              <div className='flex flex-col gap-2'>
                {sorted
                  .filter(t => {
                    if (e === 'null') {
                      return !t.date
                    }
                    return t.date === e
                  })
                  .map(t => (
                    <Link key={t._id} to={'/tasks/detail/' + t._id}>
                      <div className='bg-white py-2 px-3 drop-shadow-md flex justify-between items-center border-1 border-black/30 rounded-md'>
                        <p className='font-normal text-black'>{t.title}</p>
                        <p onClick={() => { setShowConfirmTaskSelesai(true); setSelectedTask(t) }} className={t.status_selesai === 'Belum' ? 'bg-red-300 rounded-lg text-white py-1 px-2' : 'bg-green-300 rounded-lg text-white py-1 px-2'}>{t.status_selesai}</p>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          ))}
        </div>
        <div className='mb-20'></div>
      </div>
      <BottomBar />
    </div>
  )
}
