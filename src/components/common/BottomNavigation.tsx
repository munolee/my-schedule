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
  createScheduleModal?: ModalPropsType;
}

const BottomNavigation: FC<BottomNavigationProps> = ({ createScheduleModal }) => {
  const { userLogout, isLoggedIn } = useAuthLogin();
  const { mutateAsync: logoutMutation } = userLogout();

  const { fontColor, fontSize } = useTheme();
  const { t } = useTranslation();
  const { pathname, push } = useRouter();
  const { showToast } = useToast();

  return (
    <StyledBottomNavigation>
      <NavigationList>
        <MenuItem isActive={pathname === '/'} onClick={() => push('/')}>
          <FlatIcon size={fontSize.s22} color={fontColor}>
            <CalendarSvg />
          </FlatIcon>
          <MenuTitle>{t('navigation:fullSchedule')}</MenuTitle>
        </MenuItem>
        {/* TODO 메모 기능 추가 사항 */}
        {/*<MenuItem*/}
        {/*  isActive={false}*/}
        {/*  onClick={() => showToast({ type: ToastEnumType.Error, message: t('common:toastMessage.inReady') })}*/}
        {/*>*/}
        {/*  <FlatIcon size={fontSize.s22} color={fontColor}>*/}
        {/*    <MemoSvg />*/}
        {/*  </FlatIcon>*/}
        {/*  <MenuTitle>{t('navigation:scheduleMemo')}</MenuTitle>*/}
        {/*</MenuItem>*/}
        <MenuItem
          data-cy="schedule-register-button"
          onClick={() => {
            if (!isLoggedIn) {
              showToast({ type: ToastEnumType.Error, message: t('common:toastMessage.afterLoggingIn') });
              return;
            }
            createScheduleModal?.showModal();
          }}
        >
          <FlatIcon size={fontSize.s22} color={fontColor}>
            <PlusRoundSvg />
          </FlatIcon>
          <MenuTitle>{t('navigation:registerSchedule')}</MenuTitle>
        </MenuItem>
        <MenuItem
          data-cy="login-path-button"
          isActive={pathname === '/login'}
          onClick={() => {
            if (isLoggedIn) {
              logoutMutation();
              return;
            }
            push('/login');
          }}
        >
          <FlatIcon size={fontSize.s22} color={fontColor}>
            <UserSvg />
          </FlatIcon>
          <MenuTitle>{isLoggedIn ? t('navigation:logout') : t('navigation:login')}</MenuTitle>
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
