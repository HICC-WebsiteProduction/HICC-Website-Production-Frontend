import React from 'react';
import styled from 'styled-components';
import coding from '../../images/coding.png';
import project from '../../images/project.png';
import meeting from '../../images/meeting.png';
import MT from '../../images/MT.png';
import mission from '../../images/mission.png';
import etc from '../../images/etc.png';

const pixelToRem = size => `${size / 16}rem`;

export default function ActivityContent(props) {
  let logo = coding;
  if (props.buttonName === '코딩 학술 세미나') {
    logo = coding;
  }
  if (props.buttonName === '프로젝트 발표 대회') {
    logo = project;
  }
  if (props.buttonName === 'HICC 정규모임') {
    logo = meeting;
  }
  if (props.buttonName === '분기 별 MT') {
    logo = MT;
  }
  if (props.buttonName === '조별 미션 및 친목 활동') {
    logo = etc;
  }
  if (props.buttonName === '그 외 활동') {
    logo = mission;
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
  top: ${pixelToRem(260)};
  width: ${pixelToRem(210)};
  height: ${pixelToRem(36)};
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
  left: ${pixelToRem(14)};
  top: ${pixelToRem(10)};
  width: ${pixelToRem(350)};
  height: ${pixelToRem(230)};
  z-index: 1;
  border: none;
  border-radius: ${pixelToRem(20)};
`;
