import React from 'react';
import styled from 'styled-components';
import theme from '../../styles/Theme';
import Button from '../util/Button';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { user } from '../../atom/user';
import { useNavigate } from 'react-router';
import { memberRole, rolePriority } from './../../constants/MemberRole';

// 내 정보를 클릭했을 때 실행되는 팝업
function MyinfoLayerPopup() {
  const userinfo = useRecoilValue(user); // 유저 정보
  const reset = useResetRecoilState(user); // 로그아웃을 위해
  const navigate = useNavigate();

  const isExecutive = rolePriority[userinfo.role] <= 2;

  const goMyPage = () => {
    navigate('/mypage');
  };

  const goManagePage = () => {
    navigate('/manage');
  };

  // 리코일 상태 리셋, 홈으로 이동
  const logout = () => {
    reset();
    navigate('/');
  };
  return (
    <MyinfoLayerPopupContainer>
      <Triangle />
      <Header>
        <Profile src="/images/profile.png" />
        <UserInfo>
          <Nickname>{userinfo.nickname}</Nickname>
          <Grade>{memberRole[userinfo.role]}</Grade>
          <Name>{userinfo.name}</Name>
        </UserInfo>
      </Header>
      <MyPageButton
        buttonName="마이페이지"
        buttonType="button"
        onClick={goMyPage}
      />
      <LogoutButton
        buttonName="로그아웃"
        buttonType="button"
        onClick={logout}
      />
      {isExecutive ? (
        <ManageButton
          buttonName="관리페이지"
          buttonType="button"
          onClick={goManagePage}
        />
      ) : null}
    </MyinfoLayerPopupContainer>
  );
}

export default MyinfoLayerPopup;

const MyinfoLayerPopupContainer = styled.div`
  display: flex;
  position: absolute;
  top: 50px;
  left: -266px;
  z-index: 100;
  flex-direction: column;
  align-items: center;
  width: 347px;
  padding: 20px 25px;
  border: 2px solid ${theme.colors.blue};
  border-radius: 20px;
  background-color: ${theme.colors.black};
`;

const Triangle = styled.div`
  display: inline-block;
  position: absolute;
  top: -10px;
  left: 90%;
  transform: translateX(-50%);
  width: 15px;
  height: 15px;
  &::before {
    content: ' ';
    display: block;
    width: 15px;
    height: 2px;
    background: ${theme.colors.blue};
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    -webkit-transform: rotate(40deg);
    -moz-transform: rotate(40deg);
    -ms-transform: rotate(40deg);
    transform: rotate(40deg);
    position: absolute;
    top: 3px;
    right: -5px;
  }
  &::after {
    content: ' ';
    display: block;
    width: 15px;
    height: 2px;
    background: ${theme.colors.blue};
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    -webkit-transform: rotate(-40deg);
    -moz-transform: rotate(-40deg);
    -ms-transform: rotate(-40deg);
    transform: rotate(-40deg);
    position: absolute;
    top: 3px;
    left: -5px;
  }
`;

const Header = styled.header`
  display: flex;
  width: 100%;
  margin-bottom: 20px;
`;

const Profile = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;

const UserInfo = styled.div`
  margin: 5px 20px 20px 20px;
`;

const Nickname = styled.div`
  margin-bottom: 10px;
  color: ${theme.colors.white};
  ${theme.fontstyle.body1};
`;

const Grade = styled.div`
  margin-bottom: 10px;
  color: ${theme.colors.white};
  ${theme.fontstyle.body10};
`;

const Name = styled.div`
  color: ${theme.colors.white};
  ${theme.fontstyle.body10};
`;

const MyPageButton = styled(Button)`
  margin-bottom: 14px;
  width: 306px;
  height: 60px;
  line-height: 150%;
`;

const LogoutButton = styled(Button)`
  width: 306px;
  height: 60px;
  background-color: ${theme.colors.cancleRed};
  line-height: 150%;
`;

const ManageButton = styled(Button)`
  margin-top: 14px;
  width: 306px;
  height: 60px;
  background-color: ${theme.colors.green};
  line-height: 150%;
`;
