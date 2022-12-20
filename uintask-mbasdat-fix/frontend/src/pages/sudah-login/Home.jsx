import { useAtom } from 'jotai'
import React, { useEffect } from 'react'
import AddSection from '../../components/section/AddSection'
import AddTask from '../../components/task/AddTask'
import ConfirmLogout from '../../components/ConfirmLogout'
import EditSection from '../../components/section/EditSection'
import SectionHome from '../../components/SectionHome'
import SectionsMenu from '../../components/section/SectionsMenu'
import TimelineHome from '../../components/TimelineHome'
import UserInfo from '../../components/UserInfo'
import { addSectionWindowAtom, addTaskWindowAtom, deleteSectionWindowAtom, editSectionWindowAtom, homeAtom, sectionsDataAtom, showConfirmLogoutAtom, showConfirmSelesaiTaskAtom, showUserInfoAtom, userDataAtom } from '../../state/kumpulanAtom'
import { sectionsAtom, tasksDataAtom } from '../../state/kumpulanAtom'
import DeleteSection from '../../components/section/DeleteSection'
import ConfirmTaskSelesai from '../../components/ConfirmTaskSelesai'

export default function Home() {

  const [modeRumah] = useAtom(homeAtom)
  const [sections] = useAtom(sectionsAtom)

  // task
  const [addTaskWindow] = useAtom(addTaskWindowAtom)
  const [confirmSelesaiTaskWindow] = useAtom(showConfirmSelesaiTaskAtom)

  // section
  const [addSectionWindow] = useAtom(addSectionWindowAtom)
  const [editSectionWindow] = useAtom(editSectionWindowAtom)
  const [deleteSectionWindow] = useAtom(deleteSectionWindowAtom)
  const [showUserInfo] = useAtom(showUserInfoAtom)
  const [showConfirmLogout] = useAtom(showConfirmLogoutAtom)

  const [tasksData, setTasksData] = useAtom(tasksDataAtom)
  const [, setSectionsData] = useAtom(sectionsDataAtom)
  const [user,] = useAtom(userDataAtom)

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch('/api/tasks', {
        headers: { 'Authorization': `Bearer ${user.token}` },
      })
      const json = await response.json()

      if (response.ok) {
        // dispatch({ type: 'SET_WORKOUTS', payload: json })
        setTasksData(json)
      }
    }

    const fetchSections = async () => {
      const response = await fetch('/api/sections', {
        headers: { 'Authorization': `Bearer ${user.token}` },
      })
      const json = await response.json()

      if (response.ok) {
        // dispatch({ type: 'SET_WORKOUTS', payload: json })
        setSectionsData(json)
      }
    }

    if (user) {
      fetchTasks()
      fetchSections()
    }
  }, [])

  return (
    <div className='relative'>
      {confirmSelesaiTaskWindow && <ConfirmTaskSelesai />}
      {deleteSectionWindow && <DeleteSection />}
      {editSectionWindow && <EditSection />}
      {addSectionWindow && <AddSection />}
      {showConfirmLogout && <ConfirmLogout />}
      {showUserInfo && <UserInfo />}
      {(modeRumah === 'section' && tasksData) && <SectionHome />}
      {(modeRumah === 'timeline') && <TimelineHome />}
      {sections && <SectionsMenu />}
      {addTaskWindow && <AddTask />}
    </div>
  )
}
