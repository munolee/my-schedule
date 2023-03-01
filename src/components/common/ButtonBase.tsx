import { FC } from 'react';
import styled, { CSSObject } from '@emotion/styled';
import { css } from '@emotion/react';

type ButtonBaseProps = {
  text: string;
  onClick: () => void;
  width?: number;
  height?: number;
  textColor?: string;
  backgroundColor?: string;
  borderColor?: string;
  buttonStyle?: CSSObject;
};

const ButtonBase: FC<ButtonBaseProps> = ({
  text,
  onClick,
  width,
  height,
  textColor = '#ffffff',
  backgroundColor = '#ffffff',
  borderColor = '#ffffff',
  buttonStyle,
}) => {
  return (
    <StyledButton
      onClick={onClick}
      width={width}
      height={height}
      textColor={textColor}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      buttonStyle={buttonStyle}
    >
      {text}
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
  padding: 8px 12px;
  width: ${({ width }) => (width ? width : 'auto')};
  height: ${({ height }) => (height ? height : 'auto')};
  font-size: 16px;
  color: ${({ textColor }) => textColor};
  background-color: ${({ backgroundColor }) => backgroundColor};
  border: 1px solid ${({ borderColor }) => borderColor};
  border-radius: 10px;
  cursor: pointer;
  ${({ buttonStyle }) =>
    css`
      ${buttonStyle}
    `};

  :hover {
    opacity: 0.8;
  }
`;
