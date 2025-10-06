import { theme } from '@/utils/theme';
import * as React from 'react';
import Svg, { Path, Rect, SvgProps } from 'react-native-svg';

const SvgComponent: React.FC<SvgProps> = (props) => {
  return (
    <Svg
      width={24}
      height={24}
      viewBox='0 0 24 24'
      fill='none'
      stroke={theme.colors.background}
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}
    >
      <Path d='M12 19v3M19 10v2a7 7 0 01-14 0v-2' />
      <Rect x={9} y={2} width={6} height={13} rx={3} />
    </Svg>
  );
};

export default SvgComponent;
