import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUmbrella } from '@fortawesome/free-solid-svg-icons';
import theme from '../styles/Theme';
import { umbrellaStatus } from '../dummy/umbrellaStatus';
import EachUmbrella from '../components/eachItem/EachUmbrella';
import Caution from './../constants/Caution';
import useMyRent from '../hook/useMyRent';
import {
  currentUmbrellaIndex,
  umbrella,
  umbrellaModal,
} from '../atom/umbrella';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import ApplyModal from '../components/popup/ApplyModal';
import moment from 'moment';
import Header from '../components/header/Header';
import Navigation from '../components/header/Navigation';

/*
currentTabContents는 현재 탭의 정보로
name은 이름, link은 url, accent는 현재 메뉴면 true, 아니면 false를 주면 됩니다.
*/

export default function UmbrellaRent(props) {
  const [init, setInit] = useRecoilState(umbrella);
  const [umbrellaList, setUmbrellaList] = useRecoilState(umbrellaModal); // 사물함 리스트
  const currentIndex = useRecoilValue(currentUmbrellaIndex);
  const resetUmbrella = useResetRecoilState(umbrella);

  const myName = '김진호';

  const umbrellaListIncludeMyRent = useMyRent(umbrellaStatus, myName);

  useEffect(() => {
    setInit(umbrellaListIncludeMyRent);
    setUmbrellaList(init);

    return () => {
      resetUmbrella();
    };
  }, []);

  const now = new Date();
  const sevenDaysAgo = new Date(now.setDate(now.getDate() + 7));

  const modalRef = useRef(null);

  // 상위 링크를 표시하기 위함
  const ancestorMenuTree = [
    { name: '홈', link: '/' },
    { name: '대여', link: '/rent/umbrellarent' },
  ];
  const currentTabContents = [
    { name: '우산 대여', link: '/rent/umbrellarent', accent: true },
    { name: '사물함 대여', link: '/rent/cabinetrent', accent: false },
  ];

  return (
    <UmbrellaRentContainer>
      <Header />
      <Navigation
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
            umbrellaList.map(umbrella => (
              <EachUmbrella key={umbrella.umbrellaNumber} umbrella={umbrella} />
            ))}
        </UmbrellaGrid>

        <ViewApplyModal ref={modalRef} view={currentIndex !== -1}>
          {umbrellaList.map(
            item =>
              item.modalOpen && (
                <ApplyModal
                  itemName={`우산`}
                  itemNumber={item.umbrellaNumber}
                  startDay={moment(new Date()).format('yyyy-MM-DD')}
                  endDay={moment(sevenDaysAgo).format('yyyy-MM-DD')}
                  startDayDisabled={true}
                  endDayDisabled={true}
                />
              ),
          )}
        </ViewApplyModal>
        <Caution item="umbrella" />
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

const ViewApplyModal = styled.div`
  display: ${props => (props.view ? 'block' : 'none')};
  position: fixed;

  width: 100vw;
  height: 100vh;
  left: 0px;
  top: 0px;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1;
`;
