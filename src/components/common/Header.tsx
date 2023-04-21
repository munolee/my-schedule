import { FC, useState } from 'react';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import HamburgerSvg from '@assets/HamburgerSvg';
import NightSvg from '@assets/NightSvg';
import SunSvg from '@assets/SunSvg';
import FlatIcon from '@components/common/FlatIcon';
import SideBar from '@components/common/SideBar';
import ToggleBase from '@components/common/ToggleBase';
import { Theme } from '@hooks/useAppTheme';

interface HeaderProps {
  theme: Theme;
  toggleTheme: () => void;
}

const Header: FC<HeaderProps> = ({ theme, toggleTheme }) => {
  const { fontColor, fontSize } = useTheme();
  const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(false);

  return (
    <StyledHeader>
      <HeaderItem onClick={() => setIsSideBarOpen((prev) => !prev)} data-cy="login-header-sidebar-button">
        <FlatIcon size={fontSize.s26} color={fontColor}>
          <HamburgerSvg />
        </FlatIcon>
      </HeaderItem>
      <ToggleBase toggle={theme === Theme.Light} setToggle={toggleTheme}>
        {theme === Theme.Light ? (
          <FlatIcon size={fontSize.s20} color={fontColor}>
            <SunSvg />
          </FlatIcon>
        ) : (
          <FlatIcon size={fontSize.s26} color={fontColor}>
            <NightSvg />
          </FlatIcon>
        )}
      </ToggleBase>
      <SideBar isOpen={isSideBarOpen} setIsOpen={setIsSideBarOpen} />
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

const HeaderItem = styled.div`
  padding: 0.4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  cursor: pointer;
  border-radius: 20rem;
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.05);

  &:active {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;
