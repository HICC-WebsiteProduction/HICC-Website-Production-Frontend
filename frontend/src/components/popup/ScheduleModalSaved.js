import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import theme from '../../styles/Theme';
import CustomDatePicker from './../datePicker/datePicker';
import Button from './../util/Button';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { useRecoilValue } from 'recoil';
// import { date } from '../../atom/date';

// 일정 캘린더 내 일정 작성을 누를 때 뜨는 팝업창
export default function ScheduleModal(props) {
  const [selectOption, setSelectOption] = useState('default'); // 학술, 친목, 학교행사 선택

  const onChangeSelect = event => {
    setSelectOption(event.target.value);
  };

  const onSubmit = event => {
    event.preventDefault();
  };
  const modalRef = useRef(null);

  const onClose = () => {
    props.closeModal();
  };

  // const selectDate = useRecoilValue(date); // 선택된 날짜 가져오기
  return (
    <ScheduleModalContainer ref={modalRef}>
      <ScheduleModalHeader>
        <ScheduleModalTitle>{props.title}</ScheduleModalTitle>
        <SelectScheduleType
          value={selectOption}
          color={theme.scheduleTypeColor[selectOption]}
          onChange={onChangeSelect}
        >
          <SelectScheduleTypeOption value="default" style={{ display: 'none' }}>
            {props.scheduleType}
          </SelectScheduleTypeOption>
          <SelectScheduleTypeOption
            value="amity"
            color={theme.scheduleTypeColor.amity}
          >
            친목
          </SelectScheduleTypeOption>
          <SelectScheduleTypeOption
            value="hongikEvent"
            color={theme.scheduleTypeColor.hongikEvent}
          >
            학교행사
          </SelectScheduleTypeOption>
          <SelectScheduleTypeOption
            value="academic"
            color={theme.scheduleTypeColor.academic}
          >
            학술
          </SelectScheduleTypeOption>
        </SelectScheduleType>
      </ScheduleModalHeader>
      <ScheduleInputContainer onSubmit={onSubmit}>
        <InputRow>
          <InputRowLable>일정 제목</InputRowLable>
          <Input required height={30} defaultValue={props.title}></Input>
        </InputRow>
        <InputRow>
          <InputRowLable>날짜</InputRowLable>
          <Input type="date" value={props.date} disabled required height={30} />
          {props.role && (
            <DatePickerContainer>
              <CustomDatePicker />
              <DateIcon icon={faCalendarDays} />
            </DatePickerContainer>
          )}
        </InputRow>
        <InputRow>
          <InputRowLable>세부사항</InputRowLable>
          <Input required height={78} defaultValue={props.description}></Input>
        </InputRow>
        <ButtonContainer>
          {props.role && <CancleButton buttonName="취소" onClick={onClose} />}
          {props.role && <SubmitButton buttonType="submit" buttonName="수정" />}
        </ButtonContainer>
      </ScheduleInputContainer>
    </ScheduleModalContainer>
  );
}

const ScheduleModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 0);
  width: 620px;
  //height: 750px;
  background-color: ${theme.colors.black};
  z-index: 1050;
`;

const ScheduleModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 70px;
  background-color: ${theme.colors.white};
`;

const ScheduleModalTitle = styled.div`
  padding: 20px;
  font-family: 'GmarketSansMedium';
  font-weight: 500;
  font-size: 30px;
  color: #2c2c33;
`;

const SelectScheduleType = styled.select`
  width: 160px;
  height: 60px;
  margin: 5px 10px;
  padding: 10px;
  justify-content: center;
  align-items: center;

  border-radius: 10px;
  border: 3px solid ${theme.colors.black};
  background: ${theme.colors.white};

  color: ${props => props.color};
  font-family: 'Pretendard';
  font-size: 25px;
  font-weight: 300;
`;

const SelectScheduleTypeOption = styled.option`
  width: 160px;
  padding: 15px;
  color: ${props => props.color};
  font-family: 'Pretendard';
  font-size: 20px;
  font-weight: 300;
`;

const ScheduleInputContainer = styled.form`
  padding: 20px 10px;
`;

const InputRow = styled.div`
  position: relative;
  width: 580px;
  margin-bottom: 10px;
`;

const InputRowLable = styled.div`
  margin-bottom: 8px;
  color: rgba(237, 240, 248, 0.7);
  font-family: 'Pretendard';
  font-size: 20px;
  font-weight: 300;
  text-align: left;
`;

const Input = styled.input`
  width: 580px;
  height: ${props => `${props.height}px`};
  background-color: transparent;
  border: none;
  border-bottom: 1px solid rgba(237, 240, 248, 0.7);
  outline: none;

  color: ${theme.colors.white};
  font-family: 'Pretendard';
  font-size: 20px;
  font-weight: 300;
`;

const DatePickerContainer = styled.div`
  position: absolute;
  top: 35px;
  right: 25px;
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: 74px;
  justify-content: flex-end;
`;

const DateIcon = styled(FontAwesomeIcon)`
  color: ${theme.colors.purple};
  font-size: 20px;
  &:hover {
    cursor: pointer;
  }
`;

const CancleButton = styled(Button)`
  width: 120px;
  height: 50px;
  margin-right: 20px;
  background-color: #ff8764;
  color: ${theme.colors.white};
`;

const SubmitButton = styled(Button)`
  width: 120px;
  height: 50px;
  color: ${theme.colors.white};
`;
