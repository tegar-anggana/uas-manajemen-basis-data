const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})

// static signup method
userSchema.statics.signup = async function (email, password) {

  // validation
  if (!email || !password) {
    throw Error('Silakan isi semua field')
  }
  if (!validator.isEmail(email)) {
    throw Error('Email tidak valid')
  }
  if (!validator.isStrongPassword(password, { minLength: 8, minLowercase: 0, minUppercase: 0, minNumbers: 0, minSymbols: 0 })) {
    throw Error('Password tidak cukup kuat, gunakan minimal 8 karakter')
  }

  const exists = await this.findOne({ email })

  if (exists) {
    throw Error('Email sudah digunakan')
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const user = await this.create({ email, password: hash })

  return user
}

// static login method
userSchema.statics.login = async function (email, password) {

  if (!email || !password) {
    throw Error('Silakan isi semua field')
  }

  const user = await this.findOne({ email })
  if (!user) {
    throw Error('Email salah')
  }

  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw Error('Password salah')
  }

  return user
}

module.exports = mongoose.model('User', userSchema)