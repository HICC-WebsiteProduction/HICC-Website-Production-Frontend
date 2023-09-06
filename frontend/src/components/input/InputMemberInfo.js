import React from 'react';
import styled from 'styled-components';
import theme from '../../styles/Theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import Button from '../util/Button';

// 회원정보를 입력할 때 (내 정보 수정, 회원가입)
// 한 줄을 반환해주는 함수
/*
  labelName: 레이블 이름
  name: react-hook-form에서 각 input에 key로 활용할 이름
  specificPlaceholder: 특정한 플레이스홀더 (정규식 설명이 들어감)
  required: 입력 내용이 필수인지
  checkDuplicate: 중복 체크가 필요한 지 (function | false)
  type: input의 type을 전달받음
  register: 해당 input을 react-hook-form에 등록함
  errors: 정규식이나 조건에 맞지 않은 입력이 들어왔을 때 경고를 보여줌
  minLength: 입력의 최소 길이
  maxLength: 입력의 최대 길이
  pattern: 각 입력의 정규식
  width: 입력 창의 길이 (다른 곳에서도 사용하기 위해 가변적으로 설계)
*/

export default function InputMemberInfo(props) {
  return (
    <InputRow width={props.width}>
      <Label>{props.labelName}</Label>
      <InputRowContent error={props.errors}>
        <Input
          name={props.name}
          type={props.type}
          // value={props.value} // 이 부분을 추가
          onChange={e => {
            props.onChange(e.target.value); // input 값이 변경될 때 값을 상위 컴포넌트로 전달
          }}
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
  &:active {
    opacity: 0.5;
  }
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
