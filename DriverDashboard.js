import React from 'react'

const DriverDashboard = ({ assignedTrips, navigationOptions }) => {
  return (
    <div>
      <h1>Driver Dashboard</h1>
      <p>Here you can see your assigned trips and navigation options.</p>
      <div className='assigned-trips'>
        <h2>Assigned Trips</h2>
        {assignedTrips.map(trip => <p key={trip.id}>{trip.name}</p>)}
      </div>
      <div className='navigation-options'>
        <h2>Navigation Options</h2>
        {navigationOptions.map(option => <p key={option.id}>{option.name}</p>)}
      </div>
    </div>
  )
}

export default DriverDashboard
