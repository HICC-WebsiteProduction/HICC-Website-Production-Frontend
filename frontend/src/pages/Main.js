import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';

function Main() {
  return (
    <MainContainer>
      <Header></Header>
    </MainContainer>
  );
}

export default Main;

const MainContainer = styled.div`
  width: 100%;
  height: 100vh;
`;
