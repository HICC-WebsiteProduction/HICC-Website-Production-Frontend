import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import HeaderAndTitle from './HeaderAndTitle';
import theme from '../styles/Theme';

const pixelToRem = size => `${size / 16}rem`;

function MemberAuthorizeWindow(props) {
  return (
    <MemberAuthorizeContainer>
      <Toolbar>
        <SelectAllTool>전체 선택 및 해제</SelectAllTool>
      </Toolbar>
      <WaitingMemberContainer>
        <WaitingMemberHeader>
          <tr>
            <td>닉네임</td>
            <td>ID</td>
            <td>이름</td>
            <td>학과</td>
            <td>학년</td>
            <td>연락처</td>
            <td>승인</td>
          </tr>
        </WaitingMemberHeader>
        <WaitingMemberList>
          <WaitingMember>Member 1</WaitingMember>
          <WaitingMember>Member 2</WaitingMember>
          <WaitingMember>Member 3</WaitingMember>
          <WaitingMember>Member 4</WaitingMember>
        </WaitingMemberList>
      </WaitingMemberContainer>
      <ActionButtonContainer>
        <DenyButton>가입 거부</DenyButton>
        <GrantButton>가입 승인</GrantButton>
      </ActionButtonContainer>
    </MemberAuthorizeContainer>
  );
}

function WaitingMember(props) {
  return (
    <MemberPresenter>
      <td>1</td>
      <td>2</td>
      <td>3</td>
      <td>4</td>
      <td>5</td>
      <td>6</td>
      <td>7</td>
    </MemberPresenter>
  );
}

export default MemberAuthorizeWindow;

const MemberAuthorizeContainer = styled.div`
  *
`;

const Toolbar = styled.div`
  display: flex;
  justify-content: right;
  width: 100%;
`;

const SelectAllTool = styled.button`
  color: rgb(150, 150, 150);
  font-weight: light;
  font-size: ${pixelToRem(8)};
  margin-right: ${pixelToRem(5)};
`;

const WaitingMemberContainer = styled.table`
  width: 100%;

  tr {
    height: ${pixelToRem(50)};
  }

  td {
    text-align: center;
    vertical-align: middle;

    font-size: ${pixelToRem(20)};
  }
`;

const WaitingMemberHeader = styled.thead`
  font-weight: bold;
  background: lightgray;
`;

const WaitingMemberList = styled.tbody`
  *
`;

const ActionButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  width: 100%;

  button {
    border-radius: 10px;

    border: 4px solid rgb(255, 60, 60);
    background-color: rgb(255, 60, 60);
    font-size: ${pixelToRem(20)};

    margin: ${pixelToRem(20)};
    width: ${pixelToRem(120)};
    height: ${pixelToRem(40)};
  }
`;

const DenyButton = styled.button`
  *
`;

const GrantButton = styled.button`
  *
`;

const MemberPresenter = styled.tr`
  height: ${pixelToRem(30)};
  :nth-child(2n) {
    background: rgb(220, 220, 220);
  }
`;
