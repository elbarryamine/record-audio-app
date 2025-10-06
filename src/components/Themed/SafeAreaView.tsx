import Box, { ThemedBoxProps } from '@/components/Themed/Box';
import { ReactNode } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type ScreenSafeAreaProps = { children?: ReactNode; withTabBar?: boolean } & ThemedBoxProps;
const SafeAreaView = ({ children, ...props }: ScreenSafeAreaProps) => {
  const insets = useSafeAreaInsets();
  const { style, ...rest } = props;

  return (
    <Box
      style={[
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
        style,
      ]}
      bg='background'
      flex={1}
      {...rest}
    >
      {children}
    </Box>
  );
};
export default SafeAreaView;
