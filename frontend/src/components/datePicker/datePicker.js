import { useEffect, useState } from 'react';
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

  // cancel button
  const datePickerCancel = () => {
    resetSelectedDate();
    props.setIsOpen(false);
  };

  const datePickerSelect = () => {
    props.setIsOpen(false);
  };

  useEffect(() => {
    return () => {
      resetSelectedDate();
    };
  }, [resetSelectedDate]);

  if (!props.calendar) {
    props.calendar = new Date();
  }

  return (
    <DatePickerWrapper
      locale={ko}
      dateFormat="yyyy-MM-dd"
      selected={selectedDate}
      open={props.isOpen}
      minDate={props.calendar}
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
          <MonthButton type="button" onClick={decreaseMonth}>{`<`}</MonthButton>
          <ShowSelectYearAndMonth>
            {`${getYear(date)}.${('0' + (getMonth(date) + 1)).slice(-2)}`}
          </ShowSelectYearAndMonth>
          <MonthButton type="button" onClick={increaseMonth}>{`>`}</MonthButton>
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
        <CancelButton type="button" onClick={datePickerCancel}>
          취소
        </CancelButton>
        <SelectButton type="button" onClick={datePickerSelect}>
          확인
        </SelectButton>
      </DatePickerFooter>
    </DatePickerWrapper>
  );
}

const DatePickerWrapper = styled(DatePicker)`
  margin-left: 25px;
  border: none;
  background-color: transparent;

  color: ${theme.colors.white};
  ${theme.fontstyle.body7};

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
  padding: 0 20px;
  padding-top: 36px;
  background-color: ${theme.colors.black};
`;

const CancelButton = styled.button`
  width: 120px;
  height: 50px;
  border-radius: 10px;
  border: none;
  background-color: ${theme.colors.cancleRed};

  color: ${theme.colors.white};
  ${theme.fontstyle.body3};
`;

const SelectButton = styled.button`
  width: 120px;
  height: 50px;
  margin-left: 10px;
  border-radius: 10px;
  border: none;
  background-color: ${theme.colors.blue};

  color: ${theme.colors.white};
  ${theme.fontstyle.body3};
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
  color: ${theme.colors.white};
  text-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
  padding-top: 6px;

  ${theme.fontstyle.body7};
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
  margin-bottom: 10px;
  color: ${theme.colors.pureBlack};

  ${theme.fontstyle.body7};
  text-align: left;
`;

const ShowDate = styled.div`
  color: ${theme.colors.pureBlack};

  ${theme.fontstyle.head8};
  text-align: left;
`;

const DatePickerBody = styled.div`
  position: relative;
`;

const DatePickerInner = styled(CalendarContainer)`
  position: fixed;
  top: 5%;
  left: 50%;
  z-index: 1000;
  transform: translateX(-50%);

  border: none;
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
