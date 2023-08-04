import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Atoms/CustomButton';

function SignUpCompletePage() {
  const navigate = useNavigate();

  function handleGoToLoginPage() {
    navigate('/login');
  }

  function handleGoToMainPage() {
    navigate('/'); // Replace '/main' with the path of your main page
  }

  return (
    <div>
      <h1>Registration Complete!</h1>
      <p>Do you want to login now?</p>
      
      <Button
        label="Go back to Login"
        onClick={handleGoToLoginPage}
      />
      <Button
        label="Go to Main Page"
        onClick={handleGoToMainPage}
      />
    </div>
  );
}

export default SignUpCompletePage;
