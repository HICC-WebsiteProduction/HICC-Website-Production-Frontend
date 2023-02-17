import React from 'react';
import styled from 'styled-components';
import theme from '../styles/Theme';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-regular-svg-icons';
import LoginInputMemberInfo from './LoginInputMemberInfo';
import InputMemberValidInfo from './InputMemberValidInfo';

const pixelToRem = size => `${size / 16}rem`;

export default function LoginUserModal() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = data => console.log(data);
  return (
    <UserModalContainer>
      <UserModalInner>
        <UserIcon>
          <FontAwesomeIcon icon={faCircleUser} />
        </UserIcon>
        <SignIn>Sign In</SignIn>
        <LoginForm onSubmit={handleSubmit(onSubmit)}>
          <LoginInputMemberInfo
            placeholder="ID"
            name="ID"
            required={true}
            requiredMessage={InputMemberValidInfo.ID.required}
            type="text"
            register={register}
            minLength={7}
            maxLength={7}
            validPattern={/^[A-Z][0-9]{6}$/}
            validPatternMessage={InputMemberValidInfo.ID.validPatternMessage}
          />
          <LoginInputMemberInfo
            placeholder="Password"
            name="PW"
            required={true}
            requiredMessage={InputMemberValidInfo.PW.required}
            type="password"
            register={register}
            minLength={8}
            maxLength={16}
            validPattern={
              /^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&*()_+=]+)|(?:[0-9]+))$)[A-Za-z\d~!@#$%^&*()_+=]{10,}|(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,}$/
            }
            validPatternMessage={InputMemberValidInfo.PW.validPatternMessage}
          />
          <ErrorMessage>
            {(errors.ID && errors.ID.message) ||
              (errors.PW && errors.PW.message)}
          </ErrorMessage>
          <LoginButton>Login</LoginButton>
        </LoginForm>
        <GoSignupButton href={'/signup'}>회원가입</GoSignupButton>
      </UserModalInner>
    </UserModalContainer>
  );
}

const UserModalContainer = styled.div`
  position: absolute;
  top: 160%;
  right: -29px;
  z-index: 1;
  width: ${pixelToRem(254)};
  height: ${pixelToRem(334)};
  box-shadow: ${pixelToRem(4)} ${pixelToRem(4)} ${pixelToRem(4)}
    rgba(0, 0, 0, 0.25);
  background: linear-gradient(180deg, #959eed 0%, #e6b1ff 100%);
  &:hover {
    cursor: auto;
  }
  &:after {
    position: absolute;
    top: ${pixelToRem(-10)};
    right: ${pixelToRem(30)};
    width: 0;
    height: 0;
    border: ${pixelToRem(11)} solid transparent;
    border-top-width: 0;
    border-bottom-color: #959eed;
    content: ' ';
  }
`;

const UserModalInner = styled.div`
  ${theme.flexbox.flexCenterColumn};
  margin: ${pixelToRem(48)} ${pixelToRem(22)};
`;

const UserIcon = styled.div`
  font-size: ${pixelToRem(24)};
  color: ${theme.colors.white};
`;

const SignIn = styled.div`
  width: ${pixelToRem(220)};
  height: ${pixelToRem(33)};
  padding-top: ${pixelToRem(3)};
  margin-top: ${pixelToRem(15)};
  border-top: ${pixelToRem(1)} solid ${theme.colors.white};
  border-bottom: ${pixelToRem(1)} solid ${theme.colors.white};
  color: ${theme.colors.white};
  font-family: NanumBarunGothic, sans-serif;
  font-size: ${pixelToRem(24)};
  text-align: center;
`;

const LoginForm = styled.form`
  ${theme.flexbox.flexCenterColumn};
  justify-content: center;
  width: ${pixelToRem(220)};
  height: ${pixelToRem(130)};
  border-bottom: ${pixelToRem(1)} solid ${theme.colors.white};
`;

const LoginButton = styled.button`
  width: ${pixelToRem(156)};
  height: ${pixelToRem(20)};
  background-color: #ffc700;
  border-radius: ${pixelToRem(5)};
  border: none;
  font-size: ${theme.fontSizes.font_micro};
  &:hover {
    cursor: pointer;
  }
`;

const ErrorMessage = styled.span`
  margin: ${pixelToRem(5)} 0;
  font-family: NanumBarunGothic, sans-serif;
  font-size: ${theme.fontSizes.font_micro};
  color: ${theme.colors.red};
`;

const GoSignupButton = styled.a`
  width: ${pixelToRem(40)};
  height: ${pixelToRem(12)};
  margin-top: ${pixelToRem(5)};
  color: ${theme.colors.blue};
  font-size: ${theme.fontSizes.font_micro};
  text-decoration-line: none;
`;
