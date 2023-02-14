import React from 'react';
import styled from 'styled-components';

const pixelToRem = size => `${size / 16}rem`;

const layoutColumn = 3;
const layoutRow = 4;

function CabinetRentWindow(props) {
  return (
    <CabinetRentContainer className="hidden-page">
      <CabinetLayoutDisplay>
        {Array.from(Array(layoutRow).keys()).map((value, index) => {
          return Array.from(Array(layoutColumn).keys()).map((value, index) => {
            return <Cabinet key={value} />;
          });
        })}
      </CabinetLayoutDisplay>
    </CabinetRentContainer>
  );
}

export default CabinetRentWindow;

const CabinetRentContainer = styled.div`
  border: 4px solid black;
`;

const CabinetLayoutDisplay = styled.div`
  border: 4px solid red;
  width: ${pixelToRem(608)};
`;

const Cabinet = styled.div`
  float: left;
  background-color: pink;
  width: ${pixelToRem(200)};
  height: ${pixelToRem(200)};

  :nth-child(2n) {
    background-color: rgb(200, 255, 255);
  }
`;
