import React from 'react';
import styled from 'styled-components';

export default function UserInfo({ nickname, level, phone, major, year }) {
  return (
    <UserInfoWrapper>
      <UserInfoItem>
        <UserInfoLabel>닉네임:</UserInfoLabel>
        <div>{nickname}</div>
      </UserInfoItem>
      <UserInfoItem>
        <UserInfoLabel>등급:</UserInfoLabel>
        <div>{level}</div>
      </UserInfoItem>
      <UserInfoItem>
        <UserInfoLabel>전화번호:</UserInfoLabel>
        <div>{phone}</div>
      </UserInfoItem>
      <UserInfoItem>
        <UserInfoLabel>학과:</UserInfoLabel>
        <div>{major}</div>
      </UserInfoItem>
      <UserInfoItem>
        <UserInfoLabel>학년:</UserInfoLabel>
        <div>{year}</div>
      </UserInfoItem>
    </UserInfoWrapper>
  );
}

const UserInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserInfoItem = styled.div`
  display: flex;
  align-items: center;
  margin: 5px 0;
`;

const UserInfoLabel = styled.div`
  font-weight: bold;
  margin-right: 10px;
`;
