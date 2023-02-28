import React from 'react';
import Calendar from '@components/Calendar';
import styled from '@emotion/styled';

const Home = () => {
  return (
    <HomeContainer>
      <Calendar />
    </HomeContainer>
  );
};

export default Home;

const HomeContainer = styled.div`
  position: relative;
  margin-top: 12px;
`;
