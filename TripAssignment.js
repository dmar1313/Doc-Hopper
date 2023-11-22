import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { useDriverAppContext } from './DriverApp.js' // Assuming DriverApp context is exported
import { fetchDriverTrips } from './ApiUtils.js' // Import the new function

const TripAssignment = ({ driverId }) => {
  const [trips, setTrips] = useState([])
  const { setCurrentTrip } = useDriverAppContext() // Assuming setCurrentTrip is a function provided by DriverApp context
  const history = useHistory()

  useEffect(() => {
    // Determine which API call to make based on the presence of driverId
    if (driverId) {
      fetchDriverTrips(driverId).then(setTrips)
    } else {
      axios.get('/api/trips') // Replace with actual API endpoint
        .then(response => {
          setTrips(response.data)
        })
        .catch(error => {
          console.error('Error fetching trips', error)
        })
    }
  }, [driverId])

  const markTripAsCompleted = (tripId) => {
    axios.put(`/api/trips/${tripId}/complete`)
      .then(response => {
        setTrips(trips.filter(trip => trip.id !== tripId))
      })
      .catch(error => {
        console.error('Error marking trip as completed', error)
      })
  }

  const startTrip = (trip) => {
    const startTrip = (trip) => {
      setCurrentTrip(trip)
      history.push('/navigation')
    }
    history.push('/navigation')
  }

  return (
    <div>
      <h2>Your Assigned Trips</h2>
      <ul>
        {trips.map((trip) => (
          <li key={trip.id}>
                        Pickup: {trip.pickup},
            {trip.pickupCoords && <a href={`geo:${trip.pickupCoords.lat},${trip.pickupCoords.lon}?q=${trip.pickup}`}>Navigate to Pickup</a>},
                        Dropoff: {trip.dropoff},
            {trip.dropoffCoords && <a href={`geo:${trip.dropoffCoords.lat},${trip.dropoffCoords.lon}?q=${trip.dropoff}`}>Navigate to Dropoff</a>},
                        Time: {trip.time}
            {setCurrentTrip && <button onClick={() => startTrip(trip)}>Start Trip</button>}
            <button onClick={() => markTripAsCompleted(trip.id)}>Mark as Completed</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TripAssignment
