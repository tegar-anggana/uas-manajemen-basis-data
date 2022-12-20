import { useAtom } from 'jotai'
import { sectionsDataAtom, tasksDataAtom, userDataAtom } from '../state/kumpulanAtom'

export const useLogout = () => {
  const [, setUser] = useAtom(userDataAtom)
  const [, setTasksData] = useAtom(tasksDataAtom)
  const [, setSectionsData] = useAtom(sectionsDataAtom)

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    setUser(null)
    setTasksData(null)
    setSectionsData(null)
  }

  return { logout }
}