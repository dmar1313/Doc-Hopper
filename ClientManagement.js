const express = require('express')
const router = express.Router()

router.post('/client', (req, res) => {
  // Code to create a client
})

router.get('/client/:id', (req, res) => {
  // Code to read a client
})

router.put('/client/:id', (req, res) => {
  // Code to update a client
})

router.delete('/client/:id', (req, res) => {
  // Code to delete a client
})

module.exports = router
