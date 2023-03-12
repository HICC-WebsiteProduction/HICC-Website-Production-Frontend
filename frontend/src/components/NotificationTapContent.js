import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faSquareMinus } from '@fortawesome/free-regular-svg-icons';
import React from 'react';
import styled from 'styled-components';
import theme from '../styles/Theme';

const pixelToRem = size => `${size / 16}rem`;

export default function NotificationTapContent() {
  return (
    <NotificationTapContentContainer>
      <ReadingRelatedFuncGroup>
        <AllReadNotifications>전체 읽기</AllReadNotifications>/
        <DeleteReadNotifications>읽은 알림 삭제</DeleteReadNotifications>
      </ReadingRelatedFuncGroup>
      <NotificationContents>
        <NoticeBodyItemIcon>
          <FontAwesomeIcon icon={faComments} />
        </NoticeBodyItemIcon>
        <NotificationDesc>
          “닉네임”님이 내 글에 댓글을 달았습니다.
        </NotificationDesc>
        <NotificationTimeInfo>30분전</NotificationTimeInfo>
        <DeleteNotificationIcon>
          <FontAwesomeIcon icon={faSquareMinus} />
        </DeleteNotificationIcon>
      </NotificationContents>
      <NotificationContents>
        <NoticeBodyItemIcon>
          <FontAwesomeIcon icon={faComments} />
        </NoticeBodyItemIcon>
        <NotificationDesc>
          “닉네임”님이 내 글에 댓글을 달았습니다.
        </NotificationDesc>
        <NotificationTimeInfo>30분전</NotificationTimeInfo>
        <DeleteNotificationIcon>
          <FontAwesomeIcon icon={faSquareMinus} />
        </DeleteNotificationIcon>
      </NotificationContents>
      <NotificationContents>
        <NoticeBodyItemIcon>
          <FontAwesomeIcon icon={faComments} />
        </NoticeBodyItemIcon>
        <NotificationDesc>
          “닉네임”님이 내 글에 댓글을 달았습니다.
        </NotificationDesc>
        <NotificationTimeInfo>30분전</NotificationTimeInfo>
        <DeleteNotificationIcon>
          <FontAwesomeIcon icon={faSquareMinus} />
        </DeleteNotificationIcon>
      </NotificationContents>
      <NotificationContents>
        <NoticeBodyItemIcon>
          <FontAwesomeIcon icon={faComments} />
        </NoticeBodyItemIcon>
        <NotificationDesc>
          “닉네임”님이 내 글에 댓글을 달았습니다.
        </NotificationDesc>
        <NotificationTimeInfo>30분전</NotificationTimeInfo>
        <DeleteNotificationIcon>
          <FontAwesomeIcon icon={faSquareMinus} />
        </DeleteNotificationIcon>
      </NotificationContents>
      <NotificationContents>
        <NoticeBodyItemIcon>
          <FontAwesomeIcon icon={faComments} />
        </NoticeBodyItemIcon>
        <NotificationDesc>
          “닉네임”님이 내 글에 댓글을 달았습니다.
        </NotificationDesc>
        <NotificationTimeInfo>30분전</NotificationTimeInfo>
        <DeleteNotificationIcon>
          <FontAwesomeIcon icon={faSquareMinus} />
        </DeleteNotificationIcon>
      </NotificationContents>
      <NotificationContents>
        <NoticeBodyItemIcon>
          <FontAwesomeIcon icon={faComments} />
        </NoticeBodyItemIcon>
        <NotificationDesc>
          “닉네임”님이 내 글에 댓글을 달았습니다.
        </NotificationDesc>
        <NotificationTimeInfo>30분전</NotificationTimeInfo>
        <DeleteNotificationIcon>
          <FontAwesomeIcon icon={faSquareMinus} />
        </DeleteNotificationIcon>
      </NotificationContents>
      <NotificationContents>
        <NoticeBodyItemIcon>
          <FontAwesomeIcon icon={faComments} />
        </NoticeBodyItemIcon>
        <NotificationDesc>
          “닉네임”님이 내 글에 댓글을 달았습니다.
        </NotificationDesc>
        <NotificationTimeInfo>30분전</NotificationTimeInfo>
        <DeleteNotificationIcon>
          <FontAwesomeIcon icon={faSquareMinus} />
        </DeleteNotificationIcon>
      </NotificationContents>
    </NotificationTapContentContainer>
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

const NotificationContents = styled.div`
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
  color: ${theme.colors.white};
  font-size: ${pixelToRem(8)};
  font-family: ${theme.fontWeight.ExtraLight}, sans-serif;
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
