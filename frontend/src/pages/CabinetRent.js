import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import theme from '../styles/Theme';
import EachCabinet from '../components/eachItem/EachCabinet';
import ApplyModal from '../components/popup/ApplyModal';
import Caution from './../constants/Caution';
import moment from 'moment';
import useMyRent from '../hook/useMyRent';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { cabinet, cabinetModal, currentCabinetIndex } from '../atom/cabinet';
import Header from '../components/header/Header';
import Navigation from '../components/header/Navigation';
import { request } from '../utils/axios';

// 사물함 대여 페이지
export default function CabinetRent(props) {
  const [init, setInit] = useRecoilState(cabinet); // 사물함 리스트
  const [cabinetList, setCabinetList] = useRecoilState(cabinetModal); // 사물함 리스트 (모달 창)
  const currentIndex = useRecoilValue(currentCabinetIndex); // 모달 백드롭 때문에

  const resetCabinet = useResetRecoilState(cabinet); // 사물함 상태 초기화

  const myName = '김진호';

  const checkMyRent = useMyRent(); // 내가 대여 처리

  const fetchData = async () => {
    try {
      const response = await request('get', '/locker');
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const loadCabinetStatus = async () => {
      const result = await fetchData();
      const cabinetListIncludeMyRent = checkMyRent(result, myName);
      setInit(cabinetListIncludeMyRent);
      setCabinetList(init);
    };

    loadCabinetStatus();

    return () => {
      resetCabinet();
    };
  }, []);

  const modalRef = useRef(null);

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
      <Header />
      <Navigation
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
              <EachCabinet key={cabinet.cabinetNumber} eachCabinet={cabinet} />
            ))}
        </CabinetGrid>

        <ViewApplyModal ref={modalRef} view={currentIndex !== -1}>
          {cabinetList.map(
            item =>
              item.modalOpen && (
                <ApplyModal
                  itemName={`사물함`}
                  itemNumber={item.cabinetNumber}
                  lender={myName}
                  startDay={moment(new Date()).format('yyyy-MM-DD')}
                  endDay={undefined}
                  startDayDisabled={true}
                  endDayDisabled={false}
                />
              ),
          )}
        </ViewApplyModal>

        <Caution item="cabinet" />
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

const ViewApplyModal = styled.div`
  display: ${props => (props.view ? 'block' : 'none')};
  position: fixed;

  width: 100%;
  height: 100%;
  left: 0px;
  top: 0px;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1;
`;
