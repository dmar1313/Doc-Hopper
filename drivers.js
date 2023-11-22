import { db, handleFirebaseRequest } from './firebase.js'
import { Router } from 'express'
const router = Router()
router.get('/', (req, res) => { handleFirebaseRequest(req, res, '/drivers') })

// Create a new driver
router.post('/', (req, res) => {
  // Ensure the request body contains a newDriver object and a role
  if (!req.body || typeof req.body !== 'object' || !req.body.newDriver || !req.body.role) {
    return res.status(400).json({ message: 'Invalid driver data' })
  }

  const newDriver = { ...req.body.newDriver, role: req.body.role }

  // Logic to add the new driver to the database
  const driverRef = db.ref('/drivers').push()
  driverRef.set(newDriver)
    .then(() => res.status(201).json(driverRef.key))
    .catch(error => {
      // If the write operation was not successful, it might be due to the database rules
      console.error('Failed to add driver. Please check your Firebase database rules.')
      res.status(500).json({ message: 'Failed to add driver. Please check your Firebase database rules.' })
    })
})

// Update an existing driver
router.put('/:id', (req, res) => {
  const id = req.params.id
  const updatedDriver = req.body
  // Logic to update the driver with the given ID in the database
  db.ref(`drivers/${id}`).update(updatedDriver)
    .then(() => res.json(updatedDriver))
    .catch(error => {
      // If the write operation was not successful, it might be due to the database rules
      console.error('Failed to update driver. Please check your Firebase database rules.')
      res.status(500).json({ message: 'Failed to update driver. Please check your Firebase database rules.' })
    })
})

// Delete an existing driver
router.delete('/:id', (req, res) => {
  const id = req.params.id
  // Logic to delete the driver with the given ID from the database
  db.ref(`drivers/${id}`).remove()
    .then(() => res.json({ message: 'Driver deleted' }))
    .catch(error => {
      // If the write operation was not successful, it might be due to the database rules
      console.error('Failed to delete driver. Please check your Firebase database rules.')
      res.status(500).json({ message: 'Failed to delete driver. Please check your Firebase database rules.' })
    })
})
export default router
