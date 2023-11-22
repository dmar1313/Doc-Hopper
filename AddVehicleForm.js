import axios from 'axios'
import React, { useState } from 'react'

const AddVehicleForm = ({ onVehicleAdded }) => {
  const [make, setMake] = useState('')
  const [model, setModel] = useState('')
  const [year, setYear] = useState('')
  const [plate, setPlate] = useState('')
  const [color, setColor] = useState('')
  const [formError, setFormError] = useState(null)

  const validateForm = () => {
    if (!make || !model || !year) {
      setFormError('All fields are required.')
      return false
    }
    setFormError(null)
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (validateForm()) {
      try {
        const newVehicle = { make, model, year, plate, color }
        // Making an API call to add the new vehicle
        const response = await axios.post('/api/vehicles', newVehicle)
        if (response.status === 201) {
          alert('Vehicle added successfully')
          onVehicleAdded(newVehicle)
        }
      } catch (error) {
        console.error('An error occurred while adding the vehicle:', error)
        alert('Failed to add vehicle.')
      }
    }
  }

  return (
    <div>
      <h2>Add a New Vehicle</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Make</label>
          <input type="text" value={make} onChange={(e) => setMake(e.target.value)} />
        </div>
        <div>
          <label>Model</label>
          <input type="text" value={model} onChange={(e) => setModel(e.target.value)} />
        </div>
        <div>
          <label>Year</label>
          <input type="text" value={year} onChange={(e) => setYear(e.target.value)} />
        </div>
        <div>
          <label>Plate</label>
          <input type="text" value={plate} onChange={(e) => setPlate(e.target.value)} />
        </div>
        <div>
          <label>Color</label>
          <input type="text" value={color} onChange={(e) => setColor(e.target.value)} />
        </div>
        {formError && <p>{formError}</p>}
        <button type="submit">Add Vehicle</button>
      </form>
    </div>
  )
}

export default AddVehicleForm
