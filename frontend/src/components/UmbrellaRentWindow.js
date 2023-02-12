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
  *
`;

const RentHeader = styled.thead`
  *
`;

const RentList = styled.tbody`
  *
`;

const RentListContainer = styled.table`
  *
`;

function RentInfo(props) {
  return (
    <RentPresenter>
      <td>1</td>
      <td>Guardian_demoN</td>
      <td>
        <SliderButton />
      </td>
    </RentPresenter>
  );
}

const RentPresenter = styled.tr`
  *
`;
