import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import theme from '../styles/Theme';
import NewPost from '../components/NewPost';
import dummy from '../dummy/posts.json';
import NoticeBoardTable from './table/NoticeBoardTable';
import CurrentPost from './noticeboard/CurrentPost';
import Paging from './paging/Paging';
import Filter from './Filter';
import Button from './Button';

const optionValue = {
  period: {
    whole: '전체기간',
    oneMonth: '1개월',
    HalfYear: '6개월',
  },
  index: {
    writer: '작성자',
    title: '제목',
    postId: '글번호',
  },
};

export default function Post(props) {
  const [posts, setPosts] = useState(() => {
    const initialPosts = dummy.posts || [];
    return initialPosts;
  });

  const [currentPost, setCurrentPost] = useState(null);
  const [filteredPosts, setFilteredPosts] = useState(posts); // 현재 필터의 게시글 전체
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
  const [postsPerPage, setPostsPerPage] = useState(10); // 페이지당 게시글 수
  const [filteredPostsCount, setFilteredPostsCount] = useState(0); // 현재 필터의 게시글 수

  const [searchByPeriod, setSearchByPeriod] = useState(
    optionValue.period.whole,
  ); // 기간으로 검색
  const [searchByIndex, setSearchByIndex] = useState(optionValue.index.writer); // 인덱스로 검색
  const [searchByKeyword, setSearchByKeyword] = useState(''); // 키워드로 검색

  useEffect(() => {
    const posts = dummy.posts || [];
    setPosts(posts);
  }, []);

  useEffect(() => {
    const boardPosts = dummy.posts.filter(
      post => post[props.postFilter] === props.filterCondition,
    );
    setFilteredPosts(boardPosts.reverse());
    setFilteredPostsCount(boardPosts.length);
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

  const setPage = error => {
    setCurrentPage(error);
  };

  const onChangeSearchByPeriod = event => {
    setSearchByPeriod(event.target.value);
  };

  const onChangeSearchByIndex = event => {
    setSearchByIndex(event.target.value);
  };

  const onChangeSearchByKeyword = event => {
    setSearchByKeyword(event.target.value);
  };

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
            <WriteButton onClick={() => setIsCreatingPost(true)}>
              글쓰기
            </WriteButton>
          )}
          {/* <Pagination>
            {pageNumbers.map(number => (
              <PageNumber
                key={number}
                active={number === currentPage}
                onClick={() => setCurrentPage(number)}
              >
                {number}
              </PageNumber>
            ))}
          </Pagination> */}
          <Paging
            page={currentPage}
            count={filteredPostsCount}
            setPage={setPage}
          />
          <FilterContainer>
            <Filter
              optionValue={optionValue.period}
              onChange={onChangeSearchByPeriod}
            />
            <Gap />
            <Filter
              optionValue={optionValue.index}
              onChange={onChangeSearchByIndex}
            />
            <Gap />
            <KeywordSearch
              placeholder="검색어를 입력하세요"
              onChange={onChangeSearchByKeyword}
            />
            <SearchButton buttonName="검색" />
          </FilterContainer>
        </>
      )}
    </PostBox>
  );
}

const PostBox = styled.div`
  width: 100%;
`;

const WriteButton = styled.button`
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

const FilterContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: ${theme.componentSize.maxWidth};
  margin: 50px auto;
`;

const Gap = styled.div`
  width: 20px;
  height: 20px;
`;

const KeywordSearch = styled.input`
  width: 250px;
  height: 45px;
  padding: 6.5px 10px;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid ${theme.colors.white};
  outline: none;

  color: ${theme.colors.white};
  font-family: 'Pretendard';
  font-weight: 300;
  font-size: ${theme.fontSizes.paragraph};
  line-height: 150%;

  &::placeholder {
    color: ${theme.colors.white};
  }
`;

const SearchButton = styled(Button)`
  width: 80px;
  height: 45px;
  margin-left: 20px;

  border-radius: 40px;
  color: ${theme.colors.white};
  font-family: 'Pretendard';
  font-weight: 500;
  font-size: ${theme.fontSizes.paragraph};
  line-height: 150%;
`;
