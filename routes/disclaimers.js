const express = require('express')
const router = express.Router()
const Disclaimer = require('../models/disclaimer')

// Getting all subscribers
router.get('/', async (req, res) => {
  try {
    const disclaimers = await Disclaimer.find()
    res.json(disclaimers)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Creating one disclaimer
router.post('/', async (req, res) => {
  const disclaimer = new Disclaimer({
    title: req.body.title,
    body: req.body.body
  })

  try {
    const newDisclaimer = await disclaimer.save()
    res.status(201).json(newDisclaimer)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Getting one disclaimer
router.get('/:id', getDisclaimer, (req, res) => {
  res.json(res.disclaimer)
})

// Updating one disclaimer
router.put('/:id', getDisclaimer, async (req, res) => {
  if (req.body.title != null) {
    res.disclaimer.title = req.body.title
  }

  if (req.body.body != null) {
    res.disclaimer.body = req.body.body
  }
  try {
    const updatedDisclaimer = await res.disclaimer.save()
    res.json(updatedDisclaimer)
  } catch {
    res.status(400).json({ message: err.message })
  }

})
// Deleting one disclaimer
router.delete('/:id', getDisclaimer, async (req, res) => {
  try {
    await res.disclaimer.remove()
    res.json({ message: 'Deleted This Disclaimer' })
  } catch(err) {
    res.status(500).json({ message: err.message })
  }
})

// Middleware function for gettig disclaimer object by ID
async function getDisclaimer(req, res, next) {
  try {
    disclaimer = await Disclaimer.findById(req.params.id)
    if (disclaimer == null) {
      return res.status(404).json({ message: 'Cant find disclaimer'})
    }
  } catch(err){
    return res.status(500).json({ message: err.message })
  }
  
  res.disclaimer = disclaimer
  next()
}

module.exports = router 