import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import theme from './../styles/Theme';

import { useForm } from 'react-hook-form';
import InputMemberInfo from '../components/input/InputMemberInfo';
import Button from './../components/util/Button';
import Regex from './../constants/Regex';

import { useNavigate } from 'react-router-dom';
import { request } from '../utils/axios';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { user } from '../atom/user';
import Title from '../components/header/Title';
import agree from '../atom/agree';

// 로그인
export default function Login(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const setUser = useSetRecoilState(user); // 로그인 상태 저장을 위해

  const onSubmit = async data => {
    try {
      const response = await request('post', '/login', {
        id: data.ID,
        password: data.PW,
      });
      setUser(response.body);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };
  const navigate = useNavigate();
  const isAgree = useRecoilValue(agree);
  const [goPage, setGoPage] = useState('/tos');

  // 약관 동의를 했으면 회원가입 페이지로, 아니라면 약관동의 페이지로 셋팅
  useEffect(() => {
    if (!isAgree) {
      setGoPage('/tos');
    } else {
      setGoPage('/signup');
    }
  }, [isAgree]);

  return (
    <LoginContainer>
      <Title titleName="로그인" />
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
          pattern={Regex.ID.pattern}
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
          pattern={Regex.PW.pattern}
          width={786}
        />
        <ButtonContainer>
          <JoinButton
            buttonType="button"
            buttonName="가입신청"
            onClick={() => {
              navigate(goPage);
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
  height: 100%;
`;

const InputForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 786px;
  margin: 0 auto;
`;

const ButtonContainer = styled.div`
  display: flex;
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
  ${theme.fontstyle.body10};
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
