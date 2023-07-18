import styled from 'styled-components';
import theme from '../../styles/Theme';
import useSelect from '../../hook/useSelect';

function EachUmbrellaManage({ umbrella }) {
  const [state, setState] = useSelect('unrent');
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
            {umbrella.status === 'unavailable'
              ? '대여 불가능'
              : umbrella.status === 'rent'
              ? '대여 중'
              : '대여 가능'}
          </UmbrellaRentStatusMent>
        </UmbrellaRentStatus>
        {umbrella.status === 'rent' ? (
          <>
            <DayInfo>
              <EndDay>{`${umbrella.end} 까지`}</EndDay>
            </DayInfo>
            <Lender>{umbrella.lender}</Lender>
          </>
        ) : umbrella.status === 'unrent' ? (
          <>
            <StateSelectButton
              onChange={setState}
              value={state}
              defaultValue="unrent"
            >
              <StateOption value="stolen">도난</StateOption>
              <StateOption value="loss">분실</StateOption>
              <StateOption value="unrent">선택(사용가능)</StateOption>
            </StateSelectButton>
          </>
        ) : (
          <Lender>
            {umbrella.unavailableReason === 'stolen'
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

const StateSelectButton = styled.select`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 248px;
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
