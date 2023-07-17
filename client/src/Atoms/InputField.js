import React from 'react';

function InputField({ label, placeholder, type, value, onChange }) {
  return (
    <div>
      <label>{label}</label>
      <input type={type} placeholder={placeholder} value={value} onChange={onChange} />
    </div>
  );
}

export default InputField;