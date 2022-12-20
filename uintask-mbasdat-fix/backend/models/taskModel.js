const mongoose = require('mongoose')

const Schema = mongoose.Schema

const taskSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
  },
  sectionTitle: {
    type: String
  },
  deskripsi: {
    type: String
  },
  status_selesai: {
    type: String
  },
  user_id: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Task', taskSchema)