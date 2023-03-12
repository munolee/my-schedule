import styled from '@emotion/styled';
import { FC, useState } from 'react';

const Header: FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('calendar');

  const handleLocation = (location: string) => {
    setCurrentPage(location);
  };

  return (
    <StyledHeader>
      <HeaderList>
        <HeaderMenuItem isActive={currentPage === 'calendar'} onClick={() => handleLocation('calendar')}>
          <img src={'/image/home.png'} alt="home_btn_image" />
          <MenuTitle>전체 일정</MenuTitle>
        </HeaderMenuItem>
        <HeaderMenuItem isActive={currentPage === 'table'} onClick={() => handleLocation('table')}>
          <img src={'/image/time.png'} alt="time_table_btn_image" />
          <MenuTitle>근무&middot;일정</MenuTitle>
        </HeaderMenuItem>
      </HeaderList>
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.div`
  position: relative;
  top: 0;
  width: 100%;
  height: 8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.calendarBackground};
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.2);
`;

const HeaderList = styled.ul`
  display: flex;
`;

const HeaderMenuItem = styled.li<{ isActive: boolean }>`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  opacity: ${({ isActive }) => (isActive ? '1' : '0.7')};
  cursor: pointer;
  border-radius: 1rem;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  img {
    width: 2.4rem;
    margin-bottom: 0.6rem;
  }
`;

const MenuTitle = styled.div`
  font-size: ${({ theme }) => theme.fontSize.s12};
  font-weight: 500;
  color: ${({ theme }) => theme.fontColor};
`;
