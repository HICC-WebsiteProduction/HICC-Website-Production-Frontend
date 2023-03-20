import React from 'react';
import styled from 'styled-components';

export default function EditUserInfo({
  nickname,
  phone,
  onNicknameChange,
  onPhoneChange,
}) {
  return (
    <EditUserInfoWrapper>
      <EditUserInfoItem>
        <EditUserInfoLabel>닉네임:</EditUserInfoLabel>
        <EditInput
          type="text"
          value={nickname}
          onChange={e => onNicknameChange(e.target.value)}
        />
      </EditUserInfoItem>
      <EditUserInfoItem>
        <EditUserInfoLabel>전화번호:</EditUserInfoLabel>
        <EditInput
          type="tel"
          value={phone}
          onChange={e => onPhoneChange(e.target.value)}
        />
      </EditUserInfoItem>
    </EditUserInfoWrapper>
  );
}

const EditUserInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const EditUserInfoItem = styled.div`
  display: flex;
  align-items: center;
  margin: 5px 0;
`;

const EditUserInfoLabel = styled.div`
  font-weight: bold;
  margin-right: 10px;
`;

const EditInput = styled.input`
  padding: 5px;
  border-radius: 5px;
  border: 1px solid gray;
`;
