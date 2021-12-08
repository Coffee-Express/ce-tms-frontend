import React, { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import SubmitTicket from './pages/SubmitTicket/SubmitTicket';
import ViewTickets from './pages/ViewTickets/ViewTickets';
import NavBar from './components/NavBar/NavBar';
import CreateAccount from './components/CreateAccount/CreateAccount';
import Login from './pages/Login/Login';
import './App.css';

const App = () => {
  window.onload = () => {
    const numTabs = Number(window.localStorage.getItem('tabCounter'));
    if (!window.sessionStorage.getItem('refreshed')) {
      if (numTabs < 1) {
        window.localStorage.removeItem('user');
      }
    }
    window.localStorage.setItem('tabCounter', numTabs + 1);
  };

  const getUserFromlocalStorage = () => {
    const user = window.localStorage.getItem('user');
    try {
      const JSONUser = JSON.parse(user);
      return JSONUser;
    } catch (error) {
      return null;
    }
  };

  const [user, setUser] = useState(getUserFromlocalStorage);

  window.onbeforeunload = () => {
    const numTabs = Number(window.localStorage.getItem('tabCounter'));
    window.localStorage.setItem('tabCounter', numTabs - 1);
    window.sessionStorage.setItem('refreshed', true);
  };

  const signin = (newUser) => {
    setUser(newUser);
    window.localStorage.setItem('user', JSON.stringify(newUser));
  };

  const signout = () => {
    setUser(null);
    window.localStorage.removeItem('user');
  };

  // console.log(user);

  return (
    <Routes>
      <Route element={<NavBar user={user} signout={signout} />}>
        <Route path="/" element={<Navigate to="/create-ticket" />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/login" element={<Login user={user} signin={signin} />} />
        <Route
          path="/create-ticket"
          element={(
            <SubmitTicket />
      )}
        />
        <Route
          path="/view-tickets"
          element={(
            <ViewTickets user={user} />
          )}
        />
      </Route>
    </Routes>
  );
};

export default App;
