import { forwardRef, useState } from 'react';
import DatePicker, { CalendarContainer } from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import styled from 'styled-components';
import { getYear, getMonth } from 'date-fns';
import '../../styles/datepicker.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';

import theme from '../../styles/Theme';
import { useRecoilState, useRecoilValue } from 'recoil';
import { date } from './../../atom/date';
require('react-datepicker/dist/react-datepicker.css');

export default function CustomDatePicker(props) {
  const [selectedDate, setSelectedDate] = useRecoilState(date);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [datePickerOpen, setDatePickerOpen] = useState(true);

  const CustomInput = forwardRef(({ onClick }, ref) => (
    <DatePickerButton onClick={onClick} ref={ref}>
      <FontAwesomeIcon icon={faCalendarDays} />
    </DatePickerButton>
  ));

  const handleMonthChange = date => {
    setMonth(date.getMonth());
    console.log(month);
  };

  const handleDaySelect = date => {
    setSelectedDate(date);
  };

  const onClose = event => {
    event.preventDefault();
    setDatePickerOpen(false);
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
      customInput={<CustomInput />}
      isOpen={datePickerOpen}
    >
      <DatePickerFooter>
        <SelectButton onClick={onClose}>취소</SelectButton>
        <SelectButton>확인</SelectButton>
      </DatePickerFooter>
    </DatePickerWrapper>
  );
}

const DatePickerWrapper = styled(DatePicker)`
  display: ${props => (props.isOpen ? 'block' : 'none')};
`;

const DatePickerButton = styled.button`
  background-color: transparent;
  border: none;
  color: ${theme.colors.purple};
  font-size: 20px;
  &:hover {
    cursor: pointer;
  }
`;

function MyContainer({ className, children }) {
  const selectedDate = useRecoilValue(date);
  const week = ['일', '월', '화', '수', '목', '금', '토'];

  return (
    <DatePickerContainer className={className}>
      <DatePickerTop>
        <ShowYear>{`${selectedDate.getFullYear()}년`}</ShowYear>
        <ShowDate>{`${
          selectedDate.getMonth() + 1
        }월 ${selectedDate.getDate()}일 ${
          week[selectedDate.getDay()]
        }요일`}</ShowDate>
      </DatePickerTop>
      <DatePickerBody>{children}</DatePickerBody>
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

const DatePickerContainer = styled(CalendarContainer)`
  position: fixed;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
`;
