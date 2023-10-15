import styled from 'styled-components';
import theme from '../../styles/Theme';
import Button from '../util/Button';
import { useRecoilState } from 'recoil';
import useCloseModal from '../../hook/useCloseModal';
import { locker } from '../../atom/locker';

// 대여 승인 팝업 창
/*
  itemName: 사물함, 우산
  itemNumber: 사물함 번호, 우산 번호
  lender: 대여자 - 대여 신청자
  startDay: 대여 시작일
  endDay: 대여 반납일
*/
export default function ApproveModal(props) {
  const { modalRef, closeModal, itemName, itemNumber, lender, start, end } =
    props;

  useCloseModal(modalRef, closeModal); // 모달 창 닫음을 수행

  const [lockerList, setLockerList] = useRecoilState(locker); // 사물함 상태 변환 (승인은 사물함 밖에 없음)

  // 신청 거절 - available 상태로 전환
  const RejectApply = () => {
    const updatedState = lockerList.map(locker => {
      if (locker.id === itemNumber) {
        return {
          ...locker,
          rentalStatus: 'available',
          start: null,
          end: null,
          member: null,
        };
      } else {
        return locker;
      }
    });

    setLockerList(updatedState);

    closeModal();
  };

  // 신청 수락 - rented 상태로 전환
  const ApproveApply = () => {
    const updatedState = lockerList.map(locker => {
      if (locker.id === itemNumber) {
        return {
          ...locker,
          rentalStatus: 'rented',
          member: lender,
        };
      } else {
        return locker;
      }
    });

    setLockerList(updatedState);

    closeModal();
  };

  return (
    <>
      <Container ref={modalRef}>
        <Header>{itemName} 대여 신청</Header>
        <Content>
          <InputRow>
            <Label>{itemName} 번호</Label>
            <Input value={itemNumber} disabled />
          </InputRow>
          <InputRow>
            <Label>대여 신청자</Label>
            <Input value={lender.nickname} disabled />
          </InputRow>
          <InputRow>
            <Label>대여 신청 일자</Label>
            <Input type="date" value={start} disabled />
          </InputRow>
          <InputRow>
            <Label>반납 일자</Label>
            <Input type="date" value={end} disabled />
          </InputRow>
        </Content>
        <ButtonContainer>
          <RejectButton buttonName="승인 거부" onClick={RejectApply} />
          <ApproveButton buttonName="승인 허용" onClick={ApproveApply} />
        </ButtonContainer>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;

  width: 700px;
  height: 400px;
  padding: 32px 64px;
  background-color: ${theme.colors.black};
  border-radius: 20px;
`;

const Header = styled.header`
  color: ${theme.colors.white};
  ${theme.fontstyle.head3};
  text-align: center;
`;

const Content = styled.div`
  width: 340px;
  margin: 32px 0;
  padding: 8px 0px;
`;

const InputRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const Label = styled.div`
  width: 126px;
  margin-right: 20px;
  color: ${theme.colors.white};
  ${theme.fontstyle.body12};
`;

const Input = styled.input`
  width: 277px;
  background-color: transparent;
  color: ${theme.colors.white};
  border: none;
  outline: none;

  ${theme.fontstyle.body10};
  text-align: left;
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 370px;
  margin: 32px auto;
`;

const RejectButton = styled(Button)`
  width: 160px;
  height: 40px;
  background-color: ${theme.colors.cancleRed};
  margin-right: 50px;
`;

const ApproveButton = styled(Button)`
  width: 160px;
  height: 40px;
  background-color: ${theme.colors.green};
`;
