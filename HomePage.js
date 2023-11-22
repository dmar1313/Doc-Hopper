// Import required packages and components
import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Sidebar from './SideBar.js'
import * as ApiUtils from './ApiUtils.js'

// Define HomePage component
// HomePage Component
function HomePage ({ trips }) {
  // Define states for sidebarOpen and error
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [error, setError] = useState(null)

  // Define function to handle import trips
  const handleImportTrips = () => {
    ApiUtils.importTrips()
      .then(response => {
        // Handle success
      })
      .catch(err => {
        // Set error state when an error occurs
        setError(err)
      })
  }

  // Define function to handle export trips
  const handleExportTrips = () => {
    // Handle export logic
  }

  // Define function to toggle sidebar menu
  const toggleMenu = () => {
    setSidebarOpen(!sidebarOpen)
  }

  // Use useEffect to fetch progress report on component mount
  useEffect(() => {
    ApiUtils.fetchProgressReport()
      .then(data => {
        // Handle success
      })
      .catch(err => {
        // Set error state when an error occurs
        setError(err)
      })
  }, [])

  // Render error message if error state is not null
  if (error) {
    return <p>Error: {error.toString()}</p>
  }

  // Render HomePage
  return (
    <Router>
      <div className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <Sidebar handleMenuClick={toggleMenu} />
      </div>
      <div className="homepage-container">
        <a href="#!" className="menu-btn" onClick={toggleMenu}>
          <i className="fas fa-bars"></i>
        </a>
        <div className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
          <div className="main-content">
            <div className="top-nav-bar">
              <h1>Doc-Hopper</h1>
            </div>
            <div className="upper-section">
              <div className="left-area">
                <p>Left Content</p>
              </div>
              <div className="middle-area">
                <p>Middle Content</p>
              </div>
              <div className="right-area">
                <p>Right Content</p>
              </div>
            </div>
            <div className="lower-section">
              <button onClick={handleImportTrips}>Import Trips</button>
              <button onClick={handleExportTrips}>Export Trips</button>
              {trips.map(trip => (
                <p key={trip.id}>{trip.name}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Router>
  )
}

// Define propTypes for HomePage
HomePage.propTypes = {
  trips: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired
}

// Export HomePage component
export default HomePage
