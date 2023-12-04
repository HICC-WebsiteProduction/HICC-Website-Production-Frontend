import styled from 'styled-components';
import theme from '../../styles/Theme';
import EachPost from '../eachItem/EachPost';
import { Link } from 'react-router-dom';

/*
  10개 씩 컨텐츠를 전달해줘야합니다.
*/
//게시글 목록 컴포넌트
export default function NoticeBoardTable(props) {
  return (
    <NoticeBoardTableContainer>
      <NoticeBoardTableHeader>
        <No>No.</No>
        <Title>제목</Title>
        <Writer>작성자</Writer>
        <WriteDate>작성일</WriteDate>
      </NoticeBoardTableHeader>
      <NoticeBoardTableBody>
        {props.postList.map((post, index) => (
          <Link
            to={`/post/${post.id}`}
            onClick={() => props.handlePostClick(post.id)}
          >
            <EachPost
              post={post}
              key={`eachPost${index}`}
              index={index}
              filteredPosts={props.filteredPosts}
              indexOfFirstPost={props.indexOfFirstPost}
              handlePostClick={props.handlePostClick}
            />
          </Link>
        ))}
      </NoticeBoardTableBody>
    </NoticeBoardTableContainer>
  );
}

const NoticeBoardTableContainer = styled.div`
  width: ${theme.componentSize.maxWidth};
`;

const NoticeBoardTableHeader = styled.div`
  display: flex;
  margin-top: 40px;
  padding: 10px;
  align-items: center;
  gap: 20px;
  border-top: 2px solid #edf0f8;
  border-bottom: 1px solid #edf0f8;
  color: ${theme.colors.white};
  ${theme.fontstyle.body4};

  text-align: center;
`;

const No = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 770px;
`;

const Writer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
`;

const WriteDate = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
`;

const NoticeBoardTableBody = styled.div`
  padding: 20px 0;
  border-bottom: 1px solid ${theme.colors.white};
`;
