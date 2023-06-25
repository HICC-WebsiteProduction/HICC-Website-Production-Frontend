import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import theme from '../styles/Theme';
import NewPost from '../components/NewPost';
import dummy from '../dummy/posts.json';
import logo from '../dummy/hongik.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';

const dummyComment = `홍익대학교가 세상을 만난 것은 1946년입니다.
널리 세상을 이롭게 하는 홍익의 정신으로 미래를 선도하는 리더를 배출하는 홍익대학교.
이제 당신을 만날 차례입니다.
홍익대학교가 세상을 만난 것은 1946년입니다.
널리 세상을 이롭게 하는 홍익의 정신으로 미래를 선도하는 리더를 배출하는 홍익대학교.
이제 당신을 만날 차례입니다.`;

export default function Post(props) {
  const [posts, setPosts] = useState(() => {
    const initialPosts = dummy.posts || [];
    return initialPosts;
  });

  const [currentPost, setCurrentPost] = useState(null);
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
  const [postsPerPage, setPostsPerPage] = useState(1); // 페이지당 게시글 수

  const [commentText, setCommentText] = useState('');

  // 글자수 제한
  const limit = 50;

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

  // 댓글 입력창 핸들러
  const onChange = event => {
    setCommentText(event.target.value);
  };

  return (
    <PostBox>
      {currentPost ? (
        <>
          <PostContainer>
            <PostHeader>
              <PostTitle>{currentPost.title}</PostTitle>
              <PostWriterContainer>
                <PostWriterProfile src={logo} alt="profile" />
                <PostWriterDesc>
                  <PostWriterInfo>
                    <PostWriterNickname>
                      {currentPost.writer}
                    </PostWriterNickname>
                    <PostWriterGrade>{`운영진`}</PostWriterGrade>
                  </PostWriterInfo>
                  <PostModifyTime>{currentPost.date}</PostModifyTime>
                </PostWriterDesc>
              </PostWriterContainer>
            </PostHeader>
            <PostContent>{currentPost.content}</PostContent>
          </PostContainer>
          <Button onClick={() => setCurrentPost(null)}>목록으로</Button>

          <CommentContainer>
            <CommentHeader>
              <CommentIcon>
                <FontAwesomeIcon icon={faComment} />
              </CommentIcon>
              댓글
            </CommentHeader>
            <CommentWriteWrapper>
              <CommentWriterProfile src={logo} />
              <CommentWriteContainer>
                <CommentWriterInfo>
                  <CommentWriter>{currentPost.writer}</CommentWriter>
                  <CommentWriterGrade>{`운영진`}</CommentWriterGrade>
                </CommentWriterInfo>
                <CommentWriteInput
                  placeholder="댓글을 입력해주세요."
                  value={commentText}
                  onChange={onChange}
                  maxLength={limit}
                  spellCheck={false}
                />
                <CommentEnrollButton caution={commentText.length > limit - 10}>
                  <NumOfCommentCharacter>{`${commentText.length} / ${limit}자`}</NumOfCommentCharacter>
                  <EnrollMent>등록</EnrollMent>
                </CommentEnrollButton>
              </CommentWriteContainer>
            </CommentWriteWrapper>

            <CommentListWrapper>
              <CommentWriterProfile src={logo} />
              <CommentListContainer>
                <CommentWriterInfo>
                  <CommentWriter>{`김진호`}</CommentWriter>
                  <CommentWriterGrade>{`운영진`}</CommentWriterGrade>
                  <CommentWritenTime>{`23.05.05 AM 02:53`}</CommentWritenTime>
                </CommentWriterInfo>
                <CommentContent>{dummyComment}</CommentContent>
              </CommentListContainer>
            </CommentListWrapper>
          </CommentContainer>
        </>
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
            <PostsHeader>
              <tr>
                <th>{props.filterCondition}</th>
                <th>제목</th>
                <th>작성자</th>
                <th>날짜</th>
              </tr>
            </PostsHeader>
            <PostsList>
              {currentPosts.map((post, index) => (
                <tr key={post.id} onClick={() => handlePostClick(post.id)}>
                  <td>{filteredPosts.length - indexOfFirstPost - index}</td>
                  <td>{post.title}</td>
                  <td>{post.writer}</td>
                  <td>{post.date}</td>
                </tr>
              ))}
            </PostsList>
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

const PostContainer = styled.div`
  margin-bottom: 3rem 0;
`;

const PostHeader = styled.div`
  padding: 50px;
  border-radius: 20px 20px 0px 0px;
  border: 1px solid ${theme.colors.white};
`;

const PostTitle = styled.h1`
  margin-bottom: 1rem;

  color: ${theme.colors.white};
  font-size: 32px;
  font-family: 'GmarketSansMedium';
  font-weight: 500;
  line-height: 120%;
`;

const PostWriterContainer = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const PostWriterProfile = styled.img`
  width: 78px;
  height: 78px;
  border-radius: 50%;
`;

const PostWriterDesc = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px 30px;
  padding-right: 0;
`;

const PostWriterInfo = styled.div``;

const PostWriterNickname = styled.div`
  color: ${theme.colors.white};
  font-family: 'Pretendard';
  font-weight: 600;
  font-size: ${theme.fontSizes.label};
  line-height: 150%;
`;

const PostWriterGrade = styled.div`
  color: ${theme.colors.white};
  font-family: 'Pretendard';
  font-weight: 300;
  font-size: ${theme.fontSizes.font_normal};
  line-height: 150%;
`;

const PostModifyTime = styled.div`
  color: ${theme.colors.white};
  font-family: 'Pretendard';
  font-weight: 300;
  font-size: ${theme.fontSizes.font_normal};
  line-height: 150%;
`;

const PostContent = styled.p`
  height: 864px;
  padding: 50px;

  background-color: ${theme.colors.white};
  border-radius: 0px 0px 20px 20px;

  color: #000;
  font-family: 'Pretendard';
  font-weight: 300;
  font-size: ${theme.fontSizes.paragraph};
  line-height: 120%;
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

const CommentContainer = styled.div`
  margin: 150px 0;
`;

const CommentHeader = styled.h1`
  display: flex;
  color: ${theme.colors.white};
  font-family: 'GmarketSansMedium';
  font-weight: 500;
  font-size: ${theme.fontSizes.title};
  line-height: 100%;
`;

const CommentIcon = styled.div`
  margin-right: 20px;
`;

const CommentWriteWrapper = styled.div`
  display: flex;
  padding: 30px 50px;
  border-bottom: 1px solid ${theme.colors.white};
`;

const CommentWriterProfile = styled.img`
  width: 78px;
  height: 78px;
  margin-right: 30px;
  border-radius: 50%;
`;

const CommentWriteContainer = styled.div``;

const CommentWriterInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 15px;
`;

const CommentWriter = styled.div`
  margin-right: 10px;
  color: ${theme.colors.white};

  font-family: 'Pretendard';
  font-weight: 500;
  font-size: ${theme.fontSizes.paragraph};
  line-height: 150%;
`;

const CommentWriterGrade = styled.div`
  padding: 0 5px;
  border: 1px solid ${theme.colors.white};
  color: ${theme.colors.white};

  font-family: 'Pretendard';
  font-weight: 300;
  font-size: ${theme.fontSizes.font_normal};
  line-height: 150%;
`;

const CommentWriteInput = styled.textarea`
  width: 980px;
  height: 150px;
  margin-bottom: 12px;
  padding: 15px 30px;

  background-color: transparent;
  border: 1px solid ${theme.colors.blue};
  border-radius: 20px;
  outline: none;
  resize: none;

  color: ${theme.colors.white};
  font-family: 'Pretendard';
  font-weight: 300;
  font-size: ${theme.fontSizes.paragraph};
  line-height: 150%;

  &::placeholder {
    color: ${theme.colors.blue};
  }
`;

const CommentEnrollButton = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 980px;
  height: 38px;
  padding: 0 35px;

  background: ${props =>
    props.caution ? theme.colors.red : theme.colors.blue};
  border-radius: 20px;
  border: none;

  color: ${theme.colors.white};
  font-family: 'Pretendard';
  font-weight: 300;
  font-size: ${theme.fontSizes.paragraph};
  line-height: 150%;

  &:hover {
    cursor: pointer;
  }
`;

const NumOfCommentCharacter = styled.div``;

const EnrollMent = styled.div``;

const CommentListWrapper = styled.div`
  display: flex;
  padding: 30px 50px;
  border-bottom: 1px solid ${theme.colors.white};
`;

const CommentListContainer = styled.div``;

const CommentWritenTime = styled.div`
  margin-left: 10px;
  color: ${theme.colors.white};
  font-family: 'Pretendard';
  font-weight: 300;
  font-size: ${theme.fontSizes.paragraph};
  line-height: 150%;
`;

const CommentContent = styled.p`
  margin-top: 8px;
  color: ${theme.colors.white};
  font-family: 'Pretendard';
  font-weight: 300;
  font-size: ${theme.fontSizes.paragraph};
  line-height: 150%;
  white-space: pre-line;
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
