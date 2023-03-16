import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import theme from '../styles/Theme';
import NewPost from '../components/NewPost';
import dummy from '../dummy/posts.json';

const pixelToRem = size => `${size / 16}rem`;

export default function Post(props) {
  const [posts, setPosts] = useState(() => {
    const initialPosts = dummy.posts || [];
    return initialPosts;
  });

  const [currentPost, setCurrentPost] = useState(null);
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [isCreatingPost, setIsCreatingPost] = useState(false);

  useEffect(() => {
    const posts = dummy.posts || [];
    setPosts(posts);
  }, []);

  useEffect(() => {
    const boardPosts = dummy.posts.filter(
      post => post[props.postFilter] === props.filterCondition,
    );
    setFilteredPosts(boardPosts);
    setCurrentPost(null);
    setIsCreatingPost(null);
  }, [props.filterCondition]);

  const handlePostClick = postId => {
    const post = dummy.posts.find(post => post.id === postId);
    setCurrentPost(post);
  };

  // 새 글 저장 후 실행할 함수
  const handleSave = () => {
    setCurrentPost(null); // currentPost 상태를 null로 바꿔서 게시글 목록 보이게 함
    setIsCreatingPost(null);
    console.log('handleSave함수 실행됨');
    const posts = dummy.posts || [];
    setPosts(posts);
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
      ) : isCreatingPost ? (
        <>
          <NewPost
            board={props.filterCondition}
            writer="최세호"
            onSave={handleSave}
          />
          <Button onClick={() => setIsCreatingPost(null)}>취소</Button>
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
              {filteredPosts.map((post, index) => (
                <tr key={post.id} onClick={() => handlePostClick(post.id)}>
                  <td>{index}</td>
                  <td>{post.title}</td>
                  <td>{post.writer}</td>
                  <td>{post.date}</td>
                </tr>
              ))}
            </PostsList>

            {/* 글쓰기 버튼 추가 */}
            {/* currentPost 상태를 true로 바꿔서 새 글 작성 컴포넌트가 보이게 함 */}
            {/* writer는 임의로 설정함 */}
            {/* 실제로는 로그인한 사용자의 정보를 받아와야 함 */}
            {/* onSave에 handleSave 함수를 전달함 */}
            {/* 새 글 저장 후 실행됨 */}
            <Button onClick={() => setIsCreatingPost(true)}>글쓰기</Button>
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
