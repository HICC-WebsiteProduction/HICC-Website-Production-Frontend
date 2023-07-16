import React from 'react';
import styled, { keyframes } from 'styled-components';
import Header from '../components/header/Header';
import logo from '../images/hicc_logo.png';
import MainButton from './../components/util/MainButton';

const pixelToRem = size => `${size / 16}rem`;

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
  return (
    <MainContainer>
      <Header />
      <Logo />
      <CentorContainer>
        <ButtonContainer>
          <MainButton buttonType="button" buttonName="동아리 소개"></MainButton>
          <MainButton buttonType="button" buttonName="계시판"></MainButton>
          <MainButton buttonType="button" buttonName="회계 정보"></MainButton>
          <MainButton
            buttonType="button"
            buttonName="사물함/우산 대여"
          ></MainButton>
          <MainButton buttonType="button" buttonName="일정 캘린더"></MainButton>
          <MainButton buttonType="button" buttonName="맛집 지도"></MainButton>
        </ButtonContainer>
      </CentorContainer>
    </MainContainer>
  );
}

export default Main;

const Logo = styled.div`
  width: ${pixelToRem(300)};
  height: ${pixelToRem(102)};
  margin: 100px auto;
  background-image: url('${logo}');
  background-size: contain;
  background-repeat: no-repeat;
  grid-area: logo;
  animation: ${boxAnimation} 0.2s linear alternate;
`;

const CentorContainer = styled.div`
  display: flex;
  place-items: center;
  align-items: center;
  justify-content: center;
`;

const ButtonContainer = styled.div`
  display: grid;
  place-items: center;
  grid-area: main;
  grid-template-rows: repeat(2, minmax(200px, 200px));
  grid-template-columns: repeat(3, minmax(330px, 330px));
  animation: ${boxAnimation} 0.5s linear alternate;
`;

const MainContainer = styled.div`
  height: 100vh;
  grid-template-areas:
    'header header header'
    'logo logo logo'
    'blank main blank';
  grid-template-rows: 1fr 3fr 4fr;
  grid-template-columns: 2fr 1fr 2fr;
  place-items: center;
`;
