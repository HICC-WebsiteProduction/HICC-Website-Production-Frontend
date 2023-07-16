import styled from 'styled-components';
import theme from '../../styles/Theme';
import { useRecoilState } from 'recoil';
import { noticeTab } from '../../atom/noticeTab';

function NoticeTab() {
  const [currentIndex, setCurrentIndex] = useRecoilState(noticeTab);
  return (
    <Tabs>
      <Tab accent={currentIndex === 0} onClick={() => setCurrentIndex(0)}>
        전체
      </Tab>
      <Tab accent={currentIndex === 1} onClick={() => setCurrentIndex(1)}>
        게시판
      </Tab>
      <Tab accent={currentIndex === 2} onClick={() => setCurrentIndex(2)}>
        일정
      </Tab>
      <Tab accent={currentIndex === 3} onClick={() => setCurrentIndex(3)}>
        대여
      </Tab>
    </Tabs>
  );
}

export default NoticeTab;

const Tabs = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${theme.colors.white};
  font-family: 'Pretendard';
  font-size: ${theme.fontSizes.label};
  font-weight: 600;
  line-height: 150%;
`;

const Tab = styled.div`
  margin-left: 8px;
  opacity: ${props => (props.accent ? 1 : 0.5)};
  &:hover {
    cursor: pointer;
  }
`;
