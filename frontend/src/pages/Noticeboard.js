import React, { useState } from 'react';
import styled from 'styled-components';
import theme from './../styles/Theme';
import Post from './../components/noticeboard/Post';
import Tab from '../components/header/Tab';
import Restaurant from '../components/noticeboard/Restaurant';

// 게시판 페이지
function Noticeboard() {
  const [currentBoard, setCurrentBoard] = useState('공지게시판');
  //게시판 변경 핸들러
  const handleBoardChange = boardName => {
    setCurrentBoard(boardName);
  };

  // 상위 링크를 표시하기 위함
  const ancestorMenuTree = [
    { name: '홈', link: '/' },
    { name: '게시판', link: '/noticeboard' },
  ];
  const currentTabContents = [
    { name: '공지게시판', accent: currentBoard === '공지게시판' },
    { name: '자유게시판', accent: currentBoard === '자유게시판' },
    { name: '활동사진게시판', accent: currentBoard === '활동사진게시판' },
    { name: '족보게시판', accent: currentBoard === '족보게시판' },
    { name: '취업정보게시판', accent: currentBoard === '취업정보게시판' },
    { name: '졸업생게시판', accent: currentBoard === '졸업생게시판' },
    { name: '맛집게시판', accent: currentBoard === '맛집게시판' },
  ];

  return (
    <NoticeBoardContainer>
      <Tab
        ancestorMenuTree={ancestorMenuTree}
        currentTabContents={currentTabContents}
        handleBoardChange={handleBoardChange}
      />
      <BoardBox>
        {currentBoard !== '맛집게시판' ? (
          <Post
            postFilter="board"
            filterCondition={currentBoard}
            showButton={true}
            isMypage={false}
          />
        ) : (
          <Restaurant />
        )}
      </BoardBox>
    </NoticeBoardContainer>
  );
}

export default Noticeboard;

const NoticeBoardContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const BoardBox = styled.div`
  width: ${theme.componentSize.maxWidth};
  height: 100%;
  margin: 0 auto;
`;
