import Post from '../Post';
import MyInfo from '../mypage/MyInfo';

export const TabContentByIndexMypage = {
  '내 정보': <MyInfo />,
  '내 작성글': (
    <Post postFilter="writer" filterCondition="최세호" isMypage={true} />
  ),
  '내 작성댓글': <div>내 댓글 목록</div>,
};
