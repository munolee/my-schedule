import { FC } from 'react';
import styled from '@emotion/styled';

const ToolTipBase: FC = () => {
  return (
    <StyledEventToolTip>
      <img src={'/image/user_icon.png'} alt="unknown_user_image" />
      <TooltipContent className={'event-user'}>이름</TooltipContent>
      <span className={'event-title'}>내용</span>
      <span className={'event-date'}>기간~기간</span>
    </StyledEventToolTip>
  );
};

export default ToolTipBase;

const StyledEventToolTip = styled.div`
  display: none;
  position: absolute;
  text-align: left;
  top: 0;
  left: 0;
  padding: 15px 15px;
  color: #ffffff;
  background: #333333;
  border-radius: 10px;
  font-size: 16px;
  z-index: 100;
  transition: 1s all;

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
    border-top: 15px solid #333333;
    border-left: 15px solid transparent;
    border-right: 0 solid transparent;
    border-bottom: 0 solid transparent;
    content: '';
    position: absolute;
    top: 10px;
    left: -15px;
  }

  &.active {
    display: block;
  }
  &.passive {
    display: none;
  }
`;

const TooltipContent = styled.span`
  display: inline-block;
  position: absolute;
  padding: 10px 10px;
`;
