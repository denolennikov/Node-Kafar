const mongoose = require('mongoose')

const disclaimerSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: false,
    required: true
  },
  body: {
    type: String,
    unique: false,
    required: true
  }
})

module.exports = mongoose.model('Disclaimer', disclaimerSchema)