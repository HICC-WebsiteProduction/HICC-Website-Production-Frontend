import React from 'react';
import styled from 'styled-components';
import logo from '../images/hicc_logo.png';
import theme from '../styles/Theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { faCircleUser } from '@fortawesome/free-regular-svg-icons';
import SearchWindow from './SearchWindow';

const pixelToRem = size => `${size / 16}rem`;

export default function Header() {
  return (
    <HeaderContainer>
      <Logo />
      <UserContainer>
        <SearchWindow />
        <BellIcon>
          <FontAwesomeIcon icon={faBell} size="2x" />
        </BellIcon>
        <UserIcon type="button">
          <FontAwesomeIcon icon={faCircleUser} />
        </UserIcon>
      </UserContainer>
    </HeaderContainer>
  );
}

// border bottom 양 끝에 점을 해결하지 못했습니다.
const HeaderContainer = styled.header`
  ${theme.flexbox.flex};
  justify-content: space-between;
  height: ${pixelToRem(74)};
  padding: 0 ${theme.margin.margin_content};
  border-bottom: 2px solid ${theme.colors.light_grey};
  transform: rotate(-0.05deg);
`;

const Logo = styled.div`
  width: ${pixelToRem(100)};
  height: ${pixelToRem(34)};
  background-image: url('${logo}');
  background-size: contain;
  background-repeat: no-repeat;
`;

const UserContainer = styled.div`
  ${theme.flexbox.flex};
  justify-content: flex-end;
`;

const BellIcon = styled.div`
  margin-left: ${pixelToRem(28)};
`;

const UserIcon = styled.button`
  width: ${pixelToRem(28)};
  height: ${pixelToRem(32)};
  margin-left: ${pixelToRem(28)};
  background-color: transparent;
  border: none;
  font-size: ${pixelToRem(32)};
`;
