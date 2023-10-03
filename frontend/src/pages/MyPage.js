import React, { useState } from 'react';
import styled from 'styled-components';
import theme from '../styles/Theme';
import { TabContentByIndexMypage } from '../constants/TabContentByIndexMypage';
import Tab from '../components/header/Tab';

function Mypage() {
  const [currentTab, setCurrentTab] = useState('내 정보');

  const handleTabChange = tabName => {
    setCurrentTab(tabName);
  };
  const ancestorMenuTree = [
    { name: '홈', link: '/' },
    { name: '마이페이지', link: '/mypage' },
  ];

  const currentTabContents = [
    { name: '내 정보', accent: currentTab === '내 정보' },
    { name: '내 작성글', accent: currentTab === '내 작성글' },
    { name: '내 작성댓글', accent: currentTab === '내 작성댓글' },
  ];

  return (
    <MypageContainer>
      <Tab
        ancestorMenuTree={ancestorMenuTree}
        currentTabContents={currentTabContents}
        handleBoardChange={handleTabChange}
      />
      {/* <Tabs tabs={tabs} /> */}
      {TabContentByIndexMypage[currentTab]}
    </MypageContainer>
  );
}

export default Mypage;

const MypageContainer = styled.div`
  width: ${theme.componentSize.maxWidth};
  height: 1000px;
  margin: 0 auto;
`;
