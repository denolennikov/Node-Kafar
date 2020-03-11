const mongoose = require('mongoose')

const vehicleSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: false,
    required: true
  },
  oem: {
    type: String,
    unique: false,
    required: true
  },
  make: {
    type: String,
    unique: false,
    required: true
  },
  model: {
    type: String,
    unique: false,
    required: true
  },
  trim: {
    type: String,
    unique: false,
    required: true
  },
  year: {
    type: Number
  },
  bodyStyle: {
    type: String,
    unique: false,
    required: true
  }
})

module.exports = mongoose.model('Vehicle', vehicleSchema)