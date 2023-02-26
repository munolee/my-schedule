import { FC } from 'react';
import styled from '@emotion/styled';
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
  padding: 16px;
  top: 0;
  left: 0;
  display: ${({ visible }) => (visible ? 'block' : 'none')};
  color: #ffffff;
  background: #333333;
  border-radius: 10px;
  font-size: 16px;
  z-index: 10;
  transform: ${({ positionX, positionY }) => `translate3d(${positionX}px, ${positionY}px, 0)`};
  transition: transform 0.6s cubic-bezier(0.65, 0, 0.35, 1) 0.1s;
  will-change: transform;

  span {
    display: block;
    font-size: 12px;
  }

  img {
    width: 30px;
    border: 3px solid #e9e9e9;
    border-radius: 30px;
    background: #e9e9e9;
  }

  &:after {
    position: absolute;
    top: 10px;
    left: -15px;
    border-top: 15px solid #333333;
    border-left: 15px solid transparent;
    border-right: 0 solid transparent;
    border-bottom: 0 solid transparent;
    content: '';
  }
`;

const TooltipContent = styled.span`
  display: inline-block;
  position: absolute;
  padding: 10px 10px;
`;
