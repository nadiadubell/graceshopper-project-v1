import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE } from '../api/index';
import { storeCurrentUser } from '../auth';

export const Login = props => {
  const [usernameLogin, setUsernameLogin] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('');

  let navigate = useNavigate();

  const loginUser = async () => {
    const data = await axios.post(`${BASE}/users/login`, {
      username: usernameLogin,
      password: passwordLogin,
    });
    storeCurrentUser(data);
    props.setIsLoggedIn(data.data.user);
    return data;
  };

  const handleSubmit = async event => {
    event.preventDefault();
    loginUser();
    navigate('/products')
  };

  return (
    <div id="login-form">
      <h1>Please Sign In</h1>
      <br />
      <form className="input-container" onSubmit={handleSubmit}>
        <div className="input-username">
          <label>Username</label>
          <input
            type="text"
            placeholder="Username"
            value={usernameLogin}
            onChange={event => {
              setUsernameLogin(event.target.value);
            }}
            minLength={7}
            required
          ></input>
        </div>
        <div className="input-password">
          <label>PASSWORD</label>
          <input
            type="password"
            placeholder="PASSWORD"
            value={passwordLogin}
            onChange={event => {
              setPasswordLogin(event.target.value);
            }}
            minLength={7}
            required
          ></input>
        </div>
        <div className="button-container">
          <button id="login-button" type="submit">
            LOGIN
          </button>
        </div>
      </form>
      <br />
      <Link to="/register">Not a registered user? Click here to sign up!</Link>
    </div>
  );
};
