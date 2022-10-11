import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE } from '../api/index';

export const Register = (props) => {
  const [createUsername, setCreateUsername] = useState('');
  const [createPassword, setCreatePassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [createFirstName, setCreateFirstName] = useState('');
  const [createLastName, setCreateLastName] = useState('');
  const [createEmail, setCreateEmail] = useState('');

  let navigate = useNavigate();

  const registerUser = async() => {
    const data = await axios.post(`${BASE}/users/register`, {
        username: createUsername,
        password: createPassword,
        firstName: createFirstName,
        lastName: createLastName,
        email: createEmail
    });
    localStorage.setItem('token', data.data.token)
    localStorage.setItem('userId', data.data.user.id)
    props.setIsLoggedIn(data.data.user)
    console.log("DATA:", data)
    return data;
  }

  const handleSubmit = async(event) => {
    event.preventDefault();
    registerUser();
    // navigate('/products');
  }

  return (
    <div id='register-form'>
      <h1>Please Sign Up</h1>
      <br/>
      <form className='input-container' onSubmit={handleSubmit}>
        <div className='form-input-bar'>
          <label>Create Username</label>
          <input type='text' placeholder='Create Username' value={createUsername} onChange={(event) => {
          setCreateUsername(event.target.value)}} minLength={7}></input>
        </div>
        <div className='form-input-bar'>
          <label>Create Password</label>
          <input type='text' placeholder='Create Password' value={createPassword} onChange={(event) => {
          setCreatePassword(event.target.value)}} minLength={7}></input>
        </div>
        <div className='form-input-bar'>
          <label>Confirm Password</label>
          <input type='text' placeholder='Confirm Password' value={confirmPassword} onChange={(event) => {
          setConfirmPassword(event.target.value)}} minLength={7}></input>
        </div>
        <div className='form-input-bar'>
          <label>First Name</label>
          <input type='text' placeholder='First Name' value={createFirstName} onChange={(event) => {
          setCreateFirstName(event.target.value)}}></input>
        </div>
        <div className='form-input-bar'>
          <label>Last Name</label>
          <input type='text' placeholder='Last Name' value={createLastName} onChange={(event) => {
          setCreateLastName(event.target.value)}}></input>
        </div>
        <div className='form-input-bar'>
          <label>Email</label>
          <input type='text' placeholder='Email' value={createEmail} onChange={(event) => {
          setCreateEmail(event.target.value)}} minLength={7}></input>
        </div>
        <div className='button-container'>
          <button id='register-button' type='submit'>REGISTER</button>
        </div>
      </form>
        <br/>
        <Link to='/login'>Already a registered user? Click here to sign in!</Link>
    </div>
  )
}

