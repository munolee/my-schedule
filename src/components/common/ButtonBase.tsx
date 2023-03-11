import React, { FC, PropsWithChildren } from 'react';
import styled, { CSSObject } from '@emotion/styled';
import { css } from '@emotion/react';
import { Colors } from '@styles/theme';

type ButtonType = 'button' | 'submit' | 'reset' | undefined;

interface ButtonBaseProps {
  text?: string;
  type?: ButtonType;
  onClick?: (e: React.MouseEvent) => void;
  width?: number;
  height?: number;
  textColor?: string;
  backgroundColor?: string;
  borderColor?: string;
  buttonStyle?: CSSObject;
}

const ButtonBase: FC<PropsWithChildren<ButtonBaseProps>> = ({
  children,
  text,
  type = 'button',
  onClick,
  width,
  height,
  textColor = Colors.white,
  backgroundColor = Colors.white,
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
  width: ${({ width }) => (width ? width / 10 + 'rem' : 'auto')};
  height: ${({ height }) => (height ? height / 10 + 'rem' : 'auto')};
  font-size: ${({ theme }) => theme.fontSize.s16};
  color: ${({ textColor }) => textColor};
  background-color: ${({ backgroundColor }) => backgroundColor};
  border: 0.1rem solid ${({ borderColor }) => (borderColor ? borderColor : 'none')};
  border-radius: 0.8rem;
  cursor: pointer;

  ${({ buttonStyle }) =>
    css`
      ${buttonStyle}
    `};

  :hover {
    opacity: 0.8;
  }
`;
