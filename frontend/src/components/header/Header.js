import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import theme from '../../styles/Theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { faBell as faBellSolid } from '@fortawesome/free-solid-svg-icons';

import { Link } from 'react-router-dom';
import useModal from '../../hook/useModal';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { user } from '../../atom/user';
import MyinfoLayerPopup from '../popup/MyinfoLayerPopup';
import NoticeLayerPopup from '../popup/noticeLayerPopup';
import { notice, unreadNotice } from '../../atom/notice';
import { request } from '../../utils/axios';

// 페이지의 헤더를 담당
export default function Header({ background }) {
  const noticeButtonRef = useRef(null); // 알림 창 버튼
  const myInfoButtonRef = useRef(null); // 내 정보 버튼

  const [noticeModal] = useModal(noticeButtonRef); // 알림 모달 창 상태 (boolean)
  const [myInfoModal] = useModal(myInfoButtonRef); // 내 정보 상태 (boolean)

  const isLogin = useRecoilValue(user).accessToken; // 로그인 여부 user의 accessToken으로 체크
  const username = useRecoilValue(user).nickname; // 닉네임

  const setNotice = useSetRecoilState(notice); // 알림을 서버에서 받아 설정해주는 함수
  const unreadNoticeCount = useRecoilValue(unreadNotice); // 읽지 않은 알림 수

  // 알림 내역을 받아오는 함수 (로그인 돼있을 때만 실행)
  const fetchData = async () => {
    try {
      const response = await request('get', `/notice/${username}`);
      setNotice(response.body.notice);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (isLogin) {
      fetchData();
    }
  }, []);

  return (
    <HeaderContainer background={background ? 1 : 0}>
      <Logo to={'/'} />
      <NavigationAndUser>
        <Navigation>
          <Menu to="/noticeboard">게시판</Menu>
          <Menu to="#">회계정보</Menu>
          <Menu to="/schedule">일정 캘린더</Menu>
          <Menu to="/rent/umbrellarent">대여</Menu>
        </Navigation>
        <UserContainer>
          {!isLogin ? (
            <>
              <LoginLink to="/login">로그인</LoginLink>
            </>
          ) : (
            <>
              <UnreadNoticeCount existUnreadNotice={unreadNoticeCount > 0}>
                {unreadNoticeCount}
              </UnreadNoticeCount>
              <NoticeLayerPopupWrapper ref={noticeButtonRef}>
                <NoticeIcon
                  icon={unreadNoticeCount > 0 ? faBellSolid : faBell}
                />
                {noticeModal ? <NoticeLayerPopup /> : null}
              </NoticeLayerPopupWrapper>
              <MyinfoLayerPopupWrapper ref={myInfoButtonRef}>
                <MyInfoButton>내 정보</MyInfoButton>
                {myInfoModal ? <MyinfoLayerPopup /> : null}
              </MyinfoLayerPopupWrapper>
            </>
          )}
        </UserContainer>
      </NavigationAndUser>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  ${theme.flexbox.flex};
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  justify-content: space-between;
  width: ${theme.componentSize.maxWidth};
  height: 74px;
  margin: 0 auto;
  padding: 0 ${theme.margin.margin_content};
  transform: rotate(-0.05deg);
  background-color: ${props =>
    props.background ? theme.colors.black : 'transperent'};
`;

const Logo = styled(Link)`
  width: 100px;
  height: 90px;
  background-image: url('/images/hicc logo-03.svg');
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
  margin: 0 6px;
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

const UnreadNoticeCount = styled.div`
  display: ${props => (props.existUnreadNotice ? 'block' : 'none')};
  margin-right: 4px;
  color: ${theme.colors.white};
  font-family: 'Pretendard';
  font-size: ${theme.fontSizes.navigation_menu};
  font-weight: 600;
  line-height: 150%;
`;

const NoticeLayerPopupWrapper = styled.div`
  display: inline-block;
  position: relative;
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
  padding: 0 20px;
  background-color: transparent;
  border: none;
`;

const NoticeIcon = styled(FontAwesomeIcon)`
  margin-left: 4px;
  color: ${theme.colors.white};
  font-size: ${theme.fontSizes.label};
  &:hover {
    cursor: pointer;
  }
`;

const MyInfoButton = styled.div`
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
