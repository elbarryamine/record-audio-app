import React from 'react';
import { ActivityIndicator, Pressable, PressableProps } from 'react-native';
import {
  spacing,
  border,
  backgroundColor,
  backgroundColorShorthand,
  opacity,
  OpacityProps,
  SpacingProps,
  BorderProps,
  BackgroundColorProps,
  layout,
  LayoutProps,
  spacingShorthand,
  SpacingShorthandProps,
  createRestyleComponent,
  BackgroundColorShorthandProps,
} from '@shopify/restyle';

import Text from './Text';
import { Theme } from '@/utils/theme';

type RestyleProps = SpacingProps<Theme> &
  BorderProps<Theme> &
  BackgroundColorProps<Theme> &
  BackgroundColorShorthandProps<Theme> &
  LayoutProps<Theme> &
  SpacingShorthandProps<Theme> &
  OpacityProps<Theme> &
  PressableProps;

const RestylePressable = createRestyleComponent<RestyleProps, Theme>(
  [spacing, layout, border, backgroundColor, backgroundColorShorthand, spacingShorthand, opacity],
  Pressable
);

type ButtonVariant = 'primary' | 'secondary' | 'destructive';
interface VariantStyle {
  backgroundColor: keyof Theme['colors'];
  textColor: keyof Theme['colors'];
}

type Props = {
  onPress: () => void;
  label: string;
  loading?: boolean;
  disabled?: boolean;
  variant?: ButtonVariant;
  icon?: React.ReactNode;
} & RestyleProps;

const Button: React.FC<Props> = ({
  onPress,
  label,
  loading = false,
  disabled = false,
  variant = 'primary',
  icon,
  ...props
}) => {
  const { backgroundColor, textColor } = variants[variant];

  return (
    <RestylePressable
      onPress={onPress}
      disabled={disabled || loading}
      backgroundColor={backgroundColor}
      opacity={disabled || loading ? 0.8 : 1}
      px='l'
      borderRadius='l'
      height={50}
      alignItems='center'
      justifyContent='center'
      flexDirection='row'
      gap='s'
      {...props}
    >
      {loading ? <ActivityIndicator color={textColor} size='small' /> : <Text color={textColor}>{label}</Text>}
      {icon}
    </RestylePressable>
  );
};

export default Button;
const variants: Record<ButtonVariant, VariantStyle> = {
  primary: {
    backgroundColor: 'primary',
    textColor: 'primaryForeground',
  },
  secondary: {
    backgroundColor: 'secondary',
    textColor: 'secondaryForeground',
  },
  destructive: {
    backgroundColor: 'destructive',
    textColor: 'destructiveForeground',
  },
};
