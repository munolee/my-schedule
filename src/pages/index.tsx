import React from 'react';
import Calendar from '@components/Calendar';
import EventBoard from '@components/EventBoard';
import styled from '@emotion/styled';

const Home = () => {
  return (
    <StyledHomeContainer>
      <EventBoard />
      <Calendar />
    </StyledHomeContainer>
  );
};

export default Home;

const StyledHomeContainer = styled.div`
  margin-top: 12px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
