import React, { useState } from 'react'
import axios from 'axios'

const validateMultiLoaded = (multiLoaded) => {
  if (multiLoaded !== 'true' && multiLoaded !== 'false') {
    return false
  }
  return true
}

const TripForm = () => {
  const [tripNumber, setTripNumber] = useState('')
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

  const validateForm = () => {
    if (
      !tripNumber ||
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
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (validateForm()) {
      const newTrip = {
        tripNumber,
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
      try {
        const response = await axios.post('/api/trips', newTrip)
        if (response.status === 201) {
          setTripNumber('')
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
        }
      } catch (error) {
        console.error('An error occurred while adding the trip:', error)
      }
    }
  }
  return (
        <form onSubmit={handleSubmit}>
          {/* Form fields */}
          <button type="submit">Submit</button>
        </form>
  )
}
export default TripForm
