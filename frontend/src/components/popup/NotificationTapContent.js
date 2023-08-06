import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarCheck,
  faComments,
  faSquareMinus,
} from '@fortawesome/free-regular-svg-icons';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import theme from '../../styles/Theme';

const pixelToRem = size => `${size / 16}rem`;

const noticeIcon = {
  board: faComments,
  schedule: faCalendarCheck,
  rent: faCartPlus,
};

// 사용하지 않음 => 전체 읽기 기능만 추출한 후 제거 예정
export default function NotificationTapContent(props) {
  const [notice, setNotice] = useState([]);
  const fetchData = () => {
    return fetch('notice.json')
      .then(res => res.json())
      .then(data => data.notice)
      .then(data => {
        if (props.type === 'board') {
          return data.filter(item => item.type === 'board');
        } else if (props.type === 'schedule') {
          return data.filter(item => item.type === 'schedule');
        } else if (props.type === 'rent') {
          return data.filter(item => item.type === 'rent');
        }
        return data;
      });
  };
  useEffect(() => {
    const initData = async () => {
      const result = await fetchData();
      setNotice(result);
    };
    initData();
  }, []);
  return (
    <NotificationTapContentContainer className={props.className}>
      <ReadingRelatedFuncGroup>
        <AllReadNotifications>전체 읽기</AllReadNotifications>/
        <DeleteReadNotifications>읽은 알림 삭제</DeleteReadNotifications>
      </ReadingRelatedFuncGroup>
      {notice.length > 0 &&
        notice.map((item, idx) => (
          <NotificationContents
            type={item.type}
            payload={item.payload}
            time={item.time}
          />
        ))}
    </NotificationTapContentContainer>
  );
}

function NotificationContents(props) {
  const [icon, setIcon] = useState(null);
  useEffect(() => {
    const findIcon = type => {
      const key = Object.keys(noticeIcon).find(v => v === type);
      setIcon(noticeIcon[key]);
    };
    findIcon(props.type);
  }, [icon, props.type]);
  const calculatePastTime = () => {
    const now = new Date();
    const time = new Date(Date.parse(props.time));
    const diff = now - time;
    if (diff < 3600000) {
      return `${parseInt(diff / (1000 * 60))}분 전`;
    } else if (diff < 216000000) {
      return `${parseInt(diff / (1000 * 60 * 60))}시간 전`;
    } else {
      return `${parseInt(diff / (1000 * 60 * 60 * 24))}일 전`;
    }
  };
  return (
    <NotificationContentsContainer>
      <NoticeBodyItemIcon>
        {icon && <FontAwesomeIcon icon={icon} />}
      </NoticeBodyItemIcon>
      <NotificationDescFunc type={props.type} payload={props.payload} />
      <NotificationTimeInfo>{calculatePastTime()}</NotificationTimeInfo>
      <DeleteNotificationIcon>
        <FontAwesomeIcon icon={faSquareMinus} />
      </DeleteNotificationIcon>
    </NotificationContentsContainer>
  );
}

function NotificationDescFunc(props) {
  const calculateDueDate = () => {
    const now = new Date();
    const time = new Date(Date.parse(props.payload.dueDate));
    const diff = time - now;
    if (diff < 3600000) {
      return `${parseInt(diff / (1000 * 60))}분`;
    } else if (diff < 216000000) {
      return `${parseInt(diff / (1000 * 60 * 60))}시간`;
    } else {
      return `${parseInt(diff / (1000 * 60 * 60 * 24))}일`;
    }
  };
  const notificationMessage = {
    board: `${props.payload.nickname}님이 내 글에 댓글을 달았습니다.`,
    schedule: `${
      props.payload.scheduleName
    }까지 D-${calculateDueDate()} 남았습니다.`,
    rent: `${
      props.payload.rentItem
    }반납일까지 D-${calculateDueDate()} 남았습니다.`,
  };
  return (
    <NotificationDesc>
      <NotificationLink href={props.payload.link}>
        {notificationMessage[props.type]}
      </NotificationLink>
    </NotificationDesc>
  );
}

const NotificationTapContentContainer = styled.div``;

const ReadingRelatedFuncGroup = styled.div`
  ${theme.flexbox.flex};
  justify-content: flex-end;
  margin: ${pixelToRem(7)} 0;
  color: ${theme.colors.white};
  font-size: ${pixelToRem(6)};
`;

const AllReadNotifications = styled.a`
  color: ${theme.colors.white};
  font-size: ${pixelToRem(6)};
`;

const DeleteReadNotifications = styled.a`
  color: ${theme.colors.white};
  font-size: ${pixelToRem(6)};
`;

const NotificationContentsContainer = styled.div`
  ${theme.flexbox.flex};
  align-items: center;
  width: ${pixelToRem(234)};
  height: ${pixelToRem(32)};
  background: rgba(0, 0, 0, 0.05);
  border-bottom: 1px solid ${theme.colors.white};
`;

const NoticeBodyItemIcon = styled.span`
  margin-left: ${pixelToRem(10)};
  color: ${theme.colors.white};
  font-size: ${pixelToRem(8)};
`;

const NotificationDesc = styled.span`
  width: ${pixelToRem(170)};
  height: ${pixelToRem(32)};
  margin-left: ${pixelToRem(4)};
  padding-top: ${pixelToRem(7)};
  font-size: ${pixelToRem(8)};
`;

const NotificationLink = styled.a`
  color: ${theme.colors.white};
  text-decoration: none;
`;

const NotificationTimeInfo = styled.span`
  margin-left: ${pixelToRem(4)};
  color: ${theme.colors.white};
  font-size: ${pixelToRem(6)};
`;
const DeleteNotificationIcon = styled.div`
  margin-left: ${pixelToRem(1)};
  color: ${theme.colors.white};
  font-size: ${pixelToRem(6)};
`;
