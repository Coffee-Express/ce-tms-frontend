import React from 'react';
import PropTypes from 'prop-types';
import { Link, Outlet, useNavigate } from 'react-router-dom';
// import { useAuth } from '../../auth';
import './NavBar.css';

const NavBar = ({ user, signout }) => {
  // const auth = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    // auth.signout();
    signout();
    navigate('/login');
  };
  return (
    <div>
      {user ? (
        <>
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </>
      )
        : (
          <>
            <Link to="/login">
              <button type="button">
                Login
              </button>
            </Link>
          </>
        )}
      <p>{user ? user.name : null}</p>
      <Outlet />
    </div>
  );
};

NavBar.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }),
  signout: PropTypes.func.isRequired,
};

NavBar.defaultProps = {
  user: null,
};

export default NavBar;
