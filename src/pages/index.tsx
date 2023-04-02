import { FC } from 'react';
import styled from '@emotion/styled';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Calendar from '@components/Calendar';
import { ModalPropsType } from '@hooks/useModal';

interface PageHomeProps {
  createScheduleModal: ModalPropsType;
}

const PageHome: FC<PageHomeProps> = ({ createScheduleModal }) => {
  return (
    <HomeContainer>
      <Calendar createScheduleModal={createScheduleModal} />
    </HomeContainer>
  );
};

export default PageHome;

const HomeContainer = styled.div`
  margin-top: 1.2rem;
  position: relative;
`;

export const getStaticProps: GetStaticProps = async ({ locale = 'ko' }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'navigation'])),
  },
});
