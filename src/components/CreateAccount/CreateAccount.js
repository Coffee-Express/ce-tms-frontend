import React, { useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import './CreateAccount.css';

const CreateAccount = ({
  submitForm, closeForm, user, signin,
}) => {
  const [accountCreationstatusCSSClass, setAccountCreationStatusCSSClass] = useState('');
  const initialCredentials = {
    name: '',
    email: '',
    password: '',
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'name':
        return {
          ...state,
          name: action.payload,
        };
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}
    /create-account`, credentials, {
        headers: {
          Authorization: `Basic ${credentials.email}:${credentials.password}`,
        },
      });
      signin({ name: credentials.email, email: credentials.email });
      setAccountCreationStatusCSSClass('successful-account-creation');
      return response.status;
    } catch (error) {
      setAccountCreationStatusCSSClass('failed-account-creation');
      return error.response.status;
    }
  };

  if (user) {
    return <Navigate to="/employee" />;
  }
  if (user === '') {
    return <Navigate to="/user" />;
  }

  return (
    <>
      <h1>Create an account with us</h1>
      <form>
        <label type="text" htmlFor="create-account-form-name">Name</label>
        <input
          id="create-account-form-name"
          onChange={(e) => dispatch({ type: 'name', payload: e.target.value })}
          className={`${accountCreationstatusCSSClass}`}
        />
        <label type="text" htmlFor="create-account-form-email">Email</label>
        <input
          id="create-account-form-email"
          onChange={(e) => dispatch({ type: 'email', payload: e.target.value })}
          className={`${accountCreationstatusCSSClass}`}
        />
        <label type="text" htmlFor="create-account-form-email">email</label>
        <input id="create-account-form-email" onChange={(e) => dispatch({ type: 'email', payload: e.target.value })} />
        <label htmlFor="create-account-form-password">Password</label>
        <input type="password" id="create-account-form-password" onChange={(e) => dispatch({ type: 'password', payload: e.target.value })} />
        <button type="submit" onClick={(e) => handleSubmit(e)}>Submit</button>
        <button type="button" onClick={closeForm}>Close</button>
      </form>
    </>
  );
};

CreateAccount.propTypes = {
  submitForm: PropTypes.func.isRequired,
  closeForm: PropTypes.func.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }),
  signin: PropTypes.func.isRequired,
};

CreateAccount.defaultProps = {
  user: null,
};

export default CreateAccount;
