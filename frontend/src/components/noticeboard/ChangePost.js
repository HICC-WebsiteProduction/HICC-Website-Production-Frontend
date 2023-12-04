import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import theme from '../../styles/Theme';
import { useNavigate, useLocation } from 'react-router-dom';

// 새 글 작성 컴포넌트
export default function ChangePost(props) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const { state } = useLocation(); // state 객체 사용
  const { id, post } = state || {}; // 전달된 상태 해체 할당

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
    }
  }, [post]);

  // 제목 입력 핸들러
  const handleTitleChange = e => {
    setTitle(e.target.value);
  };

  // 내용 입력 핸들러
  const handleContentChange = e => {
    setContent(e.target.value);
  };

  // 저장 버튼 클릭 핸들러
  //로컬 json파일 사용시 핸들러
  const handleSaveClick = () => {
    // 입력값 검증
    if (!title || !content) {
      alert('제목과 내용을 모두 입력해주세요.');
      console.log(title);
      console.log(content);

      return;
    }
    alert('글이 성공적으로 저장되었습니다.');
    navigate(-1);
  };
  return (
    <NewPostContainer>
      <NewPostTitle>게시글 수정</NewPostTitle>
      <InputBox>
        <InputLabel>제목</InputLabel>
        <Input value={title} maxLength="50" onChange={handleTitleChange} />
      </InputBox>
      <InputBox>
        <InputLabel>내용</InputLabel>
        <TextArea
          value={content}
          maxLength="1000"
          onChange={handleContentChange}
        />
      </InputBox>
      <Button onClick={handleSaveClick}>저장</Button>
    </NewPostContainer>
  );
}
// 새 글 작성 컨테이너
const NewPostContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid ${theme.colors.gray};
`;
// 새 글 작성 제목
const NewPostTitle = styled.h2`
  text-align: center;
`;
// 입력 박스
const InputBox = styled.div`
  margin-bottom: 10px;
`;
// 입력 라벨
const InputLabel = styled.label`
  display: block;
`;
// 입력창
const Input = styled.input`
  width: 100%;
`;
// 텍스트 영역
const TextArea = styled.textarea`
  width: 100%;
  height: 200px;
`;
// 버튼
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
