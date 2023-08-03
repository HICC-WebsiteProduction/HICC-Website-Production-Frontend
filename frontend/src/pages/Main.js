import React from 'react';
import styled from 'styled-components';
import Header from '../components/header/Header';
import Banner from '../components/main/Banner';
import Activity from '../components/main/Activity';
import NumberTable from '../components/main/NumberTable';

function Main() {
  return (
    <MainContainer>
      <Header />
      <Banner />
      <Activity />
      <NumberTable />
    </MainContainer>
  );
}

export default Main;

const MainContainer = styled.div`
  height: 100vh;
  width: 100%;
  margin: 0 auto;
  place-items: center;
`;
