import React from 'react';
import styled from 'styled-components';
import theme from '../styles/Theme';

export default function InputMemberInfo(props) {
  return (
    <InputRow>
      <Label>{props.labelName}</Label>
      <InputRowContent error={props.errors}>
        <Input
          name={props.name}
          type={props.type}
          placeholder={`내용을 입력해주세요 ${
            props.specificPlaceholder ? props.specificPlaceholder : ''
          }`}
          maxLength={props.maxLength}
          {...props.register(props.name, {
            required: {
              value: props.required,
              message: '조건에 맞게 입력해주세요',
            },
            minLength: {
              value: props.minLength,
              message: props.invalidPatternWarning,
            },
            pattern: {
              value: props.validPattern,
              message: props.invalidPatternWarning,
            },
          })}
        />
        {/* {props.checkDuplicate ? (
          <CheckDuplicate>중복확인</CheckDuplicate>
        ) : null} */}
        <ErrorMessage>{props.errors && props.errors.message}</ErrorMessage>
      </InputRowContent>
    </InputRow>
  );
}

const InputRow = styled.div`
  ${theme.flexbox.flex};
  justify-content: flex-start;
  width: 786px;
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
  width: 100%;
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
`;

// const CheckDuplicate = styled.a`
//   width: 48px;
//   margin-right: 8px;
//   color: ${theme.colors.blue};
//   font-size: ${theme.fontSizes.font_micro};
// `;

const ErrorMessage = styled.span`
  color: ${theme.colors.red};
  margin: 18px 22px;
  font-family: 'Pretendard', sans-serif;
  font-weight: 300;
  line-height: 150%;
  font-size: ${theme.fontSizes.font_normal};
`;
