import styled from 'styled-components';
import theme from '../../styles/Theme';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { umbrella, umbrellaModal } from '../../atom/umbrella';
import { request } from '../../utils/axios';
import useConfirm from '../../hook/useConfirm';
import moment from 'moment';

// 우산 대여페이지에서 사용하는 우산들
function EachUmbrella({ eachUmbrella }) {
  const myName = '김진호'; // 추후에 user atom에서 가져와서 사용할 예정

  const setCurrentIndex = useSetRecoilState(umbrellaModal); // 모달 창 관리를 위해
  const [umbrellaList, setUmbrellaList] = useRecoilState(umbrella); // 우산 정보를 변경하기 위해

  const isOverDue = moment(eachUmbrella.end).isBefore(new Date());

  // 우산 반납 처리
  // 대여자의 id를 넘긴다. 추후에 백엔드 개발자와 협의할 예정
  const confirmGrant = async () => {
    const body = {
      targetId: 'B731070',
    };
    try {
      const response = await request('post', '/umbrella/return', body);

      // 우산을 프론트에서 반납처리한다.
      const updatedList = umbrellaList.map(umbrella => {
        if (umbrella.umbrellaNumber === eachUmbrella.umbrellaNumber) {
          return {
            ...umbrella,
            status: 'unrent',
            start: null,
            end: null,
            lender: null,
          };
        } else {
          return umbrella;
        }
      });
      setUmbrellaList(updatedList);

      // 정상적인 결과는 resolve로 1을 전달해준다.
      return new Promise(resolve => resolve(1));
    } catch (error) {
      console.log(error);
    }
  };

  // 우산 반납 확인 창을 띄우는 함수
  const returnUmbrella = useConfirm(
    '정말 반납하시겠습니까?',
    confirmGrant,
    '반납처리가 완료되었습니다.',
  );
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
            {eachUmbrella.status === 'myRent'
              ? '내가 대여'
              : eachUmbrella.status === 'rent'
              ? '대여 중'
              : eachUmbrella.status === 'unavailable'
              ? '대여 불가'
              : '대여 가능'}
          </UmbrellaRentStatusMent>
        </UmbrellaRentStatus>
        {eachUmbrella.status === 'rent' || eachUmbrella.status === 'myRent' ? (
          <>
            <DayInfo>
              <EndDay
                myRent={eachUmbrella.lender === myName}
              >{`${eachUmbrella.end} 까지`}</EndDay>
            </DayInfo>
            {eachUmbrella.lender === myName ? (
              <ReturnUmbrellaButton onClick={returnUmbrella}>
                반납하기
              </ReturnUmbrellaButton>
            ) : (
              <Lender isOverDue={isOverDue ? 1 : 0}>
                {eachUmbrella.lender}
              </Lender>
            )}
          </>
        ) : eachUmbrella.status === 'unavailable' ? (
          <Lender>
            {eachUmbrella.unavailableReason === 'stolen'
              ? '도난 상태'
              : '분실 상태'}
          </Lender>
        ) : (
          <>
            <RentButton
              onClick={() => setCurrentIndex(eachUmbrella.umbrellaNumber)}
            >
              대여 신청하기
            </RentButton>
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

  color: ${props => (props.isOverDue ? theme.colors.red : theme.colors.black)};
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
