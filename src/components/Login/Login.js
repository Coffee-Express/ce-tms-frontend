import React, { useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import validator from 'validator';
import CreatePermanentPassword from '../CreatePermanentPassword/CreatePermanentPassword';
import './Login.css';
import { useAuth } from '../../auth';

const Login = ({ hideTabs, closeModal }) => {
  // const [authenticationStatusCSSClass, setAuthenticationStatusCSSClass] = useState('');
  const [isOneTimePassword, setIsOneTimePassword] = useState(false);

  const initialCredentials = {
    email: '',
    password: '',
  };

  // To manage login credentials
  const reducer = (state, action) => {
    switch (action.type) {
      case 'email':
        return {
          ...state,
          email: action.payload,
        };
      case 'password':
        return {
          ...state,
          password: action.payload,
        };
      default:
        return state;
    }
  };

  const [credentials, dispatch] = useReducer(reducer, initialCredentials);

  const loginErrorReducer = (errorState, action) => {
    switch (action.type) {
      case 'empty-email':
        return {
          ...errorState,
          email: action.valid ? '' : 'red-border',
          message: action.valid ? '' : 'Please enter a valid email ',
        };
      case 'empty-password':
        return {
          ...errorState,
          password: action.valid ? '' : 'red-border',
          message: action.valid ? '' : 'Please enter a password',
        };
      case 'invalid-email':
        return {
          ...errorState,
          email: action.valid ? '' : 'red-border',
          message: action.valid ? '' : 'Not a valid email. Please make an account',
        };
      case 'invalid-password':
        return {
          ...errorState,
          password: action.valid ? '' : 'red-border',
          message: action.valid ? '' : 'Password is not correct',
        };
      case 'guest-account':
        return {
          ...errorState,
          message: 'You have not created an account. Please sign up',
        };
      case 'password-expired':
        return {
          ...errorState,
          password: action.valid ? '' : 'red-border',
          message: action.valid ? '' : 'Your password Expired',
        };
      default:
        return {
          ...errorState,
          email: 'red-border',
          passsword: 'red-border',
          message: 'there was an unexpected error',
        };
    }
  };

  const initialErrorObject = {
    email: '',
    password: '',
    message: '',
  };

  const [loginError, loginDispatch] = useReducer(loginErrorReducer, initialErrorObject);

  const auth = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validator.isEmail(credentials.email)) {
      loginDispatch({ type: 'empty-email', valid: false });
      return;
    }
    loginDispatch({ type: 'empty-email', valid: true });

    if (validator.isEmpty(credentials.password)) {
      loginDispatch({ type: 'empty-password', valid: false });
      return;
    }
    loginDispatch({ type: 'empty-email', valid: true });
    try {
      const response = await axios.post('/users/login', credentials);
      // setAuthenticationStatusCSSClass('200-status');
      auth.signin(credentials.email, response.data.role);
      setIsOneTimePassword(response.data.isOneTimePassword);
      hideTabs(response.data.isOneTimePassword);
      if (!response.data.isOneTimePassword) closeModal();
    } catch (error) {
      loginDispatch({ type: error.response.data, valid: false });
    }
  };

  if (isOneTimePassword) {
    return <CreatePermanentPassword closeModal={closeModal} />;
  }

  if (auth.user.email) {
    return <Navigate to="/create-ticket" />;
  }

  return (
    <>

      {/* <div className="error-message-group-login">
        {authenticationStatusCSSClass === 'status-400' ? <p>Your credentials were incorrect.
        Please try again.</p> : null}
        {authenticationStatusCSSClass === 'status-500' ? <p>There was a problem with the server.
         Sorry for the inconvenience.</p> : null}
        {authenticationStatusCSSClass === 'status-default-error' ? <p>There was an unexpected error.
          Please try again in a little while.</p> : null}
      </div> */}
      <form>
        <div className="login-form-input-group">
          <div>
            <input
              type="text"
              className={`login-form-input ${loginError.email}`}
              id="login-form-email"
              value={credentials.username}
              onChange={(e) => dispatch({ type: 'email', payload: e.target.value })}
            />
            <label className="login-form-label" htmlFor="login-form-email">Email</label>
          </div>
          <div>
            <input
              type="password"
              className={`login-form-input ${loginError.password}`}
              id="login-form-password"
              value={credentials.passsword}
              onChange={(e) => dispatch({ type: 'password', payload: e.target.value })}
            />
            <label className="login-form-label" htmlFor="login-form-password">Password</label>
          </div>
        </div>
        <button type="submit" className="login-submit-button" onClick={(e) => handleSubmit(e)}>
          Log In
        </button>
        <p className="error-message-login">
          {loginError.message}
        </p>
      </form>
    </>
  );
};

Login.propTypes = {
  hideTabs: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default Login;
