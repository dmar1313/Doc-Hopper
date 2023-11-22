import React from 'react'

const TripList = ({ trips }) => {
  return (
    <ul>
      {trips.map((trip, index) => (
        <li key={index}>{trip.destination}</li>
      ))}
    </ul>
  )
}

export default TripList
