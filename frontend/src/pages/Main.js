import React from 'react';
import styled from 'styled-components';

function Main() {
  return (
    <MainContainer>
      <p>Welcome!</p>
    </MainContainer>
  );
}

export default Main;

const MainContainer = styled.div`
  width: 100%;
  height: 100vh;
`;
