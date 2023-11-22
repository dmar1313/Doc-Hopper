/* eslint-disable react/no-unknown-property */
import React from 'react'
import PropTypes from 'prop-types'

const DriverTripAssignment = ({ drivers, trips }) => {
  const renderDrivers = () => {
    return drivers.map(driver => {
      return (
        <driver key={driver.id} driver={driver} />
      )
    })
  }

  const renderTrips = () => {
    return trips.map(trip => {
      return (
        <trip key={trip.id} trip={trip} />
      )
    })
  }

  return (
    <div>
      <h1>Driver Trip Assignment</h1>
      {renderDrivers()}
      {renderTrips()}
    </div>
  )
}

DriverTripAssignment.propTypes = {
  drivers: PropTypes.array.isRequired,
  trips: PropTypes.array.isRequired
}

export default DriverTripAssignment
