import React from 'react'

const DriverRoleComponent = ({ switchRole: propsSwitchRole }) => {
  const [role, setRole] = React.useState('driver')

  const switchRole = () => {
    const newRole = role === 'driver' ? 'manager' : 'driver'
    setRole(newRole)
    propsSwitchRole(newRole)
  }

  return (
    <div>
      <h1>You are currently in the {role} version of the app</h1>
      <button onClick={switchRole}>Switch Role</button>
    </div>
  )
}

export default DriverRoleComponent
