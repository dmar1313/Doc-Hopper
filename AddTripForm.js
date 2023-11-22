import React, { useState } from 'react'
import axios from 'axios'

const validateMultiLoaded = (multiLoaded) => {
  if (multiLoaded !== 'true' && multiLoaded !== 'false') {
    return false
  }
  return true
}

const TripForm = () => {
  const [showForm, setShowForm] = useState(false)
  const [memberFirstName, setMemberFirstName] = useState('')
  const [memberLastName, setMemberLastName] = useState('')
  const [notifyTime, setNotifyTime] = useState('')
  const [scheduled, setScheduled] = useState('')
  const [pickupTime, setPickupTime] = useState('')
  const [destinationTime, setDestinationTime] = useState('')
  const [lateReason, setLateReason] = useState('')
  const [tripOutcome, setTripOutcome] = useState('')
  const [driver, setDriver] = useState('')
  const [vehicle, setVehicle] = useState('')
  const [signature, setSignature] = useState('')
  const [multiLoaded, setMultiLoaded] = useState('')
  const [formError, setFormError] = useState(null)

  const validateForm = () => {
    if (
      !memberFirstName ||
      !memberLastName ||
      !notifyTime ||
      !scheduled ||
      !pickupTime ||
      !destinationTime ||
      !lateReason ||
      !tripOutcome ||
      !driver ||
      !vehicle ||
      !signature ||
      !validateMultiLoaded(multiLoaded)
    ) {
      return false
    }
    setFormError(null)
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) {
      return
    }
    try {
      const newTrip = {
        memberFirstName,
        memberLastName,
        notifyTime,
        scheduled,
        pickupTime,
        destinationTime,
        lateReason,
        tripOutcome,
        driver,
        vehicle,
        signature,
        multiLoaded
      }
      const response = await axios.post('/api/trips', newTrip)
      if (response.status === 201) {
        alert('Trip added successfully')
        setMemberFirstName('')
        setMemberLastName('')
        setNotifyTime('')
        setScheduled('')
        setPickupTime('')
        setDestinationTime('')
        setLateReason('')
        setTripOutcome('')
        setDriver('')
        setVehicle('')
        setSignature('')
        setMultiLoaded('')
        setShowForm(false)
      }
    } catch (error) {
      console.error('An error occurred while adding the trip:', error)
      setFormError('Failed to add trip.')
    }
  }

  return (
    <div>
      <h2>Add a New Trip</h2>
      <button onClick={() => setShowForm(true)}>Add Trip</button> {/* Button to show the form */}
      {showForm && (
        // Conditionally render the form based on the state variable
        <form onSubmit={handleSubmit}>
          <div>
            <label>Member First Name</label>
            <input
              type="text"
              value={memberFirstName}
              onChange={(e) => setMemberFirstName(e.target.value)}
            />
          </div>
          {/* ... Other form inputs */}
          {formError && <p>{formError}</p>}
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  )
}

export default TripForm
