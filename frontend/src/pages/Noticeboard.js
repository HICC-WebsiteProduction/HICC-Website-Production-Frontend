import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import HeaderAndTitle from '../components/HeaderAndTitle';
import theme from '../styles/Theme';
import Post from '../components/Post';

const pixelToRem = size => `${size / 16}rem`;

function Noticeboard() {
  const [currentBoard, setCurrentBoard] = useState('공지게시판');

  const handleBoardChange = boardName => {
    setCurrentBoard(boardName);
  };

  return (
    <NoticeBoardContainer>
      <HeaderAndTitle titleName="게시판" />
      <BoardBox>
        <BoardList>
          <BoardItem onClick={() => handleBoardChange('공지게시판')}>
            공지게시판
          </BoardItem>
          <BoardItem onClick={() => handleBoardChange('자유게시판')}>
            자유게시판
          </BoardItem>
          <BoardItem onClick={() => handleBoardChange('활동사진게시판')}>
            활동사진게시판
          </BoardItem>
          <BoardItem onClick={() => handleBoardChange('족보게시판')}>
            족보게시판
          </BoardItem>
          <BoardItem onClick={() => handleBoardChange('취업정보게시판')}>
            취업정보게시판
          </BoardItem>
          <BoardItem onClick={() => handleBoardChange('졸업생게시판')}>
            졸업생게시판
          </BoardItem>
        </BoardList>
        <Post postFilter="board" filterCondition={currentBoard} />
      </BoardBox>
    </NoticeBoardContainer>
  );
}

export default Noticeboard;

const NoticeBoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

const BoardBox = styled.div`
  display: flex;

  width: 100%;
  height: 100vh;
`;

const BoardList = styled.ul`
  width: 20%;
  height: 100%;
  padding: 0;
  margin-left: 20px;
  list-style-type: none;
  background-color: #f0f0f0;
  border-right: 1px solid ${theme.colors.chinese_silver};
`;

const BoardItem = styled.li`
  padding: 10px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: ${theme.colors.chinese_silver};
  }
`;
