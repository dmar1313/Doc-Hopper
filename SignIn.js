import React from 'react';
import { auth, signInWithPopup, GoogleAuthProvider } from './firebase.js';
import logo from './Doc-hopper Logo.png';  // Adjust the path
import { withRouter } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
const USE_REAL_AUTH = true;

class SignIn extends React.Component {
  state = { email: '', password: '', role: '', formError: '' };

  setFormError = (error) => {
    this.setState({ formError: error });
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleGoogleSignIn = async (event) => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.log(error.message);
    }
  };

  handleSubmit = async (event) => {
    const { email, password, role } = this.state;
    const response = await fetch('/api/user/role');
    const data = await response.json();
    this.setState({ role });
    try {
      await auth.signInWithEmailAndPassword(email, password);
      const user = auth.currentUser;
      if (user) {
        const token = await user.getIdTokenResult();
        this.setState({ role: token.claims.role });
        console.log(`User role: ${this.state.role}`);
      }
      if (user) {
        const token = await user.getIdTokenResult();
        this.setState({ role: token.claims.role });
        console.log(`User role: ${this.state.role}`);
        switch (this.state.role) {
          case 'driver':
            this.props.history.push('/driver');
            break;
          case 'management':
            this.props.history.push('/management');
            break;
          default:
            console.log('Invalid role');
        }
      }
    } catch (error) {
      console.error('Invalid login attempt');
      this.setFormError('Invalid email or password');
    }

  } else {
      const mockUser = {
        email: 'mockEmail@example.com',
        role: 'driver'  // or 'management'
      };
      this.setState({ email: mockUser.email, role: mockUser.role });
    }
  };
}
    

export default withRouter(SignIn, auth);

