import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Header from '../components/Header';
import moment from 'moment';
import data from '../data/data.json';

const pixelToRem = size => `${size / 16}rem`;

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
      <CalendarPlan key={'load${props.date}'}>{'· · · · ·'}</CalendarPlan>,
    );
    return (
      <CalendarBox2>
        <CalendarDate>{props.date}</CalendarDate>
        {plans}
      </CalendarBox2>
    );
  }

  return (
    <CalendarBox2>
      <CalendarDate>{props.date}</CalendarDate>
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
      <Header />
      <CalendarHeader>일정 캘린더</CalendarHeader>
      <CalendarTop>
        <CalendarButton onClick={goToPrevMonth}>{'<'}</CalendarButton>
        {date.year()}년 {date.month() + 1}월
        <CalendarButton onClick={goToNextMonth}>{'>'}</CalendarButton>
      </CalendarTop>
      <CalendarMain>
        {dayArray.map(day => (
          <CalendarDay>{day}</CalendarDay>
        ))}
        {days.map(day => (
          <CalendarBox date={day}></CalendarBox>
        ))}
      </CalendarMain>
    </MainContainer>
  );
}

export default Calendar;

const CalendarButton = styled.button`
  position: relative;
  height: 36px;
  width: 36px;
  margin: 10px;
  border: None;
  background-color: white;
  &:hover {
    cursor: pointer;
  }
`;

const MainContainer = styled.div`
  height: 100vh;
  place-items: center;
  align-items: center;
  justify-content: center;
`;

const CalendarHeader = styled.div`
  text-align: center;
  margin-top: ${pixelToRem(20)};
  width: ${pixelToRem(300)};
  height: ${pixelToRem(102)};
  font-size: ${pixelToRem(40)};
`;

const CalendarTop = styled.div`
  margin-bottom: ${pixelToRem(40)};
  font-size: ${pixelToRem(30)};
  text-align: center;
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
  line-height: 40px;
  font-size: 20px;
  border-top: ${pixelToRem(1)} solid black;
  text-align: center;
`;

const CalendarBox2 = styled.div`
  width: ${pixelToRem(150)};
  height: ${pixelToRem(200)};
  border-top: ${pixelToRem(1)} solid black;
`;

const CalendarDate = styled.div`
  font-size: ${pixelToRem(19)};
  font-weight: 200;
  margin-top: 3%;
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
