import React from 'react';
import styled from 'styled-components';
import HeaderAndNavigation from '../components/header/HeaderAndNavigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import theme from '../styles/Theme';
import { cabinetStatus } from './../dummy/cabinetStatus';
import Button from './../components/Button';
import Caution from '../components/Caution';

export default function CabinetRent(props) {
  // 상위 링크를 표시하기 위함
  const ancestorMenuTree = [
    { name: '홈', link: '/' },
    { name: '대여', link: '/rent/cabinetrent' },
  ];
  const currentTabContents = [
    { name: '우산 대여', link: '/rent/umbrellarent', accent: false },
    { name: '사물함 대여', link: '/rent/cabinetrent', accent: true },
  ];
  const approveManagerMent = `관리자 승인 후\n사용 가능합니다.`;

  const cabinetList = cabinetStatus;
  const myName = '김진호';

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
          {cabinetList.map(cabinet => (
            <Cabinet
              key={`cabinet${cabinet.cabinetNumber}`}
              rent={cabinet.status === 'rent'}
              myRent={cabinet.status === 'rent' && cabinet.lender === myName}
            >
              <CabinetNumber
                rent={cabinet.status === 'rent'}
                myRent={cabinet.status === 'rent' && cabinet.lender === myName}
              >
                {cabinet.cabinetNumber}
              </CabinetNumber>
              <CabinetDesc>
                <CabinetRentStatus>
                  <CabinetRentCircleStatus
                    rent={cabinet.status === 'rent'}
                    myRent={
                      cabinet.status === 'rent' && cabinet.lender === myName
                    }
                  />
                  <CabinetRentStatusMent
                    rent={cabinet.status === 'rent'}
                    myRent={
                      cabinet.status === 'rent' && cabinet.lender === myName
                    }
                  >
                    {cabinet.status === 'rent' && cabinet.lender === myName
                      ? '내가 대여'
                      : cabinet.status === 'rent'
                      ? '대여 중'
                      : '대여 가능'}
                  </CabinetRentStatusMent>
                </CabinetRentStatus>
                {cabinet.status === 'rent' ? (
                  <>
                    <DayInfo>
                      <StartDay
                        myRent={cabinet.lender === myName}
                      >{`대여일자 | ${cabinet.start}`}</StartDay>
                      <EndDay
                        myRent={cabinet.lender === myName}
                      >{`반납일자 | ${cabinet.end}`}</EndDay>
                    </DayInfo>
                    {cabinet.lender === myName ? (
                      <ReturnCabinetButton>반납하기</ReturnCabinetButton>
                    ) : (
                      <Lender>{cabinet.lender}</Lender>
                    )}
                  </>
                ) : (
                  <>
                    <ApproveManager>{approveManagerMent}</ApproveManager>
                    <RentButton buttonName="대여 신청하기"></RentButton>
                  </>
                )}
              </CabinetDesc>
            </Cabinet>
          ))}
        </CabinetGrid>
        <Caution />
      </CabinetCurrentState>
    </CabinetRentContainer>
  );
}

const CabinetRentContainer = styled.div`
  width: 100%;
  height: 100vh;
`;

const CabinetCurrentState = styled.div`
  width: 1200px;
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
  font-size: 40px;
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

const Cabinet = styled.div`
  display: flex;
  width: 280px;
  height: 170px;
  padding: 0px 16px;
  border: 1px solid ${theme.colors.white};
  border-radius: 20px;
  background-color: ${props =>
    props.rent && props.myRent
      ? theme.colors.white
      : props.rent
      ? 'transparent'
      : theme.colors.white};
`;

const CabinetNumber = styled.div`
  margin: 60px 16px;
  padding-top: 8px;
  color: ${props =>
    props.rent && props.myRent
      ? theme.colors.black
      : props.rent
      ? theme.colors.white
      : theme.colors.black};
  font-family: 'GmarketSansMedium', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 32px;
  line-height: 100%;
`;

const CabinetDesc = styled.div`
  margin: 23px 0;
  margin-right: 28px;
`;

const CabinetRentStatus = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

// color 테마에 넣어야한다.
const CabinetRentCircleStatus = styled.div`
  width: 20px;
  height: 20px;
  margin-right: 10px;
  background-color: ${props =>
    props.rent && props.myRent
      ? '#9747FF'
      : props.rent
      ? 'transparent'
      : '#4ea1d3'};

  border: 3px solid
    ${props =>
      props.rent && props.myRent
        ? '#9747FF'
        : props.rent
        ? theme.colors.white
        : '#4ea1d3'};
  border-radius: 50%;
`;

const CabinetRentStatusMent = styled.div`
  padding-top: 3px;
  color: ${props =>
    props.rent && props.myRent
      ? theme.colors.black
      : props.rent
      ? theme.colors.white
      : theme.colors.black};

  font-family: 'GmarketSansMedium', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: ${theme.fontSizes.label};
  line-height: 24px;
`;

const DayInfo = styled.div`
  margin: 8px 0;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 300;
  font-size: ${theme.fontSizes.font_normal};
  line-height: 100%;
`;

const StartDay = styled.div`
  margin-bottom: 4px;
  color: ${props => (props.myRent ? theme.colors.black : '#b3b3b3')};
`;

const EndDay = styled.div`
  color: ${props => (props.myRent ? '#9747FF' : '#b3b3b3')};
  font-weight: ${props => (props.myRent ? 600 : 300)};
`;

const ApproveManager = styled.div`
  margin-bottom: 8px;
  color: ${theme.colors.black};
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 110%;
  text-align: center;
  white-space: pre-line;
`;

const RentButton = styled(Button)`
  width: 160px;
  height: 40px;
  background-color: #4ea1d3;
  border-radius: 20px;

  font-weight: 300;
  font-size: 18px;
  line-height: 21px;
`;

const Lender = styled.div`
  width: 160px;
  height: 40px;
  padding-top: 9px;
  background-color: #b3b3b3;
  border-radius: 20px;

  color: ${theme.colors.black};
  font-weight: 300;
  font-size: 18px;
  line-height: 21px;
  text-align: center;
`;

// disable를 넣기 위해 따로 생성
const ReturnCabinetButton = styled.button`
  width: 160px;
  height: 40px;
  background-color: #9747ff;
  border: none;
  border-radius: 20px;
  color: ${theme.colors.white};
  font-family: 'Pretendard', sans-serif;
  font-style: normal;
  font-weight: 300;
  font-size: 18px;
  line-height: 21px;

  &:hover {
    cursor: pointer;
  }
`;