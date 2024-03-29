import React from 'react';
import styled from 'styled-components';
import HeaderAndTitle from '../components/header/HeaderAndTitle';
import theme from '../styles/Theme';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import InputMemberInfo from '../components/InputMemberInfo';
import InputMemberValidInfo from '../components/InputMemberValidInfo';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

export default function Login(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const onSubmit = data => {
    console.log(data);
  };
  const navigate = useNavigate();
  return (
    <LoginContainer>
      <HeaderAndTitle titleName="로그인" />
      <InputForm onSubmit={handleSubmit(onSubmit)}>
        <InputMemberInfo
          labelName="ID"
          name="ID"
          specificPlaceholder="ID를 입력해주세요"
          required={true}
          checkDuplicate={false}
          type="text"
          register={register}
          errors={errors.ID}
          minLength={7}
          maxLength={7}
          validPattern={InputMemberValidInfo.ID.validPattern}
          width={786}
        />
        <InputMemberInfo
          labelName="비밀번호"
          name="pw"
          specificPlaceholder="비밀번호를 입력해주세요"
          required={true}
          checkDuplicate={false}
          type="password"
          register={register}
          errors={errors.pw}
          minLength={8}
          maxLength={16}
          validPattern={InputMemberValidInfo.PW.validPattern}
          width={786}
        />
        <ButtonContainer>
          <JoinButton
            buttonType="button"
            buttonName="가입신청"
            onClick={() => {
              navigate('/signup');
            }}
          />
          <LoginButton buttonType="submit" buttonName="로그인" />
          <InduceJoinMent>회원이 아니라면</InduceJoinMent>
        </ButtonContainer>
      </InputForm>
    </LoginContainer>
  );
}

const LoginContainer = styled.div`
  width: 100%;
  height: 100vh;
`;

const InputForm = styled.form`
  ${theme.flexbox.flexCenterColumn}
  width: 786px;
  margin: 0 auto;
`;

const ButtonContainer = styled.div`
  ${theme.flexbox.flex};
  position: relative;
  width: 786px;
  margin-top: 74px;
  margin-bottom: 210px;
  justify-content: space-between;
`;

const InduceJoinMent = styled.span`
  position: absolute;
  top: -30px;
  color: rgba(237, 240, 248, 0.4);
  font-family: 'Pretendard', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: ${theme.fontSizes.font_normal};
`;

const JoinButton = styled(Button)`
  width: 178px;
  height: 60px;
  margin-right: 30px;
  background-color: ${theme.colors.white};
  color: ${theme.colors.black};
`;

const LoginButton = styled(Button)`
  width: 580px;
  height: 60px;
  color: ${theme.colors.white};
`;
