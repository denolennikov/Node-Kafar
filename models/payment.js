const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({
  termInterval: {
    type: String,
    unique: false,
    required: true
  },
  amount: {
    type: Number
  }
})

module.exports = mongoose.model('Payment', paymentSchema)