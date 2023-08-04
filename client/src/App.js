import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LogInPage from "./Organisms/LogInPage";
import SignUpPage from "./Organisms/SignUpPage";
import MainPage from "./Organisms/MainPage";
import AdminDashboard from "./Organisms/AdminDashboard";
import UserDashboard from "./Organisms/UserDashboard";
import AnimeDetails from "./Organisms/AnimeDetails";
import AnimeIndex from "./Organisms/AnimeIndex";
import Search from "./Organisms/Search";
import { ThemeProvider } from '@mui/material/styles';
import muiTheme from './muiTheme';
import './style/all.css';

function PrivateRoute({ element, isLoggedIn }) {
  return isLoggedIn ? (
    element
  ) : (
    <Navigate to="/" replace />
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    setIsAdmin(userData.account_role === 1);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUser(null);
  };

  useEffect(() => {
    const loggedInState = localStorage.getItem('isLoggedIn');
    const adminState = localStorage.getItem('isAdmin');
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (loggedInState === 'true') {
      setIsLoggedIn(true);
    }
    if (adminState === 'true') {
      setIsAdmin(true);
    }
    if (userData) {
      setUser(userData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn);
    localStorage.setItem('isAdmin', isAdmin);
    if (user) {
      localStorage.setItem('userData', JSON.stringify(user));
    }
  }, [isLoggedIn, isAdmin, user]);

  const RedirectToDashboard = () => <Navigate to="/dashboard" replace />;

  return (
    <ThemeProvider theme={muiTheme}>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage isLoggedIn={isLoggedIn} handleLogout={handleLogout} />} />
          <Route path="/login" element={isLoggedIn ? <RedirectToDashboard /> : <LogInPage handleLogin={handleLogin} />} />
          <Route path="/signup" element={isLoggedIn ? <RedirectToDashboard /> : <SignUpPage handleLogin={handleLogin} />} />
          <Route path="/animes/:animeId" element={<AnimeDetails isLoggedIn={isLoggedIn} handleLogout={handleLogout} isAdmin={isAdmin} />} />
          <Route path="/genre/:genre" element={<AnimeIndex isLoggedIn={isLoggedIn} handleLogout={handleLogout} />} />
          <Route path="/search" element={<Search isLoggedIn={isLoggedIn} handleLogout={handleLogout} />} />
          <Route
            path="/dashboard"
            element={<PrivateRoute isLoggedIn={isLoggedIn} isAdmin={isAdmin} element={isAdmin ? <AdminDashboard isLoggedIn={isLoggedIn} handleLogout={handleLogout} /> : <UserDashboard isLoggedIn={isLoggedIn} handleLogout={handleLogout} />} />}
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
