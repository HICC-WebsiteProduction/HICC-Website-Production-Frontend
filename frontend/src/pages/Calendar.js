import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import moment from 'moment';
import data from '../data/data.json';
import HeaderAndTitle from '../components/header/HeaderAndTitle';
import theme from '../styles/Theme';
import ScheduleModal from '../components/popup/ScheduleModal';

function CalendarBox(props) {
  const plans = [];

  const dayPlans = data.filter(plan => moment(plan.date).date() === props.date);
  if (dayPlans.length > 5) {
    console.log('full');
    for (let i = 0; i < 4; i++) {
      plans.push(
        <CalendarPlan key={props.date * 10 + i}>
          {dayPlans[i].title}
        </CalendarPlan>,
      );
    }
    plans.push(
      <CalendarPlan key={`load${props.date}`}>{'· · · · ·'}</CalendarPlan>,
    );
    return (
      <CalendarBox2>
        <CalendarDate isSunday={props.isSunday}>{props.date}</CalendarDate>
        {plans}
      </CalendarBox2>
    );
  }

  return (
    <CalendarBox2>
      <CalendarDate isSunday={props.isSunday}>{props.date}</CalendarDate>
      {dayPlans.map(plan => (
        <CalendarPlan key="{plan}">{plan.title}</CalendarPlan>
      ))}
    </CalendarBox2>
  );
}

function Modal() {
  return (
    <ModalDiv>
      <h4>제목</h4>
      <p>날짜</p>
      <p>상세내용</p>
    </ModalDiv>
  );
}

function Calendar() {
  const [date, setDate] = useState(moment());

  const modalRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = event => {
      if (
        modalRef.current == null ||
        !modalRef.current.contains(event.target)
      ) {
        setModalOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalRef]);

  const daysInMonth = date.daysInMonth(); //달의 마지막날
  const firstDayOfMonth = moment(date).startOf('month').format('d'); //달의 시작날 수

  const dayArray = ['일', '월', '화', '수', '목', '금', '토']; //요일

  const days = [];

  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push('');
  }

  for (let d = 1; d <= daysInMonth; d++) {
    days.push(d);
  }
  console.log(days);

  const goToPrevMonth = () => {
    setDate(moment(date).subtract(1, 'month'));
  };

  const goToNextMonth = () => {
    setDate(moment(date).add(1, 'month'));
  };

  return (
    <MainContainer>
      <HeaderAndTitle titleName="일정 캘린더" />
      <CalendarTop>
        <Blank />
        <CalendarTopContent>
          <CalendarButton onClick={goToPrevMonth}>{'<'}</CalendarButton>
          {date.year()}년 {date.month() + 1}월
          <CalendarButton onClick={goToNextMonth}>{'>'}</CalendarButton>
        </CalendarTopContent>
        <AddScheduleButton
          onClick={() => setModalOpen(!modalOpen)}
        >{`일정추가 +`}</AddScheduleButton>
      </CalendarTop>
      <CalendarMain>
        {dayArray.map((day, idx) => (
          <CalendarDay isSunday={idx === 0}>{day}</CalendarDay>
        ))}
        {days.map((day, idx) => (
          <CalendarBox date={day} isSunday={idx % 7 === 0}></CalendarBox>
        ))}
      </CalendarMain>
      <div ref={modalRef}>
        {modalOpen && <ScheduleModal onClose={() => setModalOpen(false)} />}
      </div>
    </MainContainer>
  );
}

export default Calendar;

const CalendarButton = styled.button`
  padding: 0 20px;
  background-color: transparent;
  border: none;
  color: ${theme.colors.white};
  font-size: ${theme.fontSizes.subtitle};
  &:hover {
    cursor: pointer;
  }
`;

const MainContainer = styled.div`
  position: relative;
  height: 100vh;
  place-items: center;
  align-items: center;
  justify-content: center;
`;

const CalendarTop = styled.div`
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 60px;
  color: ${theme.colors.white};
  font-family: 'SCDream';
  font-style: normal;
  font-weight: 800;
  font-size: ${theme.fontSizes.subtitle};
  text-align: center;
  line-height: 36px;
`;

const Blank = styled.div`
  width: 10px;
  height: 10px;
`;

const CalendarTopContent = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
`;

const AddScheduleButton = styled.button`
  background-color: transparent;
  border: none;
  color: ${theme.colors.white};

  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 600;
  font-size: ${theme.fontSizes.subtitle};
  line-height: 36px;

  &:hover {
    cursor: pointer;
  }
`;

const CalendarMain = styled.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(150px, 150px));
  grid-template-rows: 1fr repeat(6, minmax(200px, 200px));
  place-items: center;
  align-items: center;
  justify-content: center;
`;

const CalendarDay = styled.div`
  width: 150px;
  height: 40px;
  color: ${props =>
    props.isSunday ? theme.colors.cancleRed : theme.colors.white};
  font-family: 'Pretendard', sans-serif;
  font-size: ${theme.fontSizes.calendar};
  font-weight: 600;
  text-align: center;
`;

const CalendarBox2 = styled.div`
  width: 150px;
  height: 200px;
  border-top: 3px solid ${theme.colors.white};
`;

const CalendarDate = styled.div`
  margin-top: 16px;
  color: ${props =>
    props.isSunday ? theme.colors.cancleRed : theme.colors.white};
  font-family: 'Pretendard', sans-serif;
  font-size: ${theme.fontSizes.calendar};
  font-weight: 600;
  text-align: center;
`;

const CalendarPlan = styled.div`
  margin-top: 3%;
  margin-left: 0.7%;
  width: 99.2%;
  height: 14%;
  font-weight: 400;
  border-radius: 9px;
  background-color: #f95a5a;
  color: white;
  text-align: center;
  line-height: 160%;
`;

const ModalDiv = styled.div`
  margin-top: 20px;
  padding: 20px;
  background-color: #61dafb;
  text-align: left;
`;
