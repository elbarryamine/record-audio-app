import { theme } from '@/utils/theme';
import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

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
      <Path d='M5 5a2 2 0 013.008-1.728l11.997 6.998a2 2 0 01.003 3.458l-12 7A2 2 0 015 19z' />
    </Svg>
  );
};

export default SvgComponent;
