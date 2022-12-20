const Task = require('../models/taskModel')
const mongoose = require('mongoose')

// get all tasks
const getTasks = async (req, res) => {
  const user_id = req.user._id

  const tasks = await Task.find({ user_id })

  res.status(200).json(tasks)
}

// get a single task
const getTask = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Task tidak ditemukan' })
  }

  const task = await Task.findById(id)

  if (!task) {
    return res.status(404).json({ error: 'Task tidak ditemukan' })
  }

  res.status(200).json(task)
}

// create new task
const createTask = async (req, res) => {
  const { title, date, sectionTitle, deskripsi, status_selesai } = req.body

  let emptyFields = []
  if (!title) {
    emptyFields.push('title')
  }
  if (!date) {
    emptyFields.push('date')
  }
  if (!sectionTitle) {
    emptyFields.push('sectionTitle')
  }
  if (!deskripsi) {
    emptyFields.push('deskripsi')
  }
  if (!status_selesai) {
    emptyFields.push('deskripsi')
  }
  // if (emptyFields.length > 0) {
  //   return res.status(400).json({ error: 'Silakan isi field yang kosong', emptyFields })
  // }
  if (emptyFields.includes('title') || emptyFields.includes('section')) {
    return res.status(400).json({ error: 'Silakan isi field "Judul" dan "Tambahkan ke"', emptyFields })
  }

  // add doc to db
  try {
    const user_id = req.user._id
    const task = await Task.create({ title, date, sectionTitle, deskripsi, status_selesai, user_id })
    res.status(200).json(task)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a task
const deleteTask = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Task tidak ditemukan' })
  }

  const task = await Task.findOneAndDelete({ _id: id })

  if (!task) {
    return res.status(400).json({ error: 'Task tidak ditemukan' })
  }

  res.status(200).json(task)
}

// update a task
const updateTask = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Task tidak ditemukan' })
  }

  const task = await Task.findOneAndUpdate({ _id: id }, {
    ...req.body
  })

  if (!task) {
    return res.status(400).json({ error: 'Task tidak ditemukan' })
  }

  res.status(200).json(task)
}

// delete tasks
const deleteTasks = async (req, res) => {
  const { sectionTitle } = req.params

  const tasks = await Task.deleteMany({ sectionTitle })

  res.status(200).json(tasks)
}

module.exports = {
  getTasks,
  getTask,
  createTask,
  deleteTask,
  updateTask,
  deleteTasks
}