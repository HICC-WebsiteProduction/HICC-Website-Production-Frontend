import styled from 'styled-components';
import HeaderAndTitle from '../components/header/HeaderAndTitle';
import theme from '../styles/Theme';
import { useEffect, useState } from 'react';

export default function ScheduleCalender() {
  const [calender, setCalender] = useState(new Date());

  useEffect(() => {
    setCalender(new Date());
  }, []);

  return (
    <ScheduleCalenderContainer>
      <HeaderAndTitle titleName="일정 캘린더" />
      <Calender>
        <CalenderHeader>
          <Blank />
          <CurrentMonth>
            <PrevMonthButton>{`<`}</PrevMonthButton>
            <YearAndMonth>{`${calender.getFullYear()}.${(
              '0' +
              (calender.getMonth() + 1)
            ).slice(-2)}`}</YearAndMonth>
            <NextMonthButton>{`>`}</NextMonthButton>
          </CurrentMonth>
          <AddScheduleButton>{`일정추가 + `}</AddScheduleButton>
        </CalenderHeader>
        <CalenderBody>
          <thead>
            <tr>
              <th scope="col">일</th>
              <th scope="col">월</th>
              <th scope="col">화</th>
              <th scope="col">수</th>
              <th scope="col">목</th>
              <th scope="col">금</th>
              <th scope="col">토</th>
            </tr>
          </thead>
          <tbody>
            <CalenderWeeks>
              <td>30</td>
              <td>31</td>
              <td>1</td>
              <td>2</td>
              <td>3</td>
              <td>4</td>
              <td>5</td>
            </CalenderWeeks>
          </tbody>
        </CalenderBody>
      </Calender>
    </ScheduleCalenderContainer>
  );
}

const ScheduleCalenderContainer = styled.div`
  width: 100%;
  height: 100vh;
`;

const Calender = styled.div``;

const CalenderBody = styled.table``;

const CalenderWeeks = styled.tr``;

const CalenderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Blank = styled.div`
  width: 10px;
  height: 10px;
`;

const CurrentMonth = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const YearAndMonth = styled.div`
  color: ${theme.colors.white};
  font-family: 'SCDream';
  font-style: normal;
  font-weight: 800;
  font-size: 30px;
  line-height: 36px;
`;

const PrevMonthButton = styled.button`
  margin-right: 20px;
  background-color: transparent;
  border: none;
  color: ${theme.colors.white};
  font-size: 30px;
  &:hover {
    cursor: pointer;
  }
`;

const NextMonthButton = styled.button`
  margin-left: 20px;
  background-color: transparent;
  border: none;
  color: ${theme.colors.white};
  font-size: 30px;
  &:hover {
    cursor: pointer;
  }
`;

const AddScheduleButton = styled.button`
  background-color: transparent;
  border: none;
  color: ${theme.colors.white};

  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  line-height: 36px;

  &:hover {
    cursor: pointer;
  }
`;
