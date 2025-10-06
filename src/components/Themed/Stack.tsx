import React from 'react';
import { Theme } from '@/utils/theme';
import Box, { ThemedBoxProps } from './Box';
import { useTheme } from '@shopify/restyle';

type SpacingKeys = keyof Theme['spacing'];

export type ThemedStackProps = ThemedBoxProps & {
  children?: React.ReactNode;
  spacing?: SpacingKeys | number;
  horizontal?: boolean;
};

const Stack: React.FC<ThemedStackProps> = ({ children, spacing = 's', horizontal = false, ...rest }) => {
  const theme = useTheme();
  if (spacing === 'auto') {
    throw new Error('Spacing cannot be "auto" for Stack');
  }
  const spacingValue = typeof spacing === 'number' ? spacing : theme.spacing[spacing];
  const direction = horizontal ? 'row' : 'column';

  // Filter out falsy children (null, undefined, false, etc.)
  const filteredChildren = React.Children.toArray(children).filter(Boolean);

  return (
    <Box flexDirection={direction} {...rest}>
      {filteredChildren.map((child, index) => (
        <React.Fragment key={index}>
          {child}
          {index !== filteredChildren.length - 1 && (
            <Box width={horizontal ? spacingValue : 0} height={!horizontal ? spacingValue : 0} />
          )}
        </React.Fragment>
      ))}
    </Box>
  );
};

export default Stack;
