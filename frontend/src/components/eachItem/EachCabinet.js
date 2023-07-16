import styled from 'styled-components';
import theme from '../../styles/Theme';

function EachCabinet({ cabinet, handleModal }) {
  const myName = '김진호';
  const approveManagerMent = `관리자 승인 후\n사용 가능합니다.`;

  return (
    <Cabinet key={`cabinet${cabinet.cabinetNumber}`} status={cabinet.status}>
      <CabinetNumber status={cabinet.status}>
        {cabinet.cabinetNumber}
      </CabinetNumber>
      <CabinetDesc>
        <CabinetRentStatus>
          <CabinetRentCircleStatus status={cabinet.status} />
          <CabinetRentStatusMent status={cabinet.status}>
            {cabinet.status === 'myRent'
              ? '내가 대여'
              : cabinet.status === 'rent'
              ? '대여 중'
              : cabinet.status === 'waiting'
              ? '승인 대기 중'
              : '대여 가능'}
          </CabinetRentStatusMent>
        </CabinetRentStatus>
        {cabinet.status === 'rent' || cabinet.status === 'myRent' ? (
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
            {cabinet.status === 'waiting' ? (
              <WaitingApprove>{cabinet.lender}</WaitingApprove>
            ) : (
              <>
                <RentButton onClick={handleModal(cabinet.cabinetNumber)}>
                  대여 신청하기
                </RentButton>
              </>
            )}
          </>
        )}
      </CabinetDesc>
    </Cabinet>
  );
}

const Cabinet = styled.div`
  display: flex;
  width: 280px;
  height: 170px;
  padding: 0px 16px;
  border: 1px solid ${theme.colors.white};
  border-radius: 20px;
  background-color: ${props => theme.itemColorByState.background[props.status]};
`;

const CabinetNumber = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 26px;
  margin: 60px 16px;
  color: ${props => theme.itemColorByState.number[props.status]};
  font-family: 'GmarketSansMedium', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: ${theme.fontSizes.subtitle};
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
  background-color: ${props => theme.itemColorByState.indicator[props.status]};
  border: 3px solid
    ${props => theme.itemColorByState.indicatorBorder[props.status]};
  border-radius: 50%;
`;

const CabinetRentStatusMent = styled.div`
  width: 133px;
  padding-top: 3px;
  color: ${props => theme.itemColorByState.itemStatus[props.status]};
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
  color: ${props => (props.myRent ? theme.colors.black : theme.colors.grey)};
`;

const EndDay = styled.div`
  color: ${props => (props.myRent ? theme.colors.purple : theme.colors.grey)};
  font-weight: ${props => (props.myRent ? 600 : 300)};
`;

const ApproveManager = styled.div`
  margin-bottom: 8px;
  color: ${theme.colors.black};
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 300;
  font-size: ${theme.fontSizes.font_normal};
  line-height: 110%;
  text-align: center;
  white-space: pre-line;
`;

const RentButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 160px;
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
  width: 160px;
  height: 40px;
  padding-top: 9px;
  background-color: ${theme.colors.grey};
  border-radius: 20px;

  color: ${theme.colors.black};
  font-family: 'Pretendard';
  font-weight: 300;
  font-size: ${theme.fontSizes.font_normal};
  line-height: 21px;
  text-align: center;
`;

const WaitingApprove = styled.div`
  width: 160px;
  height: 40px;
  padding-top: 9px;
  background-color: ${theme.itemColorByState.button.wating};
  border-radius: 20px;

  color: ${theme.colors.black};
  font-family: 'Pretendard';
  font-weight: 300;
  font-size: ${theme.fontSizes.font_normal};
  line-height: 21px;
  text-align: center;
`;

// disable를 넣기 위해 따로 생성
const ReturnCabinetButton = styled.button`
  width: 160px;
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

export default EachCabinet;
