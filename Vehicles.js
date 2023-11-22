import express from 'express'
import path from 'path'
import admin from 'firebase-admin'
import { db } from './firebase.js'

const onVehicleAdded = (newVehicle) => {
  // Function logic here
}

const addVehicle = async () => {
  // Add vehicle logic here
  onVehicleAdded(newVehicle)
}
const router = express.Router() // Initialize router

// Get a list of vehicles
router.get('/', async (req, res) => {
  const vehicles = await db.query('SELECT * FROM vehicles')
  res.json(vehicles)
})

// Create a new vehicle
router.post('/', async (req, res) => {
  const newVehicle = req.body
  await db.query('INSERT INTO vehicles SET ?', newVehicle)
  res.status(201).json(newVehicle)
})

// Update an existing vehicle
router.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  const updatedVehicle = req.body
  await db.query('UPDATE vehicles SET ? WHERE id = ?', [updatedVehicle, id])
  res.json(updatedVehicle)
})

// Delete an existing vehicle
router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  await db.query('DELETE FROM vehicles WHERE id = ?', id)
  res.json({ message: 'Vehicle deleted' })
})

export default router
