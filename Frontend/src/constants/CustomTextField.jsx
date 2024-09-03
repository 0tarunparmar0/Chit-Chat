import React, { useState } from 'react';
import { TextField, IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { deep_Purple } from './color';


function CustomTextField(props) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <TextField
      {...props}
      type={props.type === 'password' && showPassword ? 'text' : props.type}
      InputProps={{
        ...props.InputProps,
        style: {
          color: '#fffff', // Apply text color
          ...props.InputProps?.style,
        },
        endAdornment: props.type === 'password' ? (
          <InputAdornment position="end">
            <IconButton
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ) : null,
        style: {
          color: '#ffffff', 
          fontFamily: 'Poppins', 
        },
      }}
      InputLabelProps={{
        style: {
          color: deep_Purple,
          ...props.InputLabelProps?.style,
        },
      }}
  
      sx={{
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: '#b3b3ff', // Border color
          },
          '&:hover fieldset': {
            borderColor: '#ffffff',
            borderWidth: '2px', // Hover border color
          },
          '&.Mui-focused fieldset': {
            borderColor: '#ffffff', // Focused border color
          },
        },
        ...props.sx,
      }}
    />
  );
}

export default CustomTextField;
