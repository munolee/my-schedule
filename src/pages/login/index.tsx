import { FC } from 'react';
import styled from '@emotion/styled';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import GlobalButtonGroup from '@components/common/buttons/GlobalButtonGroup';
import LoginForm from '@components/forms/LoginForm';

interface PageLoginProps {
  toggleTheme: () => void;
}

const PageLogin: FC<PageLoginProps> = ({ toggleTheme }) => {
  return (
    <StyledContainer>
      <LoginForm />
      <GlobalButtonGroup toggleTheme={toggleTheme} />
    </StyledContainer>
  );
};

export default PageLogin;

const StyledContainer = styled.div`
  position: relative;
`;

export const getStaticProps: GetStaticProps = async ({ locale = 'ko' }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'header'])),
  },
});
