import styled from 'styled-components';
import theme from '../../styles/Theme';
import Button from '../util/Button';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { useRef, useState } from 'react';
import useCloseModal from '../../hook/useCloseModal';
import { applyType } from '../../constants/ApplyType';
import useConfirm from '../../hook/useConfirm';
import { request } from '../../utils/axios';
import ConfirmMessage from '../../constants/ConfirmMessage';

// 대여 신청 팝업 창
/*
  itemName: 사물함, 우산
  itemNumber: 사물함 번호, 우산 번호
  lender: 대여자 - 대여 신청자
  startDay: 대여 시작일
  endDay: 대여 반납일
  startDayDisabled: 대여 시작일 선택불가여부 (오늘 날짜로 고정)
  endDayDisabled: 대여 반납일 선택불가여부 (사물함 선택 가능, 우산은 7일로 고정)
*/
export default function ApplyModal(props) {
  const {
    itemName,
    itemNumber,
    lender,
    startDay,
    endDay,
    startDayDisabled,
    endDayDisabled,
  } = props;

  const closeModalFunc = useResetRecoilState(applyType[itemName].index);
  // 모달 창 종료를 위해 모달 오픈 여부를 모두 false로 리셋함
  const modalRef = useRef(null);
  const closeModal = useCloseModal(modalRef, closeModalFunc); // 모달 창 닫음을 수행

  const [itemList, setItemList] = useRecoilState(applyType[itemName].item); // 대여 상태 변환
  const [date, setDate] = useState(); // 날짜 선택을 위해

  const onChange = event => {
    setDate(event.target.value);
  };

  // 대여 신청
  // 한 사람 당 한 개만 신청할 수 있음
  const confirmGrant = () => {
    if (itemList.find(item => item.lender === lender)) {
      return new Promise(reject => {
        reject('한 사람당 한 개만 신청하세요.');
      });
    } else {
      const body = {
        targetId: 'B731070',
      };
      // 사물함일 경우 승인 대기 상태로 전환
      if (itemName === '사물함') {
        try {
          const response = request('post', '/locker/rent', body);
          const updatedList = itemList.map(cabinet => {
            if (cabinet.cabinetNumber === itemNumber) {
              return {
                ...cabinet,
                status: 'waiting',
                start: startDay,
                end: date,
                lender,
              };
            } else {
              return cabinet;
            }
          });
          setItemList(updatedList);
        } catch (error) {
          console.log(error);
        }
      } else {
        // 우산일 경우 내가 대여 상태로 변환
        try {
          const response = request('post', '/umbrella/rent', body);
          const updatedList = itemList.map(umbrella => {
            if (umbrella.umbrellaNumber === itemNumber) {
              return {
                ...umbrella,
                status: 'myRent',
                start: startDay,
                end: endDay,
                lender,
              };
            } else {
              return umbrella;
            }
          });
          setItemList(updatedList);
        } catch (error) {
          console.log(error);
        }
      }
      // 정상적인 결과는 resolve로 1을 전달해준다.
      return new Promise(resolve => resolve(1));
    }
  };

  // 신청 확인 창을 띄운다.
  const apply = useConfirm(
    ConfirmMessage.rentItem,
    confirmGrant,
    '정상적으로 신청되었습니다.',
  );

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
            <Input value={lender} disabled />
          </InputRow>
          <InputRow>
            <Label>대여일자</Label>
            <Input type="date" value={startDay} disabled={startDayDisabled} />
          </InputRow>
          <InputRow>
            <Label>반납일자</Label>
            <Input
              type="date"
              value={endDay !== undefined ? endDay : date || ''}
              onChange={onChange}
              disabled={endDayDisabled}
            />
          </InputRow>
        </ApplyCabinetModalContent>
        <ApplyButton buttonName="신청하기" onClick={apply} />
      </ApplyCabinetModalContainer>
    </>
  );
}

const ApplyCabinetModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  position: fixed;
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

const ApplyButton = styled(Button)`
  width: 320px;
  height: 40px;
`;
