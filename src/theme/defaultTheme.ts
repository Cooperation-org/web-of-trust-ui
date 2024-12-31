import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    t3BodyText: string;
    bgCredentialDetails: string;
  }
  interface PaletteOptions {
    t3BodyText: string;
    bgCredentialDetails: string;
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
      main: '#003FE0',
    },
    secondary: {
      main: '#dc004e',
    },
    t3BodyText: '#202e5b',
    bgCredentialDetails: '#C2F1BE',
  },
});
