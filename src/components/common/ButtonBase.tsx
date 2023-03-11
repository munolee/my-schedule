import React, { FC, PropsWithChildren } from 'react';
import styled, { CSSObject } from '@emotion/styled';
import { css } from '@emotion/react';

type ButtonType = 'button' | 'submit' | 'reset' | undefined;

type ButtonBaseProps = {
  text?: string;
  type?: ButtonType;
  onClick?: (e: React.MouseEvent) => void;
  width?: number;
  height?: number;
  textColor?: string;
  backgroundColor?: string;
  borderColor?: string;
  buttonStyle?: CSSObject;
};

const ButtonBase: FC<PropsWithChildren<ButtonBaseProps>> = ({
  children,
  text,
  type = 'button',
  onClick,
  width,
  height,
  textColor = '#ffffff',
  backgroundColor = '#ffffff',
  borderColor,
  buttonStyle,
}) => {
  return (
    <StyledButton
      type={type}
      onClick={onClick}
      width={width}
      height={height}
      textColor={textColor}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      buttonStyle={buttonStyle}
    >
      {children ? children : text}
    </StyledButton>
  );
};

export default ButtonBase;

const StyledButton = styled.button<{
  width?: number;
  height?: number;
  textColor?: string;
  backgroundColor?: string;
  borderColor?: string;
  buttonStyle?: CSSObject;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ width }) => (width ? width + 'px' : 'auto')};
  height: ${({ height }) => (height ? height + 'px' : 'auto')};
  font-size: 16px;
  color: ${({ textColor }) => textColor};
  background-color: ${({ backgroundColor }) => backgroundColor};
  border: 1px solid ${({ borderColor }) => (borderColor ? borderColor : 'none')};
  border-radius: 8px;
  cursor: pointer;
  ${({ buttonStyle }) =>
    css`
      ${buttonStyle}
    `};

  :hover {
    opacity: 0.8;
  }
`;
