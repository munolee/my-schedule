import { FC, memo, PropsWithChildren } from 'react';
import { ValueOf } from 'type-fest';
import { Colors, FontSize } from '@styles/theme';

interface FlatIconProps {
  size: ValueOf<typeof FontSize>;
  color?: ValueOf<typeof Colors>;
}

const FlatIcon: FC<PropsWithChildren<FlatIconProps>> = ({ children, size = FontSize.s16, color }) => {
  return (
    <i
      style={{
        display: 'flex',
        width: size,
        height: size,
        color: color,
      }}
    >
      {children}
    </i>
  );
};

export default memo(FlatIcon);
