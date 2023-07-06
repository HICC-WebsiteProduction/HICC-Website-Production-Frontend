import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import HeaderAndNavigation from '../components/header/HeaderAndNavigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import theme from '../styles/Theme';
import { cabinetStatus } from './../dummy/cabinetStatus';
import Caution from '../components/Caution';
import EachCabinet from '../components/eachItem/EachCabinet';
import useModalList from '../hook/useModalList';
import ApplyModal from '../components/popup/ApplyModal';

export default function CabinetRent(props) {
  const [cabinetList, setCabinetList] = useState([]); // 사물함 리스트
  const myName = '김진호';

  // 내가 빌린 것 체크
  useEffect(() => {
    const checkMyRent = cabinetStatus.find(
      cabinet => cabinet.lender === myName,
    );
    if (checkMyRent !== undefined) {
      const cabinetListIncludeMyRent = cabinetStatus.map(cabinet => {
        if (cabinet.lender === myName) {
          return {
            ...cabinet,
            status: 'myRent',
          };
        } else {
          return cabinet;
        }
      });
      setCabinetList(cabinetListIncludeMyRent);
    } else {
      setCabinetList(cabinetStatus);
    }
  }, []);

  // 상위 링크를 표시하기 위함
  const ancestorMenuTree = [
    { name: '홈', link: '/' },
    { name: '대여', link: '/rent/cabinetrent' },
  ];
  const currentTabContents = [
    { name: '우산 대여', link: '/rent/umbrellarent', accent: false },
    { name: '사물함 대여', link: '/rent/cabinetrent', accent: true },
  ];

  const modalRef = useRef(null);

  const [modalList, handleModal] = useModalList(
    modalRef,
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
  );

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
              <EachCabinet cabinet={cabinet} handleModal={handleModal} />
            ))}
        </CabinetGrid>

        <div ref={modalRef}>
          {modalList.map(
            item =>
              item.modalOpen && (
                <ApplyModal
                  itemName={`사물함`}
                  itemNumber={item.id}
                  startDay={new Date().toISOString().slice(0, 10)}
                  endDay={''}
                  startDayDisabled={true}
                  endDayDisabled={false}
                />
              ),
          )}
        </div>
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
