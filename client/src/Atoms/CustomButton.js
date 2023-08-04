import React from 'react';
import Button from '@mui/material/Button';

function CustomButton({ label, onClick, type, color }) {
  return (
    <Button variant="contained" color={color} type={type} onClick={onClick}>
      {label}
    </Button>
  );
}

export default CustomButton;
