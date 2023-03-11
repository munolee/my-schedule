import { useCallback, useRef } from 'react';
import { toolTipAtom } from '@store/toolTip';
import { useRecoilState } from 'recoil';

export interface Position {
  positionX: number;
  positionY: number;
}

export type ToolTipStateType = {
  focus: boolean;
} & Position;

type UseToolTipType = {
  visible: boolean;
  showToolTip: (position: Position) => void;
  hideToolTip: () => void;
} & Position;

const useToolTip = (): UseToolTipType => {
  const [toolTip, setToolTip] = useRecoilState(toolTipAtom);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>();

  const showToolTip = useCallback(
    (position: Position) => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      debounceTimerRef.current = setTimeout(() => {
        setToolTip({
          focus: true,
          ...position,
        });
      }, 100);
    },
    [toolTip]
  );

  const hideToolTip = useCallback(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    setToolTip({
      focus: false,
      positionX: 0,
      positionY: 0,
    });
  }, [toolTip]);

  return {
    visible: toolTip.focus,
    positionX: toolTip.positionX,
    positionY: toolTip.positionY,
    showToolTip,
    hideToolTip,
  };
};

export default useToolTip;
