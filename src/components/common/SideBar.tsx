import { Dispatch, FC, SetStateAction } from 'react';
import styled from '@emotion/styled';

interface SideBarProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const SideBar: FC<SideBarProps> = ({ isOpen, setIsOpen }) => {
  return (
    <>
      <StyledSideBar isOpen={isOpen}>
        <SideBarContent></SideBarContent>
      </StyledSideBar>
      <Background isOpen={isOpen} onClick={() => setIsOpen(false)} />
    </>
  );
};

export default SideBar;

const StyledSideBar = styled.div<{ isOpen: boolean }>`
  z-index: 11;
  position: fixed;
  top: 0;
  left: 0;
  transform: ${({ isOpen }) => (isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-30rem, 0, 0)')};
  width: 30rem;
  height: 100vh;
  background-color: ${({ theme }) => theme.sideBar};
  opacity: ${({ isOpen }) => (isOpen ? '1' : '0.7')};
  transition: transform 0.2s ease-in-out, opacity 0.2s ease-in-out;

  @media (max-width: 900px) {
    width: 18rem;
  }
`;

const SideBarContent = styled.div`
  padding: 1.6rem;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
`;

const Background = styled.div<{ isOpen: boolean }>`
  z-index: 10;
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  background-color: ${({ isOpen }) => (isOpen ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0)')};
  transition: background-color 0.3s ease;
`;
