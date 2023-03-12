import { faColumns } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import styled from 'styled-components';

const pixelToRem = size => `${size / 16}rem`;

const layoutColumn = 3;
const layoutRow = 2;
const layoutWidthPx = 608;

function CabinetRentWindow(props) {
  return (
    <CabinetRentContainer className="hidden-page">
      <CabinetLayoutDisplay>
        {Array.from(Array(layoutRow).keys()).map((value, index) => {
          return Array.from(Array(layoutColumn).keys()).map((value, index) => {
            return (
              <Cabinet key={value}>
                <CabinetIcon />
              </Cabinet>
            );
          });
        })}
      </CabinetLayoutDisplay>
    </CabinetRentContainer>
  );
}

export default CabinetRentWindow;

const CabinetRentContainer = styled.div`
  display: flex;
`;

const CabinetLayoutDisplay = styled.div`
  width: ${pixelToRem(layoutWidthPx)};
  margin: auto;
`;

const Cabinet = styled.div`
  float: left;
  width: ${pixelToRem((layoutWidthPx - 8) / layoutColumn)};
  height: ${pixelToRem((layoutWidthPx - 8) / layoutColumn)};
  background-color: pink;

  :nth-child(2n) {
    background-color: rgb(200, 255, 255);
  }
`;

// 브라우저 특화 css의 점유율은 아래 사이트 참고
// https://caniuse.com/?search=-webkit-fill-available
const CabinetIcon = styled.div`
  margin: ${pixelToRem(8)};
  height: -webkit-fill-available;
  border: 4px solid brown;
  border-radius: ${pixelToRem(20)};
`;
