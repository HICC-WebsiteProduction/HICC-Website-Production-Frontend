import styled from 'styled-components';
import theme from '../../styles/Theme';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { cabinet, cabinetModal } from '../../atom/cabinet';
import useConfirm from '../../hook/useConfirm';
import { request } from '../../utils/axios';
import ConfirmMessage from '../../constants/ConfirmMessage';

// 사물함 대여페이지에서 사용하는 사물함들
function EachCabinet({ eachCabinet }) {
  const myName = '김진호'; // 추후에 user atom에서 가져와서 사용할 예정
  const approveManagerMent = `관리자 승인 후\n사용 가능합니다.`;

  const setCurrentIndex = useSetRecoilState(cabinetModal); // 모달 창 작동을 위해
  const [cabinetList, setCabinetList] = useRecoilState(cabinet); // 사물함 상태 변경을 위해

  // 사물함 반납 처리
  // 대여자의 id를 넘긴다. 추후에 백엔드 개발자와 협의할 예정
  const confirmGrant = async () => {
    const body = {
      targetId: 'B731070',
    };
    try {
      const response = await request('post', '/locker/return', body);

      // 선택한 사물함을 반납함 (myRent -> unrent)
      const updatedList = cabinetList.map(cabinet => {
        if (cabinet.cabinetNumber === eachCabinet.cabinetNumber) {
          return {
            ...cabinet,
            status: 'unrent',
            start: null,
            end: null,
            lender: null,
          };
        } else {
          return cabinet;
        }
      });
      setCabinetList(updatedList);

      // 정상적인 결과는 resolve로 1을 전달해준다.
      return new Promise(resolve => resolve(1));
    } catch (error) {
      console.log(error);
    }
  };

  // 반납할 때 확인 창을 띄우는 함수 (useConfirm custom hook)
  const returnCabinet = useConfirm(
    ConfirmMessage.returnItem,
    confirmGrant,
    '반납처리가 완료되었습니다.',
  );

  return (
    <Cabinet
      key={`cabinet${eachCabinet.cabinetNumber}`}
      status={eachCabinet.status}
    >
      <CabinetNumber status={eachCabinet.status}>
        {eachCabinet.cabinetNumber}
      </CabinetNumber>
      <CabinetDesc>
        <CabinetRentStatus>
          <CabinetRentCircleStatus status={eachCabinet.status} />
          <CabinetRentStatusMent status={eachCabinet.status}>
            {eachCabinet.status === 'myRent'
              ? '내가 대여'
              : eachCabinet.status === 'rent'
              ? '대여 중'
              : eachCabinet.status === 'waiting'
              ? '승인 대기 중'
              : eachCabinet.status === 'unavailable'
              ? '대여 불가'
              : '대여 가능'}
          </CabinetRentStatusMent>
        </CabinetRentStatus>
        {eachCabinet.status === 'rent' || eachCabinet.status === 'myRent' ? (
          <>
            <DayInfo>
              <StartDay
                myRent={eachCabinet.lender === myName}
              >{`대여일자 | ${eachCabinet.start}`}</StartDay>
              <EndDay
                myRent={eachCabinet.lender === myName}
              >{`반납일자 | ${eachCabinet.end}`}</EndDay>
            </DayInfo>
            {eachCabinet.lender === myName ? (
              <ReturnCabinetButton onClick={returnCabinet}>
                반납하기
              </ReturnCabinetButton>
            ) : (
              <Lender>{eachCabinet.lender}</Lender>
            )}
          </>
        ) : (
          <>
            <ApproveManager status={eachCabinet.status}>
              {approveManagerMent}
            </ApproveManager>
            {eachCabinet.status === 'waiting' ? (
              <WaitingApprove>{eachCabinet.lender}</WaitingApprove>
            ) : eachCabinet.status === 'unavailable' ? (
              <WaitingApprove>-</WaitingApprove>
            ) : (
              <>
                <RentButton
                  onClick={() => setCurrentIndex(eachCabinet.cabinetNumber)}
                >
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

export default EachCabinet;

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
  color: ${props => theme.itemColorByState.itemStatus[props.status]};
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
