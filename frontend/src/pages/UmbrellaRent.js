import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import HeaderAndNavigation from '../components/header/HeaderAndNavigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUmbrella } from '@fortawesome/free-solid-svg-icons';
import theme from '../styles/Theme';
import Caution from '../components/Caution';
import { umbrellaStatus } from '../dummy/umbrellaStatus';
import Button from '../components/Button';
import ApplyModal from '../components/popup/ApplyModal';

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

  const [umbrellaRentModal, setUmbrellaRentModal] = useState(
    umbrellaList
      .filter(umbrella => umbrella.status === 'unrent')
      .map(umbrella => {
        return {
          umbrellaNumber: umbrella.umbrellaNumber,
          modalOpen: false,
        };
      }),
  );

  const setModalOpen = umbrellaNumber => {
    const updateUmbrellaRentModal = umbrellaRentModal.map(umbrella => {
      return {
        ...umbrella,
        modalOpen: umbrella.umbrellaNumber === umbrellaNumber,
      };
    });
    console.log(updateUmbrellaRentModal);
    setUmbrellaRentModal(updateUmbrellaRentModal);
  };

  const setModalClose = () => {
    const updateUmbrellaRentModal = umbrellaRentModal.map(umbrella => {
      return {
        ...umbrella,
        modalOpen: false,
      };
    });
    setUmbrellaRentModal(updateUmbrellaRentModal);
  };

  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = event => {
      if (
        modalRef.current == null ||
        !modalRef.current.contains(event.target)
      ) {
        setModalClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalRef]);

  const now = new Date();
  const sevenDaysAgo = new Date(now.setDate(now.getDate() + 7));

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
            umbrellaList.map(umbrella => (
              <Umbrella
                key={`umbrella${umbrella.umbrellaNumber}`}
                status={umbrella.status}
              >
                <UmbrellaNumber status={umbrella.status}>
                  {umbrella.umbrellaNumber}
                </UmbrellaNumber>
                <UmbrellaDesc>
                  <UmbrellaRentStatus>
                    <CabinetRentCircleStatus status={umbrella.status} />
                    <UmbrellaRentStatusMent status={umbrella.status}>
                      {umbrella.status === 'myRent'
                        ? '내가 대여'
                        : umbrella.status === 'rent'
                        ? '대여 중'
                        : '대여 가능'}
                    </UmbrellaRentStatusMent>
                  </UmbrellaRentStatus>
                  {umbrella.status === 'rent' ||
                  umbrella.status === 'myRent' ? (
                    <>
                      <DayInfo>
                        <EndDay
                          myRent={umbrella.lender === myName}
                        >{`${umbrella.end} 까지`}</EndDay>
                      </DayInfo>
                      {umbrella.lender === myName ? (
                        <ReturnUmbrellaButton>반납하기</ReturnUmbrellaButton>
                      ) : (
                        <Lender>{umbrella.lender}</Lender>
                      )}
                    </>
                  ) : (
                    <>
                      <RentButton
                        buttonName="대여 신청하기"
                        onClick={() => setModalOpen(umbrella.umbrellaNumber)}
                      ></RentButton>
                    </>
                  )}
                </UmbrellaDesc>
              </Umbrella>
            ))}
          <div ref={modalRef}>
            {umbrellaRentModal.map(
              umbrella =>
                umbrella.modalOpen && (
                  <ApplyModal
                    item={`우산`}
                    itemNumber={umbrella.umbrellaNumber}
                    startDay={new Date().toISOString().slice(0, 10)}
                    endDay={sevenDaysAgo.toISOString().slice(0, 10)}
                    startDayDisabled={true}
                    endDayDisabled={true}
                  />
                ),
            )}
          </div>
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
  background-color: ${props => theme.itemColorByState.background[props.status]};
`;

const UmbrellaNumber = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 21px;
  margin: 25px;
  color: ${props => theme.itemColorByState.number[props.status]};
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
  background-color: ${props => theme.itemColorByState.indicator[props.status]};

  border: 3px solid
    ${props => theme.itemColorByState.indicatorBorder[props.status]};
  border-radius: 50%;
`;

const UmbrellaRentStatusMent = styled.div`
  padding-top: 3px;
  color: ${props => theme.itemColorByState.itemStatus[props.status]};

  font-family: 'GmarketSansMedium', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: ${theme.fontSizes.label};
  line-height: 24px;
`;

const DayInfo = styled.div`
  position: absolute;
  top: 10px;
  right: 0px;
  margin: 8px 0;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 300;
  font-size: ${theme.fontSizes.font_normal};
  line-height: 100%;
`;

const EndDay = styled.div`
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
