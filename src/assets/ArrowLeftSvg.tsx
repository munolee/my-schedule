import { FC } from 'react';
import { Colors } from '@styles/theme';

interface ArrowLeftSvgProps {
  width?: number;
  height?: number;
  bgColor?: string;
}

const ArrowLeftSvg: FC<ArrowLeftSvgProps> = ({ width = 24, height = 24, bgColor = Colors.white }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M11.29,12l3.54-3.54a1,1,0,0,0,0-1.41,1,1,0,0,0-1.42,0L9.17,11.29a1,1,0,0,0,0,1.42L13.41,17a1,1,0,0,0,.71.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41Z"
        fill={bgColor}
      />
    </svg>
  );
};

export default ArrowLeftSvg;
