import React from 'react';
import styled from 'styled-components';
import HeaderAndTitle from '../components/header/HeaderAndTitle';

export default function Login(props) {
  return (
    <LoginContainer>
      <HeaderAndTitle titleName="로그인" />
    </LoginContainer>
  );
}

const LoginContainer = styled.div`
  width: 100%;
  height: 100vh;
`;
