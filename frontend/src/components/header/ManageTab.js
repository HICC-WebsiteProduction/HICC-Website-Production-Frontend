import React from 'react';
import styled from 'styled-components';
import theme from '../../styles/Theme';
import { useRecoilState } from 'recoil';
import { manageTab } from '../../atom/tab/manage';

// 헤더 아래 관리페이지의 탭
export default function ManageTab(props) {
  const [memu, setMemu] = useRecoilState(manageTab); // 관리페이지 탭

  const changeTab = index => {
    setMemu(index);
  };

  // 관리 페이지 탭 내용들
  // accent는 현재 클릭한 탭이 강조되도록 해줌
  const manageTabContents = [
    { name: '회원 승인', accent: memu === 0 },
    { name: '회원 정보', accent: memu === 1 },
    { name: '우산 대여', accent: memu === 2 },
    { name: '사물함 대여', accent: memu === 3 },
  ];

  return (
    <ManageTabContainer>
      <Title>관리페이지</Title>
      <CurrentMenuTab>
        {manageTabContents.map((menu, idx) => (
          <React.Fragment key={`manage${idx}`}>
            <CurrentMenuTabContents
              onClick={() => changeTab(idx)}
              key={`current${idx}`}
              accent={menu.accent}
            >
              {menu.name}
              <Indicator key={`indicator${idx}`} accent={menu.accent} />
            </CurrentMenuTabContents>
          </React.Fragment>
        ))}
      </CurrentMenuTab>
    </ManageTabContainer>
  );
}

const ManageTabContainer = styled.div`
  width: 100%;
  height: 160px;
  margin-bottom: 60px;
`;

const Title = styled.h1`
  margin: 60px 0 24px 0;
  color: ${theme.colors.white};
  font-family: 'GmarketSansMedium';
  font-weight: 500;
  font-size: ${theme.fontSizes.title};
  text-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.25);
`;

const CurrentMenuTab = styled.nav`
  display: flex;
  margin-top: 16px;
  padding: 26px 0;
  border-top: 3px solid #3cda5b;
  border-bottom: 1px solid #3cda5b;
`;

const CurrentMenuTabContents = styled.div`
  position: relative;
  margin-right: 50px;
  color: ${theme.colors.white};
  font-family: 'Pretendard', sans-serif;
  font-style: normal;
  font-weight: ${props => (props.accent ? 600 : 300)};
  font-size: ${theme.fontSizes.tab};
  line-height: 120%;
  text-decoration: none;
  &:hover {
    cursor: pointer;
  }
`;

const Indicator = styled.div`
  display: ${props => (props.accent ? 'block' : 'none')};
  position: absolute;
  top: -26px;
  left: 42%;
  width: 0;
  height: 0;
  border-bottom: 10px solid transparent;
  border-top: 10px solid #3cda5b;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
`;
