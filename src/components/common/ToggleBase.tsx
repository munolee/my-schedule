import { FC } from 'react';
import styled from '@emotion/styled';

interface ToggleBaseProps {
  size: number;
  toggle: boolean;
  setToggle: () => void;
}

const ToggleBase: FC<ToggleBaseProps> = ({ size, toggle, setToggle }) => {
  return (
    <ToggleButton size={size} toggle={toggle} onClick={setToggle}>
      <StyledCircle size={size} toggle={toggle} />
    </ToggleButton>
  );
};

export default ToggleBase;

const ToggleButton = styled.button<{ size: number; toggle: boolean }>`
  position: relative;
  width: ${({ size }) => size * 0.2}rem;
  height: ${({ size }) => size * 0.1}rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20rem;
  background-color: ${({ theme, toggle }) => (toggle ? theme.colors.red020 : 'none')};
  transition: background-color 0.2s ease;
  cursor: pointer;
`;

const StyledCircle = styled.div<{ size: number; toggle: boolean }>`
  position: absolute;
  left: 0;
  padding: 0.4rem;
  width: ${({ size }) => size * 0.09}rem;
  height: ${({ size }) => size * 0.09}rem;
  border-radius: 50px;
  background-color: ${({ theme }) => theme.colors.white};
  transform: ${({ toggle, size }) =>
    toggle ? `translate3d(${size * 0.09}rem, 0, 0)` : `translate3d(${size * 0.01}rem, 0, 0)`};
  transition: transform 0.2s ease-in-out;
`;
