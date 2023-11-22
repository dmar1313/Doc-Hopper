import express from 'express'
import admin from 'firebase-admin'
import serviceAccountString from './serviceAccountKey.js'

const serviceAccount = (serviceAccountString)
// Initialize the Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://Doc-Hopper-default-rtdb.firebaseio.com'
})

const app = express()
const db = admin.database()

app.get('/data/:path', async (req, res) => {
  const path = req.params.path
  try {
    const result = await db.ref(path).once('value')
    res.json(result.val())
  } catch (error) {
    console.error('Firebase request handling error:', error)
    res.status(500).send(error)
  }
})

// Middleware to parse JSON bodies
app.use(express.json())

// Async function to handle Firebase requests
async function handleFirebaseRequest (req, res, path) {
  try {
    const result = await db.ref(path).once('value')
    res.json(result.val())
  } catch (error) {
    console.error('Firebase request handling error:', error)
    res.status(500).send(error)
  }
}

// Define a route that uses the handleFirebaseRequest function
app.get('/data/:path', (req, res) => {
  const path = req.params.path
  handleFirebaseRequest(req, res, path)
})

// Start the server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

// If you plan to use db elsewhere, export it
export { db, handleFirebaseRequest }
