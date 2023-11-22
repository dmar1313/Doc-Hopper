// Import necessary libraries
import React, { useState, useEffect } from 'react'
import { Button } from 'react-native'

// Import API utilities
import ApiUtils from './ApiUtils.js'

// Define the NavigationScreen component
const NavigationScreen = () => {
  // Define state variables
  const [trip, setTrip] = useState({})
  const [status, setStatus] = useState('')

  // Fetch the current trip details when the component mounts
  useEffect(() => {
    ApiUtils.getCurrentTrip()
      .then(data => setTrip(data))
      .catch(error => console.error(error))
  }, [])

  // Function to handle status selection
  const handleStatusChange = (newStatus) => {
    setStatus(newStatus)
    ApiUtils.updateTripStatus(trip.id, newStatus)
      .then(() => console.log('Trip status updated successfully'))
      .catch(error => console.error(error))
  }

  // Function to start the phone's built-in navigation
  const startNavigation = () => {
    // Add logic here to start the phone's built-in navigation
  }

  return (
    <div>
      <h2>Current Trip Details</h2>
      <p>{trip.details}</p>

      <h2>Status Options</h2>
      <select value={status} onChange={e => handleStatusChange(e.target.value)}>
        <option value="">Select a status</option>
        <option value="member_canceled">Member Canceled</option>
        <option value="member_no_show">Member No Show</option>
        <option value="member_on_board">Member On Board</option>
      </select>

      <Button title="Start Navigation" onPress={startNavigation} />
    </div>
  )
}

// Export the NavigationScreen component
export default NavigationScreen
