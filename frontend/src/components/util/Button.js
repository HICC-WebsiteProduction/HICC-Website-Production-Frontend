import React from 'react';
import styled from 'styled-components';
import theme from '../../styles/Theme';

// 버튼의 기본 스타일을 지정해놓음
// 아래 css가 디폴트로 맞추어져있음
// type과 onClick을 지원함
export default function Button(props) {
  return (
    <ButtonDesign
      className={props.className}
      type={props.buttonType}
      onClick={props.onClick}
    >
      {props.buttonName}
    </ButtonDesign>
  );
}

const ButtonDesign = styled.button`
  background-color: ${theme.colors.blue};
  border: none;
  border-radius: 20px;
  color: ${theme.colors.white};
  ${theme.fontstyle.body1};
  &:hover {
    cursor: pointer;
  }
`;
