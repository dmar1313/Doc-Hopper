import React from 'react'
import { auth } from './firebase.js'

const SignOut = () => {
  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Sign Out</button>
  )
}

export default SignOut
