import { TextProps as RNTextProps } from 'react-native';
import { createText, TextProps } from '@shopify/restyle';
import { Theme } from '@/utils/theme';

const Text = createText<Theme>();
export default Text;

export type ThemedTextProps = TextProps<Theme> & RNTextProps;
