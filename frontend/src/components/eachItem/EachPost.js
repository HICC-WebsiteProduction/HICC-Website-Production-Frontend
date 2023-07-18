import styled from 'styled-components';
import theme from '../../styles/Theme';

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
  line-height: 150%;
  font-weight: 500;
`;
const PostTitle = styled.div`
  display: flex;
  align-items: center;
  width: 770px;
  line-height: 150%;
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

export default EachPost;
