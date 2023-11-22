/* eslint-disable no-undef */
import PropTypes from 'prop-types'
import React from 'react'
import { fetchTrips, fetchDrivers } from './ApiUtils.js'

ApiUtils.importTrips()

class TripManagement extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      trips: [],
      drivers: [],
      showAddTripForm: false,
      filter: {
        search: ''
      }
    }
    this.addTrip = this.addTrip.bind(this)
    this.importTrips = this.importTrips.bind(this)
    this.assignTripToDriver = this.assignTripToDriver.bind(this)
    this.toggleAddTripForm = this.toggleAddTripForm.bind(this)
    this.handleFilterChange = this.handleFilterChange.bind(this)
    this.handleExportTrips = this.handleExportTrips.bind(this)
  }

  componentDidMount () {
    this.getTrips()
    this.getDrivers()
  }

  getTrips () {
    fetchTrips('backend/trips')
      .then(data => this.setState({ trips: data }))
  }

  async getDrivers () {
    try {
      const data = await fetchDrivers('backend/drivers')
      this.setState({ drivers: data })
    } catch (error) {
      this.setState({ drivers: [] })
    }
  }

  addTrip (manualTrip) {
    fetch('backend/trips', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(manualTrip)
    })
      .then(response => response.json())
      .then(data => this.setState(prevState => ({
        trips: [...prevState.trips, data]
      })))
  }

  importTrips () {
    const fileInput = document.createElement('input')
    fileInput.type = 'file'
    fileInput.style.display = 'none'
    fileInput.onchange = (event) => {
      const file = event.target.files[0]
      const reader = new FileReader()
      reader.onload = (event) => {
        const importedTrips = JSON.parse(event.target.result)
        fetch('backend/trips/import', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(importedTrips)
        })
          .then(response => response.json())
          .then(data => this.setState(prevState => ({
            trips: [...prevState.trips, ...data]
          })))
      }
      reader.readAsText(file)
    }
    document.body.appendChild(fileInput)
    fileInput.click()
  }

  toggleAddTripForm () {
    this.setState(prevState => ({
      showAddTripForm: !prevState.showAddTripForm
    }))
  }

  handleSearchChange (event) {
    this.setState({
      search: event.target.value
    })
  }

  handleSearchSubmit (event) {
    event.preventDefault()
    fetch('backend/trips/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ search: this.state.search })
    })
      .then(response => response.json())
      .then(data => this.setState({ trips: data }))
  }

  async calculateDistance (lat1, lon1, lat2, lon2) {
    const response = await axios.get('/calculateDistance', { params: { lat1, lon1, lat2, lon2, key: 'YOUR_GOOGLE_MAPS_API_KEY' } })
    const distance = response.data.distance
    return distance
  }

  exportTrips () {
    fetch('backend/trips/export', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'trips.json'
        a.click()
      })
  }

  handleExportTrips () {
    this.exportTrips()
  }

  render () {
    return (
      <div>
                <input type="text" value={this.state.search} onChange={this.handleSearchChange} placeholder="Search" />
                <button onClick={this.handleSearchSubmit}>Search</button>
        <FilterForm filter={this.state.filter} onChange={this.handleFilterChange} onSubmit={this.handleFilterSubmit} />
        <TripList trips={this.state.trips} />
            </div>
    )
  }
}

class TripList extends React.Component {
  render () {
    const { trips } = this.props
    return (
      <div>
        <h3>Trips:</h3>
        <ul>
          {Array.isArray(trips) && trips.map((trip, index) => (
            <li key={index}>{trip.destination}</li>
          ))}
        </ul>
      </div>
    )
  }
}
TripList.propTypes = {
  trips: PropTypes.array.isRequired
}

class AddTripForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      driver: '',
      client: '',
      location: '',
      appointmentTime: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit (event) {
    event.preventDefault()
    this.props.addTrip(this.state)
    this.setState({
      driver: '',
      client: '',
      location: '',
      appointmentTime: ''
    })
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" name="driver" value={this.state.driver} onChange={this.handleChange} placeholder="Driver" />
        <input type="text" name="client" value={this.state.client} onChange={this.handleChange} placeholder="Client" />
        <input type="text" name="location" value={this.state.location} onChange={this.handleChange} placeholder="Location" />
        <input type="text" name="appointmentTime" value={this.state.appointmentTime} onChange={this.handleChange} placeholder="Appointment Time" />
        <button type="submit">Add Trip</button>
      </form>
    )
  }
}
AddTripForm.propTypes = {
  addTrip: PropTypes.func.isRequired
}
class FilterForm extends React.Component {
  render () {
    const { filter, onChange, onSubmit } = this.props
    return (
      <form onSubmit={onSubmit} style={{ display: 'flex', justifyContent: 'space-between' }}>
        <input style={{ width: '20%' }} type="date" name="date" value={filter.date} onChange={onChange} placeholder="Date" />
        <input style={{ width: '20%' }} type="text" name="member" value={filter.member} onChange={onChange} placeholder="Member" />
        <input style={{ width: '20%' }} type="text" name="driver" value={filter.driver} onChange={onChange} placeholder="Driver" />
        <input style={{ width: '20%' }} type="text" name="tripNumber" value={filter.tripNumber} onChange={onChange} placeholder="Trip Number" />
        <button style={{ width: '10%', borderRadius: '50px', height: '50px' }} type="submit">Filter</button>
      </form>
    )
  }
}
FilterForm.propTypes = {
  filter: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
}
export default { TripManagement, fetchDrivers }
