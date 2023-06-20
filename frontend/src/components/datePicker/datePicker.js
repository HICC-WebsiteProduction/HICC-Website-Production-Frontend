import { forwardRef, useEffect, useState } from 'react';
import DatePicker, { CalendarContainer } from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import styled from 'styled-components';
import { getYear, getMonth } from 'date-fns';
import '../../styles/datepicker.css';
require('react-datepicker/dist/react-datepicker.css');

export default function CustomDatePicker() {
  const [date, setDate] = useState(new Date());
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  const CustomInput = forwardRef(({ onClick }, ref) => (
    <DatePickerButton onClick={onClick} ref={ref}>
      {`클릭`}
    </DatePickerButton>
  ));

  const handleMonthChange = date => {
    setMonth(date.getMonth());
  };

  const handleDaySelect = date => {
    setDate(date);
  };

  useEffect(() => {
    setDate(new Date());
  }, []);

  return (
    <DatePickerContainer
      locale={ko}
      dateFormat="yyyy-MM-dd"
      selected={date}
      onSelect={date => handleDaySelect(date)}
      shouldCloseOnSelect={false}
      onMonthChange={handleMonthChange}
      calendarContainer={MyContainer}
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
        day.getDate() === date.getDate() ? 'selectedDay' : 'unSelectedDay'
      }
      customInput={<CustomInput />}
    />
  );
}

const DatePickerButton = styled.button`
  width: 50px;
  height: 30px;
`;

function MyContainer({ className, children }) {
  const date = new Date();
  const week = ['일', '월', '화', '수', '목', '금', '토'];

  return (
    <CalendarContainer className={className}>
      <DatePickerTop>
        <ShowYear>{`${date.getFullYear()}년`}</ShowYear>
        <ShowDate>{`${date.getMonth() + 1}월 ${date.getDate()}일 ${
          week[date.getDay()]
        }요일`}</ShowDate>
      </DatePickerTop>
      <DatePickerBody>{children}</DatePickerBody>
      <DatePickerFooter>
        <SelectButton>취소</SelectButton>
        <SelectButton>확인</SelectButton>
      </DatePickerFooter>
    </CalendarContainer>
  );
}

const DatePickerFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 100px;
  padding: 0 70px;
  padding-top: 36px;
  background-color: #2c2c33;
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
  background-color: #2c2c33;
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
  background-color: #edf0f8;
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

const DatePickerContainer = styled(DatePicker)`
  background-color: blue;
`;
