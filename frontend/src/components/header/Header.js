import React, { useRef } from 'react';
import styled from 'styled-components';
import theme from '../../styles/Theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import NoticeModal from '../NoticeModal';
import { Link } from 'react-router-dom';
import useModal from '../../hook/useModal';
import { useRecoilValue } from 'recoil';
import { user } from '../../atom/user';
import MyinfoLayerPopup from '../popup/MyinfoLayerPopup';
import NoticeLayerPopup from '../popup/noticeLayerPopup';

export default function Header() {
  const noticeButtonRef = useRef(null);
  const myInfoButtonRef = useRef(null);
  const noticeModal = useModal(noticeButtonRef);
  const myInfoModal = useModal(myInfoButtonRef);
  const isLogin = useRecoilValue(user).accessToken;

  return (
    <HeaderContainer>
      <Logo to={'/'} />
      <NavigationAndUser>
        <Navigation>
          <Menu to="/noticeboard">게시판</Menu>
          <Menu to="#">회계정보</Menu>
          <Menu to="/calendar">일정 캘린더</Menu>
          <Menu to="/rent/umbrellarent">대여</Menu>
        </Navigation>
        <UserContainer>
          {!isLogin ? (
            <>
              <LoginLink to="/login">로그인</LoginLink>
            </>
          ) : (
            <>
              <NoticeLayerPopupWrapper ref={noticeButtonRef}>
                <FontAwesomeIcon icon={faBell} />
                {noticeModal ? <NoticeLayerPopup /> : null}
              </NoticeLayerPopupWrapper>
              <MyinfoLayerPopupWrapper ref={myInfoButtonRef}>
                내 정보
                {myInfoModal ? <MyinfoLayerPopup /> : null}
              </MyinfoLayerPopupWrapper>
            </>
          )}
        </UserContainer>
      </NavigationAndUser>
    </HeaderContainer>
  );
}

// border bottom 양 끝에 점을 해결하지 못했습니다.
const HeaderContainer = styled.header`
  ${theme.flexbox.flex};
  justify-content: space-between;
  width: ${theme.componentSize.maxWidth};
  height: 74px;
  margin: 0 auto;
  padding: 0 ${theme.margin.margin_content};
  transform: rotate(-0.05deg);
`;

const Logo = styled(Link)`
  width: 100px;
  height: 34px;
  background-image: url('/images/hicc_logo.png');
  background-size: contain;
  background-repeat: no-repeat;
`;

const NavigationAndUser = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Navigation = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 90px;
`;

const Menu = styled(Link)`
  padding: 0 20px;
  color: ${theme.colors.white};
  font-size: ${theme.fontSizes.navigation_menu};
  font-family: 'Pretendard', sans-serif;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  text-decoration: none;
  white-space: nowrap;
`;

const UserContainer = styled.div`
  ${theme.flexbox.flex};
  justify-content: flex-end;
  align-items: center;
`;

const NoticeLayerPopupWrapper = styled.div`
  display: inline-block;
  position: relative;
  color: ${theme.colors.white};
  font-size: ${theme.fontSizes.label};
  &:hover {
    cursor: pointer;
  }
`;

const LoginLink = styled(Link)`
  margin-left: 13px;
  background-color: transparent;
  border: none;
  color: ${theme.colors.white};
  font-family: 'Pretendard', sans-serif;
  font-size: ${theme.fontSizes.navigation_menu};
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  text-decoration: none;
  white-space: nowrap;
  &:hover {
    cursor: pointer;
  }
`;

const MyinfoLayerPopupWrapper = styled.div`
  display: inline-block;
  position: relative;
  margin-left: 13px;
  background-color: transparent;
  border: none;
  color: ${theme.colors.white};
  font-family: 'Pretendard', sans-serif;
  font-size: ${theme.fontSizes.navigation_menu};
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  text-decoration: none;
  white-space: nowrap;
  &:hover {
    cursor: pointer;
  }
`;
