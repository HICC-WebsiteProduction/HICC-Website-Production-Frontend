import React from 'react';
import styled from 'styled-components';
import HeaderAndNavigation from '../components/header/HeaderAndNavigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUmbrella } from '@fortawesome/free-solid-svg-icons';
import theme from '../styles/Theme';
import Caution from '../components/Caution';
import { umbrellaStatus } from '../dummy/umbrellaStatus';
import Button from '../components/Button';

/*
currentTabContents는 현재 탭의 정보로
name은 이름, link은 url, accent는 현재 메뉴면 true, 아니면 false를 주면 됩니다.
*/

export default function UmbrellaRent(props) {
  // 상위 링크를 표시하기 위함
  const ancestorMenuTree = [
    { name: '홈', link: '/' },
    { name: '대여', link: '/rent/cabinetrent' },
  ];
  const currentTabContents = [
    { name: '우산 대여', link: '/rent/umbrellarent', accent: true },
    { name: '사물함 대여', link: '/rent/cabinetrent', accent: false },
  ];
  const approveManagerMent = `관리자 승인 후\n사용 가능합니다.`;
  const umbrellaList = umbrellaStatus;

  const myName = '김진호';

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
          {umbrellaList.map(umbrella => (
            <Umbrella
              key={`umbrella${umbrella.umbrellaNumber}`}
              rent={umbrella.status === 'rent'}
              myRent={umbrella.status === 'rent' && umbrella.lender === myName}
            >
              <UmbrellaNumber
                rent={umbrella.status === 'rent'}
                myRent={
                  umbrella.status === 'rent' && umbrella.lender === myName
                }
              >
                {umbrella.umbrellaNumber}
              </UmbrellaNumber>
              <UmbrellaDesc>
                <UmbrellaRentStatus>
                  <CabinetRentCircleStatus
                    rent={umbrella.status === 'rent'}
                    myRent={
                      umbrella.status === 'rent' && umbrella.lender === myName
                    }
                  />
                  <UmbrellaRentStatusMent
                    rent={umbrella.status === 'rent'}
                    myRent={
                      umbrella.status === 'rent' && umbrella.lender === myName
                    }
                  >
                    {umbrella.status === 'rent' && umbrella.lender === myName
                      ? '내가 대여'
                      : umbrella.status === 'rent'
                      ? '대여 중'
                      : '대여 가능'}
                  </UmbrellaRentStatusMent>
                </UmbrellaRentStatus>
                {umbrella.status === 'rent' ? (
                  <>
                    <DayInfo>
                      <StartDay
                        myRent={umbrella.lender === myName}
                      >{`${umbrella.start}~`}</StartDay>
                    </DayInfo>
                    {umbrella.lender === myName ? (
                      <ReturnUmbrellaButton>반납하기</ReturnUmbrellaButton>
                    ) : (
                      <Lender>{umbrella.lender}</Lender>
                    )}
                  </>
                ) : (
                  <>
                    <RentButton buttonName="대여 신청하기"></RentButton>
                  </>
                )}
              </UmbrellaDesc>
            </Umbrella>
          ))}
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

const Umbrella = styled.div`
  display: flex;
  width: 370px;
  height: 100px;
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

const UmbrellaNumber = styled.div`
  margin: 25px;
  padding-top: 11px;
  color: ${props =>
    props.rent && props.myRent
      ? theme.colors.black
      : props.rent
      ? theme.colors.white
      : theme.colors.black};
  font-family: 'GmarketSansMedium', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: ${theme.fontSizes.subtitle};
  line-height: 100%;
`;

const UmbrellaDesc = styled.div`
  position: relative;
  margin: 4px 0;
  margin-right: 24px;
`;

const UmbrellaRentStatus = styled.div`
  display: flex;
  align-items: center;
  margin: 9px 0;
`;

// color 테마에 넣어야한다.
const CabinetRentCircleStatus = styled.div`
  width: 20px;
  height: 20px;
  margin-right: 10px;
  background-color: ${props =>
    props.rent && props.myRent
      ? theme.colors.purple
      : props.rent
      ? 'transparent'
      : theme.colors.blue};

  border: 3px solid
    ${props =>
      props.rent && props.myRent
        ? theme.colors.purple
        : props.rent
        ? theme.colors.white
        : theme.colors.blue};
  border-radius: 50%;
`;

const UmbrellaRentStatusMent = styled.div`
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
  position: absolute;
  top: 10px;
  right: 10px;
  margin: 8px 0;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 300;
  font-size: ${theme.fontSizes.font_normal};
  line-height: 100%;
`;

const StartDay = styled.div`
  margin-bottom: 4px;
  color: ${props => (props.myRent ? theme.colors.black : theme.colors.grey)};
`;

const RentButton = styled(Button)`
  width: 248px;
  height: 40px;
  background-color: ${theme.colors.blue};
  border-radius: 20px;

  font-weight: 300;
  font-size: ${theme.fontSizes.font_normal};
  line-height: 21px;
`;

const Lender = styled.div`
  width: 248px;
  height: 40px;
  padding-top: 9px;
  background-color: ${theme.colors.grey};
  border-radius: 20px;

  color: ${theme.colors.black};
  font-weight: 300;
  font-size: ${theme.fontSizes.font_normal};
  line-height: 21px;
  text-align: center;
`;

// disable를 넣기 위해 따로 생성
const ReturnUmbrellaButton = styled.button`
  width: 248px;
  height: 40px;
  background-color: ${theme.colors.purple};
  border: none;
  border-radius: 20px;
  color: ${theme.colors.white};
  font-family: 'Pretendard', sans-serif;
  font-style: normal;
  font-weight: 300;
  font-size: ${theme.fontSizes.font_normal};
  line-height: 21px;

  &:hover {
    cursor: pointer;
  }
`;
