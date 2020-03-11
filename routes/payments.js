const express = require('express')
const router = express.Router()
const Payment = require('../models/payment')

// Getting all subscribers
router.get('/', async (req, res) => {
  try {
    const payments = await Payment.find()
    res.json(payments)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Creating one payment
router.post('/', async (req, res) => {
  const payment = new Payment({
    termInterval: req.body.termInterval,
    amount: req.body.amount
  })

  try {
    const newPayment = await payment.save()
    res.status(201).json(newPayment)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Getting one payment
router.get('/:id', getPayment, (req, res) => {
  res.json(res.payment)
})

// Updating one payment
router.put('/:id', getPayment, async (req, res) => {
  if (req.body.termInterval != null) {
    res.payment.termInterval = req.body.termInterval
  }

  if (req.body.amount != null) {
    res.payment.amount = req.body.amount
  }
  try {
    const updatedPayment = await res.payment.save()
    res.json(updatedPayment)
  } catch(err) {
    res.status(400).json({ message: err.message })
  }

})
// Deleting one payment
router.delete('/:id', getPayment, async (req, res) => {
  try {
    await res.payment.remove()
    res.json({ message: 'Deleted This Payment' })
  } catch(err) {
    res.status(500).json({ message: err.message })
  }
})

// Middleware function for gettig payment object by ID
async function getPayment(req, res, next) {
  try {
    payment = await Payment.findById(req.params.id)
    if (payment == null) {
      return res.status(404).json({ message: 'Cant find payment'})
    }
  } catch(err){
    return res.status(500).json({ message: err.message })
  }
  
  res.payment = payment
  next()
}

module.exports = router 