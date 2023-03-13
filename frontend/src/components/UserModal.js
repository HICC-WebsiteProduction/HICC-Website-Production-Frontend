import React, { useState } from 'react';
import LoginUserModal from './LoginUserModal';
import LogoutUserModal from './LogoutUserModal';

export default function UserModal() {
  const [loginRequest, setLoginRequest] = useState(false);
  const changeLoginRequest = state => {
    setLoginRequest(state);
  };
  return loginRequest ? (
    <LogoutUserModal loginRequest={changeLoginRequest} />
  ) : (
    <LoginUserModal loginRequest={changeLoginRequest} />
  );
}
