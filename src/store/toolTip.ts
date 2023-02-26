import { atom } from 'recoil';
import { ToolTipStateType } from '@hooks/useToolTip';

export const toolTipAtom = atom<ToolTipStateType>({
  key: 'toolTipState',
  default: {
    focus: false,
    positionX: 0,
    positionY: 0,
  },
});
