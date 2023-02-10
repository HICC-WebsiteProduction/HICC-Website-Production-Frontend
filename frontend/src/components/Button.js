import React from 'react';
import styled from 'styled-components';
import theme from '../styles/Theme';

const pixelToRem = size => `${size / 16}rem`;

export default function Button(props) {
  return (
    <ButtonDesign type={props.buttonType}>{props.buttonName}</ButtonDesign>
  );
}

const ButtonDesign = styled.button`
  width: ${pixelToRem(102)};
  height: ${pixelToRem(40)};
  background-color: ${theme.colors.blue};
  border: none;
  border-radius: 10px;
  color: ${theme.colors.white};
  &:hover {
    cursor: pointer;
  }
`;
