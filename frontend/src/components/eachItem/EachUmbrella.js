import styled from 'styled-components';
import theme from '../../styles/Theme';
import { useRef } from 'react';
import useModal from '../../hook/useModal';
import ApplyModal from '../popup/ApplyModal';

function EachUmbrella({ umbrella }) {
  const myName = '김진호';
  const now = new Date();
  const sevenDaysAgo = new Date(now.setDate(now.getDate() + 7));

  const modalRef = useRef(null);
  const applyModal = useModal(modalRef);
  return (
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
        {umbrella.status === 'rent' || umbrella.status === 'myRent' ? (
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
            <RentButton ref={modalRef}>대여 신청하기</RentButton>
            {applyModal ? (
              <ApplyModal
                itemName={`우산`}
                itemNumber={umbrella.umbrellaNumber}
                startDay={new Date().toISOString().slice(0, 10)}
                endDay={sevenDaysAgo.toISOString().slice(0, 10)}
                startDayDisabled={true}
                endDayDisabled={true}
              />
            ) : null}
          </>
        )}
      </UmbrellaDesc>
    </Umbrella>
  );
}

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

const RentButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 248px;
  height: 40px;
  background-color: ${theme.colors.blue};
  border-radius: 20px;

  color: ${theme.colors.white};
  font-weight: 300;
  font-size: ${theme.fontSizes.font_normal};
  line-height: 21px;

  &:hover {
    cursor: pointer;
  }
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

export default EachUmbrella;
