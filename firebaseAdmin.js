import admin from 'firebase-admin'

const serviceAccount = require('./serviceAccountKey.json')

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  })
} catch (error) {
  console.error('Failed to initialize Firebase Admin SDK:', error)
}

export const adminDb = admin.firestore()
