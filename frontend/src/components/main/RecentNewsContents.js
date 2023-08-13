import styled from 'styled-components';
import etc from '../../images/etc.png';

export default function RecentNewsContents() {
  return (
    <ContentContainer>
      <Image src={etc}></Image>
      <SubTitleContainer>
        <SubTitle>최근 소식 제목</SubTitle>
        <SubDate>2023.05.07</SubDate>
      </SubTitleContainer>
      <SubContent>
        대통령이 궐위된 때 또는 대통령 당선자가 사망하거나 판결 기타의 사유로 그
        자격을 상실한 때에는 60일 이내에 후임자를 선거한다. 헌법재판소에서
        위헌결정, 탄핵의 결정, 정당해산의 결정 또는 헌법소원에 관한 인용결정을
        할 때에는 재판관 6인 이상의 찬성이 있어야 한다. 대법원장과 대법관이
        법관의 임기는 10년으로 하며, 법률이 정하는...{' '}
      </SubContent>
    </ContentContainer>
  );
}

const ContentContainer = styled.div`
  position: relative;
  width: 786px;
  height: 200px;
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
  width: 236px;
  height: 36px;
  top: 17px;
  left: 316px;
  gap: 8px;
`;

const SubTitle = styled.div`
  position: absolute;
  width: 136px;
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
  position: absolute;
  width: 95px;
  height: 32px;
  right: 0;
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
  height: 124px;
  top: 61px;
  left: 316px;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 300;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: left;
  color: #edf0f8;
`;
