import React, { useState } from 'react';
import styled from 'styled-components';
import theme from '../styles/Theme';
import HeaderAndTap from '../components/header/HeaderAndTap';
import { TabContentByIndexMypage } from '../components/header/TabContentByIndexMypage';

function Mypage() {
  const MyComments = () => {
    return <div>내 작성 댓글 목록</div>;
  };

  const [currentTab, setCurrentTab] = useState('내 정보');

  const handleTabChange = tabName => {
    setCurrentTab(tabName);
  };

  // const tabs = [
  //   {
  //     title: '내 작성 글',
  //     content: <Post postFilter="writer" filterCondition="최세호" />,
  //   },
  //   // 댓글 목록 구현 예정
  //   { title: '내 작성 댓글', content: <MyComments /> },
  // ];

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
      <HeaderAndTap
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
  height: 100vh;
  margin: 0 auto;
`;
