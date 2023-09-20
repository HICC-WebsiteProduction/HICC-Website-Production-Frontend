import React from 'react';
import styled from 'styled-components';
import Banner from '../components/main/Banner';
import Activity from '../components/main/Activity';
import NumberTable from '../components/main/NumberTable';
import HongMap from '../components/main/HongMap';
import JoinHICC from '../components/main/JoinHICC';
import Projects from '../components/main/Projects';
import RecentNews from '../components/main/RecentNews';

function Main() {
  return (
    <MainContainer>
      <Banner />
      <Activity />
      <NumberTable />
      <RecentNews />
      <Projects />
      <HongMap />
      <JoinHICC />
    </MainContainer>
  );
}

export default Main;

const MainContainer = styled.div`
  height: 100%;
  width: 100%;
  margin: 0 auto;
  place-items: center;
  align-items: center;
  justify-content: center;
  //display: flex;
  //flex-direction: column;
`;
