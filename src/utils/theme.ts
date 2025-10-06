import { createTheme } from '@shopify/restyle';

export const theme = createTheme({
  colors: {
    background: '#ffffff',
    foreground: '#0f172a',

    primary: '#3b82f6',
    primaryForeground: '#ffffff',

    secondary: '#f1f5f9',
    secondaryForeground: '#0f172a',

    muted: '#f1f5f9',
    mutedForeground: '#475569',

    destructive: '#ef4444',
    destructiveForeground: '#ffffff',
  },
  textVariants: {
    defaults: {
      fontSize: 16,
      fontWeight: 'normal',
      color: 'foreground',
    },

    header: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'foreground',
    },

    body: {
      fontSize: 16,
      fontWeight: 'normal',
      color: 'foreground',
    },

    muted: {
      fontSize: 14,
      fontWeight: 'normal',
      color: 'mutedForeground',
    },
  },
  spacing: {
    auto: 'auto',
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
  },
  borderRadii: {
    s: 4,
    m: 8,
    l: 12,
    xl: 16,
  },
});

export type Theme = typeof theme;
