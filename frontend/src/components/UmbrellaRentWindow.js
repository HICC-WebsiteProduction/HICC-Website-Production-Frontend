import React from 'react';
import styled from 'styled-components';

const pixelToRem = size => `${size / 16}rem`;

function UmbrellaRentWindow(props) {
  return (
    <UmbrellaRentContainer>
      <RentListContainer>
        <RentHeader>
          <tr>
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

const UmbrellaRentContainer = styled.div`
  *
`;

const RentListContainer = styled.table`
  // https://www.w3schools.com/howto/howto_css_switch.asp
`;

function RentInfo(props) {
  return (
    <RentPresenter>
      <td>1</td>
      <td>Guardian_demoN</td>
      <td>true(slide)</td>
    </RentPresenter>
  );
}