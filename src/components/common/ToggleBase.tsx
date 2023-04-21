import { FC, PropsWithChildren } from 'react';
import styled from '@emotion/styled';

interface ToggleBaseProps {
  toggle: boolean;
  setToggle: () => void;
  size?: number;
}

const ToggleBase: FC<PropsWithChildren<ToggleBaseProps>> = ({ children, toggle, setToggle, size = 30 }) => {
  return (
    <ToggleButton size={size} onClick={setToggle}>
      <StyledCircle size={size} toggle={toggle}>
        {children}
      </StyledCircle>
    </ToggleButton>
  );
};

export default ToggleBase;

const ToggleButton = styled.button<{ size: number }>`
  position: relative;
  width: ${({ size }) => size * 0.2}rem;
  height: ${({ size }) => size * 0.1}rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20rem;
  background-color: ${({ theme }) => theme.calendarBorder};
  transition: background-color 0.2s ease;
  cursor: pointer;
`;

const StyledCircle = styled.div<{ size: number; toggle: boolean }>`
  padding: 0.2rem;
  position: absolute;
  left: 0;
  width: ${({ size }) => (size - 1) * 0.1}rem;
  height: ${({ size }) => (size - 1) * 0.1}rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20rem;
  background-color: ${({ theme }) => theme.calendarBackground};
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.05);
  transform: ${({ toggle, size }) => (toggle ? 'translate3d(0, 0, 0)' : `translate3d(${(size + 1) * 0.1}rem, 0, 0)`)};
  transition: transform 0.2s ease-in-out;
`;
