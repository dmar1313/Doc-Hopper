import React, { useState } from 'react'
import PropTypes from 'prop-types'

import AddDriverForm from './AddDriverForm.js'

function DriverManagement ({ drivers, addDriver }) {
  const [showForm, setShowForm] = useState(false)

  const handleAddDriver = (newDriver) => {
    addDriver({
      ...newDriver,
      role: 'driver'
    })

    setShowForm(false)
  }

  return (
    <div>
      <h2>Drivers</h2>

      <button onClick={() => setShowForm(!showForm)}>
        Add Driver
      </button>

      {showForm && <AddDriverForm addDriver={handleAddDriver} />}

      <ul>
        {drivers?.map((driver) => (
          <li key={driver.id}>{driver.name}</li>
        ))}
      </ul>
    </div>
  )
}

DriverManagement.propTypes = {
  drivers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      role: PropTypes.string
    })
  ).isRequired,
  addDriver: PropTypes.func.isRequired
}

export default DriverManagement
