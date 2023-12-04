import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import theme from '../styles/Theme';
import EachUmbrella from '../components/eachItem/EachUmbrella';
import Caution from './../constants/Caution';
import useMyRent from '../hook/useMyRent';

import Navigation from '../components/header/Navigation';
import useFetch from '../hook/useFetch';
import { user } from '../atom/user';
import { ancestorMenuTree, currentTabContents } from '../constants/RentTab';
import { useRecoilValue } from 'recoil';

/*
currentTabContents는 현재 탭의 정보로
name은 이름, link은 url, accent는 현재 메뉴면 true, 아니면 false를 주면 됩니다.
*/

// 우산 대여 페이지
export default function UmbrellaRent(props) {
  const userinfo = useRecoilValue(user); // 내 정보 가져오기 위해

  const { data, loading, error } = useFetch('/rental?itemType=umbrella');
  const checkMyRent = useMyRent(data, userinfo.name); // 내가 대여 처리

  const [umbrellaList, setUmbrellaList] = useState(checkMyRent);

  useEffect(() => {
    if (data) {
      setUmbrellaList(checkMyRent);
    }
  }, [checkMyRent, data]);

  return (
    <UmbrellaRentContainer>
      <Navigation
        ancestorMenuTree={ancestorMenuTree}
        currentTabContents={currentTabContents}
      />

      <UmbrellaCurrentState>
        <UmbrellaListHeader>
          <UmbrellaListHeaderText>우산 목록</UmbrellaListHeaderText>
        </UmbrellaListHeader>
        <UmbrellaGrid>
          {umbrellaList !== undefined &&
            umbrellaList.length > 0 &&
            umbrellaList.map(umbrella => (
              <EachUmbrella key={umbrella.id} eachUmbrella={umbrella} />
            ))}
        </UmbrellaGrid>

        <Caution item="umbrella" />
      </UmbrellaCurrentState>
    </UmbrellaRentContainer>
  );
}

const UmbrellaRentContainer = styled.div`
  width: 100%;
  height: 100%;
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
  ${theme.fontstyle.head2};
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

const ViewApplyModal = styled.div`
  display: ${props => (props.view ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.6);
  z-index: 101;
`;
