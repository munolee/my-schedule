import { FC } from 'react';
import styled from '@emotion/styled';

type ButtonBaseProps = {
  text: string;
  onClick: () => void;
  width?: number;
  height?: number;
  textColor?: string;
  backgroundColor?: string;
  borderColor?: string;
};

const ButtonBase: FC<ButtonBaseProps> = ({
  text,
  onClick,
  width,
  height,
  textColor = '#ffffff',
  backgroundColor = '#ffffff',
  borderColor = '#ffffff',
}) => {
  return (
    <StyledButton
      onClick={onClick}
      width={width}
      height={height}
      textColor={textColor}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
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

  :hover {
    opacity: 0.8;
  }
`;
