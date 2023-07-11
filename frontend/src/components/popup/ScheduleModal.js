import React, { useState } from 'react';
import styled from 'styled-components';
import theme from '../../styles/Theme';
import CustomDatePicker from './../datePicker/datePicker';
import { useSelector } from 'react-redux';
import Button from './../util/Button';

export default function ScheduleModal(props) {
  const [selectOption, setSelectOption] = useState('default');

  const onChangeSelect = event => {
    setSelectOption(event.target.value);
  };

  const onSubmit = event => {
    event.preventDefault();
  };

  const date = useSelector(state => state.datePickerReducer.selectedDay);

  return (
    <ScheduleModalContainer>
      <ScheduleModalHeader>
        <ScheduleModalTitle>일정 제목</ScheduleModalTitle>
        <SelectScheduleType
          value={selectOption}
          color={theme.scheduleTypeColor[selectOption]}
          onChange={onChangeSelect}
        >
          <SelectScheduleTypeOption value="default" style={{ display: 'none' }}>
            일정 종류
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
          <InputRowLable>제목</InputRowLable>
          <Input required />
        </InputRow>
        <InputRow>
          <InputRowLable>날짜</InputRowLable>
          <Input
            type="date"
            value={date.toISOString().slice(0, 10)}
            disabled
            required
          />
          <DatePickerContainer>
            <CustomDatePicker />
          </DatePickerContainer>
        </InputRow>
        <InputRow>
          <InputRowLable>시간</InputRowLable>
          <Input type="time" />
        </InputRow>
        <InputRow>
          <InputRowLable>장소</InputRowLable>
          <Input required />
        </InputRow>
        <InputRow>
          <InputRowLable>세부사항</InputRowLable>
          <Input required />
        </InputRow>
        <ButtonContainer>
          <CancleButton buttonName="취소" onClick={props.onClose} />
          <SubmitButton buttonType="submit" buttonName="저장" />
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
  height: 750px;
  background-color: ${theme.colors.black};
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
  margin-bottom: 10px;
`;

const InputRowLable = styled.div`
  margin-bottom: 8px;
  color: rgba(237, 240, 248, 0.7);
  font-family: 'Pretendard';
  font-size: 20px;
  font-weight: 300;
`;

const Input = styled.input`
  width: 580px;
  height: 40px;
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
  ${theme.flexbox.flex};
  width: 100%;
  margin-top: 74px;
  justify-content: flex-end;
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
