import React, { useState } from 'react';
import styled from 'styled-components';
import theme from '../../styles/Theme';
import CustomDatePicker from './../datePicker/datePicker';
import Button from './../util/Button';
import { useRecoilValue } from 'recoil';
import { date } from '../../atom/date';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { request } from '../../utils/axios';
import useSelect from './../../hook/useSelect';
import useInput from './../../hook/useInput';

// 일정 캘린더 내 일정 작성을 누를 때 뜨는 팝업창
export default function ScheduleModal(props) {
  const [selectOption, setSelectOption] = useSelect('default'); // 학술, 친목, 학교행사 선택
  const [title, setTitle] = useInput(''); // 일정제목
  const [desc, setDesc] = useInput(''); // 세부내용
  const [isOpen, setIsOpen] = useState(false);

  const selectDay = useRecoilValue(date);

  // 일정 저장하는 함수
  const onSubmit = async event => {
    const body = {
      title,
      date: selectDay,
      option: selectOption,
      desc,
    };
    try {
      await request('post', '/calendar', body);
    } catch (error) {
      console.log(error);
    }
  };

  const openDatePicker = () => {
    setIsOpen(true);
  };

  return (
    <ScheduleModalContainer>
      <ScheduleModalHeader>
        <ScheduleModalTitle>일정 제목</ScheduleModalTitle>
        <SelectScheduleType
          value={selectOption}
          color={theme.scheduleTypeColor[selectOption]}
          onChange={setSelectOption}
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
          <InputRowLable>일정 제목</InputRowLable>
          <Input required height={30} value={title} onChange={setTitle} />
        </InputRow>
        <InputRow>
          <InputRowLable>날짜</InputRowLable>
          <DatePickerContainer>
            <CustomDatePicker isOpen={isOpen} setIsOpen={setIsOpen} />
            <DateIcon icon={faCalendarDays} onClick={openDatePicker} />
          </DatePickerContainer>
        </InputRow>
        <InputRow>
          <InputRowLable>세부사항</InputRowLable>
          <TextArea required height={120} value={desc} onChange={setDesc} />
        </InputRow>
        <ButtonContainer>
          <CancleButton buttonName="취소" onClick={props.closeModal} />
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
  z-index: 100;
  transform: translate(-50%, -50%);
  width: 620px;
  height: 750px;
  background-color: ${theme.colors.black};
  z-index: 1080;
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
  color: ${theme.colors.black};

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

const TextArea = styled.textarea`
  width: 580px;
  height: ${props => `${props.height}px`};
  background-color: transparent;
  border: none;
  border-bottom: 1px solid rgba(237, 240, 248, 0.7);
  outline: none;
  resize: none;

  color: ${theme.colors.white};
  font-family: 'Pretendard';
  font-size: 20px;
  font-weight: 300;
`;

const DatePickerContainer = styled.label`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 580px;
  height: 40px;

  border-bottom: 1px solid rgba(237, 240, 248, 0.7);

  &:hover {
    cursor: pointer;
  }
`;

const DateIcon = styled(FontAwesomeIcon)`
  color: ${theme.colors.purple};
  font-size: 20px;
  &:hover {
    cursor: pointer;
  }
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
