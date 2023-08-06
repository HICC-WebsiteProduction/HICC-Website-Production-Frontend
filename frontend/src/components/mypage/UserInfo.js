import React from 'react';
import styled from 'styled-components';
import ViewMemberInfo from './../input/ViewMemberInfo';

// 내 정보를 보여주는 기능
export default function UserInfo({ nickname, level, phone, studentId, major }) {
  return (
    <UserInfoWrapper>
      <ViewMemberInfo
        labelName="닉네임"
        type="text"
        width={540}
        value={nickname}
        authorityCheck={false}
      />
      <ViewMemberInfo
        labelName="등급"
        type="text"
        width={540}
        value={level}
        authorityCheck={true}
      />
      <ViewMemberInfo
        labelName="전화번호"
        type="text"
        width={540}
        value={phone}
        authorityCheck={false}
      />
      <ViewMemberInfo
        labelName="학번"
        type="text"
        width={540}
        value={studentId}
        authorityCheck={false}
      />
      <ViewMemberInfo
        labelName="학과"
        type="text"
        width={540}
        value={major}
        authorityCheck={false}
      />
    </UserInfoWrapper>
  );
}

const UserInfoWrapper = styled.div`
  width: 540px;
`;
