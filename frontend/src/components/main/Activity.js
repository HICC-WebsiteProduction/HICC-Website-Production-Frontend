import React from 'react';
import styled from 'styled-components';
import ActivityContent from './ActivityContent';
import useScrollClipPath from '../hooks/useScrollClipPath';

function Activity() {
  const animatedItem2 = useScrollClipPath('top', 0.5, 0);
  return (
    <ActivityContainer>
      <ActivityTitle>HICC는 이런 활동을 해요</ActivityTitle>
      <ActivityContentContainer {...animatedItem2}>
        <ActivityContent buttonName="코딩 학술 세미나"></ActivityContent>
        <ActivityContent buttonName="프로젝트 발표 대회"></ActivityContent>
        <ActivityContent buttonName="HICC 정규모임"></ActivityContent>
        <ActivityContent buttonName="분기 별 MT"></ActivityContent>
        <ActivityContent buttonName="조별 미션 및 친목 활동"></ActivityContent>
        <ActivityContent buttonName="그 외 활동"></ActivityContent>
      </ActivityContentContainer>
    </ActivityContainer>
  );
}

export default Activity;

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
