import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import theme from '../../styles/Theme';
import dummy from '../../dummy/posts.json';
import { useParams } from 'react-router';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';

const pixelToRem = size => `${size / 16}rem`;

// 새 글 작성 컴포넌트
export default function NewPost(props) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isChange, setIsChange] = useState(null);
  const { id } = useParams();

  // 제목 입력 핸들러
  const handleTitleChange = e => {
    setTitle(e.target.value);
  };

  // 내용 입력 핸들러
  const handleContentChange = e => {
    setContent(e.target.value);
  };

  useEffect(() => {
    setTitle(props.title);
    setContent(props.content);
    setIsChange(props.title);
  }, []);

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
    if (!isChange) {
      const newPost = {
        id: dummy.posts[dummy.posts.length - 1].id + 1,
        board: props.board,
        title,
        content,
        writer: props.writer,
        date: new Date().toLocaleDateString(),
      };
      // 로컬 json 파일에 데이터 추가하기
      dummy.posts.push(newPost);
      // 결과 확인하기
      console.log(dummy);
      console.log(dummy.posts);
      alert('글이 성공적으로 저장되었습니다.');
      props.onSave(newPost); // 부모 컴포넌트의 onSave 함수 호출
    }
    if (isChange) {
      props.finishChange();
    }
  };
  return (
    <NewPostContainer>
      <NewPostTitle>새 글 작성</NewPostTitle>
      <InputBox>
        <InputLabel>제목</InputLabel>
        <Input value={title} maxLength="50" onChange={handleTitleChange} />
      </InputBox>
      <EditorContainer>
        <CKEditor
          editor={ClassicEditor}
          config={{
            placeholder: '내용을 입력하세요.',
          }}
          data="Hello from CKEditor&nbsp;8!"
          onReady={editor => {
            console.log('Editor is ready to use!', editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            const pureText = data.replace(/<[^>]*>/g, ''); // HTML 태그 제거
            console.log({ event, editor, data });
            setContent(data);
          }}
        />
      </EditorContainer>
      <Button onClick={handleSaveClick}>저장</Button>
    </NewPostContainer>
  );
}
// 새 글 작성 컨테이너
const NewPostContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: ${pixelToRem(20)};
  border: 1px solid ${theme.colors.gray};
`;
// 새 글 작성 제목
const NewPostTitle = styled.h2`
  text-align: center;
`;
// 입력 박스
const InputBox = styled.div`
  margin-bottom: ${pixelToRem(10)};
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
  height: ${pixelToRem(200)};
`;
// 버튼
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
  &:active {
    opacity: 0.3;
  }
`;
const EditorContainer = styled.div`
  .ck-editor__editable {
    min-height: 400px; 
    max-height: 600px; 
    margin-bottom
  }
`;
