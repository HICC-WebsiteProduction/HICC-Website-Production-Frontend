import React from 'react';
import styled from 'styled-components';
import theme from '../styles/Theme';
import { useForm } from 'react-hook-form';
import HeaderAndTitle from '../components/HeaderAndTitle';
import InputMemberInfo from '../components/InputMemberInfo';
import Warning from '../components/Warning';
import Button from '../components/Button';

const pixelToRem = size => `${size / 16}rem`;

function Signup(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = data => console.log(data);
  return (
    <SignupContainer>
      <HeaderAndTitle titleName="회원가입" />
      <Warning />
      <InputForm onSubmit={handleSubmit(onSubmit)}>
        <InputMemberInfo
          labelName="ID"
          name="ID"
          required={true}
          type="text"
          register={register}
          errors={errors.ID}
          minLength={7}
          minLengthMessage={'ID는 7자리를 입력해주세요.'}
          maxLength={7}
          validPattern={/^[A-Z][0-9]{6}$/}
          validPatternMessage={'본인의 학번을 입력하세요 (C21xxxx)'}
        />
        <InputMemberInfo
          labelName="비밀번호"
          name="pw"
          required={true}
          type="password"
          register={register}
          errors={errors.pw}
          minLength={8}
          minLengthMessage={'비밀번호는 8자리 이상 입력해주세요.'}
          maxLength={16}
          validPattern={
            /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/
          }
          validPatternMessage={
            '비밀번호는 영어 소문자, 숫자, 특수문자 조합으로 8자 이상입니다.'
          }
        />
        <InputMemberInfo
          labelName="닉네임"
          name="nickname"
          required={true}
          type="text"
          register={register}
          errors={errors.nickname}
          minLength={4}
          minLengthMessage={'닉네임은 4자리 이상 입력해주세요.'}
          maxLength={16}
          validPattern={/^[가-힣|a-z|A-Z|0-9|].{3,15}$/}
          validPatternMessage={
            '닉네임은 한글, 영문 대소문자, 숫자를 입력해주세요.'
          }
        />
        <InputMemberInfo
          labelName="이름"
          name="koreanName"
          required={true}
          type="text"
          register={register}
          errors={errors.koreanName}
          minLength={2}
          minLengthMessage={'이름은 한글로 2자리 이상 입력해주세요.'}
          maxLength={7}
          validPattern={/^[가-힣]+$/}
          validPatternMessage={'본인의 정확한 이름을 입력해주세요.'}
        />
        <InputMemberInfo
          labelName="학번"
          name="studentID"
          required={true}
          type="number"
          register={register}
          errors={errors.studentID}
          minLength={2}
          minLengthMessage={'숫자 2자리를 입력해주세요. (20 21 22)'}
          maxLength={2}
          validPattern={/^[0-9]{2}$/}
          validPatternMessage={'본인의 학번 2자리를 입력해주세요. (20 21 22)'}
        />
        <InputMemberInfo
          labelName="학년"
          name="grade"
          required={true}
          type="number"
          register={register}
          errors={errors.grade}
          minLength={1}
          minLengthMessage={'학년은 1자리를 입력해주세요.'}
          maxLength={1}
          validPattern={/^[1-4]$/}
          validPatternMessage={'본인의 학년을 입력하세요 1~4'}
        />
        <InputMemberInfo
          labelName="전화번호"
          name="call"
          required={true}
          type="text"
          register={register}
          errors={errors.call}
          minLength={13}
          minLengthMessage={'전화번호 형식을 맞추세요 010-xxxx-xxxx.'}
          maxLength={13}
          validPattern={/^010-[0-9]{4}-[0-9]{4}$/}
          validPatternMessage={'전화번호 형식을 맞추세요 010-xxxx-xxxx.'}
        />
        <ButtonContainer>
          <Button buttonType="button" buttonName="취소"></Button>
          <Button buttonType="submit" buttonName="확인"></Button>
        </ButtonContainer>
      </InputForm>
    </SignupContainer>
  );
}

export default Signup;

const SignupContainer = styled.div`
  width: 100%;
  height: 100vh;
`;

const InputForm = styled.form`
  ${theme.flexbox.flexCenterColumn}
`;

const ButtonContainer = styled.div`
  ${theme.flexbox.flexCenter};
  justify-content: space-between;
  width: ${pixelToRem(336)};
  margin: ${theme.margin.margin_component} 0;
`;
