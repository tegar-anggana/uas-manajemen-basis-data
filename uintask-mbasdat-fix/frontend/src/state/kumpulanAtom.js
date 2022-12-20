import { atom } from 'jotai'

export const homeAtom = atom('section')
export const sectionsAtom = atom(false)

export const addTaskWindowAtom = atom(false)
export const editTaskWindowAtom = atom(false)
export const deleteTaskWindowAtom = atom(false)

export const addSectionWindowAtom = atom(false)
export const editSectionWindowAtom = atom(false)
export const deleteSectionWindowAtom = atom(false)

export const showUserInfoAtom = atom(false)
export const showConfirmLogoutAtom = atom(false)
export const showConfirmSelesaiTaskAtom = atom(false)

export const selectedSectionAtom = atom(null)
export const selectedTaskAtom = atom(null)

export const tasksDataAtom = atom([])
export const sectionsDataAtom = atom([])



let userData = null
const userFromLocalStorage = JSON.parse(localStorage.getItem('user'))
if (userFromLocalStorage) {
  userData = userFromLocalStorage
}

export const userDataAtom = atom(userData)