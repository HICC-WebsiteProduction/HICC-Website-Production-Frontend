import React from 'react';
import styled from 'styled-components';
import theme from '../styles/Theme';

export default function Button(props) {
  return (
    <ButtonDesign className={props.className} type={props.buttonType}>
      {props.buttonName}
    </ButtonDesign>
  );
}

const ButtonDesign = styled.button`
  background-color: ${theme.colors.blue};
  border: none;
  border-radius: 20px;
  color: ${theme.colors.white};
  font-family: 'Pretendard', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: ${theme.fontSizes.label};
  &:hover {
    cursor: pointer;
  }
`;
