import styled from 'styled-components';
import theme from '../../styles/Theme';
import useConfirm from '../../hook/useConfirm';
import { request } from '../../utils/axios';
import ConfirmMessage from '../../constants/ConfirmMessage';
import { LockerStatusMent } from '../../constants/RentalStatus';
import { useRef } from 'react';
import useModal from './../../hook/useModal';
import ApplyModal from '../popup/ApplyModal';
import moment from 'moment';

// 사물함 대여페이지에서 사용하는 사물함들
function EachLocker({ eachLocker }) {
  const approveManagerMent = `관리자 승인 후\n사용 가능합니다.`;

  // 사물함 반납 처리
  // 대여자의 id를 넘긴다. 추후에 백엔드 개발자와 협의할 예정
  const confirmGrant = async () => {
    const body = {
      targetId: 'B731070',
    };
    try {
      await request('post', '/locker/return', body);
      // 정상적인 결과는 resolve로 1을 전달해준다.
      return new Promise(resolve => resolve(1));
    } catch (error) {
      console.log(error);
    }
  };

  // 반납할 때 확인 창을 띄우는 함수 (useConfirm custom hook)
  const returnLocker = useConfirm(
    ConfirmMessage.returnItem,
    confirmGrant,
    '반납처리가 완료되었습니다.',
  );

  const modalRef = useRef(null);
  const [modalOpen, closeModal, changeModalState] = useModal(modalRef);
  const name = 'jinokim';

  return (
    <>
      <Locker key={`locker${eachLocker.id}`} status={eachLocker.rentalStatus}>
        <LockerNumber status={eachLocker.rentalStatus}>
          {eachLocker.id}
        </LockerNumber>
        <LockerDesc>
          <LockerRentStatus>
            <LockerRentCircleStatus status={eachLocker.rentalStatus} />
            <LockerRentStatusMent status={eachLocker.rentalStatus}>
              {LockerStatusMent(eachLocker.rentalStatus)}
            </LockerRentStatusMent>
          </LockerRentStatus>
          {eachLocker.rentalStatus === 'rented' ||
          eachLocker.rentalStatus === 'myRent' ? (
            <>
              <DayInfo>
                <StartDay
                  myRent={eachLocker.rentalStatus === 'myRent'}
                >{`대여일자 | ${eachLocker.start}`}</StartDay>
                <EndDay
                  myRent={eachLocker.rentalStatus === 'myRent'}
                >{`반납일자 | ${eachLocker.end}`}</EndDay>
              </DayInfo>
              {eachLocker.rentalStatus === 'myRent' ? (
                <ReturnLockerButton onClick={returnLocker}>
                  반납하기
                </ReturnLockerButton>
              ) : (
                <Lender>{eachLocker.member.nickname}</Lender>
              )}
            </>
          ) : (
            <>
              <ApproveManager status={eachLocker.rentalStatus}>
                {approveManagerMent}
              </ApproveManager>
              {eachLocker.rentalStatus === 'waiting' ? (
                <WaitingApprove>{eachLocker.member.nickname}</WaitingApprove>
              ) : eachLocker.rentalStatus === 'under_maintenance' ? (
                <WaitingApprove>-</WaitingApprove>
              ) : (
                <>
                  <RentButton onClick={changeModalState}>
                    대여 신청하기
                  </RentButton>
                </>
              )}
            </>
          )}
        </LockerDesc>
      </Locker>
      <ViewApplyModal ref={modalRef} view={modalOpen ? 1 : 0}>
        {modalOpen && (
          <ApplyModal
            modalRef={modalRef}
            closeModal={closeModal}
            itemName={`사물함`}
            itemNumber={eachLocker.id}
            lender={name}
            startDay={moment(new Date())}
            endDay={undefined}
          />
        )}
      </ViewApplyModal>
    </>
  );
}

export default EachLocker;

const Locker = styled.div`
  display: flex;
  width: 280px;
  height: 170px;
  padding: 0px 16px;
  border: 1px solid ${theme.colors.white};
  border-radius: 20px;
  background-color: ${props => theme.itemColorByState.background[props.status]};
`;

const LockerNumber = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 26px;
  margin: 60px 16px;
  color: ${props => theme.itemColorByState.number[props.status]};
  ${theme.fontstyle.head3};
`;

const LockerDesc = styled.div`
  margin: 23px 0;
  margin-right: 28px;
`;

const LockerRentStatus = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const LockerRentCircleStatus = styled.div`
  width: 20px;
  height: 20px;
  margin-right: 10px;
  background-color: ${props => theme.itemColorByState.indicator[props.status]};
  border: 3px solid
    ${props => theme.itemColorByState.indicatorBorder[props.status]};
  border-radius: 50%;
`;

const LockerRentStatusMent = styled.div`
  width: 133px;
  padding-top: 3px;
  color: ${props => theme.itemColorByState.itemStatus[props.status]};
  ${theme.fontstyle.head6};
`;

const DayInfo = styled.div`
  margin: 8px 0;
  ${theme.fontstyle.body12};
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
  ${theme.fontstyle.body12};

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
  ${theme.fontstyle.body9};

  &:hover {
    cursor: pointer;
  }
`;

const Lender = styled.div`
  width: 160px;
  height: 40px;
  padding-top: 6px;
  background-color: ${theme.colors.grey};
  border-radius: 20px;

  color: ${theme.colors.black};
  ${theme.fontstyle.body9};

  text-align: center;
`;

const WaitingApprove = styled.div`
  width: 160px;
  height: 40px;
  padding-top: 6px;
  background-color: ${theme.itemColorByState.button.wating};
  border-radius: 20px;

  color: ${theme.colors.black};
  ${theme.fontstyle.body9};

  text-align: center;
`;

// disable를 넣기 위해 따로 생성
const ReturnLockerButton = styled.button`
  width: 160px;
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
