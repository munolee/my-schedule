import React, { FC } from 'react';
import styled from '@emotion/styled';

type ButtonBaseProps = {
  text: string;
  onClick: () => void;
};

const ButtonBase: FC<ButtonBaseProps> = ({ text, onClick }) => {
  return <StyledButton onClick={onClick}>{text}</StyledButton>;
};

export default ButtonBase;

const StyledButton = styled.button`
  position: absolute;
  margin: 0;
  padding: 8px 12px 8px 12px;
  width: auto;
  display: inline-block;
  text-align: center;
  top: 0;
  right: 0;
  font-size: 15px;
  background-color: #ff7272;
  color: #ffffff;
  border: 1px solid #ffffff;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;
