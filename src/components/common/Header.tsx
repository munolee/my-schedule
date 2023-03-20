import { FC } from 'react';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import HamburgerSvg from '@assets/HamburgerSvg';
import NightSvg from '@assets/NightSvg';
import FlatIcon from '@components/common/FlatIcon';

interface HeaderProps {
  toggleTheme: () => void;
}

const Header: FC<HeaderProps> = ({ toggleTheme }) => {
  const { fontColor, fontSize, calendarBackground } = useTheme();

  return (
    <StyledHeader>
      <HeaderItem bgColor={'transparent'}>
        <FlatIcon size={fontSize.s26} color={fontColor}>
          <HamburgerSvg />
        </FlatIcon>
      </HeaderItem>
      <HeaderItem onClick={toggleTheme} bgColor={calendarBackground}>
        <FlatIcon size={fontSize.s26} color={fontColor}>
          <NightSvg />
        </FlatIcon>
      </HeaderItem>
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.div`
  padding: 0 2rem;
  position: relative;
  width: 100%;
  height: 4.8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderItem = styled.div<{ bgColor?: string }>`
  padding: 0.4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  cursor: pointer;
  border-radius: 20rem;
  background-color: ${({ bgColor }) => bgColor};
  box-shadow: ${({ bgColor }) => (bgColor === 'transparent' ? 'none' : '0 0 1rem 0 rgba(0, 0, 0, 0.05)')};

  &:active {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;
