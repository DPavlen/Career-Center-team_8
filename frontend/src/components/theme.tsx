import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1D6BF3',
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
    h1: {
      fontFamily: 'YS Display',
      fontSize: '34px',
      fontWeight: 500,
      margin: '40px 0 32px 0',
    },
    subtitle1: {
      fontFamily: 'YS Text',
      fontSize: '14px',
      fontWeight: 400,
      color: 'var(--Black-500)',
    },
  },
  components: {
    MuiChip: {
      styleOverrides: {
        root: {
          fontFamily: 'YS Text',
          fontWeight: 400,
          borderRadius: '6px',
          fontSize: '13px',
          color: 'var(--Black-900)',
        },
      },
    },
  },
});

export default theme;
