import axios from 'axios'

<button onClick={async () => {
  const tripId = 'someTripId' // Replace with actual trip ID
  const driverId = 'someDriverId' // Replace with actual driver ID

  try {
    await axios.post('/api/trips/assign', { tripId, driverId })
    alert('Trip assigned successfully!')
  } catch (error) {
    console.error('Error assigning trip', error)
    alert('Error assigning trip')
  }
}}>
  Assign Trips
</button>
