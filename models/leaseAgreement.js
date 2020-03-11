const mongoose = require('mongoose')

const leaseAgreementSchema = new mongoose.Schema({
  term: {
    type: String,
    unique: false,
    required: true
  },
  termLength: {
    type: Number
  }

})

module.exports = mongoose.model('LeaseAgreement', leaseAgreementSchema)