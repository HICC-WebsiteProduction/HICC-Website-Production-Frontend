import React from 'react';
import styled from 'styled-components';
import HongMapImg from '../../images/HongMap.png';
import HongMapLogo from '../../images/HongmapLogo.svg';

function HongMap() {
  return (
    <Frame>
      <Title>동아리방 오는 길 - 홍맵</Title>
      <HongMapImgFrame />
      <Content>
        <HongMapLogoFrame />
        <TextTop>
          HICC에서 개발한 홍익대 길찾기 페이지로 동아리방을 찾아오세요.
        </TextTop>
        <TextMiddle>강의실 간 이동할 시 최적의 경로와 시간을 제공</TextMiddle>
        <TextBottom>
          {'· '}출발지, 도착지를 입력하여 최적의 경로와 예상 소요 시간 검색
          <br />
          {'· '}출발지, 출발지, 도착지를 입력 시 키워드 추천
          <br />
          {'· '}엘리베이터 사용 여부에 따른 경로와 시간 비교
          <br />
          {'· '}편의시설 아이콘을 클릭하여 위치 확인
          <br />
        </TextBottom>
      </Content>
    </Frame>
  );
}
export default HongMap;

const Frame = styled.div`
  position: relative;
  width: 1200px;
  height: 882px;
  margin: 0 auto;
`;

const Title = styled.div`
  position: absolute;
  width: 422px;
  top: 50px;
  font-family: GmarketSansMedium;
  font-size: 40px;
  font-weight: 500;
  color: #edf0f8;
  line-height: 48px;
  text-align: left;
`;

const Content = styled.div`
  position: absolute;
  height: 480px;
  top: 178px;
`;

const HongMapImgFrame = styled.div`
  position: absolute;
  z-index: 1;
  width: 680px;
  height: 480px;
  top: 178px;
  border-radius: 20px;
  background-image: url('${HongMapImg}');
`;

const HongMapLogoFrame = styled.div`
  position: absolute;
  width: 338px;
  height: 67px;
  top: 254px;
  left: 746px;
  background-image: url('${HongMapLogo}');
`;

const TextTop = styled.div`
  position: absolute;
  width: 392px;
  height: 72px;
  left: 746px;
  font-family: Pretendard;
  font-size: 24px;
  font-weight: 600;
  line-height: 36px;
  text-align: left;
  color: #edf0f8;
`;

const TextMiddle = styled.div`
  position: absolute;
  width: 434px;
  height: 36px;
  top: 335px;
  left: 746px;
  font-family: Pretendard;
  font-size: 24px;
  font-weight: 600;
  line-height: 36px;
  text-align: left;
  color: #edf0f8;
`;

const TextBottom = styled.div`
  position: absolute;
  width: 418px;
  height: 96px;
  top: 384px;
  left: 736px;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 300;
  line-height: 24px;
  text-align: left;
  color: #edf0f8;
  white-space: pre-wrap;
`;
