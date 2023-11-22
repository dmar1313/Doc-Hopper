import axios from 'axios'

class DriversService {
  constructor () {
    this.apiUrl = 'https://api.example.com/drivers'
  }

  async addDriver (driverData) {
    try {
      const response = await axios.post(this.apiUrl, driverData)
      return response.data
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

export default new DriversService()
