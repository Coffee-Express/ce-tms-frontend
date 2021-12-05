import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
// import { useAuth } from '../../auth';
import './NavBar.css';

const NavBar = () => {
  // const auth = useAuth();
  const user = window.localStorage.getItem('user');
  const navigate = useNavigate();
  const handleLogout = () => {
    // auth.signout();
    window.localStorage.removeItem('user');
    navigate('/login');
  };
  return (
    <div>
      {window.localStorage.getItem('user') ? (
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
      <p>{user ? JSON.parse(window.localStorage.getItem('user')).name : null}</p>
      <Outlet />
    </div>
  );
};

export default NavBar;
