import React from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

const Sidebar = ({ onMenuClick }) => {
  const history = useHistory()

  return (
    <div className="sidebar">
      <ul>
        <li onClick={() => history.push('/home')}>Home</li>
        <li onClick={() => { history.push('/trips'); onMenuClick('trips') }}>Trips</li>
        <li onClick={() => { history.push('/drivers'); onMenuClick('drivers') }}>Drivers</li>
        <li onClick={() => { history.push('/settings'); onMenuClick('settings') }}>Settings</li>
        <li onClick={() => { history.push('/help'); onMenuClick('help') }}>Help</li>
      </ul>
    </div>
  )
}

Sidebar.propTypes = {
  onMenuClick: PropTypes.func.isRequired
}

export default Sidebar
