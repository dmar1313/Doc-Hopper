/* eslint-disable react/react-in-jsx-scope */
// tripService.js
import axios from 'axios'
// tripController.js
import * as tripService from './tripService.js'
import drivers from './drivers.js'
const GOOGLE_API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY'
export async function getCoordinates (address) {
  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address,
        key: GOOGLE_API_KEY
      }
    })
    const location = response.data.results[0].geometry.location
    return { lat: location.lat, lon: location.lng }
  } catch (error) {
    throw new Error('Error getting coordinates')
  }
}
export function calculateDistance (lat1, lon1, lat2, lon2) {
  const R = 20902231 // Radius of earth in feet
  const dLat = deg2rad(lat2 - lat1)
  const dLon = deg2rad(lon2 - lon1)
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = R * c // Distance in feet
  return distance
}
function deg2rad (deg) {
  return deg * (Math.PI / 180)
}
export async function assignTrip (trip) {
  if (!drivers || drivers.length === 0) {
    return null
  }
  let bestDriver = null
  let shortestDistance = Infinity
  const tripAddress = `${trip['Pickup Address']}, ${trip['Pickup Address 2']}, ${trip['Pickup County']}`
  try {
    const tripCoordinates = await tripService.getCoordinates(tripAddress)
    for (let i = 0; i < drivers.length; i++) {
      const driver = drivers[i]
      const driverCoordinates = await tripService.getCoordinates(driver['Home Address'])
      const tripDistance = tripService.calculateDistance(
        tripCoordinates.lat,
        tripCoordinates.lon,
        driverCoordinates.lat,
        driverCoordinates.lon
      )
      if (tripDistance < shortestDistance) {
        bestDriver = driver
        shortestDistance = tripDistance
      }
    }
    if (bestDriver) {
      return bestDriver
    } else {
      return null
    }
  } catch (error) {
    return null
  }
}
// TripManagement.js (React component)
// eslint-disable-next-line no-undef
class TripManagement extends Component {
  constructor (props) {
    super(props)
    this.state = {
      trips: [],
      drivers: [],
      filteredTrips: []
    }
    this.filterTrips = this.filterTrips.bind(this)
  }

  componentDidMount () {
    axios
      .get('/api/trips')
      .then((response) => {
        this.setState({ trips: response.data, filteredTrips: response.data })
      })
    axios
      .get('/api/drivers')
      .then((response) => {
        this.setState({ drivers: response.data })
      })
  }

  filterTrips (filter) {
    const filteredTrips = this.state.trips.filter((trip) => {
      return Object.keys(filter).every((key) => {
        return String(trip[key]).toLowerCase().includes(String(filter[key]).toLowerCase())
      })
    })
    this.setState({ filteredTrips })
  }

  assignTripToDriver (trip) {
    // eslint-disable-next-line no-unused-vars
    const bestDriver = assignTrip(trip, this.state.drivers)
  }

  render () {
    return (
      <div>
        <h2>Trip Management</h2>
        {/* ... rest of the UI components like TripList, AddTripForm, etc. */}
        {/* <FilterForm onFilter={this.filterTrips} /> */}
      </div>
    )
  }
}
export default TripManagement
