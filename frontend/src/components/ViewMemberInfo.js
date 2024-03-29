import React from 'react';
import styled from 'styled-components';
import theme from '../styles/Theme';

export default function ViewMemberInfo(props) {
  return (
    <InputRow width={props.width}>
      <Label>{props.labelName}</Label>
      <InputRowContent>
        <Input
          type={props.type}
          value={props.value}
          disabled
          authorityCheck={props.authorityCheck}
        />
        {props.authorityCheck && (
          <DisableMessage>수정 권한이 없습니다.</DisableMessage>
        )}
      </InputRowContent>
    </InputRow>
  );
}

const InputRow = styled.div`
  ${theme.flexbox.flex};
  position: relative;
  justify-content: flex-start;
  width: ${props => `${props.width}px`};
  margin-bottom: ${theme.margin.margin_component};
`;

const Label = styled.label`
  width: 204px;
  color: ${theme.colors.white};
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  font-size: ${theme.fontSizes.label};
`;

const InputRowContent = styled.div`
  ${theme.flexbox.flex};
  justify-content: flex-start;
  width: 582px;
  height: 60px;
  background-color: ${theme.colors.white};
  border-radius: 20px;
`;

const Input = styled.input`
  width: 50%;
  height: 24px;
  margin: 18px 24px;
  background-color: ${theme.colors.white};
  border: none;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 600;
  font-size: ${theme.fontSizes.font_normal};
  &:focus {
    outline: none;
  }
  &:disabled {
    color: ${props => (props.authorityCheck ? '' : theme.colors.black)};
  }
`;

const DisableMessage = styled.span`
  color: ${theme.colors.red};

  font-family: 'Pretendard';
  font-weight: 300;
  font-size: ${theme.fontSizes.font_normal};
  line-height: 150%;
`;
