import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import theme from '../../styles/Theme';
import InputMemberInfo from './InputMemberInfo';
import ViewMemberInfo from './ViewMemberInfo';
import Regex from './../../constants/Regex';

// 내 정보에서 유저 정보를 수정할 때 보여줌
// react-hook-form 라이브러리를 활용하였음
export default function EditUserInfo({
  nickname,
  phone,
  onNicknameChange,
  onPhoneChange,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nickname: nickname,
      call: phone,
    },
  });

  // 제출할 때 실행되는 함수
  // 아직 미구현
  const onSubmit = data => {
    console.log(data);
    alert(JSON.stringify(data));
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
          pattern={Regex.nickname.pattern}
          width={540}
          value={nickname}
          onChange={onNicknameChange}
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
          pattern={Regex.call.pattern}
          width={540}
          value={phone}
          onChange={onPhoneChange}
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
        <button type="submit">수정</button>
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
