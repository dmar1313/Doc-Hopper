import express from 'express'
import { handleFirebaseRequest } from './firebase.js'

const router = express.Router()

// Mock data for clients (replace with database queries)
const clients = [
  { id: 1, name: 'Client 1', phoneNumber: '123-456-7890' },
  { id: 2, name: 'Client 2', phoneNumber: '987-654-3210' }
]

// Get a list of clients
router.get('/', (req, res) => {
  router.get('/', (req, res) => { handleFirebaseRequest(req, res, '/clients') })
})

// Create a new client
router.post('/', (req, res) => {
  const newClient = req.body
  // Logic to add the new client to your database or data storage
  clients.push(newClient)
  res.status(201).json(newClient)
})

// Update an existing client
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const updatedClient = req.body
  // Logic to update the client with the given ID in your database
  const index = clients.findIndex(client => client.id === id)
  if (index !== -1) {
    clients[index] = updatedClient
    res.json(updatedClient)
  } else {
    res.status(404).json({ message: 'Client not found' })
  }
})

// Delete an existing client
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id)
  // Logic to delete the client with the given ID from your database
  const index = clients.findIndex(client => client.id === id)
  if (index !== -1) {
    clients.splice(index, 1)
    res.json({ message: 'Client deleted' })
  } else {
    res.status(404).json({ message: 'Client not found' })
  }
})

export default router
