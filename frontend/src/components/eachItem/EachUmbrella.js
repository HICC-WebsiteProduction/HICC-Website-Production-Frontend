import styled from 'styled-components';
import theme from '../../styles/Theme';
import { request } from '../../utils/axios';
import useConfirm from '../../hook/useConfirm';
import moment from 'moment';
import ConfirmMessage from '../../constants/ConfirmMessage';
import { UmbrellaStatusMent } from '../../constants/RentalStatus';
import { useRef } from 'react';
import useModal from '../../hook/useModal';
import ApplyModal from '../popup/ApplyModal';

// 우산 대여페이지에서 사용하는 우산들
function EachUmbrella({ eachUmbrella }) {
  const isOverDue = moment(eachUmbrella.end).isBefore(new Date());

  // 우산 반납 처리
  // 대여자의 id를 넘긴다. 추후에 백엔드 개발자와 협의할 예정
  const confirmGrant = async () => {
    const body = {
      targetId: 'B731070',
    };
    try {
      await request('post', '/umbrella/return', body);
      // 정상적인 결과는 resolve로 1을 전달해준다.
      return new Promise(resolve => resolve(1));
    } catch (error) {
      console.log(error);
    }
  };

  // 우산 반납 확인 창을 띄우는 함수
  const returnUmbrella = useConfirm(
    ConfirmMessage.returnItem,
    confirmGrant,
    '반납처리가 완료되었습니다.',
  );

  const modalRef = useRef(null);
  const [modalOpen, closeModal, changeModalState] = useModal(modalRef);
  const name = 'jinokim';

  const now = new Date(); //  오늘 날짜
  const sevenDaysAgo = new Date(now.setDate(now.getDate() + 7)); // 우산 반납은 7일 후로 고정

  return (
    <>
      <Umbrella
        key={`umbrella${eachUmbrella.id}`}
        status={eachUmbrella.rentalStatus}
      >
        <UmbrellaNumber status={eachUmbrella.rentalStatus}>
          {eachUmbrella.id}
        </UmbrellaNumber>
        <UmbrellaDesc>
          <UmbrellaRentStatus>
            <CabinetRentCircleStatus status={eachUmbrella.rentalStatus} />
            <UmbrellaRentStatusMent status={eachUmbrella.rentalStatus}>
              {UmbrellaStatusMent(eachUmbrella.rentalStatus)}
            </UmbrellaRentStatusMent>
          </UmbrellaRentStatus>
          {eachUmbrella.rentalStatus === 'rented' ||
          eachUmbrella.rentalStatus === 'myRent' ? (
            <>
              <DayInfo>
                <EndDay
                  myRent={eachUmbrella.rentalStatus === 'myRent'}
                >{`${eachUmbrella.end} 까지`}</EndDay>
              </DayInfo>
              {eachUmbrella.rentalStatus === 'myRent' ? (
                <ReturnUmbrellaButton onClick={returnUmbrella}>
                  반납하기
                </ReturnUmbrellaButton>
              ) : (
                <Lender isOverDue={isOverDue ? 1 : 0}>
                  {eachUmbrella.member.nickname}
                </Lender>
              )}
            </>
          ) : eachUmbrella.rentalStatus === 'under_maintenance' ? (
            <Lender>도난 상태</Lender>
          ) : eachUmbrella.rentalStatus === 'lost' ? (
            <Lender>분실 상태</Lender>
          ) : (
            <>
              <RentButton onClick={changeModalState}>대여 신청하기</RentButton>
            </>
          )}
        </UmbrellaDesc>
      </Umbrella>
      <ViewApplyModal ref={modalRef} view={modalOpen ? 1 : 0}>
        {modalOpen && (
          <ApplyModal
            modalRef={modalRef}
            closeModal={closeModal}
            itemName={`우산`}
            itemNumber={eachUmbrella.id}
            lender={name}
            startDay={moment(new Date())}
            endDay={sevenDaysAgo}
          />
        )}
      </ViewApplyModal>
    </>
  );
}

export default EachUmbrella;

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

const RentButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 248px;
  height: 40px;
  background-color: ${theme.colors.blue};
  border-radius: 20px;

  color: ${theme.colors.white};
  ${theme.fontstyle.body9};
  text-align: center;

  &:hover {
    cursor: pointer;
  }
`;

const Lender = styled.div`
  width: 248px;
  height: 40px;
  padding-top: 6px;
  background-color: ${theme.colors.grey};
  border-radius: 20px;

  color: ${props => (props.isOverDue ? theme.colors.red : theme.colors.black)};
  ${theme.fontstyle.body9};

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
  ${theme.fontstyle.body9};

  &:hover {
    cursor: pointer;
  }
`;

const ViewApplyModal = styled.div`
  display: ${props => (props.view ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.6);
  z-index: 101;
`;
