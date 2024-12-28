import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    t3BodyText: string;
  }
  interface PaletteOptions {
    t3BodyText: string;
  }
}

export const defaultTheme = createTheme({
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
        t3BodyText: '#202e5b',

  },
});
