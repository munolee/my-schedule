import styled from '@emotion/styled';
import { FC } from 'react';
import useToolTip from '@hooks/useToolTip';

const ToolTipBase: FC = () => {
  const { visible, positionX, positionY } = useToolTip();

  return (
    <StyledToolTip visible={visible} positionX={positionX} positionY={positionY}>
      <img src={'/image/user_icon.png'} alt="unknown_user_image" />
      <TooltipContent className={'event-user'}>이름</TooltipContent>
      <span className={'event-title'}>내용</span>
      <span className={'event-date'}>기간~기간</span>
    </StyledToolTip>
  );
};

export default ToolTipBase;

const StyledToolTip = styled.div<{ visible: boolean; positionX: number; positionY: number }>`
  position: absolute;
  padding: 1.6rem;
  top: 0;
  left: 0;
  display: ${({ visible }) => (visible ? 'block' : 'none')};
  color: ${({ theme }) => theme.fontColor};
  background-color: ${({ theme }) => theme.colors.gray070};
  border-radius: 1rem;
  font-size: ${({ theme }) => theme.fontSize.s16};
  z-index: 10;
  transform: ${({ positionX, positionY }) => `translate3d(${positionX}px, ${positionY}px, 0)`};
  transition: transform 0.6s cubic-bezier(0.65, 0, 0.35, 1) 0.1s;
  will-change: transform;

  span {
    display: block;
    font-size: ${({ theme }) => theme.fontSize.s12};
  }

  img {
    width: 3rem;
    border: ${({ theme }) => `0.3rem solid ${theme.colors.gray020}`};
    border-radius: 3rem;
    background-color: ${({ theme }) => theme.colors.gray020};
  }

  &:after {
    position: absolute;
    top: 1rem;
    left: -1.5rem;
    border-top: ${({ theme }) => `1.5rem solid ${theme.colors.gray070}`};
    border-left: 1.5rem solid transparent;
    border-right: 0 solid transparent;
    border-bottom: 0 solid transparent;
    content: '';
  }
`;

const TooltipContent = styled.span`
  display: inline-block;
  position: absolute;
  padding: 1rem;
`;
