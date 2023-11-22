import PropTypes from 'prop-types'

import React, { useState } from 'react'
import axios from 'axios' // Assuming you are using axios for HTTP requests

// Modify the AddClientForm component to accept a callback function as a prop
const AddClientForm = ({ updateClients }) => {
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [contact, setContact] = useState('')
  const [formError, setFormError] = useState(null)

  const validateForm = () => {
    if (!name || !address || !contact) {
      setFormError('All fields are required.')
      return false
    }
    setFormError(null)
    return true
  }
  AddClientForm.propTypes = {
    updateClients: PropTypes.func.isRequired
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (validateForm()) {
      try {
        const newClient = { name, address, contact }
        // Making an API call to add the new client
        const response = await axios.post('/api/clients', newClient)
        if (response.status === 201) {
          alert('Client added successfully')
          // Call the callback function to update the list of clients in the ClientManagement component
          updateClients(newClient)
        }
      } catch (error) {
        console.error('An error occurred while adding the client:', error)
        alert('Failed to add client.')
      }
    }
  }
  return (
    <div>
      <h2>Add a New Client</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Address</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
        <div>
          <label>Contact</label>
          <input type="text" value={contact} onChange={(e) => setContact(e.target.value)} />
        </div>
        {formError && <p>{formError}</p>}
        <button type="submit">Add Client</button>
      </form>
    </div>
  )
}

export default AddClientForm
