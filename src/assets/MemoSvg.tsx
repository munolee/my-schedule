import { FC } from 'react';
import { Colors } from '@styles/theme';

interface MemoSvgProps {
  width?: number;
  height?: number;
  bgColor?: string;
}

const MemoSvg: FC<MemoSvgProps> = ({ width = 30, height = 30, bgColor = Colors.white }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5 4a1 1 0 0 0-1 1v16a1 1 0 0 0 .293.707l6 6A1 1 0 0 0 11 28h16a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1Zm1 2h20v20H12v-5a1 1 0 0 0-1-1H6Z"
        fill={bgColor}
      />
      <path
        d="M12.014 12h7.972c1.352.02 1.352-2.02 0-2h-7.972A.999.999 0 0 0 11 11.01c.01.557.462.998 1.014.99zm0 4h7.972c1.352.02 1.352-2.02 0-2h-7.972A.999.999 0 0 0 11 15.01c.01.557.462.998 1.014.99zm4 2h3.972c1.352-.02 1.352 2.019 0 2h-3.972A.999.999 0 0 1 15 18.99c.01-.557.462-.998 1.014-.99z"
        fill={bgColor}
      />
    </svg>
  );
};

export default MemoSvg;
