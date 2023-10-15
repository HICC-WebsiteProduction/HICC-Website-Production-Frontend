import styled from 'styled-components';
import theme from '../../styles/Theme';
import useSelect from '../../hook/useSelect';
import Button from '../util/Button';
import { useRecoilState } from 'recoil';
import { locker } from '../../atom/locker';
import { LockerStatusMent } from '../../constants/RentalStatus';
import { useRef } from 'react';
import useModal from '../../hook/useModal';
import ApproveModal from './../popup/ApproveModal';

// 사물함 관리페이지에서 사용하는 사물함들
function EachLockerManage({ eachLocker }) {
  const [state, setState] = useSelect(eachLocker.rentalStatus); // 사물함의 상태 변경 (사용불가, 가능)
  const [lockerList, setLockerList] = useRecoilState(locker); // 사물함의 상태를 기억하기 위해

  // 사물함 상태를 변경하는 함수
  const modifyLockerState = event => {
    setState(event);

    // 사용불가, 가능 상태를 변경해준다.
    const updatedState = lockerList.map(locker => {
      if (locker.id === eachLocker.id) {
        return {
          ...locker,
          rentalStatus: event.target.value,
        };
      } else {
        return locker;
      }
    });

    setLockerList(updatedState);
  };

  const modalRef = useRef(null);
  const [modalOpen, closeModal, changeModalState] = useModal(modalRef);

  return (
    <>
      <Locker key={`locker${eachLocker.id}`} status={eachLocker.rentalStatus}>
        <LockerNumber status={eachLocker.rentalStatus}>
          {eachLocker.id + 1}
        </LockerNumber>
        <LockerDesc>
          <LockerRentStatus>
            <LockerRentCircleStatus status={eachLocker.rentalStatus} />
            <LockerRentStatusMent status={eachLocker.rentalStatus}>
              {LockerStatusMent(eachLocker.rentalStatus)}
            </LockerRentStatusMent>
          </LockerRentStatus>
          {eachLocker.rentalStatus === 'rented' ? (
            <>
              <DayInfo>
                <StartDay>{`대여일자 | ${eachLocker.start}`}</StartDay>
                <EndDay>{`반납일자 | ${eachLocker.end}`}</EndDay>
              </DayInfo>

              <Lender>{eachLocker.member.nickname}</Lender>
            </>
          ) : eachLocker.rentalStatus === 'waiting' ? (
            <>
              <ApproveManager status={eachLocker.rentalStatus}>
                뭔가 메시지가 있으면 좋지 않을까?
              </ApproveManager>
              <WaitingApprove buttonName="승인" onClick={changeModalState} />
            </>
          ) : eachLocker.rentalStatus === 'under_maintenance' ? (
            <>
              <ApproveManager status={eachLocker.rentalStatus}>
                {`현재 이 사물함은
                  사용이 불가합니다.`}
              </ApproveManager>
              <StateSelectButton
                onChange={event => modifyLockerState(event)}
                value={state}
                status={eachLocker.rentalStatus}
              >
                <StateOption value="available">사용 가능</StateOption>
                <StateOption value="under_maintenance">사용 불가</StateOption>
              </StateSelectButton>
            </>
          ) : (
            <>
              <NoWaitingMent>{`승인 대기자 없음`}</NoWaitingMent>
              <StateSelectButton
                onChange={event => modifyLockerState(event)}
                value={state}
                status={eachLocker.rentalStatus}
              >
                <StateOption value="available">사용 가능</StateOption>
                <StateOption value="under_maintenance">사용 불가</StateOption>
              </StateSelectButton>
            </>
          )}
        </LockerDesc>
      </Locker>

      <ViewApplyModal ref={modalRef} view={modalOpen ? 1 : 0}>
        {modalOpen && (
          <ApproveModal
            modalRef={modalRef}
            closeModal={closeModal}
            itemName={`사물함`}
            itemNumber={eachLocker.id}
            lender={eachLocker.member}
            start={eachLocker.start}
            end={eachLocker.end}
          />
        )}
      </ViewApplyModal>
    </>
  );
}

export default EachLockerManage;

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
  width: 100%;
  height: 35px;
  margin-bottom: 8px;
  color: ${props =>
    props.status === 'waiting' ? theme.colors.black : theme.colors.grey};
  ${theme.fontstyle.body12};

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
  ${theme.fontstyle.body12};
  text-align: center;
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

const WaitingApprove = styled(Button)`
  width: 160px;
  height: 40px;
  padding-top: 2px;
  background-color: ${theme.itemColorByState.button.wating};
  border-radius: 20px;

  color: ${theme.colors.black};
  ${theme.fontstyle.body9};

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
  ${theme.fontstyle.body9};

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
  ${theme.fontstyle.body12};

  &:first-child {
    border-radius: 20px 20px 0px 0px;
  }

  &:last-child {
    border-radius: 0px 0px 20px 20px;
  }
`;

const ViewApplyModal = styled.div`
  display: ${props => (props.view ? 'block' : 'none')};
  position: fixed;

  width: 100%;
  height: 100%;
  left: 0px;
  top: 0px;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 101;
`;
