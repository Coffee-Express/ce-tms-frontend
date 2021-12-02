import React, { useReducer, useState } from 'react';
import { useAuth } from '../../auth';
import './ResetPassword.css';

const ResetPassword = () => {
  const auth = useAuth();

  const initialCredentials = {
    username: auth.user,
    password: null,
    newPassword: null,
    newPasswordVerification: null,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'password':
        return {
          ...state,
          password: action.payload,
        };
      case 'newPassword':
        return {
          ...state,
          newPassword: action.payload,
        };
      case 'newPasswordVerification':
        return {
          ...state,
          newPasswordVerification: action.payload,
        };
      default:
        return state;
    }
  };

  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const [credentials, dispatch] = useReducer(reducer, initialCredentials);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (credentials.newPassword === credentials.newPasswordVerification) {
      setPasswordsMatch(true);
      console.log(credentials);
    } else {
      setPasswordsMatch(false);
    }
  };
  return (
    <>
      {!passwordsMatch ? <h3>{'The passwords didn\'t match.  Please try again.'}</h3> : null}
      <form>
        <label htmlFor="currentPassword">Curret Password:</label>
        <input type="password" id="currentPassword" onChange={(e) => dispatch({ type: 'password', payload: e.target.value })} />
        <label htmlFor="newPassword">New Password:</label>
        <input type="password" id="newPassword" onChange={(e) => dispatch({ type: 'newPassword', payload: e.target.value })} />
        <label htmlFor="newPasswordVerification">Re-enter New Password</label>
        <input type="password" id="newPasswordVerification" onChange={(e) => dispatch({ type: 'newPasswordVerification', payload: e.target.value })} />
        <button type="submit" onClick={(e) => handleSubmit(e)}>Submit</button>
      </form>
    </>
  );
};

export default ResetPassword;
