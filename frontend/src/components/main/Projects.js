import styled from 'styled-components';
import React from 'react';
import Slide from './ProjectssList';

export default function Projects() {
  return (
    <Frame>
      <Title>프로젝트 둘러보기</Title>
      <CenterContainer>
        <Slide />
      </CenterContainer>
    </Frame>
  );
}

const Frame = styled.div`
  position: relative;
  width: 100%;
  max-width: 1200px;
  height: 990px;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
  display: flex;
`;

const CenterContainer = styled.div`
  position: relative;
  min-width: 1200px;
  height: 990px;
  //margin: 0;
  align-items: center;
  justify-content: center;
  display: flex;
`;

const Title = styled.div`
  position: absolute;
  width: 325px;
  height: 48px;
  left: 0px;
  top: 200px;
  margin-left: 0;
  font-family: GmarketSansMedium;
  font-size: 40px;
  font-weight: 500;
  line-height: 48px;
  letter-spacing: 0em;
  text-align: left;
  color: #edf0f8;
`;
