import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import theme from '../styles/Theme';
import NewPost from '../components/NewPost';
import dummy from '../dummy/posts.json';
import NoticeBoardTable from './table/NoticeBoardTable';
import CurrentPost from './noticeboard/CurrentPost';

export default function Post(props) {
  const [posts, setPosts] = useState(() => {
    const initialPosts = dummy.posts || [];
    return initialPosts;
  });

  const [currentPost, setCurrentPost] = useState(null);
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
  const [postsPerPage, setPostsPerPage] = useState(10); // 페이지당 게시글 수

  useEffect(() => {
    const posts = dummy.posts || [];
    setPosts(posts);
  }, []);

  useEffect(() => {
    const boardPosts = dummy.posts.filter(
      post => post[props.postFilter] === props.filterCondition,
    );
    setFilteredPosts(boardPosts.reverse());
    setCurrentPost(null);
    setIsCreatingPost(null);
    setCurrentPage(1);
  }, [props.filterCondition, posts]);

  const handlePostClick = postId => {
    const post = dummy.posts.find(post => post.id === postId);
    setCurrentPost(post);
  };

  // 새 글 저장 후 실행할 함수
  const handleSave = newPost => {
    setCurrentPost(null); // currentPost 상태를 null로 바꿔서 게시글 목록 보이게 함
    setIsCreatingPost(null);
    console.log('handleSave함수 실행됨');

    const updatedPosts = [...posts, newPost];
    setPosts(updatedPosts);
    // const posts = dummy.posts || [];
    // setPosts(posts);
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredPosts.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <PostBox>
      {currentPost ? (
        <CurrentPost
          currentPost={currentPost}
          setCurrentPost={setCurrentPost}
        />
      ) : isCreatingPost ? (
        <>
          <NewPost
            board={props.filterCondition}
            writer="최세호"
            onSave={handleSave}
          />
          <Button
            onClick={() => {
              const confirmed = window.confirm(
                '         *정말로 취소하시겠습니까? \n (취소시 작성된 내용이 저장되지 않습니다)',
              );
              if (confirmed) {
                setIsCreatingPost(null);
              }
            }}
          >
            취소
          </Button>
        </>
      ) : (
        <>
          <PostsContainer>
            <NoticeBoardHeader>{props.filterCondition}</NoticeBoardHeader>
            <NoticeBoardTable
              postList={currentPosts}
              filteredPosts={filteredPosts}
              indexOfFirstPost={indexOfFirstPost}
              handlePostClick={handlePostClick}
            />
          </PostsContainer>
          {/* 글쓰기 버튼 추가 */}
          {/* currentPost 상태를 true로 바꿔서 새 글 작성 컴포넌트가 보이게 함 */}
          {/* writer는 임의로 설정함 */}
          {/* 실제로는 로그인한 사용자의 정보를 받아와야 함 */}
          {/* onSave에 handleSave 함수를 전달함 */}
          {/* 새 글 저장 후 실행됨 */}
          {props.showButton && (
            <Button onClick={() => setIsCreatingPost(true)}>글쓰기</Button>
          )}
          <Pagination>
            {pageNumbers.map(number => (
              <PageNumber
                key={number}
                active={number === currentPage}
                onClick={() => setCurrentPage(number)}
              >
                {number}
              </PageNumber>
            ))}
          </Pagination>
        </>
      )}
    </PostBox>
  );
}

const PostBox = styled.div`
  width: 100%;
  margin-right: 20px;
`;

const Button = styled.button`
  width: 102px;
  height: 40px;
  background-color: ${theme.colors.blue};
  border: none;
  border-radius: 10px;
  color: ${theme.colors.white};
  &:hover {
    cursor: pointer;
  }
`;

const PostsContainer = styled.div``;

const NoticeBoardHeader = styled.h2`
  color: ${theme.colors.white};
  font-family: 'GmarketSansMedium';
  font-weight: 500;
  font-size: ${theme.fontSizes.title};
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
`;

const PageNumber = styled.span`
  padding: 0.2rem;
  margin: 0 0.5rem;
  border-radius: 50%;
  background-color: ${({ active }) => (active ? 'skyblue' : 'white')};
  font-size: 1.2rem;

  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;
