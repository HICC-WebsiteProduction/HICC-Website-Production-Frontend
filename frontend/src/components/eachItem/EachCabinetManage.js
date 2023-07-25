import styled from 'styled-components';
import theme from '../../styles/Theme';
import useSelect from '../../hook/useSelect';
import Button from '../util/Button';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { cabinetModal, cabinet } from '../../atom/cabinet';

// 사물함 관리페이지에서 사용하는 사물함들
function EachCabinetManage({ eachCabinet }) {
  const [state, setState] = useSelect(eachCabinet.status); // 사물함의 상태 변경 (사용불가, 가능)

  const [cabinetList, setCabinetList] = useRecoilState(cabinet); // 사물함의 상태를 기억하기 위해
  const setCurrentIndex = useSetRecoilState(cabinetModal); // 모달 창 관리를 위해

  // 사물함 상태를 변경하는 함수
  const modifyCabinetState = event => {
    setState(event);

    // 사용불가, 가능 상태를 변경해준다.
    const updatedState = cabinetList.map(cabinet => {
      if (cabinet.cabinetNumber === eachCabinet.cabinetNumber) {
        return {
          ...cabinet,
          status: event.target.value,
        };
      } else {
        return cabinet;
      }
    });

    setCabinetList(updatedState);
  };

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
            {eachCabinet.status === 'rent'
              ? '대여 중'
              : eachCabinet.status === 'waiting'
              ? '승인 대기 중'
              : eachCabinet.status === 'unavailable'
              ? '대여 불가능'
              : '대여 가능'}
          </CabinetRentStatusMent>
        </CabinetRentStatus>
        {eachCabinet.status === 'rent' ? (
          <>
            <DayInfo>
              <StartDay>{`대여일자 | ${eachCabinet.start}`}</StartDay>
              <EndDay>{`반납일자 | ${eachCabinet.end}`}</EndDay>
            </DayInfo>

            <Lender>{eachCabinet.lender}</Lender>
          </>
        ) : eachCabinet.status === 'waiting' ? (
          <>
            <ApproveManager status={eachCabinet.status}>
              뭔가 메시지가 있으면 좋지 않을까?
            </ApproveManager>
            <WaitingApprove
              buttonName="승인"
              onClick={() => setCurrentIndex(eachCabinet.cabinetNumber)}
            />
          </>
        ) : eachCabinet.status === 'unavailable' ? (
          <>
            <ApproveManager status={eachCabinet.status}>
              {`현재 이 사물함은
                  사용이 불가합니다.`}
            </ApproveManager>
            <StateSelectButton
              onChange={event => modifyCabinetState(event)}
              value={state}
              status={eachCabinet.status}
            >
              <StateOption value="unrent">사용 가능</StateOption>
              <StateOption value="unavailable">사용 불가</StateOption>
            </StateSelectButton>
          </>
        ) : (
          <>
            <NoWaitingMent>{`승인 대기자 없음`}</NoWaitingMent>
            <StateSelectButton
              onChange={event => modifyCabinetState(event)}
              value={state}
              status={eachCabinet.status}
            >
              <StateOption value="unrent">사용 가능</StateOption>
              <StateOption value="unavailable">사용 불가</StateOption>
            </StateSelectButton>
          </>
        )}
      </CabinetDesc>
    </Cabinet>
  );
}

export default EachCabinetManage;

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
  width: 100%;
  height: 35px;
  margin-bottom: 8px;
  color: ${props =>
    props.status === 'waiting' ? theme.colors.black : theme.colors.grey};
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 300;
  font-size: ${theme.fontSizes.font_normal};
  line-height: 110%;
  text-align: center;
  white-space: pre-line;
`;

const NoWaitingMent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 35px;
  margin-bottom: 8px;
  color: ${theme.colors.black};
  font-family: 'Pretendard';
  font-weight: 300;
  font-size: ${theme.fontSizes.font_normal};
  text-align: center;
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
  text-align: center;
  line-height: 21px;
`;

const WaitingApprove = styled(Button)`
  width: 160px;
  height: 40px;
  background-color: ${theme.itemColorByState.button.wating};
  border-radius: 20px;

  color: ${theme.colors.black};
  font-family: 'Pretendard';
  font-weight: 300;
  font-size: ${theme.fontSizes.font_normal};
  line-height: 21px;
  text-align: center;
`;

const StateSelectButton = styled.select`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 160px;
  height: 40px;
  background-color: ${props => theme.itemColorByState.button[props.status]};
  border: none;
  border-radius: 20px;
  outline: none;

  color: ${props =>
    props.status === 'unrent' ? theme.colors.white : theme.colors.black};
  font-weight: 300;
  font-size: ${theme.fontSizes.font_normal};
  line-height: 21px;
  text-align: center;

  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  &:hover {
    cursor: pointer;
  }
`;

const StateOption = styled.option`
  width: 248px;
  height: 40px;
  background-color: ${theme.colors.white};
  color: ${theme.colors.black};
  font-family: 'Pretendard';
  font-size: ${theme.fontSizes.font_normal};
  font-weight: 300;

  &:first-child {
    border-radius: 20px 20px 0px 0px;
  }

  &:last-child {
    border-radius: 0px 0px 20px 20px;
  }
`;
