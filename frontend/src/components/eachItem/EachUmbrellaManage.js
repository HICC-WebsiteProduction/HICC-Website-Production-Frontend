import styled from 'styled-components';
import useSelect from '../../hook/useSelect';
import { useRecoilState } from 'recoil';
import { umbrella } from '../../atom/umbrella';
import moment from 'moment';
import theme from './../../styles/Theme';

// 우산 관리 페이지에서 사용하는 우산들
function EachUmbrellaManage({ eachUmbrella }) {
  const [state, setState] = useSelect(eachUmbrella.unavailableReason); // 우산 상태 변경 (도난, 분실, 사용가능)

  const [umbrellaList, setUmbrellaList] = useRecoilState(umbrella); // 우산 상태 기억을 위해

  const isOverDue = moment(eachUmbrella.end).isBefore(new Date());

  // 우산의 상태를 변경하는 함수
  const modifyUmbrellaState = event => {
    setState(event);

    // 클릭한 우산 상태가 unrent(사용가능)이라면 사용가능 아니면 다른 상태들로 변환
    const updatedState = umbrellaList.map(umbrella => {
      if (umbrella.umbrellaNumber === eachUmbrella.umbrellaNumber) {
        return {
          ...umbrella,
          status: event.target.value === 'unrent' ? 'unrent' : 'unavailable',
          unavailableReason:
            event.target.value === 'unrent' ? null : event.target.value,
        };
      } else {
        return umbrella;
      }
    });

    setUmbrellaList(updatedState);
  };

  return (
    <Umbrella
      key={`umbrella${eachUmbrella.umbrellaNumber}`}
      status={eachUmbrella.status}
    >
      <UmbrellaNumber status={eachUmbrella.status}>
        {eachUmbrella.umbrellaNumber}
      </UmbrellaNumber>
      <UmbrellaDesc>
        <UmbrellaRentStatus>
          <CabinetRentCircleStatus status={eachUmbrella.status} />
          <UmbrellaRentStatusMent status={eachUmbrella.status}>
            {eachUmbrella.status === 'unavailable'
              ? '대여 불가능'
              : eachUmbrella.status === 'rent'
              ? '대여 중'
              : '대여 가능'}
          </UmbrellaRentStatusMent>
        </UmbrellaRentStatus>
        {eachUmbrella.status === 'rent' ? (
          <>
            <DayInfo>
              <EndDay>{`${eachUmbrella.end} 까지`}</EndDay>
            </DayInfo>
            <Lender isOverDue={isOverDue ? 1 : 0}>{eachUmbrella.lender}</Lender>
          </>
        ) : eachUmbrella.status === 'unrent' ? (
          <>
            <StateSelectButton
              onChange={event => modifyUmbrellaState(event)}
              value={state}
              defaultValue={'unrent'}
              status={eachUmbrella.status}
            >
              <StateOption value="stolen">도난</StateOption>
              <StateOption value="loss">분실</StateOption>
              <StateOption value="unrent">선택(사용가능)</StateOption>
            </StateSelectButton>
          </>
        ) : eachUmbrella.status === 'unavailable' ? (
          <>
            <StateSelectButton
              onChange={event => modifyUmbrellaState(event)}
              value={state}
              status={eachUmbrella.status}
            >
              <StateOption value="stolen">도난</StateOption>
              <StateOption value="loss">분실</StateOption>
              <StateOption value="unrent">선택(사용가능)</StateOption>
            </StateSelectButton>
          </>
        ) : (
          <Lender>
            {eachUmbrella.unavailableReason === 'stolen'
              ? '도난 상태'
              : '분실 상태'}
          </Lender>
        )}
      </UmbrellaDesc>
    </Umbrella>
  );
}

export default EachUmbrellaManage;

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
  ${theme.fontstyle.head3};
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

  ${theme.fontstyle.head6};
`;

const DayInfo = styled.div`
  position: absolute;
  top: 10px;
  right: 0px;
  margin: 8px 0;
  ${theme.fontstyle.body12};
`;

const EndDay = styled.div`
  margin-bottom: 4px;
  color: ${props => (props.myRent ? theme.colors.black : theme.colors.grey)};
`;

const StateSelectButton = styled.select`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 248px;
  height: 40px;
  background-color: ${props =>
    props.status === 'unrent' ? theme.colors.blue : theme.colors.grey};
  border: none;
  border-radius: 20px;
  outline: none;

  color: ${props =>
    props.status === 'unrent' ? theme.colors.white : theme.colors.black};
  ${theme.fontstyle.body9};
  text-align: center;

  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  &:hover {
    cursor: pointer;
  }
`;

const Lender = styled.div`
  width: 248px;
  height: 40px;
  padding-top: 7px;
  background-color: ${theme.colors.grey};
  border-radius: 20px;

  color: ${props => (props.isOverDue ? theme.colors.red : theme.colors.black)};
  ${theme.fontstyle.body9};

  text-align: center;
`;

const StateOption = styled.option`
  width: 248px;
  height: 40px;
  background-color: ${theme.colors.white};
  color: ${theme.colors.black};
  ${theme.fontstyle.body9};

  &:first-child {
    border-radius: 20px 20px 0px 0px;
  }

  &:last-child {
    border-radius: 0px 0px 20px 20px;
  }
`;
