import React from 'react';
import styled from 'styled-components';
import theme from '../../styles/Theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import Button from '../Button';

export default function InputMemberInfo(props) {
  return (
    <InputRow width={props.width}>
      <Label>{props.labelName}</Label>
      <InputRowContent error={props.errors}>
        <Input
          name={props.name}
          type={props.type}
          placeholder={`${
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
              message: '조건에 맞게 입력해주세요',
            },
            pattern: {
              value: props.pattern,
              message: '조건에 맞게 입력해주세요',
            },
          })}
        />
        {props.checkDuplicate ? (
          <CheckDuplicate
            buttonName="중복 확인"
            buttonType="button"
            onClick={() => props.checkDuplicate()}
          />
        ) : null}
      </InputRowContent>
      <ErrorMessage>
        {props.errors && <FontAwesomeIcon icon={faCircleExclamation} />}
      </ErrorMessage>
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

const CheckDuplicate = styled(Button)`
  width: 120px;
  height: 46px;
  margin-right: 12px;
  border-radius: 20px;

  color: ${theme.colors.white};
  font-family: 'Pretendard';
  font-weight: 600;
  font-size: ${theme.fontSizes.font_normal};
`;

const ErrorMessage = styled.span`
  position: absolute;
  top: 10%;
  right: -50px;
  color: #ff9494;
  font-family: 'Pretendard', sans-serif;
  font-weight: 300;
  line-height: 150%;
  font-size: ${theme.fontSizes.subtitle};
  white-space: nowrap;
`;
