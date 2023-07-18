import styled from 'styled-components';
import theme from '../../styles/Theme';
import EachPost from '../eachItem/EachPost';
import { Link } from 'react-router-dom';

/*
  10개 씩 컨텐츠를 전달해줘야합니다.
*/
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
  padding-bottom: 10px;
  border-bottom: 2px solid ${theme.colors.white};

  color: ${theme.colors.white};
  font-family: 'Pretendard';
  font-size: ${theme.fontSizes.paragraph};
  line-height: 150%;

  text-align: center;
`;

const No = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  line-height: 150%;
  font-weight: 500;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 770px;
  line-height: 150%;
  font-weight: 500;
`;

const Writer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  line-height: 150%;
  font-weight: 300;
`;

const WriteDate = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  line-height: 150%;
  font-weight: 300;
`;

const NoticeBoardTableBody = styled.div`
  padding: 20px 0;
  border-bottom: 2px solid ${theme.colors.white};
`;
