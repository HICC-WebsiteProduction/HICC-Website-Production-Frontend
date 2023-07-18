import React from 'react';
import styled from 'styled-components';

export default function ActivityContent(props) {
  let logo = '/images/coding.png';
  if (props.buttonName === '코딩 학술 세미나') {
    logo = '/images/coding.png';
  }
  if (props.buttonName === '프로젝트 발표 대회') {
    logo = '/images/project.png';
  }
  if (props.buttonName === 'HICC 정규모임') {
    logo = '/images/meeting.png';
  }
  if (props.buttonName === '분기 별 MT') {
    logo = '/images/MT.png';
  }
  if (props.buttonName === '조별 미션 및 친목 활동') {
    logo = '/images/etc.png';
  }
  if (props.buttonName === '그 외 활동') {
    logo = '/images/mission.png';
  }
  return (
    <ContentContainer>
      <Text>{props.buttonName}</Text>
      <Logo>
        <img src={logo} alt="이미지로드실패"></img>
      </Logo>
    </ContentContainer>
  );
}

const ContentContainer = styled.div`
  position: relative;
  width: 378px;
  height: 300px;
  align-items: center;
`;

const Text = styled.div`
  position: relative;
  top: 260px;
  width: 210px;
  height: 36px;
  margin: 0 auto;
  line-height: 36px;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  color: #edf0f8;
  text-align: center;
  z-index: 2;
`;

const Logo = styled.div`
  position: absolute;
  left: 14px;
  top: 10px;
  width: 350px;
  height: 230px;
  z-index: 1;
  border: none;
  border-radius: 20px;
`;
