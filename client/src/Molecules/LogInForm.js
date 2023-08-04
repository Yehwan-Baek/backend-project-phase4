import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputField from '../Atoms/InputField';
import CustomButton from '../Atoms/CustomButton';

function LogInForm({ handleLogin }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Request failed');
        }
      })
      .then((user) => {
        console.log(user);
        handleLogin(user);
        navigate('/dashboard');
        setUsername('');
        setPassword('');
        setError(''); // Clear any previous error on successful login
      })
      .catch((error) => {
        console.error('Error:', error);
        setError('Invalid username or password'); // Set the error message for invalid credentials
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display the error message, if any */}
      <InputField
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <InputField
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <CustomButton type="submit" label="Log In"/>
      <p>
        No account? <Link to="/signup">CREATE ONE</Link>
      </p>
    </form>
  );
}

export default LogInForm;
