import React from 'react';
import styled from 'styled-components';
import theme from '../styles/Theme';

export default function MemberInfo(props) {
  return (
    <InputRow>
      <Label>{props.name}</Label>
      <Input name={props.name} value={props.param} disabled />
    </InputRow>
  );
}

const InputRow = styled.div`
  ${theme.flexbox.flex};
  justify-content: flex-start;
  margin-bottom: ${theme.margin.margin_component};
`;

const Label = styled.label`
  width: 90px;
  margin-right: ${theme.margin.margin_content};

  color: ${theme.colors.white};
  font-family: 'Pretendard';
  font-weight: 600;
  font-size: ${theme.fontSizes.paragraph};
`;

const Input = styled.input`
  width: 236px;
  height: 30px;

  border: 2px solid #3cda58;
  border-radius: 5px;
  background-color: transparent;

  color: ${theme.colors.white};
  font-family: 'Pretendard';
  font-weight: 300;
  font-size: ${theme.fontSizes.paragraph};
  text-align: center;
  &:focus {
    outline: none;
  }
`;
