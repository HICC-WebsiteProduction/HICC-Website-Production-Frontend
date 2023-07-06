import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import HeaderAndNavigation from '../components/header/HeaderAndNavigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUmbrella } from '@fortawesome/free-solid-svg-icons';
import theme from '../styles/Theme';
import Caution from '../components/Caution';
import { umbrellaStatus } from '../dummy/umbrellaStatus';
import EachUmbrella from '../components/eachItem/EachUmbrella';

/*
currentTabContents는 현재 탭의 정보로
name은 이름, link은 url, accent는 현재 메뉴면 true, 아니면 false를 주면 됩니다.
*/

export default function UmbrellaRent(props) {
  const myName = '김진호';

  const [umbrellaList, setUmbrellaList] = useState([]);

  // 내가 빌린 것 체크
  useEffect(() => {
    const checkMyRent = umbrellaStatus.find(
      umbrella => umbrella.lender === myName,
    );
    if (checkMyRent !== undefined) {
      const umbrellaListIncludeMyRent = umbrellaStatus.map(umbrella => {
        if (umbrella.lender === myName) {
          return {
            ...umbrella,
            status: 'myRent',
          };
        } else {
          return umbrella;
        }
      });
      setUmbrellaList(umbrellaListIncludeMyRent);
    } else {
      setUmbrellaList(umbrellaStatus);
    }
  }, []);

  // 상위 링크를 표시하기 위함
  const ancestorMenuTree = [
    { name: '홈', link: '/' },
    { name: '대여', link: '/rent/cabinetrent' },
  ];
  const currentTabContents = [
    { name: '우산 대여', link: '/rent/umbrellarent', accent: true },
    { name: '사물함 대여', link: '/rent/cabinetrent', accent: false },
  ];

  return (
    <UmbrellaRentContainer>
      <HeaderAndNavigation
        ancestorMenuTree={ancestorMenuTree}
        currentTabContents={currentTabContents}
      />

      <UmbrellaCurrentState>
        <UmbrellaListHeader>
          <UmbrellaIcon>
            <FontAwesomeIcon icon={faUmbrella} />
          </UmbrellaIcon>
          <UmbrellaListHeaderText>우산 목록</UmbrellaListHeaderText>
        </UmbrellaListHeader>
        <UmbrellaGrid>
          {umbrellaList.length > 0 &&
            umbrellaList.map(umbrella => <EachUmbrella umbrella={umbrella} />)}
        </UmbrellaGrid>
        <Caution />
      </UmbrellaCurrentState>
    </UmbrellaRentContainer>
  );
}

const UmbrellaRentContainer = styled.div`
  width: 100%;
  height: 100vh;
`;

const UmbrellaCurrentState = styled.div`
  width: ${theme.componentSize.maxWidth};
  margin: 64px auto;
`;

const UmbrellaListHeader = styled.header`
  display: flex;
  align-items: center;
  margin-bottom: 40px;
  color: ${theme.colors.white};
  font-family: 'GmarketSansMedium', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: ${theme.fontSizes.title};
  line-height: 100%;
`;

const UmbrellaIcon = styled.div`
  margin-right: 20px;
`;

const UmbrellaListHeaderText = styled.h1``;

const UmbrellaGrid = styled.div`
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  grid-template-columns: repeat(3, 1fr);
  grid-row-gap: 40px;
  grid-column-gap: 25px;
  width: 100%;
  height: 100%;
`;
