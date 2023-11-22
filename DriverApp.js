// Importing React and necessary components
import React from 'react'
import DriverTripAssignment from './DriverTripAssignment.js'
import DriverDashboard from './DriverDashboard.js'

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor (props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError (error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch (error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo)
  }

  render () {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>
    }

    return this.props.children
  }
}

// DriverApp Component
class DriverApp extends React.Component {
  render () {
    // Render the TripAssignment component within ErrorBoundary
    return (
      <div className="DriverApp">
        <ErrorBoundary>
          <Route path='/DriverDashboard' component={DriverDashboard} />
        </ErrorBoundary>
        <ErrorBoundary>
          <DriverTripAssignment driverId={this.props.driverId} />
        </ErrorBoundary>
      </div>
    )
  }
}

// Exporting the DriverApp Component
export default DriverApp
