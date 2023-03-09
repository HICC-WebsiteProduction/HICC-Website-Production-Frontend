import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import theme from '../styles/Theme';

const pixelToRem = size => `${size / 16}rem`;

export default function Post(props) {
  const [posts, setPosts] = useState([]);
  const [currentPost, setCurrentPost] = useState(null);
  const [filteredPosts, setFilteredPosts] = useState(posts);

  useEffect(() => {
    // 서버에서 게시물 목록을 가져와서 posts 상태를 업데이트합니다.
    // 서버에서 가져오는 방법에 따라 수정예정입니다.
    fetch('/api/posts')
      .then(response => response.json())
      .then(posts => {
        setPosts(posts);
        setFilteredPosts(
          posts.filter(
            post => post[props.postFilter] === props.filterCondition,
          ),
        );
      })
      .catch(error => console.error(error));
  }, []);

  if (posts.length === 0) {
    //게시글 더미 데이터
    setPosts([
      {
        id: 1,
        board: '자유게시판',
        title: '자유게시판 첫번째 글',
        content: '자유게시판 첫번째 글 내용입니다.',
        writer: '최세호',
        date: '2023/01/01',
      },
      {
        id: 2,
        board: '공지게시판',
        title: '공지게시판 첫번째 글',
        content: '공지게시판 첫번째 글 내용입니다.',
        writer: '최세호',
        date: '2023/01/01',
      },
      {
        id: 3,
        board: '활동사진게시판',
        title: '활동사진게시판 첫번째 글',
        content: '활동사진게시판 첫번째 글 내용입니다.',
        writer: '최세호',
        date: '2023/01/01',
      },
      {
        id: 4,
        board: '자유게시판',
        title: '자유게시판 두번째 글',
        content: '자유게시판 두번째 글 내용입니다.',
        writer: '최세호',
        date: '2023/01/01',
      },
      {
        id: 5,
        board: '공지게시판',
        title: '공지게시판 두번째 글',
        content: '전체게시판 두번째 글 내용입니다.',
        writer: '최세호',
        date: '2023/01/01',
      },
      {
        id: 6,
        board: '활동사진게시판',
        title: '활동사진게시판 두번째 글',
        content: '활동사진게시판 두번째 글 내용입니다.',
        writer: '최세호',
        date: '2023/01/01',
      },
    ]);
  }
  useEffect(() => {
    const boardPosts = posts.filter(
      post => post[props.postFilter] === props.filterCondition,
    );
    setFilteredPosts(boardPosts);
    setCurrentPost(null);
  }, [props.filterCondition]); //필터 조건 바뀔떄마다 렌더링

  const handlePostClick = postId => {
    const post = posts.find(post => post.id === postId);
    setCurrentPost(post);
  };

  return (
    <PostBox>
      {currentPost ? (
        <>
          <PostContainer>
            <PostTitle>{currentPost.title}</PostTitle>
            <PostContent>{currentPost.content}</PostContent>
          </PostContainer>
          <Button onClick={() => setCurrentPost(null)}>목록으로</Button>
        </>
      ) : (
        <>
          <PostsContainer>
            <PostsHeader>
              <tr>
                <th>{props.filterCondition}</th>
                <th>제목</th>
                <th>작성자</th>
                <th>날짜</th>
              </tr>
            </PostsHeader>
            <PostsList>
              {filteredPosts.map(post => (
                <tr key={post.id} onClick={() => handlePostClick(post.id)}>
                  <td>{post.id}</td>
                  <td>{post.title}</td>
                  <td>{post.writer}</td>
                  <td>{post.date}</td>
                  {/* <p>{post.content.slice(0, 100)}...</p> */}
                </tr>
              ))}
            </PostsList>
          </PostsContainer>
        </>
      )}
    </PostBox>
  );
}

const PostBox = styled.div`
  width: 100%;
  margin-right: 20px;
`;

const PostContainer = styled.div`
  margin-top: 2rem;
  border: 1px solid #ddd;
  padding: 1rem;
`;

const PostTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid ${theme.colors.very_light_gray};
`;

const PostContent = styled.p`
  font-size: 1.5rem;
  line-height: 2.5rem;
`;

const Button = styled.button`
  width: ${pixelToRem(102)};
  height: ${pixelToRem(40)};
  background-color: ${theme.colors.blue};
  border: none;
  border-radius: ${pixelToRem(10)};
  color: ${theme.colors.white};
  &:hover {
    cursor: pointer;
  }
`;

const PostsContainer = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const PostsHeader = styled.thead`
  background-color: ${theme.colors.white_grey};


    th {
      padding: 1rem;
      text-align: left;
      font-weight: bold;
      font-size: 1.2rem;
      border-bottom: 1px solid ${theme.colors.very_light_gray};
      text-align: center;
      vertical-align: middle;
    }
  }
`;

const PostsList = styled.tbody`
  tr {
    cursor: pointer;
    &:hover {
      background-color: ${theme.colors.chinese_silver};
    }
  }
  td {
    padding: 1rem;
    border-bottom: 1px solid ${theme.colors.white_grey};
    text-align: center;
    vertical-align: middle;
  }
`;
