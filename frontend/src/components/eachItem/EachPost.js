import styled from 'styled-components';
import theme from '../../styles/Theme';

// 게시글 목록 한 줄을 표시해주는 기능을 한다.
function EachPost(props) {
  const { post, index, filteredPosts, indexOfFirstPost, handlePostClick } =
    props;
  return (
    <PostList key={post.id}>
      <No>{filteredPosts.length - indexOfFirstPost - index}</No>
      <PostTitle>{post.title}</PostTitle>
      <Writer>{post.writer}</Writer>
      <WriteDate>{post.date}</WriteDate>
    </PostList>
  );
}

const PostList = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  margin-bottom: 15px;

  color: ${theme.colors.white};
  text-align: center;

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    cursor: pointer;
  }
`;

const No = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  ${theme.fontstyle.body4};
`;
const PostTitle = styled.div`
  display: flex;
  align-items: center;
  width: 770px;
  ${theme.fontstyle.body4};
`;

const Writer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  ${theme.fontstyle.body6};
`;

const WriteDate = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  ${theme.fontstyle.body6};
`;

export default EachPost;
