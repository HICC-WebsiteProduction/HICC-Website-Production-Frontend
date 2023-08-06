import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../../styles/Theme';

// ancestorMenuTree 상위 메뉴를 받아와 링크로 만들어준다.
export default function Tab(props) {
  const changeTab = index => {
    props.handleBoardChange(props.currentTabContents[index].name);
  };

  return (
    <HeaderTabContainer>
      <AncestorMenu>
        {props.ancestorMenuTree.map((menu, idx) => (
          <Fragment key={`ancestor${idx}`}>
            <AncestorMenuLink to={menu.link}>{menu.name}</AncestorMenuLink>
            <RightAngleBracket>{' > '}</RightAngleBracket>
          </Fragment>
        ))}
      </AncestorMenu>
      <CurrentMenuTab>
        {props.currentTabContents.map((menu, idx) => (
          <Fragment key={`current${idx}`}>
            <CurrentMenuTabContents
              onClick={() => changeTab(idx)}
              accent={menu.accent}
            >
              {menu.name}
            </CurrentMenuTabContents>
          </Fragment>
        ))}
      </CurrentMenuTab>
    </HeaderTabContainer>
  );
}

const HeaderTabContainer = styled.div`
  width: 100%;
  height: 160px;
  margin-bottom: 60px;
`;

const AncestorMenu = styled.nav`
  margin-top: 36px;
  text-align: center;
  font-family: 'GmarketSansMedium', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 120%;
  text-decoration: none;
`;

const AncestorMenuLink = styled(Link)`
  color: ${theme.colors.white};
  text-decoration: none;
`;

const RightAngleBracket = styled.span`
  color: ${theme.colors.white};
  text-decoration: none;
`;

const CurrentMenuTab = styled.nav`
  margin-top: 16px;
  text-align: center;
`;

const CurrentMenuTabContents = styled.span`
  margin-left: 10px;
  padding-left: 10px;
  border-left: 1px solid ${theme.colors.white};

  color: ${theme.colors.white};
  font-family: ${props => (props.accent ? `GmarketSansMedium` : 'Pretendard')},
    sans-serif;
  font-style: normal;
  font-weight: ${props => (props.accent ? 500 : 300)};
  font-size: 30px;
  line-height: 120%;
  text-decoration: none;
  &:hover {
    cursor: pointer;
  }

  &:first-child {
    margin-left: 0;
    padding-left: 0;
    border-left: none;
  }
`;
