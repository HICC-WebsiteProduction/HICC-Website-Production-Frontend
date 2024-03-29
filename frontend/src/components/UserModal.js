import React, { useState } from 'react';
import LoginUserModal from './LoginUserModal';
import LogoutUserModal from './LogoutUserModal';
import { useDispatch } from 'react-redux';
import { loginUser } from '../_actions/userAction';

export default function UserModal() {
  const [auth, setAuth] = useState(false);
  const [loginUserID, setLoginUserID] = useState('');
  const [loginUserNickname, setLoginUserNickname] = useState('');
  const [loginUserGrade, setLoginUserGrade] = useState('');
  const dispatch = useDispatch();
  const loginRequest = data => {
    // 인증 성공하면
    authentication(data).then(res => {
      if (res === true) {
        dispatch(loginUser(data));
        setAuth(true);
      } else {
        alert('인증 실패');
      }
    });
  };
  const gradeName = {
    president: '회장',
    manager: '운영진',
    normal: '일반',
    graduate: '졸업생',
  };
  const fetchData = () => {
    return fetch('memberInfo.json')
      .then(res => res.json())
      .then(data => data.memberInfo);
  };
  const authentication = async data => {
    const result = await fetchData();
    for (const member of result) {
      if (data.ID === member.ID) {
        setLoginUserID(data.ID);
        setLoginUserNickname(member.nickname);
        const grades = Object.keys(gradeName);
        const grade = grades.find(key => key === member.grade);
        setLoginUserGrade(gradeName[grade]);
        return true;
      }
    }
    if (loginUserID === '') {
      return false;
    }
  };
  return auth ? (
    <LogoutUserModal
      id={loginUserID}
      nickname={loginUserNickname}
      grade={loginUserGrade}
      setAuth={setAuth}
    />
  ) : (
    <LoginUserModal loginRequest={loginRequest} />
  );
}
