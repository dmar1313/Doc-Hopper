import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { db } from './firebase';
import React, { useState, useEffect } from 'react';

const SignUp = () => {
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
const [role, setRole] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(getAuth(), email, password);
      await db.ref(`users/${userCredential.user.uid}`).set({
        email: email,
        role: role
      });
      setEmail('');
      setPassword('');
      setRole('');
    } catch (error) {
      console.error(error);
    }
  };
  const handleSubmit = async (event) => {
  event.preventDefault();
  try {
    const userCredential = await createUserWithEmailAndPassword(getAuth(), email, password);
    await db.database().ref(`users/${userCredential.user.uid}`).set({
      email: email,
      role: role
    });
    setEmail('');
    setPassword('');
    setRole('');
  } catch (error) {
    console.error(error);
  }
  };

  return (
      <select
        name='role'
        value={role}
        onChange={e => setRole(e.target.value)}
        required
      >
        <option value=''>Select Role</option>
        <option value='driver'>Driver</option>
        <option value='manager'>Manager</option>
      </select>
    <form onSubmit={handleSubmit}>
      <img src='./Doc-hopper Logo.png' alt='Logo Description' className='logoClass' />
      <input
        type='email'
        name='email'
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder='Email'
        required
      />
      <input
        type='password'
        name='password'
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder='Password'
        required
      />
      <button type='submit'>Sign Up</button>
    </form>
  );
};

export default SignUp;




