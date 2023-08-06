import React from 'react';
import styled from 'styled-components';
import theme from '../styles/Theme';
import Header from '../components/header/Header';
import Title from '../components/header/Title';
import Checkbox from '../components/util/Checkbox';
import { TOSMessage } from '../constants/TOSMessage';

// 약관동의 페이지
function TOS() {
  const headName = '이지우';
  const headNumber = '010-0000-0000';
  return (
    <TOSContainer>
      <Header />
      <Title titleName="회원가입" />
      <HeadNumber>
        {`아직 HICC의 회원이 아닌 경우, 홈페이지 회원가입에 앞서 회장에게 연락하고
안내에 따라주시길 바랍니다. (회장 ${headName} 연락처 : ${headNumber})`}
      </HeadNumber>
      <Confirm>
        <Text>회장에게 가입 연락을 하고 가입비를 납부했습니까?</Text>
        <Checkbox />
      </Confirm>
      <TOSDesc>{TOSMessage}</TOSDesc>
      <Confirm>
        <Text>가입 약관을 읽고 동의합니까?</Text>
        <Checkbox />
      </Confirm>
    </TOSContainer>
  );
}

export default TOS;

const TOSContainer = styled.div`
  width: ${theme.componentSize.maxWidth};
  height: 100vh;
  margin: 0 auto;
`;

const HeadNumber = styled.div`
  width: 783px;
  margin: 40px auto;
  color: ${theme.colors.white};
  font-family: 'Pretendard';
  font-size: ${theme.fontSizes.label};
  font-weight: 300;
  line-height: 150%;
`;

const Confirm = styled.div`
  display: flex;
  justify-content: space-between;
  width: 783px;
  margin: 0 auto;
`;

const Text = styled.div`
  color: ${theme.colors.white};
  font-family: 'Pretendard';
  font-size: ${theme.fontSizes.label};

  font-weight: 600;
  line-height: 150%;
`;

const TOSDesc = styled.div`
  width: 783px;
  height: 198px;
  margin: 40px auto;

  padding: 15px 18px;
  background-color: ${theme.colors.white};
  border-radius: 20px;

  white-space: pre-line;

  overflow-y: scroll;
`;
