import React from 'react';
import Calendar from '@components/Calendar';
import styled from '@emotion/styled';
import ButtonBase from '@components/common/ButtonBase';

const Home = () => {
  return (
    <HomeContainer>
      <Calendar />
      {/*<ButtonBase*/}
      {/*  text="새 일정"*/}
      {/*  textColor={'#ffffff'}*/}
      {/*  backgroundColor={'#ff7272'}*/}
      {/*  buttonStyle={{ borderRadius: '100%' }}*/}
      {/*  onClick={() => console.log('new')}*/}
      {/*/>*/}
    </HomeContainer>
  );
};

export default Home;

const HomeContainer = styled.div`
  position: relative;
  margin-top: 12px;
`;
