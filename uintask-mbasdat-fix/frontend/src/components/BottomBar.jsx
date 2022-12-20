import { useAtom } from 'jotai'
import React from 'react'
import { addTaskWindowAtom, homeAtom } from '../state/kumpulanAtom'

export default function BottomBar() {

  const clock = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" />
  </svg>

  const plus = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
    <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
  </svg>

  const section = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
    <path fillRule="evenodd" d="M7.502 6h7.128A3.375 3.375 0 0118 9.375v9.375a3 3 0 003-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 00-.673-.05A3 3 0 0015 1.5h-1.5a3 3 0 00-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6zM13.5 3A1.5 1.5 0 0012 4.5h4.5A1.5 1.5 0 0015 3h-1.5z" clipRule="evenodd" />
    <path fillRule="evenodd" d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V9.375zM6 12a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V12zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM6 15a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V15zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM6 18a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V18zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75z" clipRule="evenodd" />
  </svg>

  const [modeRumah, setModeRumah] = useAtom(homeAtom)
  const [addTaskWindow, setAddTaskWindow] = useAtom(addTaskWindowAtom)

  const ubahKeTimeline = () => {
    setModeRumah('timeline')
  }

  const ubahKeSection = () => {
    setModeRumah('section')
  }

  const bukaAddTask = () => {
    setAddTaskWindow(true)
  }

  const buttonModeBaseStyle = 'block py-2 px-3 border-b-4 border-coklat-muda'
  const buttonModeActiveStyle = 'block py-2 px-3 border-b-4 border-white'
  const sectionButtonStyle = (modeRumah === 'section') ? buttonModeActiveStyle : buttonModeBaseStyle
  const timelineButtonStyle = (modeRumah === 'timeline') ? buttonModeActiveStyle : buttonModeBaseStyle

  return (
    <div className='fixed bottom-0 left-0 right-0 flex justify-around items-center bg-coklat-muda h-fit text-white'>
      <button onClick={ubahKeTimeline} className={timelineButtonStyle}>
        {clock}
      </button>
      <button onClick={bukaAddTask} className='block p-1 my-2 bg-white text-coklat-muda drop-shadow-md'>
        {plus}
      </button>
      <button onClick={ubahKeSection} className={sectionButtonStyle}>
        {section}
      </button>
    </div>
  )
}
