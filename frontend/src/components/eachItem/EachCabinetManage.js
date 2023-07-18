import styled from 'styled-components';
import theme from '../../styles/Theme';
import useSelect from '../../hook/useSelect';

function EachCabinetManage({ cabinet }) {
  const [state, setState] = useSelect('unrent');
  return (
    <Cabinet key={`cabinet${cabinet.cabinetNumber}`} status={cabinet.status}>
      <CabinetNumber status={cabinet.status}>
        {cabinet.cabinetNumber}
      </CabinetNumber>
      <CabinetDesc>
        <CabinetRentStatus>
          <CabinetRentCircleStatus status={cabinet.status} />
          <CabinetRentStatusMent status={cabinet.status}>
            {cabinet.status === 'rent'
              ? '대여 중'
              : cabinet.status === 'waiting'
              ? '승인 대기 중'
              : cabinet.status === 'unavailable'
              ? '대여 불가능'
              : '대여 가능'}
          </CabinetRentStatusMent>
        </CabinetRentStatus>
        {cabinet.status === 'rent' ? (
          <>
            <DayInfo>
              <StartDay>{`대여일자 | ${cabinet.start}`}</StartDay>
              <EndDay>{`반납일자 | ${cabinet.end}`}</EndDay>
            </DayInfo>

            <Lender>{cabinet.lender}</Lender>
          </>
        ) : (
          <>
            <ApproveManager status={cabinet.status}>
              뭔가 메시지가 있으면 좋지 않을까?
            </ApproveManager>
            {cabinet.status === 'waiting' ? (
              <WaitingApprove>{cabinet.lender}</WaitingApprove>
            ) : cabinet.status === 'unavailable' ? (
              <Lender>사용 불가</Lender>
            ) : (
              <>
                <StateSelectButton
                  onChange={setState}
                  value={state}
                  defaultValue="unrent"
                >
                  <StateOption value="unavailable">사용 불가</StateOption>
                  <StateOption value="unrent">사용 가능</StateOption>
                </StateSelectButton>
              </>
            )}
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
  color: ${props => theme.itemColorByState.itemStatus[props.status]};
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 300;
  font-size: ${theme.fontSizes.font_normal};
  line-height: 110%;
  text-align: center;
  white-space: pre-line;
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

const StateSelectButton = styled.select`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 160px;
  height: 40px;
  background-color: ${theme.colors.blue};
  border: none;
  border-radius: 20px;
  outline: none;

  color: ${theme.colors.white};
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
