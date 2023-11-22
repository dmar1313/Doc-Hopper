const PROGRESS_REPORT_URL = '/api/progress_report'
const DRIVERS_URL = '/api/drivers'
const VEHICLES_URL = '/api/vehicles'
const TRIPS_URL = '/api/trips'
const USER_ROLE_URL = '/api/user_role'

async function fetchProgressReport () {
  try {
    const response = await fetch(PROGRESS_REPORT_URL)
    const data = await response.json()
    return data
  } catch (err) {
    console.error('Error fetching progress report:', err)
  }
}

async function fetchDrivers () {
  try {
    const response = await fetch(DRIVERS_URL)
    const data = await response.json()
    return data
  } catch (err) {
    console.error('Error fetching drivers:', err)
  }
}

async function fetchVehicles () {
  try {
    const response = await fetch(VEHICLES_URL)
    const data = await response.json()
    return data
  } catch (err) {
    console.error('An error occurred while fetching vehicles:', err)
  }
}

async function fetchTrips () {
  try {
    const response = await fetch(TRIPS_URL)
    const data = await response.json()
    return data
  } catch (err) {
    console.error('An error occurred while fetching trips:', err)
  }
}

async function postTrip (trip) {
  try {
    const response = await fetch(TRIPS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(trip)
    })
    const data = await response.json()
    return data
  } catch (err) {
    console.error('An error occurred while posting a trip:', err)
  }
}

async function importTrips () {
  try {
    const response = await fetch(TRIPS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    return data
  } catch (err) {
    console.error('An error occurred while importing trips:', err)
  }
}

async function exportTrips () {
  try {
    const response = await fetch(TRIPS_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    return data
  } catch (err) {
    console.error('An error occurred while exporting trips:', err)
  }
}

async function fetchUserRole () {
  try {
    const response = await fetch(USER_ROLE_URL)
    const data = await response.json()
    return data
  } catch (err) {
    console.error('Error fetching user role:', err)
  }
}
async function getAuthenticatedUser () {
  try {
    const response = await fetch(USER_ROLE_URL)
    const data = await response.json()
    return data
  } catch (err) {
    console.error('Error fetching authenticated user:', err)
  }
}

export { fetchProgressReport, fetchDrivers, fetchTrips, fetchVehicles, postTrip, importTrips, exportTrips, fetchUserRole, getAuthenticatedUser }
