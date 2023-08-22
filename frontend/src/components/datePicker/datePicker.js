import { useState } from 'react';
import DatePicker, { CalendarContainer } from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import styled from 'styled-components';
import { getYear, getMonth } from 'date-fns';
import '../../styles/datepicker.css';

import theme from '../../styles/Theme';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { date } from './../../atom/date';
require('react-datepicker/dist/react-datepicker.css');

// 날짜 선택창을 직접 만들기를 요청하여
// react-datepicker 라이브러리를 활용하여 제작
export default function CustomDatePicker(props) {
  const [selectedDate, setSelectedDate] = useRecoilState(date); // 현재 선택한 날짜
  const resetSelectedDate = useResetRecoilState(date); // 선택 초기화
  const [month, setMonth] = useState(new Date().getMonth() + 1); // 현재 선택한 월

  // 월을 바꿀 때 일어나는 함수
  const handleMonthChange = date => {
    setMonth(date.getMonth());
    console.log(month);
  };

  // 일을 바꿀 때 일어나는 함수
  const handleDaySelect = date => {
    setSelectedDate(date);
  };

  const datePickerClose = () => {
    resetSelectedDate();
  };

  return (
    <DatePickerWrapper
      locale={ko}
      dateFormat="yyyy-MM-dd"
      selected={selectedDate}
      onChange={date => handleDaySelect(date)}
      shouldCloseOnSelect={false}
      onMonthChange={handleMonthChange}
      calendarContainer={MyContainer}
      wrapperClassName="datepicker-container"
      renderCustomHeader={({
        date,
        changeYear,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <CustomHeaderContainer>
          <MonthButton onClick={decreaseMonth}>{`<`}</MonthButton>
          <ShowSelectYearAndMonth>
            {`${getYear(date)}.${('0' + (getMonth(date) + 1)).slice(-2)}`}
          </ShowSelectYearAndMonth>
          <MonthButton onClick={increaseMonth}>{`>`}</MonthButton>
        </CustomHeaderContainer>
      )}
      calendarClassName="custom-calender"
      dayClassName={day =>
        day.getDate() === selectedDate.getDate()
          ? 'selectedDay'
          : 'unSelectedDay'
      }
    >
      <DatePickerFooter>
        <SelectButton type="button" onClick={datePickerClose}>
          취소
        </SelectButton>
        <SelectButton type="button">확인</SelectButton>
      </DatePickerFooter>
    </DatePickerWrapper>
  );
}

const DatePickerWrapper = styled(DatePicker)`
  border: none;
  background-color: transparent;

  color: ${theme.colors.white};
  font-family: 'Pretendard';
  font-size: 20px;
  font-style: normal;
  font-weight: 300;

  outline: none;
`;

function MyContainer({ className, children }) {
  const selectedDate = useRecoilValue(date);
  const week = ['일', '월', '화', '수', '목', '금', '토'];

  // 날짜 선택 창 상단에 보이는 부분
  // 선택한 년월일을 확인할 수 있음
  return (
    <DatePickerContainer>
      <DatePickerInner className={className}>
        <DatePickerTop>
          <ShowYear>{`${selectedDate.getFullYear()}년`}</ShowYear>
          <ShowDate>{`${
            selectedDate.getMonth() + 1
          }월 ${selectedDate.getDate()}일 ${
            week[selectedDate.getDay()]
          }요일`}</ShowDate>
        </DatePickerTop>
        <DatePickerBody>{children}</DatePickerBody>
      </DatePickerInner>
    </DatePickerContainer>
  );
}

const DatePickerFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 100px;
  padding: 0 70px;
  padding-top: 36px;
  background-color: ${theme.colors.black};
`;

const SelectButton = styled.button`
  width: 70px;
  height: 30px;
  margin-left: 10px;
`;

const CustomHeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 67px;
  padding-bottom: 38px;
  background-color: ${theme.colors.black};
`;

const MonthButton = styled.button`
  margin: 0 90px;
  background-color: transparent;
  border: none;
  color: white;
  font-size: 20px;
  &:hover {
    cursor: pointer;
  }
`;

const ShowSelectYearAndMonth = styled.div`
  color: white;
`;

// date picker top
const DatePickerTop = styled.div`
  box-sizing: border-box;
  width: 490px;
  height: 130px;
  padding: 30px 20px;
  background-color: ${theme.colors.white};
`;

const ShowYear = styled.div`
  font-size: 20px;
`;

const ShowDate = styled.div`
  font-size: 30px;
`;

const DatePickerBody = styled.div`
  position: relative;
`;

const DatePickerInner = styled(CalendarContainer)`
  position: fixed;
  top: 0;
  left: 50%;
  z-index: 1000;
  transform: translateX(-50%);
`;

const DatePickerContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;
