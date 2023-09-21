import React, { useRef } from 'react';
import styled from 'styled-components';
import theme from '../../styles/Theme';
import { noticeType } from '../../constants/NoticeType';
import { useRecoilState, useRecoilValue } from 'recoil';
import { notificationMessage } from '../../constants/NoticeMessage';
import calculateDueDate from '../util/CalculateDueDate';
import useScrollGradient from '../../hook/useScrollGradient';
import { noticeTab } from './../../atom/tab/noticeTab';
import NoticeTab from './NoticeTab';

// 알림 팝업 창을 보여줌
function NoticeLayerPopup() {
  const currentIndex = useRecoilValue(noticeTab); // 현재 탭(전체, 게시판, 일정, 대여)을 가져옴
  const [notice, setNotice] = useRecoilState(noticeType[currentIndex]); // 탭 별 알림을 저장
  const scrollRef = useRef(null);
  const { showGradient, showGradientTop } = useScrollGradient(scrollRef);
  // 스크롤 바를 없앴을 때 하단에 내용이 더 있는 것을 그라데이션으로 표현
  // 내용이 더 있다면 그라데이션 보여주고, 없으면 그라데이션 제거

  // 알림 읽음 처리
  const readNotice = noticeId => {
    setNotice(prev => {
      return prev.map(notice => {
        if (notice.id === noticeId) {
          return { ...notice, state: 'read' };
        }
        return notice;
      });
    });
  };

  // 알림 모두 읽음 처리
  const AllReadNotice = () => {
    setNotice(prev => {
      return prev.map(notice => ({ ...notice, state: 'read' }));
    });
  };

  return (
    <NoticeLayerPopupContainer>
      <Triangle />
      <Header>
        <Title>알림</Title>
        <NoticeTab />
      </Header>
      <NoticeSection
        ref={scrollRef}
        showGradient={showGradient}
        showGradientTop={showGradientTop}
      >
        {notice.map(notice => (
          <NoticeContent
            onClick={() => readNotice(notice.id)}
            key={`notice${notice.id}`}
            isRead={notice.state === 'read'}
          >
            <NoticeTitle>
              {notificationMessage(notice.type, notice.payload)}
            </NoticeTitle>
            <NoticeDesc>안녕하세요</NoticeDesc>
            <NoticeTime>{`${calculateDueDate(notice.time)}`}</NoticeTime>
          </NoticeContent>
        ))}
      </NoticeSection>
      <ButtonContainer>
        <AllReadButton onClick={AllReadNotice}>전체 알림 읽기</AllReadButton>
      </ButtonContainer>
    </NoticeLayerPopupContainer>
  );
}

export default NoticeLayerPopup;

const NoticeLayerPopupContainer = styled.div`
  display: flex;
  position: absolute;
  top: 50px;
  left: -332px;
  z-index: 100;
  flex-direction: column;
  align-items: center;
  width: 400px;
  height: 340px;
  padding: 20px 25px;
  padding-bottom: 0;
  border: 2px solid ${theme.colors.blue};
  border-radius: 20px;
  background-color: ${theme.colors.black};
`;

const Triangle = styled.div`
  display: inline-block;
  position: absolute;
  top: -10px;
  left: 87%;
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
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 15px;
  color: ${theme.colors.white};
  ${theme.fontstyle.body1};
`;

const Title = styled.div``;

const NoticeSection = styled.section`
  width: 100%;
  height: 230px;

  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 10%;
    left: 20px;
    width: 90%;
    height: ${props => (props.showGradient ? '100px' : '0')};
    background: linear-gradient(transparent, ${theme.colors.black});
    transition: height 0.3s ease;
  }

  &::before {
    content: '';
    position: absolute;
    top: 21%;
    left: 20px;
    z-index: 100;
    width: 90%;
    height: ${props => (props.showGradientTop ? '50px' : '0')};
    background: linear-gradient(${theme.colors.black}, transparent);
    transition: height 0.3s ease;
  }
`;

const NoticeContent = styled.div`
  position: relative;
  width: 100%;
  padding: 15px 0;
  border-bottom: 1px solid ${theme.colors.white};

  color: ${props => (props.isRead ? theme.colors.grey : theme.colors.white)};
  text-decoration: ${props => (props.isRead ? 'line-through' : 'none')};

  &:hover {
    cursor: pointer;
  }

  &:last-child {
    border-bottom: 0;
  }
`;

const NoticeTitle = styled.div`
  width: 100%;
  ${theme.fontstyle.body10};

  // 초과한 글씨는 ...으로 처리
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const NoticeDesc = styled.div`
  ${theme.fontstyle.body14};
`;

const NoticeTime = styled.div`
  position: absolute;
  top: 38px;
  right: 0;
  ${theme.fontstyle.body14};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
`;

const AllReadButton = styled.div`
  color: ${theme.colors.white};
  ${theme.fontstyle.body11};

  &:hover {
    cursor: pointer;
  }
`;
