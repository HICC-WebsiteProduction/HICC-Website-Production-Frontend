import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import theme from '../styles/Theme';
import Post from '../components/Post';
import Tabs from '../components/Tab';

const pixelToRem = size => `${size / 16}rem`;

function Mypage() {
  const MyComments = () => {
    return <div>내 작성 댓글 목록</div>;
  };

  const tabs = [
    {
      title: '내 작성 글',
      content: <Post postFilter="writer" filterCondition="최세호" />,
    },
    // 댓글 목록 구현 예정
    { title: '내 작성 댓글', content: <MyComments /> },
  ];
  return (
    <MypageContainer>
      <Header />
      <UserInfo>
        <Link href="/myinfo">
          <Logo />
        </Link>
        <Infobox>
          <Nickname>
            <Link href="/myinfo">최세호</Link>님
          </Nickname>
          <Level> 등급</Level>
        </Infobox>
      </UserInfo>
      <Tabs tabs={tabs} />
    </MypageContainer>
  );
}

export default Mypage;

const MypageContainer = styled.div`
  width: 100%;
  height: 100vh;
`;

const UserInfo = styled.div`
  ${theme.flexbox.flex};
  justify-content: flex-start;
  align-items: center;
  height: ${pixelToRem(88)};
  margin: 0 ${pixelToRem(20)};
  padding-left: ${pixelToRem(71)};
  border-bottom: ${pixelToRem(2)} dashed ${theme.colors.light_grey};
`;
const Logo = styled.div`
  width: ${pixelToRem(100)};
  height: ${pixelToRem(80)};
  background-image: url('${'https://ssl.pstatic.net/static/common/myarea/myInfo.gif'}');
  background-size: contain;
  background-repeat: no-repeat;
  margin-right: ${pixelToRem(14)};
  border-radius: 70%;
`;
const Infobox = styled.div`
  ${theme.flexbox.flex};
  justify-content: space-around;
  justify-content: center;
  flex-direction: column;
`;

const Nickname = styled.div`
  ${theme.flexbox.flex};
  justify-content: flex-end;
`;

const Level = styled.div`
  ${theme.flexbox.flex};
  justify-content: flex-start;
  align-content: flex-start;
`;

const Link = styled.a`
  *
`;
