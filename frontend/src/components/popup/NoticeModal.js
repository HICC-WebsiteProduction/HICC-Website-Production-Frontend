import React from 'react';
import styled from 'styled-components';
import theme from '../../styles/Theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListAlt } from '@fortawesome/free-regular-svg-icons';
import { faComments } from '@fortawesome/free-regular-svg-icons';
import { faCalendarCheck } from '@fortawesome/free-regular-svg-icons';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import NotificationTapContent from './NotificationTapContent';

const pixelToRem = size => `${size / 16}rem`;

export default function NoticeModal() {
  const pageRef = React.createRef();
  const headerRef = React.createRef();
  const selectTab = data => {
    const pages = pageRef.current.children;
    const headers = headerRef.current.children;
    const len = pages.length;

    const hiddenTag = 'hidden-page';
    const selectedTab = 'selected-tab';
    for (let i = 0; i < len; i++) {
      if (data.target === headers[i]) {
        headers[i].classList.add(selectedTab);
        // matching page index === i
        for (let j = 0; j < len; j++) {
          if (i === j && pages[j].classList.contains(hiddenTag)) {
            pages[j].classList.remove(hiddenTag);
          } else if (
            i !== j &&
            pages[j].classList.contains(hiddenTag) === false
          ) {
            pages[j].classList.add(hiddenTag);
          }
        }
      } else {
        headers[i].classList.remove(selectedTab);
      }
    }

    console.log('end of function');
  };
  return (
    <NoticeModalContainer>
      <NoticeHeaderTap ref={headerRef}>
        <NoticeHeaderTapItem className="selected-tab" onClick={selectTab}>
          <NoticeHeaderTapItemIcon>
            <FontAwesomeIcon icon={faListAlt} />
          </NoticeHeaderTapItemIcon>
          전체알림
        </NoticeHeaderTapItem>
        <NoticeHeaderTapItem onClick={selectTab}>
          <NoticeHeaderTapItemIcon>
            <FontAwesomeIcon icon={faComments} />
          </NoticeHeaderTapItemIcon>
          게시판
        </NoticeHeaderTapItem>
        <NoticeHeaderTapItem onClick={selectTab}>
          <NoticeHeaderTapItemIcon>
            <FontAwesomeIcon icon={faCalendarCheck} />
          </NoticeHeaderTapItemIcon>
          일정
        </NoticeHeaderTapItem>
        <NoticeHeaderTapItem onClick={selectTab}>
          <NoticeHeaderTapItemIcon>
            <FontAwesomeIcon icon={faCartPlus} />
          </NoticeHeaderTapItemIcon>
          대여정보
        </NoticeHeaderTapItem>
      </NoticeHeaderTap>
      <NoticeModalBody ref={pageRef}>
        <NotificationTapContent />
        <NotificationTapContent type="board" className="hidden-page" />
        <NotificationTapContent type="schedule" className="hidden-page" />
        <NotificationTapContent type="rent" className="hidden-page" />
      </NoticeModalBody>
    </NoticeModalContainer>
  );
}

const NoticeModalContainer = styled.div`
  position: absolute;
  top: 160%;
  right: ${pixelToRem(-27)};
  z-index: 1;
  width: ${pixelToRem(260)};
  height: ${pixelToRem(398)};
  background: linear-gradient(180deg, #959eed 0%, #e6b1ff 100%);
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
  &:hover {
    cursor: auto;
  }
`;

const NoticeModalBody = styled.div`
  ${theme.flexbox.flexCenterColumn};
  margin: 0 ${pixelToRem(13)} ${pixelToRem(20)} ${pixelToRem(13)};
  .hidden-page {
    display: none;
  }
`;

const NoticeHeaderTap = styled.div`
  ${theme.flexbox.flex};
`;

const NoticeHeaderTapItem = styled.div`
  flex: 1;
  height: ${pixelToRem(38)};
  padding: ${pixelToRem(14)} 0;
  border-left: 0.5px solid ${theme.colors.white};
  border-right: 0.5px solid ${theme.colors.white};
  border-bottom: 1.5px solid ${theme.colors.white};
  background: rgba(0, 0, 0, 0.2);
  color: ${theme.colors.white};
  font-size: ${theme.fontSizes.font_micro};
  text-align: center;
  &:first-child {
    border-left: 0;
  }
  &:last-child {
    border-right: 0;
  }
  &:hover {
    cursor: pointer;
  }
  &.selected-tab {
    background: rgba(0, 0, 0, 0.08);
  }
`;

const NoticeHeaderTapItemIcon = styled.span`
  margin-right: ${pixelToRem(2)};
`;

const NoticePageItem = styled.div`
  background-color: transparent;
`;
