// components/organisms/SignUpPage.js
import React, { useState } from 'react';
import SignUpForm from '../Molecules/SignUpForm';
import SignUpCompletePage from './SignUpCompletePage';

function SignUpPage({ handleLogin }) {
  const [isSignUpComplete, setIsSignUpComplete] = useState(false);

  function handleSignUpComplete() {
    setIsSignUpComplete(true);
  }

  return (
    <div style={{ textAlign: "center" }}>
      {isSignUpComplete ? (
        <SignUpCompletePage handleLogin={handleLogin}/>
      ) : (
        <>
          <h1>Create Account</h1>
          <SignUpForm handleSignUpComplete={handleSignUpComplete} />
        </>
      )}
    </div>
  );
}

export default SignUpPage;
