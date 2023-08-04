import { createTheme } from '@mui/material/styles';

const muiTheme = createTheme({
  components: {   
    MuiButton: {
        styleOverrides: {
        containedPrimary: {
            backgroundColor: 'green', // Change the background color of primary contained button here
            },
        },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'green', // Change the border color here
              borderWidth: '3px', // Increase the border width here
            },
          },
        },
      },
    },
  },
});

export default muiTheme;
