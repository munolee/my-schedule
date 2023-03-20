import { FC } from 'react';
import styled from '@emotion/styled';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import BottomNavigation from '@components/common/BottomNavigation';
import Header from '@components/common/Header';
import LoginForm from '@components/forms/LoginForm';
import useModal from '@hooks/useModal';

interface PageLoginProps {
  toggleTheme: () => void;
}

const PageLogin: FC<PageLoginProps> = ({ toggleTheme }) => {
  const createScheduleModal = useModal();
  return (
    <>
      <Header toggleTheme={toggleTheme} />
      <StyledContainer>
        <LoginForm />
      </StyledContainer>
      <BottomNavigation createScheduleModalProps={createScheduleModal} />
    </>
  );
};

export default PageLogin;

const StyledContainer = styled.div`
  position: relative;
`;

export const getStaticProps: GetStaticProps = async ({ locale = 'ko' }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'navigation'])),
  },
});
