import { FC } from 'react';
import styled from '@emotion/styled';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import LoginForm from '@components/forms/LoginForm';

const PageLogin: FC = () => {
  return (
    <StyledContainer>
      <LoginForm />
    </StyledContainer>
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
