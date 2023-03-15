import { FC } from 'react';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import CalendarSvg from '@assets/CalendarSvg';
import MemoSvg from '@assets/MemoSvg';
import FlatIcon from '@components/common/FlatIcon';
import useToast, { ToastEnumType } from '@hooks/useToast';

const Header: FC = () => {
  const { fontColor, fontSize } = useTheme();
  const { t } = useTranslation();
  const { pathname } = useRouter();
  const { showToast } = useToast();

  return (
    <StyledHeader>
      <HeaderList>
        <HeaderMenuItem isActive={pathname === '/'}>
          <FlatIcon size={fontSize.s20} color={fontColor}>
            <CalendarSvg />
          </FlatIcon>
          <MenuTitle>{t('header:fullSchedule')}</MenuTitle>
        </HeaderMenuItem>
        <HeaderMenuItem
          isActive={false}
          onClick={() => showToast({ type: ToastEnumType.Error, message: t('common:toastMessage.inReady') })}
        >
          <FlatIcon size={fontSize.s20} color={fontColor}>
            <MemoSvg />
          </FlatIcon>
          <MenuTitle>{t('header:scheduleMemo')}</MenuTitle>
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
  height: 6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.calendarBackground};
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.2);
`;

const HeaderList = styled.ul`
  display: flex;
  gap: 0.8rem;
`;

const HeaderMenuItem = styled.li<{ isActive: boolean }>`
  padding: 0.4rem;
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
  font-size: ${({ theme }) => theme.fontSize.s14};
  font-weight: 500;
  color: ${({ theme }) => theme.fontColor};
`;
