import React from 'react';
import styled, { keyframes } from 'styled-components';
import Header from '../components/header/Header';
import MainActivityContent from '../components/main/MainActivityContent';
import logo from '../images/mainBanner.svg';
import useScrollClipPath from './../hook/useScrollClipPath';
import NumberTable from '../components/main/NumberTable';

const boxAnimation = keyframes`
  0%{
    opacity: 0.8;
    transform: scale(0.9);
  }
  100%{
    opacity: 1;
    transform: scale(1);
  }
`;

function Main() {
  const animatedItem = useScrollClipPath('left', 1.5, 0);
  const animatedItem2 = useScrollClipPath('top', 0.5, 0);
  return (
    <MainContainer>
      <Header />
      <Banner>
        <BannerTxt {...animatedItem}>
          Hong Ik <br /> Computer Club
        </BannerTxt>
      </Banner>
      <ActivityContainer>
        <ActivityTitle>HICC는 이런 활동을 해요</ActivityTitle>
        <ActivityContentContainer {...animatedItem2}>
          <MainActivityContent buttonName="코딩 학술 세미나"></MainActivityContent>
          <MainActivityContent buttonName="프로젝트 발표 대회"></MainActivityContent>
          <MainActivityContent buttonName="HICC 정규모임"></MainActivityContent>
          <MainActivityContent buttonName="분기 별 MT"></MainActivityContent>
          <MainActivityContent buttonName="조별 미션 및 친목 활동"></MainActivityContent>
          <MainActivityContent buttonName="그 외 활동"></MainActivityContent>
        </ActivityContentContainer>
      </ActivityContainer>
      <NumberTable />
    </MainContainer>
  );
}

export default Main;

const Banner = styled.div`
  height: 100%;
  margin: 0 auto;
  background-image: url('${logo}');
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  grid-area: logo;
  object-fit: contain;
  animation: ${boxAnimation} 0.2s linear alternate;
`;

const BannerTxt = styled.div`
  position: relative;
  width: 100%;
  top: 55%;
  left: 20%;
  font-size: xxx-large;
  font-weight: bold;
  color: #edf0f8;
`;

const ActivityContainer = styled.div`
  position: relative;
  width: 1920px;
  height: 900px;
  margin: 0 auto;
`;

const ActivityTitle = styled.div`
  position: absolute;
  top: 50px;
  left: 363px;
  width: 463px;
  height: 48px;
  margin-top: 50px;
  font-size: xx-large;
  font-weight: bold;
  color: #edf0f8;
`;

const ActivityContentContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(2, minmax(300px, 300px));
  grid-template-columns: repeat(3, minmax(378px, 378px));
  gap: 30px;
  position: absolute;
  top: 178px;
  left: 363px;
  width: 1194px;
  height: 630px;
  align-items: center;
  place-items: center;
`;

const MainContainer = styled.div`
  height: 100vh;
  width: 100%;
  margin: 0 auto;
  place-items: center;
`;
