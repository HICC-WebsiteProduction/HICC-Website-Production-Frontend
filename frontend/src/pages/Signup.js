import React from 'react';
import styled from 'styled-components';
import theme from '../styles/Theme';
import { useForm } from 'react-hook-form';
import HeaderAndTitle from '../components/HeaderAndTitle';
import InputMemberInfo from '../components/InputMemberInfo';
import Warning from '../components/Warning';
import Button from '../components/Button';
import InputMemberValidInfo from '../components/InputMemberValidInfo';
import { useDispatch } from 'react-redux';
import { registerUser } from '../_actions/userAction';
import history from '../history';

const pixelToRem = size => `${size / 16}rem`;

function Signup(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const onSubmit = data => {
    console.log(data);
    dispatch(registerUser(data)).then(res => {
      alert('가입이 정상적으로 완료되었습니다.');
      history.push('/');
    });
  };
  return (
    <SignupContainer>
      <HeaderAndTitle titleName="회원가입" />
      <Warning />
      <InputForm onSubmit={handleSubmit(onSubmit)}>
        <InputMemberInfo
          labelName="ID"
          name="ID"
          required={true}
          checkDuplicate={false}
          type="text"
          register={register}
          errors={errors.ID}
          minLength={7}
          maxLength={7}
          validPattern={InputMemberValidInfo.ID.validPattern}
          validPatternMessage={InputMemberValidInfo.ID.validPatternMessage}
        />
        <InputMemberInfo
          labelName="비밀번호"
          name="pw"
          required={true}
          checkDuplicate={false}
          type="password"
          register={register}
          errors={errors.pw}
          minLength={8}
          maxLength={16}
          validPattern={InputMemberValidInfo.PW.validPattern}
          validPatternMessage={InputMemberValidInfo.PW.validPatternMessage}
        />
        <InputMemberInfo
          labelName="닉네임"
          name="nickname"
          required={true}
          checkDuplicate={true}
          type="text"
          register={register}
          errors={errors.nickname}
          minLength={4}
          maxLength={16}
          validPattern={InputMemberValidInfo.nickname.validPattern}
          validPatternMessage={
            InputMemberValidInfo.nickname.validPatternMessage
          }
        />
        <InputMemberInfo
          labelName="이름"
          name="koreanName"
          specificPlaceholder=". ex) 홍길동"
          required={true}
          checkDuplicate={false}
          type="text"
          register={register}
          errors={errors.koreanName}
          minLength={2}
          maxLength={7}
          validPattern={InputMemberValidInfo.koreanName.validPattern}
          validPatternMessage={
            InputMemberValidInfo.koreanName.validPatternMessage
          }
        />
        <InputMemberInfo
          labelName="학번"
          name="studentID"
          specificPlaceholder=". ex) 23"
          required={true}
          checkDuplicate={false}
          type="number"
          register={register}
          errors={errors.studentID}
          minLength={2}
          maxLength={2}
          validPattern={InputMemberValidInfo.studentID.validPattern}
          validPatternMessage={
            InputMemberValidInfo.studentID.validPatternMessage
          }
        />
        <InputMemberInfo
          labelName="학년"
          name="grade"
          specificPlaceholder=". ex) 1"
          required={true}
          checkDuplicate={false}
          type="number"
          register={register}
          errors={errors.grade}
          minLength={1}
          maxLength={1}
          validPattern={InputMemberValidInfo.grade.validPattern}
          validPatternMessage={InputMemberValidInfo.grade.validPatternMessage}
        />
        <InputMemberInfo
          labelName="전화번호"
          name="call"
          specificPlaceholder=". ex) 010-1234-5678"
          required={true}
          checkDuplicate={false}
          type="text"
          register={register}
          errors={errors.call}
          minLength={13}
          maxLength={13}
          validPattern={InputMemberValidInfo.call.validPattern}
          validPatternMessage={InputMemberValidInfo.call.validPatternMessage}
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
