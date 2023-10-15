import styled from 'styled-components';
import etc from '../../images/etc.png';
import { useNavigate } from 'react-router-dom';

export default function RecentNewsContents(props) {
  const navigate = useNavigate();
  return (
    <ContentContainer
      onClick={() => {
        navigate(props.data.url);
      }}
    >
      <Image src={etc}></Image>
      <SubTitleContainer>
        <SubTitle>{props.data.title}</SubTitle>
        <SubDate>{props.data.date}</SubDate>
      </SubTitleContainer>
      <SubContent>{props.data.content}</SubContent>
    </ContentContainer>
  );
}

const ContentContainer = styled.div`
  position: relative;
  width: 786px;
  height: 200px;
  cursor: pointer;
`;

const Image = styled.img`
  position: absolute;
  width: 280px;
  height: 170px;
  top: 15px;
  left: 15px;
  border-radius: 20px;
`;

const SubTitleContainer = styled.div`
  position: absolute;
  width: auto;
  height: 36px;
  top: 17px;
  left: 316px;
  gap: 8px;
  display: flex;
`;

const SubTitle = styled.div`
  position: relative;
  width: max-content;
  height: 36px;
  left: 0;
  font-family: Pretendard;
  font-size: 24px;
  font-weight: 600;
  line-height: 36px;
  letter-spacing: 0em;
  text-align: left;
  color: #edf0f8;
`;

const SubDate = styled.div`
  position: relative;
  width: 95px;
  height: 32px;
  right: 0;
  left: 10px;
  bottom: 0;
  margin-top: 2px;
  margin-bottom: 2px;
  padding-top: 9px;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 300;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: left;
  color: #edf0f8;
`;

const SubContent = styled.div`
  position: absolute;
  width: 457px;
  //height: 120px;
  top: 61px;
  left: 316px;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 300;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: left;
  color: #edf0f8;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
`;
