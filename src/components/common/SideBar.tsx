import { FC, Dispatch, SetStateAction, useState } from 'react';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import ArrowBottomSvg from '@assets/ArrowBottomSvg';
import ArrowTopSvg from '@assets/ArrowTopSvg';
import CloseSvg from '@assets/CloseSvg';
import GitHubSvg from '@assets/GitHubSvg';
import FlatIcon from '@components/common/FlatIcon';
import ButtonBase from '@components/common/buttons/ButtonBase';
import useAuthLogin from '@hooks/useAuthLogin';

interface SideBarProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const SideBar: FC<SideBarProps> = ({ isOpen, setIsOpen }) => {
  const [isLangToggle, setIsLangToggle] = useState<boolean>(false);
  const { isLoggedIn, getUserInfo } = useAuthLogin();
  const { fontColor, fontSize } = useTheme();
  const { push } = useRouter();
  const { t } = useTranslation();

  const handleClickLanguage = (locale: string) => {
    push('', '', { locale });
  };

  return (
    <>
      <StyledSideBar isOpen={isOpen}>
        <TopContent>
          <TopUserInfo data-cy="login-sidebar-user-info">
            <span>{isLoggedIn ? getUserInfo() : t('common:loginIsRequired')}</span>
          </TopUserInfo>
          <ButtonBase
            onClick={() => setIsOpen(false)}
            textColor={fontColor}
            backgroundColor="transparent"
            buttonStyle={{ border: 'none', fontSize: fontSize.s16, fontWeight: 500 }}
          >
            <FlatIcon size={fontSize.s26} color={fontColor}>
              <CloseSvg />
            </FlatIcon>
          </ButtonBase>
        </TopContent>
        <SettingContent>
          <LanguageMenuList isOpen={isLangToggle}>
            <LanguageMenuItem onClick={() => setIsLangToggle((prev) => !prev)}>
              <span>{t('navigation:language')}</span>
              <FlatIcon size={fontSize.s26} color={fontColor}>
                {isLangToggle ? <ArrowTopSvg /> : <ArrowBottomSvg />}
              </FlatIcon>
            </LanguageMenuItem>
            <LanguageMenuItem onClick={() => handleClickLanguage('ko')}>
              <span>{t('navigation:korean')}</span>
            </LanguageMenuItem>
            <LanguageMenuItem onClick={() => handleClickLanguage('en')}>
              <span>{t('navigation:english')}</span>
            </LanguageMenuItem>
            <LanguageMenuItem onClick={() => handleClickLanguage('ja')}>
              <span>{t('navigation:japanese')}</span>
            </LanguageMenuItem>
          </LanguageMenuList>
        </SettingContent>
        <BottomContent>
          <ButtonBase
            onClick={() => window.open('https://github.com/munolee/my-schedule')}
            textColor={fontColor}
            backgroundColor="transparent"
            buttonStyle={{ border: 'none', fontSize: fontSize.s16, fontWeight: 500 }}
          >
            <FlatIcon size={fontSize.s30} color={fontColor}>
              <GitHubSvg />
            </FlatIcon>
          </ButtonBase>
          <BottomCopyright>
            <p>
              © 2023 MUNOLEE <br />
              ALL RIGHTS RESERVED.
            </p>
          </BottomCopyright>
        </BottomContent>
      </StyledSideBar>
      <Background isOpen={isOpen} onClick={() => setIsOpen(false)} />
    </>
  );
};

export default SideBar;

const StyledSideBar = styled.div<{ isOpen: boolean }>`
  z-index: 11;
  padding: 1.6rem;
  position: fixed;
  top: 0;
  left: 0;
  transform: ${({ isOpen }) => (isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-30rem, 0, 0)')};
  width: 30rem;
  height: 100vh;
  background-color: ${({ theme }) => theme.sideBar};
  opacity: ${({ isOpen }) => (isOpen ? '1' : '0.7')};
  transition: transform 0.2s ease-in-out, opacity 0.2s ease-in-out;

  @media (max-width: 600px) {
    width: 18rem;
  }
`;

const SettingContent = styled.div`
  padding: 1.2rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LanguageMenuList = styled.ul<{ isOpen: boolean }>`
  width: 100%;
  position: relative;
  height: ${({ isOpen }) => (isOpen ? '100%' : '4.8rem')};
  overflow-y: hidden;
`;

const LanguageMenuItem = styled.li`
  padding: 0.8rem 0.8rem 0.8rem 2.4rem;
  width: 100%;
  height: 4.8rem;
  border-bottom: 0.1rem solid ${({ theme }) => theme.calendarBorder};
  display: flex;
  align-items: center;
  cursor: pointer;

  span {
    font-size: ${({ theme }) => theme.fontSize.s16};
    font-weight: 500;
    color: ${({ theme }) => theme.fontColor};
  }

  &:active {
    background-color: ${({ theme }) => theme.hoverBackground};
  }

  &:first-of-type {
    padding-left: 1.6rem;
    justify-content: space-between;
  }
`;

const TopContent = styled.div`
  padding: 1.2rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TopUserInfo = styled.div`
  padding: 1.2rem 1.6rem;

  span {
    font-size: ${({ theme }) => theme.fontSize.s14};
    font-weight: 600;
    color: ${({ theme }) => theme.fontColor};
  }
`;

const BottomContent = styled.div`
  position: absolute;
  bottom: 1.6rem;
  width: calc(100% - 3.2rem);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
`;

const BottomCopyright = styled.div`
  padding: 1.2rem 0;

  p {
    font-size: ${({ theme }) => theme.fontSize.s10};
    font-weight: 600;
    color: ${({ theme }) => theme.fontColor};
  }
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
