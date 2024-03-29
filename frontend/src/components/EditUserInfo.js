import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { registerUser } from '../_actions/userAction';
import theme from '../styles/Theme';
import InputMemberInfo from './InputMemberInfo';
import InputMemberValidInfo from './InputMemberValidInfo';
import ViewMemberInfo from './ViewMemberInfo';

export default function EditUserInfo(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nickname: props.nickname,
      call: props.phone,
    },
  });
  const dispatch = useDispatch();
  const onSubmit = data => {
    console.log(data);
    dispatch(registerUser(data)).then(res => {
      alert('수정이 정상적으로 완료되었습니다.');
    });
  };
  return (
    <EditUserInfoWrapper>
      <InputForm onSubmit={handleSubmit(onSubmit)}>
        <InputMemberInfo
          labelName="닉네임"
          name="nickname"
          specificPlaceholder="한글, 영어대소문자, 숫자로 이루어진 4~16자리"
          required={true}
          checkDuplicate={true}
          type="text"
          register={register}
          errors={errors.nickname}
          minLength={4}
          maxLength={16}
          validPattern={InputMemberValidInfo.nickname.validPattern}
          width={540}
        />
        <ViewMemberInfo
          labelName="등급"
          type="text"
          width={540}
          value={'일반회원'}
          authorityCheck={true}
        />
        <InputMemberInfo
          labelName="전화번호"
          name="call"
          specificPlaceholder="010-xxxx-xxxx형식"
          required={true}
          checkDuplicate={false}
          type="text"
          register={register}
          errors={errors.call}
          minLength={13}
          maxLength={13}
          validPattern={InputMemberValidInfo.call.validPattern}
          width={540}
        />
        <ViewMemberInfo
          labelName="학번"
          type="text"
          width={540}
          value={'C011001'}
          authorityCheck={false}
        />
        <ViewMemberInfo
          labelName="학과"
          type="text"
          width={540}
          value={'컴퓨터공학과'}
          authorityCheck={false}
        />
      </InputForm>
    </EditUserInfoWrapper>
  );
}

const EditUserInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputForm = styled.form`
  ${theme.flexbox.flexCenterColumn}
  position: relative;
  width: 540px;
  margin: 0 auto;
`;
