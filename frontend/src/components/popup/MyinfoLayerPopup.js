import React from 'react';
import styled from 'styled-components';
import theme from '../../styles/Theme';
import Button from '../Button';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { user } from '../../atom/user';
import { useNavigate } from 'react-router';

function MyinfoLayerPopup() {
  const userinfo = useRecoilValue(user);
  const reset = useResetRecoilState(user);
  const navigate = useNavigate();

  const goMyPage = () => {
    navigate('/mypage');
  };

  const logout = () => {
    reset();
    navigate('/');
  };
  return (
    <MyinfoLayerPopupContainer>
      <Header>
        <Profile src="/images/profile.png" />
        <UserInfo>
          <Nickname>{userinfo.nickname}</Nickname>
          <Grade>{userinfo.grade}</Grade>
          <Name>{userinfo.name}</Name>
        </UserInfo>
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
      </Header>
    </MyinfoLayerPopupContainer>
  );
}

export default MyinfoLayerPopup;

const MyinfoLayerPopupContainer = styled.div`
  display: flex;
  position: absolute;
  top: 50%;
  left: 20%;
  z-index: 100;
  flex-direction: column;
  align-items: center;
  width: 347px;
  height: 300px;
  padding: 20px 25px;
  background-color: ${theme.colors.black};
`;

const Header = styled.header`
  display: flex;
`;

const Profile = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;

const UserInfo = styled.div`
  margin: 0 20px 20px 20px;
`;

const Nickname = styled.div`
  margin-bottom: 10px;
  color: ${theme.colors.white};
  font-family: 'Pretendard';
  font-size: ${theme.fontSizes.label};
  font-weight: 600;
  line-height: 150%;
`;

const Grade = styled.div`
  margin-bottom: 10px;
  color: ${theme.colors.white};
  font-family: 'Pretendard';
  font-size: ${theme.fontSizes.label};
  font-weight: 600;
  line-height: 150%;
`;

const Name = styled.div`
  color: ${theme.colors.white};
  font-family: 'Pretendard';
  font-size: ${theme.fontSizes.label};
  font-weight: 600;
  line-height: 150%;
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
