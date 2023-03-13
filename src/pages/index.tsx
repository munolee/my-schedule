import { FC } from 'react';
import styled from '@emotion/styled';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Calendar from '@components/Calendar';
import GlobalButtonGroup from '@components/common/GlobalButtonGroup';
import Header from '@components/common/Header';
import useModal from '@hooks/useModal';

interface PageHomeProps {
  toggleTheme: () => void;
}

const PageHome: FC<PageHomeProps> = ({ toggleTheme }) => {
  const createScheduleModal = useModal();
  return (
    <>
      <Header />
      <HomeContainer>
        <Calendar createScheduleModalProps={createScheduleModal} />
      </HomeContainer>
      <GlobalButtonGroup toggleTheme={toggleTheme} modalProps={createScheduleModal} />
    </>
  );
};

export default PageHome;

const HomeContainer = styled.div`
  margin-top: 1.2rem;
  position: relative;
`;

export const getStaticProps: GetStaticProps = async ({ locale = 'ko' }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'header'])),
  },
});
