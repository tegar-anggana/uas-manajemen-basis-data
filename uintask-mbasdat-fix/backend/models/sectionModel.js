const mongoose = require('mongoose')

const Schema = mongoose.Schema

const sectionSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  favorit: {
    type: Boolean
  },
  user_id: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Section', sectionSchema)