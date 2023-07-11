import React from 'react';
import styled from 'styled-components';
import book from './../../images/book1.svg';
import board from './../../images/board1.svg';
import budget from './../../images/budget1.svg';
import locker from './../../images/lockers1.svg';
import map from './../../images/maps1.svg';
import note from './../../images/notes1.svg';

const pixelToRem = size => `${size / 16}rem`;

export default function MainButton(props) {
  let logo = book;
  if (props.buttonName === '동아리 소개') {
    logo = book;
  }
  if (props.buttonName === '계시판') {
    logo = board;
  }
  if (props.buttonName === '회계 정보') {
    logo = budget;
  }
  if (props.buttonName === '사물함/우산 대여') {
    logo = locker;
  }
  if (props.buttonName === '일정 캘린더') {
    logo = note;
  }
  if (props.buttonName === '맛집 지도') {
    logo = map;
  }
  return (
    <ButtonContainer>
      <Text>{props.buttonName}</Text>
      <ButtonDesign type={props.buttonType}></ButtonDesign>
      <InnerBox></InnerBox>
      <Logo>
        <img src={logo} alt="이미지로드실패"></img>
      </Logo>
    </ButtonContainer>
  );
}

const ButtonContainer = styled.div`
  position: relative;
  width: ${pixelToRem(276)};
  height: ${pixelToRem(158)};
  margin: ${pixelToRem(5)};
  border: none;
  border-radius: ${pixelToRem(10)};
  background: #9dbdff;
`;

const ButtonDesign = styled.button`
  position: absolute;
  width: ${pixelToRem(276)};
  height: ${pixelToRem(158)};
  border: none;
  background: #0000;
  border-radius: ${pixelToRem(10)};
  z-index: 2;
  &:hover {
    cursor: pointer;
  }
`;

const InnerBox = styled.div`
  position: absolute;
  width: ${pixelToRem(268)};
  height: ${pixelToRem(139)};
  background: #e6eeff;
  border-radius: 15px;
  left: 1.45%;
  right: 1.45%;
  top: 9.49%;
  bottom: 2.53%;
  z-index: 1;
`;

const Text = styled.div`
  position: absolute;
  line-height: 22px;
  font-style: normal;
  font-weight: 900;
  font-size: 18px;
  left: 11.59%;
  right: 11.59%;
  top: 22.15%;
  bottom: 63.92%;
  z-index: 2;
`;

const Logo = styled.div`
  position: absolute;
  width: ${pixelToRem(70)};
  height: ${pixelToRem(70)};
  left: 64.13%;
  right: 10.51%;
  top: 40.51%;
  bottom: 15.19%;
  z-index: 1;
`;
