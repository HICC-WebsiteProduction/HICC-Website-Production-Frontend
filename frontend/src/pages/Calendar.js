import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import data from '../data/data.json';
import theme from '../styles/Theme';
import ScheduleModal from '../components/popup/ScheduleModal';
import Title from '../components/header/Title';
import Header from '../components/header/Header';
import useModal from '../hook/useModal';
import ScheduleModalSaved from '../components/popup/ScheduleModalSaved';

const ScheduleEnum = {
  학술: 'academic',
  학교행사: 'hongikEvent',
  친목: 'amity',
};

function CalenderPlan2(props) {
  const modalRef = useRef(null);
  const [modalOpen, closeModal] = useModal(modalRef);

  return (
    <CalendarPlan
      key="{plan}"
      background={ScheduleEnum[props.scheduleType]}
      ref={modalRef}
    >
      {props.title}
      {modalOpen && (
        <ScheduleModalSaved
          closeModal={closeModal} // 모달을 닫는 동작
          title={props.title}
          scheduleType={props.scheduleType}
          date={props.date}
          description={props.description}
        />
      )}
    </CalendarPlan>
  );
}

function CalendarBox(props) {
  const modalRef = useRef(null);
  const [modalOpen, _] = useModal(modalRef);
  const [planModalOpen, setModalOpen] = useState(false);
  const showModal = () => {
    if (planModalOpen === false) {
      setModalOpen(true);
    } else {
      setModalOpen(false);
    }
  };

  const dayPlans = data.filter(plan => moment(plan.date).date() === props.date);

  if (dayPlans.length > 5) {
    // console.log('full');
    return (
      <CalendarBox2>
        <CalendarDate isSunday={props.isSunday}>{props.date}</CalendarDate>
        {dayPlans.slice(0, 4).map(plan => (
          <CalenderPlan2
            title={plan.title}
            scheduleType={plan.scheduleType}
            date={plan.date}
            description={plan.description}
          />
        ))}
        {!planModalOpen && (
          <CalendarPlanButton onClick={showModal}>
            {'+'}
            {dayPlans.length - 4}
          </CalendarPlanButton>
        )}
        {planModalOpen &&
          dayPlans
            .slice(4, dayPlans.length)
            .map(plan => (
              <CalenderPlan2
                title={plan.title}
                scheduleType={plan.scheduleType}
                date={plan.date}
                description={plan.description}
              />
            ))}
        {planModalOpen && (
          <CalendarPlanButton onClick={showModal}>{'△'}</CalendarPlanButton>
        )}
        {/*{dayPlans.length > 4 && (*/}
        {/*  <CalendarPlan key="{plan}">{'· · · · ·'}</CalendarPlan>*/}
        {/*)}*/}
      </CalendarBox2>
      // <CalendarBox2>
      //   <CalendarDate isSunday={props.isSunday}>{props.date}</CalendarDate>
      //   {dayPlans.slice(0, 4).map(plan => (
      //     <CalenderPlan2
      //       title={plan.title}
      //       scheduleType={plan.scheduleType}
      //       date={plan.date}
      //       description={plan.description}
      //     />
      //   ))}
      //   {dayPlans.length > 4 && (
      //     <CalendarPlan key="{plan}">{'· · · · ·'}</CalendarPlan>
      //   )}
      // </CalendarBox2>
    );
  }

  return (
    <CalendarBox2>
      <CalendarDate isSunday={props.isSunday}>{props.date}</CalendarDate>
      {dayPlans.map(plan => (
        <CalenderPlan2
          title={plan.title}
          scheduleType={plan.scheduleType}
          date={plan.date}
          description={plan.description}
        />
      ))}
    </CalendarBox2>
  );
}

function Calendar() {
  const [date, setDate] = useState(moment());

  const modalRef = useRef(null);
  const [modalOpen, closeModal] = useModal(modalRef);

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

  const goToPrevMonth = () => {
    setDate(moment(date).subtract(1, 'month'));
  };

  const goToNextMonth = () => {
    setDate(moment(date).add(1, 'month'));
  };

  return (
    <MainContainer>
      <Header background={true} />
      <Title titleName="일정 캘린더" />
      <CalendarTop>
        <Blank />
        <CalendarTopContent>
          <CalendarButton onClick={goToPrevMonth}>{'<'}</CalendarButton>
          {date.year()}년 {date.month() + 1}월
          <CalendarButton onClick={goToNextMonth}>{'>'}</CalendarButton>
        </CalendarTopContent>
        <AddScheduleModal ref={modalRef}>
          {`일정추가 +`}
          {modalOpen && <ScheduleModal closeModal={closeModal} />}
        </AddScheduleModal>
      </CalendarTop>
      <CalendarMain>
        {dayArray.map((day, idx) => (
          <CalendarDay isSunday={idx === 0}>{day}</CalendarDay>
        ))}
        {days.map((day, idx) => (
          <CalendearRows>
            <CalendarBox date={day} isSunday={idx % 7 === 0}></CalendarBox>
          </CalendearRows>
        ))}
      </CalendarMain>
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
  width: ${theme.componentSize.maxWidth};
  height: 100vh;
  margin: 0 auto;
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

const AddScheduleModal = styled.div`
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
  grid-template-columns: repeat(7, minmax(170px, 170px));
  //grid-template-rows: 1fr repeat(6, min(240px, 400px));
  //place-items: center;
  //align-items: center;
  //justify-content: center;
`;

const CalendearRows = styled.div`
  //display: flex;
  grid-template-rows: 1fr repeat(6, min(230px));
  margin-bottom: 10px;
`;

const CalendarDay = styled.div`
  width: 171px;
  height: 40px;
  color: ${props =>
    props.isSunday ? theme.colors.cancleRed : theme.colors.white};
  font-family: 'Pretendard', sans-serif;
  font-size: ${theme.fontSizes.calendar};
  font-weight: 600;
  text-align: center;
`;

const CalendarBox2 = styled.div`
  width: 171px;
  min-height: 200px;
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
  position: relative;
  margin-top: 3%;
  margin-left: 0.7%;
  width: 99.2%;
  height: 30px;
  font-weight: 400;
  border-radius: 9px;
  background-color: ${props => theme.scheduleTypeColor[props.background]};
  color: white;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
`;

const CalendarPlanButton = styled.button`
  position: relative;
  margin-top: 3%;
  margin-left: 0.7%;
  width: 99.2%;
  height: 30px;
  font-weight: 700;
  font-size: medium;
  border-radius: 9px;
  background-color: #2c2c33;
  color: white;
  text-align: center;
  line-height: 30px;
  border: none;
  cursor: pointer;
`;

const Backdrop = styled.div`
  display: ${props => (props.view ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;

  &:hover {
    cursor: alias;
  }
`;
