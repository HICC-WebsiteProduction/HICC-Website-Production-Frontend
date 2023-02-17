import React from 'react';
import LoginUserModal from './LoginUserModal';
import LogoutUserModal from './LogoutUserModal';

export default function UserModal() {
  const isLogin = false;
  return isLogin ? <LogoutUserModal /> : <LoginUserModal />;
}
