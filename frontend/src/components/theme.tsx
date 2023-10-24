import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#5A9BFF',
      light: '#ACCCFF',
      dark: '#1D6BF3',
      contrastText: '#1A1B22',
    },
    secondary: {
      main: '#FF0200',
    },
    error: {
      main: '#FF0200',
    },
  },
  typography: {
    fontFamily: "'YS Text', 'Roboto', sans-serif",
  },
  components: {
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
        },
      },
    },
  },
});

export default theme;
