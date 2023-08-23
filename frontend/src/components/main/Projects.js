import styled from 'styled-components';
import LeftArrow from '../../images/LeftButton.svg';
import RightArrow from '../../images/RightButton.svg';
import React from 'react';
import Slide from './ProjectssList';
import etc from '../../images/etc.png';

export default function Projects() {
  const sliders = [
    {
      name: '프로젝트 1',
      image: etc,
    },
    {
      name: '프로젝트 2',
      image: etc,
    },
    // ... 더 많은 서비스 추가
  ];
  return (
    <Frame>
      <Title>프로젝트 둘러보기</Title>
      <CenterContainer>
        <Slide sliders={sliders} />
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
