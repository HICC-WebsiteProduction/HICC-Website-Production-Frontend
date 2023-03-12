import React from 'react';
import styled from 'styled-components';
import theme from '../styles/Theme';

const pixelToRem = size => `${size / 16}rem`;

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
  width: ${pixelToRem(336)};
  margin-bottom: ${theme.margin.margin_component};
`;

const Label = styled.label`
  width: ${pixelToRem(90)};
  margin-right: ${theme.margin.margin_content};
  font-family: NanumBarunGothic, sans-serif;
  font-size: ${theme.fontSizes.paragraph};
`;

const Input = styled.input`
  width: ${pixelToRem(286)};
  font-size: ${theme.fontSizes.font_small};
  &:focus {
    outline: none;
  }
`;
