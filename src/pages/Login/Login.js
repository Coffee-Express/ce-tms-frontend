import React, { useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import { Navigate, Link } from 'react-router-dom';
// import axios from 'axios';
import './Login.css';
import Modal from '../../components/reusableComponents/Modal';
import CreateAccount from '../../components/CreateAccount/CreateAccount';
// import { useAuth } from '../../auth';

const Login = ({ user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const initialCredentials = {
    email: '',
    password: '',
  };

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

  // const auth = useAuth();

  const handleSubmit = async () => {
    // auth.signin(credentials.email);
    window.localStorage.setItem('user', JSON.stringify({ name: credentials.email, email: credentials.email }));
  };

  const closeCreateAccountForm = () => {
    setIsModalOpen(false);
  };

  const submitCreateAccountForm = () => {
    closeCreateAccountForm();
  };

  // if (user) {
  //   return <Navigate to="/view-tickets" />;
  // }

  // console.log(user);
  if (user) {
    return <Navigate to="/create-ticket" />;
  }

  return (
    <>
      <Link to="/create-ticket">
        <button type="button">
          Continue As Guest
        </button>
      </Link>
      <div className="container">
        <div className="screen">
          <div className="screen__content">
            <form className="login">
              <div className="login__field">
                <i className="login__icon fas fa-user" />
                <input
                  type="text"
                  className="login__input"
                  placeholder="email"
                  id="login-form-email"
                  value={credentials.email}
                  onChange={(e) => dispatch({ type: 'email', payload: e.target.value })}
                />
              </div>
              <div className="login__field">
                <i className="login__icon fas fa-lock" />
                <input
                  type="password"
                  className="login__input"
                  placeholder="Password"
                  id="login-form-password"
                  value={credentials.passsword}
                  onChange={(e) => dispatch({ type: 'password', payload: e.target.value })}
                />
              </div>
              <button type="button" className="button login__submit" onClick={(e) => handleSubmit(e)}>
                <span className="button__text">Log In Now</span>
                <i className="button__icon fas fa-chevron-right" />
              </button>
            </form>
            <div className="social-login">
              Don&apos;t have an account with us?
              <button type="button" onClick={() => setIsModalOpen(true)} className="button login__signup">Sign up</button>
              {isModalOpen
                ? (
                  <Modal>
                    <CreateAccount
                      submitForm={submitCreateAccountForm}
                      closeForm={closeCreateAccountForm}
                    />
                  </Modal>
                ) : null}
            </div>
          </div>
          <div className="screen__background">
            <span className="screen__background__shape screen__background__shape4" />
            <span className="screen__background__shape screen__background__shape3" />
            <span className="screen__background__shape screen__background__shape2" />
            <span className="screen__background__shape screen__background__shape1" />
          </div>
        </div>
      </div>

    </>
  //  <>
  //    <form>
  //      <label htmlFor="login-form-email">email</label>
  //      <input type="text" id="login-form-email" value={credentials.email}
  //       onChange={(e) => dispatch({ type: 'email', payload: e.target.value })} />
  //      <label htmlFor="login-form-password">Password</label>
  //      <input type="password" id="login-form-password" value={credentials.passsword}
  //      onChange={(e) => dispatch({ type: 'password', payload: e.target.value })} />
  //      <button type="submit" onClick={(e) => handleSubmit(e)}>Submit</button>
  //    </form>
  //  </>
  );
};

Login.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }),
};

Login.defaultProps = {
  user: null,
};

export default Login;
