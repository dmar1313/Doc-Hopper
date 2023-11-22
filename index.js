import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import multer from 'multer'
import csv from 'csvtojson'
import { db } from './firebase.js'
import tripImportRouter from './TripImportController.js'

// Initialize Express app
const app = express()

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors())

// Parse incoming request bodies in a middleware before your handlers
app.use(bodyParser.json())

// Set up headers for CORS
app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
})

// Set up multer storage for uploading files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.csv')
  }
})

// Initialize multer with the defined storage
const upload = multer({ storage })

// Use tripImportRouter for the path '/trip-import'
app.use('/trip-import', tripImportRouter)

// Handle POST request for file upload
app.post('/upload', upload.single('tripFile'), (req, res) => {
  const file = req.file
  // Add your file validation logic here

  // Convert CSV file to JSON
  csv()
    .fromFile(file.path)
    .then(data => {
      // Validate data
      // Add your data validation logic here

      // Insert trips into the database
      // Add your database insertion logic here

      res.send('File uploaded and processed successfully')
    })
    .catch(err => {
      console.error(err)
      res.status(500).send('Error parsing CSV file')
    })
})

// Handle GET request for Server-Sent Events
app.get('/sse', (req, res) => {
  res.header('Content-Type', 'text/event-stream')
  res.header('Cache-Control', 'no-cache')
  res.header('Connection', 'keep-alive')

  const dbRef = db.ref('/')
  const paths = ['/users', '/drivers', '/trips']

  paths.forEach(path => {
    dbRef.child(path).on('value', snapshot => {
      const data = snapshot.val()

      res.write(`data: ${JSON.stringify(data)}\n\n`)
    }, error => {
      console.error(error)
      res.status(500).send('Something went wrong!')
    })
  })

  req.on('close', () => {
    paths.forEach(path => {
      dbRef.child(path).off()
    })
    res.end()
  })
})

// Set up server to listen on a specific port
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
