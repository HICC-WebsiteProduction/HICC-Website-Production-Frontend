import { React, useEffect, useState } from 'react';
import styled from 'styled-components';
import useScrollCount from '../../hook/useScrollCount';
import useFetch from '../../hook/useFetch';

export default function NumberTable() {
  const { data, loading } = useFetch('/table');
  const [operations, setOperations] = useState(1);
  const [members, setMembers] = useState(1);

  useEffect(() => {
    if (!loading) {
      setOperations(data.operations);
      setMembers(data.members);
    }
  }, [data, loading]);

  const countItem = {
    0: useScrollCount(1972, 1900, 1000),
    1: useScrollCount(operations, 0, 0, 1200),
    2: useScrollCount(members, 0, 1700),
  };

  const FIGURE_ITEMS = [
    {
      title: '창립년도',
      number: 1972,
      unit: '년',
    },
    {
      title: '운영 기수',
      number: operations,
      unit: '기',
    },
    {
      title: '회원 수',
      number: members,
      unit: '+',
    },
  ];

  return (
    <NumberTableContainer>
      <NumberTitle>Number of HICC</NumberTitle>
      <NumberContentContainer>
        {FIGURE_ITEMS.map((item, index) => (
          <NumberContent key={item.title}>
            <Title>{item.title}</Title>
            <NumberContainer>
              <Number {...countItem[index]}>0{item.unit}</Number>
              <Unit>{item.unit}</Unit>
            </NumberContainer>
          </NumberContent>
        ))}
      </NumberContentContainer>
    </NumberTableContainer>
  );
}

const NumberTableContainer = styled.div`
  position: relative;
  width: 1200px;
  height: 550px;
  margin: 0 auto;
`;

const NumberTitle = styled.div`
  position: absolute;
  top: 50px;
  //left: 350px;
  width: 370px;
  height: 48px;
  font-size: 40px;
  font-weight: 600;
  line-height: 48px;
  color: #edf0f8;
  text-align: left;
`;

const NumberContentContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(1, minmax(250px, 250px));
  grid-template-columns: repeat(3, minmax(378px, 378px));
  position: relative;
  top: 178px;
  //left: 363px;
  gap: 31px;
  width: 1196px;
  height: 250px;
`;

const NumberContent = styled.div`
  width: 378px;
  height: 250px;
  text-align: center;
  justify-content: center;
`;

const Title = styled.div`
  position: relative;
  top: 34px;
  left: 148px;
  width: 120px;
  height: 36px;
  font-weight: 600;
  font-size: 24px;
  line-height: 36px;
  color: #edf0f8;
  text-align: center;
`;

const NumberContainer = styled.div`
  display: flex;
`;

const Number = styled.span`
  position: relative;
  top: 83px;
  left: 65px;
  width: 280px;
  height: 120px;
  font-weight: 600;
  font-size: 80px;
  line-height: 120px;
  color: #edf0f8;
  align-self: center;
`;

const Unit = styled.span`
  position: relative;
  top: 83px;
  margin: 0 auto;
  font-weight: 600;
  font-size: 80px;
  line-height: 120px;
  color: #edf0f8;
`;
