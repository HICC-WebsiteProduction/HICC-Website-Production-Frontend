import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import HeaderAndNavigation from '../components/header/HeaderAndNavigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import theme from '../styles/Theme';
import { cabinetStatus } from './../dummy/cabinetStatus';
import EachCabinet from '../components/eachItem/EachCabinet';
import ApplyModal from '../components/popup/ApplyModal';
import Caution from './../constants/Caution';
import moment from 'moment';
import useMyRent from '../hook/useMyRent';

export default function CabinetRent(props) {
  const [cabinetList, setCabinetList] = useState([]); // 사물함 리스트
  const myName = '김진호';

  const cabinetListIncludeMyRent = useMyRent(cabinetStatus, myName);

  useEffect(() => {
    setCabinetList(cabinetListIncludeMyRent);
  }, []);

  // 상위 링크를 표시하기 위함
  const ancestorMenuTree = [
    { name: '홈', link: '/' },
    { name: '대여', link: '/rent/umbrellarent' },
  ];
  const currentTabContents = [
    { name: '우산 대여', link: '/rent/umbrellarent', accent: false },
    { name: '사물함 대여', link: '/rent/cabinetrent', accent: true },
  ];

  return (
    <CabinetRentContainer>
      <HeaderAndNavigation
        ancestorMenuTree={ancestorMenuTree}
        currentTabContents={currentTabContents}
      />
      <CabinetCurrentState>
        <CabinetListHeader>
          <CabinetIcon>
            <FontAwesomeIcon icon={faCartShopping} />
          </CabinetIcon>
          <CabinetListHeaderText>사물함 목록</CabinetListHeaderText>
        </CabinetListHeader>
        <CabinetGrid>
          {cabinetList.length > 0 &&
            cabinetList.map(cabinet => (
              <EachCabinet key={cabinet.cabinetNumber} cabinet={cabinet} />
            ))}
        </CabinetGrid>
        {/* 
        <div ref={modalRef}>
          {modalList.map(
            item =>
              item.modalOpen && (
                <ApplyModal
                  itemName={`사물함`}
                  itemNumber={item.id}
                  startDay={moment(new Date()).format('yyyy-MM-DD')}
                  endDay={''}
                  startDayDisabled={true}
                  endDayDisabled={false}
                />
              ),
          )}
        </div> */}
        <Caution />
      </CabinetCurrentState>
    </CabinetRentContainer>
  );
}

const CabinetRentContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
`;

const CabinetCurrentState = styled.div`
  width: ${theme.componentSize.maxWidth};
  margin: 64px auto;
`;

const CabinetListHeader = styled.header`
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

const CabinetIcon = styled.div`
  margin-right: 20px;
`;

const CabinetListHeaderText = styled.h1``;

const CabinetGrid = styled.div`
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  grid-template-columns: repeat(4, 1fr);
  grid-row-gap: 40px;
  grid-column-gap: 25px;
  width: 100%;
  height: 100%;
`;
