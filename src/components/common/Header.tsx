import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

const Header: FC = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<string>('calendar');

  const handleLocation = (location: string) => {
    const now = new Date();
    const currentYear = now.getFullYear();
    let currentMonth = now.getMonth() + 1;
    // currentMonth = currentMonth >= 10 ? currentMonth : '0' + currentMonth;
    // let currentDate = new Date().getDate();
    // currentDate = currentDate >= 10 ? currentDate : '0' + currentDate;

    // if (location === 'calendar' && currentPage !== 'calendar') {
    //   navigate(
    //     {
    //       pathname: '/calendar',
    //       search: `date=${String(currentYear)}${String(currentMonth)}`,
    //     },
    //     {
    //       state: {
    //         date: new Date(now.getFullYear(), currentDate.getMonth(), 1),
    //       },
    //     }
    //   );
    // } else if (location === 'table' && currentPage !== 'table') {
    //   navigate({
    //     pathname: '/table',
    //     search: `date=${String(currentYear)}${String(currentMonth)}${String(currentDate)}`,
    //   });
    // }
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
  position: sticky;
  top: 0;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
`;

const HeaderList = styled.ul`
  display: flex;
`;

const HeaderMenuItem = styled.li<{ isActive: boolean }>`
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  opacity: ${({ isActive }) => (isActive ? '1' : '0.7')};
  cursor: pointer;
  border-radius: 10px;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }

  img {
    width: 24px;
    margin-bottom: 6px;
  }
`;

const MenuTitle = styled.div`
  font-size: 13px;
  font-weight: 500;
  color: #666666;
`;
