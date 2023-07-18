import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import theme from '../../styles/Theme';
import NoticeTab from './NoticeTab';
import { noticeType } from '../../constants/NoticeType';
import { useRecoilState, useRecoilValue } from 'recoil';
import { noticeTab } from '../../atom/noticeTab';
import { notificationMessage } from '../../constants/NoticeMessage';
import calculateDueDate from '../util/CalculateDueDate';
import useScrollGradient from '../../hook/useScrollGradient';

function NoticeLayerPopup() {
  const currentIndex = useRecoilValue(noticeTab);
  const [notice, setNotice] = useRecoilState(noticeType[currentIndex]);
  const scrollRef = useRef(null);
  const showGradient = useScrollGradient(scrollRef);

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

  useEffect(() => {
    console.log(notice);
  }, [notice]);

  return (
    <NoticeLayerPopupContainer>
      <Triangle />
      <Header>
        <Title>알림</Title>
        <NoticeTab />
      </Header>
      <NoticeSection ref={scrollRef} showGradient={showGradient}>
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
            <NoticeTime>{`${calculateDueDate(notice.time)} 전`}</NoticeTime>
          </NoticeContent>
        ))}
      </NoticeSection>
    </NoticeLayerPopupContainer>
  );
}

export default NoticeLayerPopup;

const NoticeLayerPopupContainer = styled.div`
  display: flex;
  position: absolute;
  top: 50px;
  left: -280px;
  z-index: 100;
  flex-direction: column;
  align-items: center;
  width: 347px;
  height: 300px;
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
  margin-top: 20px;
  margin-bottom: 15px;
  color: ${theme.colors.white};
  font-family: 'Pretendard';
  font-size: ${theme.fontSizes.label};
  font-weight: 600;
  line-height: 150%;
`;

const Title = styled.div``;

const NoticeSection = styled.section`
  width: 100%;

  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 20px;
    width: 90%;
    height: ${props => (props.showGradient ? '100px' : '0')};
    background: linear-gradient(transparent, ${theme.colors.black});
    transition: height 0.3s ease;
  }
`;

const NoticeContent = styled.div`
  position: relative;
  width: 100%;
  padding: 15px 0;
  border-bottom: 1px solid ${theme.colors.white};

  color: ${props => (props.isRead ? theme.colors.purple : theme.colors.white)};

  &:hover {
    cursor: pointer;
  }

  &:last-child {
    border-bottom: 0;
  }
`;

const NoticeTitle = styled.div`
  width: 100%;
  font-family: 'Pretendard';
  font-size: ${theme.fontSizes.font_normal};
  font-weight: 600;
  line-height: 150%;

  // 초과한 글씨는 ...으로 처리
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const NoticeDesc = styled.div`
  font-family: 'Pretendard';
  font-size: ${theme.fontSizes.font_small};
  font-weight: 300;
  line-height: 150%;
`;

const NoticeTime = styled.div`
  position: absolute;
  top: 38px;
  right: 0;
  font-family: 'Pretendard';
  font-size: ${theme.fontSizes.font_small};
  font-weight: 300;
  line-height: 150%;
`;
