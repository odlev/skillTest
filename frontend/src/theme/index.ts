import { createTheme } from '@mui/material';
import { components } from './components';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0a0c10',
      paper: '#111318'
    },
    primary: {
      main: '#00d4c8',
      contrastText: '#000000'
    },
    secondary: {
      main: '#7c3aed'
    },
    divider: 'rgba(255,255,255,0.07)',
    text: {
      primary: '#e2e8f0',
      secondary: '#8b9ab2'
    },
    error: { main: '#f87171' },
    success: { main: '#34d399' },
    warning: { main: '#fbbf24' }
  },
  typography: {
    fontFamily: '"Roboto", system-ui, sans-serif',
    h6: { fontWeight: 600 }
  },
  shape: {
    borderRadius: 10
  },
  components
});
