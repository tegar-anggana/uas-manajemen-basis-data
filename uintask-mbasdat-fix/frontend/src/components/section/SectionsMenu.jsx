import { useAtom } from 'jotai'
import { addSectionWindowAtom, deleteSectionWindowAtom, editSectionWindowAtom, sectionsAtom, sectionsDataAtom, selectedSectionAtom } from '../../state/kumpulanAtom'

export default function SectionsMenu() {
  const close = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
  </svg>

  const edit = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
    <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
    <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
  </svg>

  const trash = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
  </svg>

  const selected = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 block text-coklat-tua">
    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm6-2.438c0-.724.588-1.312 1.313-1.312h4.874c.725 0 1.313.588 1.313 1.313v4.874c0 .725-.588 1.313-1.313 1.313H9.564a1.312 1.312 0 01-1.313-1.313V9.564z" clipRule="evenodd" />
  </svg>

  const [, setShowSection] = useAtom(sectionsAtom)
  const [sectionsData] = useAtom(sectionsDataAtom)
  const [, setShowAddSection] = useAtom(addSectionWindowAtom)
  const [, setShowEditSection] = useAtom(editSectionWindowAtom)
  const [, setShowDeleteSection] = useAtom(deleteSectionWindowAtom)
  const [selectedSection, setSelectedSection] = useAtom(selectedSectionAtom)

  const sortedSections = [...sectionsData].sort((a, b) => a.title - b.title)

  return (
    <div className='fixed inset-0 z-10 bg-black/40 p-2 border-2 border-black'>
      <div className='bg-white h-full flex flex-col justify-between'>
        <div>
          <div className='mx-2 flex items-center justify-center font-bold text-lg relative border-b-1 border-black'>
            <h1 className='py-3'>Section</h1>
            <button onClick={() => setShowSection(false)} className='p-1 border-2 border-black rounded-md absolute right-0'>
              {close}
            </button>
          </div>
          {/* Section Lists */}
          <div className='overflow-auto max-h-96 mt-4 mx-5 font-semibold'>
            <div className='flex flex-col'>
              <div onClick={() => { setSelectedSection(null); setShowSection(false) }} className='flex justify-between py-3'>
                <p>Semua</p>
                {(!selectedSection && selected)}
              </div>
              {sectionsData && sortedSections.map(s => (
                <div key={s._id} onClick={() => { setSelectedSection(s); setShowSection(false) }} className='flex justify-between py-3'>
                  <p>{s.title}</p>
                  {selectedSection ? (selectedSection._id === s._id && selected) : ''}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='mb-2 flex justify-evenly items-center h-fit text-black'>
          <button onClick={() => setShowEditSection(true)} className='p-2'>
            {selectedSection && edit}
          </button>
          <button onClick={() => setShowAddSection(true)} className='block p-1 my-2 border-2 border-black bg-white text-black drop-shadow-md'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
              <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
            </svg>
          </button>
          <button onClick={() => setShowDeleteSection(true)} className='p-2'>
            {selectedSection && trash}
          </button>
        </div>
      </div>
    </div>
  )
}