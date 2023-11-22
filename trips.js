import express from 'express'
import { db } from './firebase.js'
const router = express.Router()

router.get('/api/trips', (req, res) => {
  res.json(db.ref('/trips').once('value'))
})

// Create a new trip
router.post('/api/trips', (req, res) => {
  const newTrip = req.body
  db.ref('/trips').push(newTrip)
  res.status(201).json(newTrip)
})

// Update an existing trip
router.put('/api/trips/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const updatedTrip = req.body
  db.ref('/trips/' + id).set(updatedTrip)
  res.json(updatedTrip)
})

// Delete an existing trip
router.delete('/api/trips/:id', (req, res) => {
  const id = parseInt(req.params.id) // Define 'id' here
  db.ref('/trips/' + id).remove()
  res.json({ message: 'Trip deleted' })
})

// Export the current list of trips
router.get('/export', (req, res) => {
  res.json(db.ref('/trips').once('value'))
})

// Assign a driver to a trip
router.put('/api/trips/assign', (req, res) => {
  const { tripId, driverId } = req.body
  db.ref('/trips/' + tripId).update({ driverId })
    .then(() => res.json({ message: 'Trip assigned' }))
    .catch(error => res.status(500).json({ error: error.message }))
})

export default router
// Assign a driver to a trip
router.put('/api/trips/assign', (req, res) => {
  const { tripId, driverId } = req.body
  db.ref('/trips/' + tripId).update({ driverId })
    .then(() => res.json({ message: 'Trip assigned' }))
    .catch(error => res.status(500).json({ error: error.message }))
})
