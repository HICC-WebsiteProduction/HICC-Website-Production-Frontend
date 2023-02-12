import React from 'react';
import styled from 'styled-components';

import SliderButton from '../components/SliderButton';

const pixelToRem = size => `${size / 16}rem`;

function UmbrellaRentWindow(props) {
  return (
    <UmbrellaRentContainer>
      <RentListContainer>
        <RentHeader>
          <tr>
            <td></td>
            <td>우산 번호</td>
            <td>사용자 이름</td>
            <td>value</td>
          </tr>
        </RentHeader>
        <RentList>
          <RentInfo></RentInfo>
          <RentInfo></RentInfo>
          <RentInfo></RentInfo>
          <RentInfo></RentInfo>
        </RentList>
      </RentListContainer>
    </UmbrellaRentContainer>
  );
}

export default UmbrellaRentWindow;

const UmbrellaRentContainer = styled.div`
  border: 4px solid rgb(0, 0, 0);
  width: 100%;
`;

const RentListContainer = styled.table`
  border: 4px dotted rgb(50, 50, 50);
  width: 100%;

  tr {
    height: ${pixelToRem(50)};
  }

  td {
    text-align: center;
    vertical-align: middle;

    font-size: ${pixelToRem(20)};
  }
`;

const RentHeader = styled.thead`
  font-weight: bold;
  background: lightgray;
`;

const RentList = styled.tbody`
  *
`;

function RentInfo(props) {
  const debugChecked = data => {
    let button = data.target;
    console.log(button.checked);
  };
  return (
    <RentPresenter>
      <td>1</td>
      <td>1</td>
      <td>Guardian_demoN</td>
      <td>
        <SliderButton onClick={debugChecked} />
      </td>
    </RentPresenter>
  );
}

const RentPresenter = styled.tr`
  height: ${pixelToRem(30)};
  :nth-child(2n) {
    background: rgb(220, 220, 220);
  }
`;
