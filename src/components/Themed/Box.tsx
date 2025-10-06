import { BoxProps, createBox } from '@shopify/restyle';
import { ViewProps } from 'react-native';
import { Theme } from '@/utils/theme';

const Box = createBox<Theme>();
export default Box;

export type ThemedBoxProps = BoxProps<Theme> & ViewProps;
