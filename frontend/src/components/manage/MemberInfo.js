import React from 'react';
import styled from 'styled-components';
import theme from '../../styles/Theme';

// 회원 상세 정보에서 한 줄을 보여주는 기능
export default function MemberInfo(props) {
  return (
    <InputRow>
      <Label>{props.name}</Label>
      <Input name={props.name} value={props.param} disabled />
    </InputRow>
  );
}

const InputRow = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 25px;
`;

const Label = styled.label`
  width: 90px;
  margin-right: 25px;

  color: ${theme.colors.white};
  ${theme.fontstyle.head10};
`;

const Input = styled.input`
  width: 236px;
  height: 30px;

  border: 2px solid #3cda58;
  border-radius: 5px;
  background-color: transparent;

  color: ${theme.colors.white};
  ${theme.fontstyle.body7};
  text-align: center;
  &:focus {
    outline: none;
  }
`;
