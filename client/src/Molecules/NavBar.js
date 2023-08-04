import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GenreList from '../Atoms/GenreList';

function Navbar({ isLoggedIn, handleLogout }) {
  const navigate = useNavigate();
  const [showGenreList, setShowGenreList] = useState(false);
  const [showLogoutAndMypage, setShowLogoutAndMypage] = useState(false);

  const toggleGenreList = () => {
    setShowGenreList(!showGenreList);
  };

  const onClickLogout = () => {
    fetch('/logout', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.ok)
      .then(() => {
        handleLogout();
        navigate('/');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const onClickToHome = () => {
    navigate('/')
  }

  const onClickToSearch = () => {
    navigate('/search')
  }

  const onClickMypage = () => {
    // Handle the navigation to the user's dashboard or my page here
    navigate('/dashboard'); // Replace '/dashboard' with the actual path to the user's dashboard or my page
  };

  const onClickToLogin = () => {
    navigate('/login')
  }

  return (
    <nav>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <ul style={{ display: 'flex', listStyle: 'none' }}>
          <li onClick={onClickToHome} style={{ cursor: 'pointer', marginRight: '10px' }}>Home</li>
          <li onClick={toggleGenreList} style={{ cursor: 'pointer', marginRight: '10px' }}>Browse</li>
          <li onClick={onClickToSearch} style={{ cursor: 'pointer', marginRight: '10px' }}>Search</li>
        </ul>
        <ul style={{ display: 'flex', listStyle: 'none' }}>
          {isLoggedIn ? (
            <>
              <li onClick={() => setShowLogoutAndMypage(!showLogoutAndMypage)} style={{ cursor: 'pointer', marginRight: '10px' }}>My</li>
              {showLogoutAndMypage && (
                <ul style={{ display: 'flex', listStyle: 'none', flexDirection: 'column' }}>
                  <li onClick={onClickMypage} style={{ cursor: 'pointer', marginRight: '10px' }}>Dashboard</li>
                  <li onClick={onClickLogout} style={{ cursor: 'pointer', marginRight: '10px' }}>Logout</li>
                </ul>
              )}
            </>
          ) : (
              <li onClick={ onClickToLogin } style={{ cursor: 'pointer', marginRight: '10px' }}>Log In</li>
          )}
        </ul>
      </div>
      <div>
        {showGenreList && (
          <div>
            <h3>Genres</h3>
            <GenreList />
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
