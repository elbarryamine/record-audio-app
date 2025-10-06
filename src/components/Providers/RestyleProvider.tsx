import { theme } from '@/utils/theme';
import { ThemeProvider } from '@shopify/restyle';
import React from 'react';

const RestyleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default RestyleProvider;
