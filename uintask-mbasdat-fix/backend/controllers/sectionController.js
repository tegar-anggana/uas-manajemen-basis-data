const Section = require('../models/sectionModel')
const mongoose = require('mongoose')

// get all sections
const getSections = async (req, res) => {
  const user_id = req.user._id

  const sections = await Section.find({ user_id })

  res.status(200).json(sections)
}

// get a single section
const getSection = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Section tidak ditemukan' })
  }

  const section = await Section.findById(id)

  if (!section) {
    return res.status(404).json({ error: 'Section tidak ditemukan' })
  }

  res.status(200).json(section)
}


// create new section
const createSection = async (req, res) => {
  const { title } = req.body

  let emptyFields = []

  if (!title) {
    emptyFields.push('title')
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Silakan isi nama section', emptyFields })
  }

  // add doc to db
  try {
    const user_id = req.user._id
    const section = await Section.create({ title, user_id })
    res.status(200).json(section)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a section
const deleteSection = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Section tidak ditemukan' })
  }

  const section = await Section.findOneAndDelete({ _id: id })

  if (!section) {
    return res.status(400).json({ error: 'Section tidak ditemukan' })
  }

  res.status(200).json(section)
}

// update a section
const updateSection = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Section tidak ditemukan' })
  }

  const section = await Section.findOneAndUpdate({ _id: id }, {
    ...req.body
  })

  if (!section) {
    return res.status(400).json({ error: 'Section tidak ditemukan' })
  }

  res.status(200).json(section)
}


module.exports = {
  getSections,
  getSection,
  createSection,
  deleteSection,
  updateSection
}