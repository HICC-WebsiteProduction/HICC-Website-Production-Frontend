import styled from 'styled-components';
import theme from '../../styles/Theme';
import Button from '../util/Button';
import { useResetRecoilState } from 'recoil';
import { useRef } from 'react';
import useCloseModal from '../../hook/useCloseModal';
import { applyType } from '../../constants/ApplyType';

export default function ApplyModal(props) {
  const {
    itemName,
    itemNumber,
    startDay,
    endDay,
    startDayDisabled,
    endDayDisabled,
  } = props;

  const closeModalFunc = useResetRecoilState(applyType[itemName]);
  const modalRef = useRef(null);
  const closeModal = useCloseModal(modalRef, closeModalFunc);

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
            <Label>대여자</Label>
            <Input value={'apple'} disabled />
          </InputRow>
          <InputRow>
            <Label>대여일자</Label>
            <Input type="date" value={startDay} disabled={startDayDisabled} />
          </InputRow>
          <InputRow>
            <Label>반납일자</Label>
            <Input type="date" value={endDay} disabled={endDayDisabled} />
          </InputRow>
        </ApplyCabinetModalContent>
        <ApplyButton buttonName="신청하기" />
      </ApplyCabinetModalContainer>
    </>
  );
}

const ApplyCabinetModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 700px;
  height: 400px;
  padding: 32px 64px;
  background-color: ${theme.colors.black};
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
  background-color: transparent;
  color: ${theme.colors.white};
  border: none;
  outline: none;

  font-family: 'Pretendard';
  font-weight: 500;
  font-size: ${theme.fontSizes.font_normal};
  text-align: left;
`;

const ApplyButton = styled(Button)`
  width: 320px;
  height: 40px;
`;
