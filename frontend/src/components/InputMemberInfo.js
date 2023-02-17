import React from 'react';
import styled from 'styled-components';
import theme from '../styles/Theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

const pixelToRem = size => `${size / 16}rem`;

export default function InputMemberInfo(props) {
  return (
    <InputRow>
      <Label>
        {props.labelName}
        <Required>{props.required ? ' *' : ''}</Required>
      </Label>
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
              message: '필수입력정보입니다.',
            },
            minLength: {
              value: props.minLength,
              message: props.validPatternMessage,
            },
            pattern: {
              value: props.validPattern,
              message: props.validPatternMessage,
            },
          })}
        />
        {props.checkDuplicate ? (
          <CheckDuplicate>중복확인</CheckDuplicate>
        ) : null}
        {props.errors && (
          <CircleExclamation>
            <FontAwesomeIcon icon={faCircleExclamation} />
          </CircleExclamation>
        )}
      </InputRowContent>
      <ErrorMessage>{props.errors && props.errors.message}</ErrorMessage>
    </InputRow>
  );
}

const InputRow = styled.div`
  ${theme.flexbox.flexColumn};
  justify-content: flex-start;
  width: ${pixelToRem(336)};
  margin-bottom: ${theme.margin.margin_component};
`;

const Required = styled.span`
  color: ${theme.colors.red};
  font-size: ${theme.fontSizes.paragraph};
`;

const Label = styled.label`
  margin-bottom: ${pixelToRem(8)};
  font-family: NanumBarunGothic, sans-serif;
  font-size: ${theme.fontSizes.paragraph};
`;

const InputRowContent = styled.div`
  ${theme.flexbox.flex};
  justify-content: flex-start;
  width: ${pixelToRem(336)};
  height: ${pixelToRem(30)};
  margin-bottom: ${pixelToRem(5)};
  border: ${props =>
    props.error
      ? `${pixelToRem(0.8)} solid ${theme.colors.red};`
      : `${pixelToRem(0.8)} solid ${theme.colors.black};`};
  border-radius: ${pixelToRem(10)};
`;

const Input = styled.input`
  width: ${pixelToRem(286)};
  height: ${pixelToRem(15)};
  margin: ${pixelToRem(7.5)} ${pixelToRem(18)};
  border: none;
  font-size: ${theme.fontSizes.font_small};
  &:focus {
    outline: none;
  }
`;

const CheckDuplicate = styled.a`
  width: ${pixelToRem(48)};
  margin-right: ${pixelToRem(8)};
  color: ${theme.colors.blue};
  font-family: ${theme.fontWeight.Bold};
  font-size: ${theme.fontSizes.font_micro};
`;

const CircleExclamation = styled.div`
  width: ${pixelToRem(12)};
  height: ${pixelToRem(12)};
  margin: ${pixelToRem(9)} ${pixelToRem(14)} ${pixelToRem(9)} ${pixelToRem(4)};
  color: ${theme.colors.red};
  font-size: ${theme.fontSizes.font_small};
`;

const ErrorMessage = styled.span`
  color: ${theme.colors.red};
  font-family: NanumBarunGothic, sans-serif;
  font-size: ${theme.fontSizes.font_micro};
`;
