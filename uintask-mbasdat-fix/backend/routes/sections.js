const express = require('express')
const {
  createSection,
  getSections,
  getSection,
  deleteSection,
  updateSection
} = require('../controllers/sectionController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all section routes
router.use(requireAuth)

// GET all sections
router.get('/', getSections)

//GET a single section
router.get('/:id', getSection)

// POST a new section
router.post('/', createSection)

// DELETE a section
router.delete('/:id', deleteSection)

// UPDATE a section
router.patch('/:id', updateSection)


module.exports = router