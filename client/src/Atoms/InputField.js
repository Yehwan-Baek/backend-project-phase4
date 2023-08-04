import React from "react";
import TextField from "@mui/material/TextField";

function InputField({ label, placeholder, type, value, onChange, width, height, multiline }) {
  const inputStyle = {
    color: "white",
    width: width,
    height: height,
  };

  return (
    <div>
      <TextField
        label={label}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
        multiline={multiline} // Added multiline prop here
        rows={multiline ? "4" : undefined} // Set the number of rows for multiline
        InputProps={{
          style: inputStyle,
        }}
      />
    </div>
  );
}

export default InputField;
