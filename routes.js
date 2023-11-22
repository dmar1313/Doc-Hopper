import multer from 'multer'
import path from 'path'

import express from 'express'
import Trip from './models/Trip'

import { handleFile, handleExport, validateRow, convertRowToJSON } from './TripImportController.js'
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({ storage })

const fileUpload = (req, res, next) => {
  if (!req.file || path.extname(req.file.originalname) !== '.csv') {
    return res.status(400).json({ error: 'Invalid file format. Only .csv files are allowed.' })
  }
  next()
}

const validateFileUpload = (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' })
  }
  next()
}

const router = express.Router()

handleFile
handleExport
validateRow
convertRowToJSON
// Route for file upload
router.post('/upload', fileUpload, validateFileUpload, upload.single('tripFile'), handleFile)
router.post('/upload', fileUpload, validateFileUpload, upload.single('tripFile'), handleFile)
router.get('/trips', async (req, res) => {
  const trips = await Trip.find({})
  res.json(trips)
})

router.post('/trips', async (req, res) => {
  const newTrip = new Trip(req.body)
  await newTrip.save()
  res.json(newTrip)
})

export default router
