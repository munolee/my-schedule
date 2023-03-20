import { FC } from 'react';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import CalendarSvg from '@assets/CalendarSvg';
import PlusRoundSvg from '@assets/PlusRoundSvg';
import UserSvg from '@assets/UserSvg';
import FlatIcon from '@components/common/FlatIcon';
import useAuthLogin from '@hooks/useAuthLogin';
import { ModalPropsType } from '@hooks/useModal';
import useToast, { ToastEnumType } from '@hooks/useToast';

interface BottomNavigationProps {
  createScheduleModalProps?: ModalPropsType;
}

const BottomNavigation: FC<BottomNavigationProps> = ({ createScheduleModalProps }) => {
  const { fontColor, fontSize } = useTheme();
  const { t } = useTranslation();
  const { pathname, push } = useRouter();
  const { showToast } = useToast();
  const { hasSignedIn } = useAuthLogin();

  return (
    <StyledBottomNavigation>
      <NavigationList>
        <MenuItem isActive={pathname === '/'}>
          <FlatIcon size={fontSize.s22} color={fontColor}>
            <CalendarSvg />
          </FlatIcon>
          <MenuTitle>{t('header:fullSchedule')}</MenuTitle>
        </MenuItem>
        {/* TODO 메모 기능 추가 사항 */}
        {/*<MenuItem*/}
        {/*  isActive={false}*/}
        {/*  onClick={() => showToast({ type: ToastEnumType.Error, message: t('common:toastMessage.inReady') })}*/}
        {/*>*/}
        {/*  <FlatIcon size={fontSize.s24} color={fontColor}>*/}
        {/*    <MemoSvg />*/}
        {/*  </FlatIcon>*/}
        {/*  <MenuTitle>{t('header:scheduleMemo')}</MenuTitle>*/}
        {/*</MenuItem>*/}
        <MenuItem
          onClick={() => {
            if (!hasSignedIn()) {
              showToast({ type: ToastEnumType.Error, message: '로그인이 필요합니다.' });
              return;
            }
            createScheduleModalProps?.showModal();
          }}
        >
          <FlatIcon size={fontSize.s22} color={fontColor}>
            <PlusRoundSvg />
          </FlatIcon>
          <MenuTitle>일정 등록</MenuTitle>
        </MenuItem>
        <MenuItem
          isActive={pathname === '/login'}
          onClick={() => {
            push('/login');
          }}
        >
          <FlatIcon size={fontSize.s22} color={fontColor}>
            <UserSvg />
          </FlatIcon>
          <MenuTitle>로그인</MenuTitle>
        </MenuItem>
      </NavigationList>
    </StyledBottomNavigation>
  );
};

const StyledBottomNavigation = styled.div`
  z-index: 9;
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 600px;
  height: 6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.calendarBackground};
  border-top: 0.1rem solid ${({ theme }) => theme.calendarBorder};
`;

const NavigationList = styled.ul`
  display: flex;
  gap: 2.4rem;
`;

const MenuItem = styled.li<{ isActive?: boolean }>`
  padding: 0.4rem;
  display: flex;
  min-width: 6rem;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  opacity: ${({ isActive }) => (isActive ? '1' : '0.7')};
  cursor: pointer;
  border-radius: 1rem;

  &:hover {
    opacity: 1;
  }
`;

const MenuTitle = styled.div`
  font-size: ${({ theme }) => theme.fontSize.s14};
  font-weight: 500;
  color: ${({ theme }) => theme.fontColor};
`;

export default BottomNavigation;
