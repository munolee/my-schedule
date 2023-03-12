import { FC } from 'react';
import styled from '@emotion/styled';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Calendar from '@components/Calendar';
import GlobalButtonGroup from '@components/common/GlobalButtonGroup';
import useModal from '@hooks/useModal';

interface HomeProps {
  toggleTheme: () => void;
}

const Home: FC<HomeProps> = ({ toggleTheme }) => {
  const createScheduleModal = useModal();
  return (
    <>
      <HomeContainer>
        <Calendar createScheduleModalProps={createScheduleModal} />
      </HomeContainer>
      <GlobalButtonGroup toggleTheme={toggleTheme} modalProps={createScheduleModal} />
    </>
  );
};

export default Home;

const HomeContainer = styled.div`
  margin-top: 1.2rem;
  position: relative;
`;

export const getStaticProps: GetStaticProps = async ({ locale = 'ko' }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'header'])),
  },
});
