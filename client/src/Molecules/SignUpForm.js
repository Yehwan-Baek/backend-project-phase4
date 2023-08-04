import React, { useState } from 'react';
import InputField from '../Atoms/InputField';
import CustomButton from '../Atoms/CustomButton';

function SignUpForm({ handleSignUpComplete }) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    fetch('/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, username, password }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else if (res.status === 422) {
          return res.json().then((data) => {
            setErrors(data.errors);
            throw new Error('Validation failed');
          });
        } else {
          throw new Error('Request failed');
        }
      })
      .then((data) => {
        console.log(data);
        handleSignUpComplete();
        setEmail('');
        setUsername('');
        setPassword('');
        setErrors([]);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <InputField
        type="text"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
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
      <p>Password must be at least 6 characters or digits.</p>
      {errors.map((error, index) => (
        <p key={index} style={{ color: 'red' }}>{error}</p>
      ))}
      <CustomButton type="submit" label="Create Account" />
    </form>
  );
}

export default SignUpForm;
