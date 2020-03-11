const express = require('express')
const router = express.Router()
const Vehicle = require('../models/vehicle')

// Getting all subscribers
router.get('/', async (req, res) => {
  try {
    const vehicles = await Vehicle.find()
    res.json(vehicles)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Creating one vehicle
router.post('/', async (req, res) => {
  const vehicle = new Vehicle({
    name: req.body.name,
    oem: req.body.oem,
    make: req.body.make,
    model: req.body.model,
    trim: req.body.trim,
    year: req.body.year,
    bodyStyle: req.body.bodyStyle,
  })

  try {
    const newVehicle = await vehicle.save()
    res.status(201).json(newVehicle)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Getting one vehicle
router.get('/:id', getVehicle, (req, res) => {
  res.json(res.vehicle)
})

// Updating one vehicle
router.put('/:id', getVehicle, async (req, res) => {
  if (req.body.name != null) {
    res.vehicle.name = req.body.name
  }

  if (req.body.oem != null) {
    res.vehicle.oem = req.body.oem
  }
  
  if (req.body.make != null) {
    res.vehicle.make = req.body.make
  }

  if (req.body.model != null) {
    res.vehicle.model = req.body.model
  }

  if (req.body.trim != null) {
    res.vehicle.trim = req.body.trim
  }

  if (req.body.year != null) {
    res.vehicle.year = req.body.year
  }

  if (req.body.bodyStyle != null) {
    res.vehicle.bodyStyle = req.body.bodyStyle
  }

  try {
    const updatedVehicle = await res.vehicle.save()
    res.json(updatedVehicle)
  } catch {
    res.status(400).json({ message: err.message })
  }

})
// Deleting one vehicle
router.delete('/:id', getVehicle, async (req, res) => {
  try {
    await res.vehicle.remove()
    res.json({ message: 'Deleted This Vehicle' })
  } catch(err) {
    res.status(500).json({ message: err.message })
  }
})

// Middleware function for gettig vehicle object by ID
async function getVehicle(req, res, next) {
  try {
    vehicle = await Vehicle.findById(req.params.id)
    if (vehicle == null) {
      return res.status(404).json({ message: 'Cant find vehicle'})
    }
  } catch(err){
    return res.status(500).json({ message: err.message })
  }
  
  res.vehicle = vehicle
  next()
}

module.exports = router 