import React from 'react';
import type { Preview } from '@storybook/react';
import { ThemeProvider } from '@mui/material/styles';
import { defaultTheme } from '../src/theme/defaultTheme';

const preview: Preview = {
  decorators: [
    (Story) => {
      return React.createElement(ThemeProvider, { theme: defaultTheme }, React.createElement(Story));
    }
  ]
};

export default preview;