/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { getAuthenticatedUser } from './ApiUtils.js'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Sidebar from './SideBar.js'
import HomePage from './HomePage.js'
import TripManagement from './TripManagement.js'
import DriverManagement from './DriverManagement.js'
import React, { useState } from 'react'

function App () {
  const [sidebarVisible, setSidebarVisible] = useState(false)

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible)
  }

  const [, setUser] = useState(null)
  const [role, setRole] = useState('')

  useEffect(() => {
    async function fetchUserData () {
      try {
        const fetchedUser = await getAuthenticatedUser()(currentUser)
        const fetchedRole = await ApiUtils.fetchUserRole(fetchedUser.email)(fetchedRole)
      } catch (error) {
        console.error(error);
      }
    }
    fetchUserData()
  }, []),
jsx
 
};
  return (
    <Router>
      <Sidebar visible={sidebarVisible} toggle={toggleSidebar} />

      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/trip-management" component={TripManagement} />
        <Route path="/driver-management" component={DriverManagement} />
      </Switch>
    </Router>
  )
}

export default App
