import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import theme from '../../styles/Theme';
import dummy from '../../dummy/posts.json';
import { Link, useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import NewPost from './NewPost';
import { useParams } from 'react-router';

const dummyComment = `홍익대학교가 세상을 만난 것은 1946년입니다.
널리 세상을 이롭게 하는 홍익의 정신으로 미래를 선도하는 리더를 배출하는 홍익대학교.
이제 당신을 만날 차례입니다.
홍익대학교가 세상을 만난 것은 1946년입니다.
널리 세상을 이롭게 하는 홍익의 정신으로 미래를 선도하는 리더를 배출하는 홍익대학교.
이제 당신을 만날 차례입니다.`;

export default function CurrentPost(props) {
  const [commentText, setCommentText] = useState('');
  const [isChanging, setIsChanging] = useState(false);
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const post = dummy.posts.find(post => post.id === Number(id));
    console.log(dummy);
    setPost(post);
  }, []);

  useEffect(() => {
    console.log(post);
  }, [post]);

  // 글자수 제한
  const limit = 500;

  // 댓글 입력창 핸들러
  const onChange = event => {
    setCommentText(event.target.value);
  };
  const changingPost = () => {
    setIsChanging(true);
    navigate('/newpost', { id });
  };
  const finishChange = () => {
    setIsChanging(false);
  };

  const deletePost = () => {
    const updatedPosts = dummy.posts.filter(post => post.id !== id);
    dummy.posts = updatedPosts;
    navigate(-1);
  };

  return (
    <>
      {post && (
        <>
          <PostContainer>
            <PostHeader>
              <PostTitle>{post.title}</PostTitle>
              <PostWriterContainer>
                <PostWriterProfile src={'/images/hongik.png'} alt="profile" />
                <PostWriterDesc>
                  <PostWriterInfo>
                    <PostWriterNickname>{post.writer}</PostWriterNickname>
                    <PostWriterGrade>{`운영진`}</PostWriterGrade>
                  </PostWriterInfo>
                  <PostModifyTime>{post.date}</PostModifyTime>
                </PostWriterDesc>
              </PostWriterContainer>
            </PostHeader>
            <PostContent>{post.content}</PostContent>
            <ButtonContainer>
              <Button onClick={() => props.setCurrentPost(null)}>
                목록으로
              </Button>
              <ChangeDelete>
                <Button onClick={() => changingPost()}>수정</Button>
                <Button onClick={() => deletePost(id)}>삭제</Button>
              </ChangeDelete>
            </ButtonContainer>
          </PostContainer>
          <CommentContainer>
            <Header>
              <Icon>
                <FontAwesomeIcon icon={faComment} />
              </Icon>
              댓글
            </Header>
            <WriteWrapper>
              <WriterProfile src={'/images/hongik.png'} />
              <WriteContainer>
                <WriterInfo>
                  <Writer>{post.writer}</Writer>
                  <WriterGrade>{`운영진`}</WriterGrade>
                </WriterInfo>
                <WriteInput
                  placeholder="댓글을 입력해주세요."
                  value={commentText}
                  onChange={onChange}
                  maxLength={limit}
                  spellCheck={false}
                />
                <EnrollButton caution={commentText.length > limit - 10}>
                  <NumOfCharacter>{`${commentText.length} / ${limit}자`}</NumOfCharacter>
                  <EnrollMent>등록</EnrollMent>
                </EnrollButton>
              </WriteContainer>
            </WriteWrapper>
            <ListWrapper>
              <WriterProfile src={'/images/hongik.png'} />
              <ListContainer>
                <WriterInfo>
                  <Writer>{`김진호`}</Writer>
                  <WriterGrade>{`운영진`}</WriterGrade>
                  <WritenTime>{`23.05.05 AM 02:53`}</WritenTime>
                </WriterInfo>
                <Content>{dummyComment}</Content>
              </ListContainer>
            </ListWrapper>
          </CommentContainer>
        </>
      )}
    </>
  );
}

const PostContainer = styled.div`
  width: ${theme.componentSize.maxWidth};
  margin: 3rem auto;
`;

const PostHeader = styled.div`
  padding: 50px;
  border-radius: 20px 20px 0px 0px;
  border: 1px solid ${theme.colors.white};
`;

const PostTitle = styled.h1`
  margin-bottom: 1rem;

  color: ${theme.colors.white};
  font-size: ${theme.fontSizes.subtitle};
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
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ChangeDelete = styled.div`
  flex-direction: row;
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
  width: ${theme.componentSize.maxWidth};
  margin: 150px auto;
`;

const Header = styled.h1`
  display: flex;
  color: ${theme.colors.white};
  font-family: 'GmarketSansMedium';
  font-weight: 500;
  font-size: ${theme.fontSizes.title};
  line-height: 100%;
`;

const Icon = styled.div`
  margin-right: 20px;
`;

const WriteWrapper = styled.div`
  display: flex;
  padding: 30px 50px;
  border-bottom: 1px solid ${theme.colors.white};
`;

const WriterProfile = styled.img`
  width: 78px;
  height: 78px;
  margin-right: 30px;
  border-radius: 50%;
`;

const WriteContainer = styled.div``;

const WriterInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 15px;
`;

const Writer = styled.div`
  margin-right: 10px;
  color: ${theme.colors.white};

  font-family: 'Pretendard';
  font-weight: 500;
  font-size: ${theme.fontSizes.paragraph};
  line-height: 150%;
`;

const WriterGrade = styled.div`
  padding: 0 5px;
  border: 1px solid ${theme.colors.white};
  color: ${theme.colors.white};

  font-family: 'Pretendard';
  font-weight: 300;
  font-size: ${theme.fontSizes.font_normal};
  line-height: 150%;
`;

const WriteInput = styled.textarea`
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

const EnrollButton = styled.button`
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

const NumOfCharacter = styled.div``;

const EnrollMent = styled.div``;

const ListWrapper = styled.div`
  display: flex;
  padding: 30px 50px;
  border-bottom: 1px solid ${theme.colors.white};
`;

const ListContainer = styled.div``;

const WritenTime = styled.div`
  margin-left: 10px;
  color: ${theme.colors.white};
  font-family: 'Pretendard';
  font-weight: 300;
  font-size: ${theme.fontSizes.paragraph};
  line-height: 150%;
`;

const Content = styled.p`
  margin-top: 8px;
  color: ${theme.colors.white};
  font-family: 'Pretendard';
  font-weight: 300;
  font-size: ${theme.fontSizes.paragraph};
  line-height: 150%;
  white-space: pre-line;
`;
