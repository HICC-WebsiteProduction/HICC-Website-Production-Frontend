import React from 'react';
import styled from 'styled-components';
import theme from '../styles/Theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-regular-svg-icons';

const pixelToRem = size => `${size / 16}rem`;

export default function LogoutUserModal() {
  return (
    <LogoutUserModalContainer>
      <LogoutUserModalInner>
        <UserIcon>
          <FontAwesomeIcon icon={faCircleUser} />
        </UserIcon>
        <Nickname>닉네임</Nickname>
        <Grade>등급(회장,운영진)</Grade>
        <ModalInButtonContainer>
          <ModalInButton type="button">정보수정</ModalInButton>
          <ModalInButton type="button">내가 작성한 글/댓글</ModalInButton>
          <ModalInButton type="button">관리페이지</ModalInButton>
        </ModalInButtonContainer>
        <GoSignupButton href={'/signup'}>로그아웃</GoSignupButton>
      </LogoutUserModalInner>
    </LogoutUserModalContainer>
  );
}

const LogoutUserModalContainer = styled.div`
  position: absolute;
  top: 160%;
  right: ${pixelToRem(-29)};
  z-index: 1;
  width: ${pixelToRem(254)};
  height: ${pixelToRem(334)};
  background: linear-gradient(180deg, #959eed 0%, #e6b1ff 100%);
  box-shadow: ${pixelToRem(4)} ${pixelToRem(4)} ${pixelToRem(4)}
    rgba(0, 0, 0, 0.25);
  &:hover {
    cursor: auto;
  }
  &:after {
    position: absolute;
    height: 0;
    top: ${pixelToRem(-10)};
    right: ${pixelToRem(30)};
    width: 0;
    border: ${pixelToRem(11)} solid transparent;
    border-top-width: 0;
    border-bottom-color: #959eed;
    content: ' ';
  }
`;

const LogoutUserModalInner = styled.div`
  ${theme.flexbox.flexCenterColumn};
  margin: ${pixelToRem(48)} ${pixelToRem(22)};
`;

const UserIcon = styled.div`
  font-size: ${pixelToRem(36)};
  color: ${theme.colors.white};
`;

const Nickname = styled.span`
  margin: ${pixelToRem(1)} 0;
  font-size: ${theme.fontSizes.font_normal};
  color: ${theme.colors.white};
`;

const Grade = styled.span`
  margin: ${pixelToRem(1)} 0;
  font-size: ${theme.fontSizes.font_micro};
  color: ${theme.colors.white};
`;

const ModalInButtonContainer = styled.div`
  ${theme.flexbox.flexCenterColumn};
  width: ${pixelToRem(220)};
  margin: ${pixelToRem(25)} 0 ${pixelToRem(5)} 0;
  border-bottom: ${pixelToRem(1)} solid ${theme.colors.white};
`;

const ModalInButton = styled.button`
  width: ${pixelToRem(156)};
  height: ${pixelToRem(20)};
  margin: 0 0 ${pixelToRem(10)} 0;
  padding: ${pixelToRem(4)} ${pixelToRem(7)};
  background: rgba(0, 0, 0, 0.05);
  border-radius: ${pixelToRem(5)};
  border: none;
  color: ${theme.colors.white};
  font-size: ${theme.fontSizes.font_micro};
  text-align: start;
  &:hover {
    cursor: pointer;
  }
  &:last-child {
    margin: 0 0 ${pixelToRem(25)} 0;
  }
`;

const GoSignupButton = styled.a`
  width: ${pixelToRem(40)};
  height: ${pixelToRem(12)};
  margin-top: ${pixelToRem(5)};
  color: ${theme.colors.blue};
  font-size: ${theme.fontSizes.font_micro};
  text-decoration-line: none;
`;
