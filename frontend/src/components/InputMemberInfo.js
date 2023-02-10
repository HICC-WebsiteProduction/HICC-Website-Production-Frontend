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
      <SearchContainer>
        <Input
          name={props.name}
          type={props.type}
          placeholder="내용을 입력해주세요"
          maxLength={props.maxLength}
          {...props.register(props.name, {
            required: props.required
              ? `${props.labelName}은(는) 필수 입력입니다.`
              : '',
            minLength: {
              value: props.minLength,
              message: props.minLengthMessage,
            },
            pattern: {
              value: props.validPattern,
              message: props.validPatternMessage,
            },
          })}
        />
        <CircleExclamation>
          {props.errors && <FontAwesomeIcon icon={faCircleExclamation} />}
        </CircleExclamation>
      </SearchContainer>
      <ErrorMessage>
        {props.errors && <small role="alert">{props.errors.message}</small>}
      </ErrorMessage>
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
  font-size: ${theme.fontSizes.paragraph};
  color: ${theme.colors.red};
`;

const Label = styled.label`
  margin-bottom: ${pixelToRem(8)};
  font-family: NanumBarunGothic, sans-serif;
  font-size: ${theme.fontSizes.paragraph};
`;

const SearchContainer = styled.div`
  ${theme.flexbox.flex};
  justify-content: flex-start;
  width: ${pixelToRem(336)};
  height: ${pixelToRem(30)};
  margin-bottom: ${pixelToRem(5)};
  border: 0.8px solid #000000;
  border-radius: 10px;
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

const CircleExclamation = styled.div`
  width: ${pixelToRem(12)};
  height: ${pixelToRem(12)};
  margin: ${pixelToRem(9)} ${pixelToRem(14)};
  color: ${theme.colors.red};
  font-size: ${theme.fontSizes.font_small};
`;

const ErrorMessage = styled.span`
  font-family: NanumBarunGothic, sans-serif;
  font-size: ${theme.fontSizes.font_micro};
  color: ${theme.colors.red};
`;
