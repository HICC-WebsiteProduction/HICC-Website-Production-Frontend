import styled from 'styled-components';
import theme from '../../styles/Theme';
import Button from '../util/Button';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { useRef } from 'react';
import useCloseModal from '../../hook/useCloseModal';
import { applyType } from '../../constants/ApplyType';
import { cabinet } from '../../atom/cabinet';

// 대여 승인 팝업 창
/*
  itemName: 사물함, 우산
  itemNumber: 사물함 번호, 우산 번호
  lender: 대여자 - 대여 신청자
  startDay: 대여 시작일
  endDay: 대여 반납일
*/
export default function ApproveModal(props) {
  const { itemName, itemNumber, lender, start, end } = props;

  const closeModalFunc = useResetRecoilState(applyType[itemName].index);
  // 모달 창 종료를 위해 모달 오픈 여부를 모두 false로 리셋함

  const modalRef = useRef(null);
  const closeModal = useCloseModal(modalRef, closeModalFunc); // 모달 창 닫음을 수행

  const [cabinetList, setCabinetList] = useRecoilState(cabinet); // 사물함 상태 변환 (승인은 사물함 밖에 없음)

  // 신청 거절 - unrent 상태로 전환
  const RejectApply = () => {
    const updatedState = cabinetList.map(cabinet => {
      if (cabinet.cabinetNumber === itemNumber) {
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

    setCabinetList(updatedState);

    closeModalFunc();
  };

  // 신청 수락 - rent 상태로 전환
  const ApproveApply = () => {
    const updatedState = cabinetList.map(cabinet => {
      if (cabinet.cabinetNumber === itemNumber) {
        return {
          ...cabinet,
          status: 'rent',
        };
      } else {
        return cabinet;
      }
    });

    setCabinetList(updatedState);

    closeModalFunc();
  };

  return (
    <>
      <ApplyCabinetModalContainer ref={modalRef}>
        <Header>{itemName} 대여 신청</Header>
        <ApplyCabinetModalContent>
          <InputRow>
            <Label>{itemName} 번호</Label>
            <Input value={itemNumber} disabled />
          </InputRow>
          <InputRow>
            <Label>대여 신청자</Label>
            <Input value={lender} disabled />
          </InputRow>
          <InputRow>
            <Label>대여 신청 일자</Label>
            <Input type="date" value={start} disabled />
          </InputRow>
          <InputRow>
            <Label>반납 일자</Label>
            <Input type="date" value={end} disabled />
          </InputRow>
        </ApplyCabinetModalContent>
        <ButtonContainer>
          <RejectButton buttonName="승인 거부" onClick={RejectApply} />
          <ApproveButton buttonName="승인 허용" onClick={ApproveApply} />
        </ButtonContainer>
      </ApplyCabinetModalContainer>
    </>
  );
}

const ApplyCabinetModalContainer = styled.div`
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
  font-family: 'GmarketSansMedium';
  font-weight: 500;
  font-size: 32px;
  text-align: center;
`;

const ApplyCabinetModalContent = styled.div`
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
  font-family: 'Pretendard';
  font-weight: 300;
  font-size: ${theme.fontSizes.font_normal};
`;

const Input = styled.input`
  width: 277px;
  background-color: transparent;
  color: ${theme.colors.white};
  border: none;
  outline: none;

  font-family: 'Pretendard';
  font-weight: 500;
  font-size: ${theme.fontSizes.font_normal};
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
