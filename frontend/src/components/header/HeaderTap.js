import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../../styles/Theme';

// ancestorMenuTree 상위 메뉴를 받아와 링크로 만들어준다.
export default function HeaderTap(props) {
  const changeTab = index => {
    props.handleBoardChange(props.currentTabContents[index].name);
  };

  return (
    <HeaderTabContainer>
      <AncestorMenu>
        {props.ancestorMenuTree.map((menu, idx) => (
          <>
            <AncestorMenuLink to={menu.link} key={`ancestor${idx}`}>
              {menu.name}
            </AncestorMenuLink>
            <RightAngleBracket>{' > '}</RightAngleBracket>
          </>
        ))}
      </AncestorMenu>
      <CurrentMenuTab>
        {props.currentTabContents.map((menu, idx) => (
          <>
            <CurrentMenuTabContents
              onClick={() => changeTab(idx)}
              key={`current${idx}`}
              accent={menu.accent}
            >
              {menu.name}
            </CurrentMenuTabContents>
            <VeticalBar>
              {idx < props.currentTabContents.length - 1 ? ` | ` : ''}
            </VeticalBar>
          </>
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
  color: ${theme.colors.white};
  font-family: ${props => (props.accent ? `GmarketSansMedium` : 'Pretendard')},
    sans-serif;
  font-style: normal;
  font-weight: ${props => (props.accent ? 500 : 300)};
  font-size: 25px;
  line-height: 120%;
  text-decoration: none;
  &:hover {
    cursor: pointer;
  }
`;

const VeticalBar = styled.span`
  color: ${theme.colors.white};
  font-family: sans-serif;
  font-weight: 100;
  font-size: 25px;
  text-decoration: none;
`;
