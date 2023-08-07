import styled from 'styled-components';
import img from '../../images/JoinHICC.png';

function JoinHICC() {
  return (
    <Frame>
      <ContentContainer>
        <Title>Join HICC</Title>
      </ContentContainer>
      <Image>
        <Button>가입신청</Button>
        <Text>HICC는 상시 가입이 가능합니다.</Text>
      </Image>
    </Frame>
  );
}

export default JoinHICC;

const Frame = styled.div`
  position: relative;
  width: 100%;
  height: 621px;
  align-items: center;
`;

const ContentContainer = styled.div`
  width: 1200px;
  height: 621px;
  margin: 0 auto;
`;

const Title = styled.div`
  position: absolute;
  width: 230px;
  height: 48px;
  top: 50px;
  font-family: GmarketSansMedium;
  font-size: 40px;
  font-weight: 500;
  line-height: 48px;
  text-align: left;
  color: #edf0f8;
`;

const Image = styled.div`
  position: absolute;
  width: 100%;
  height: 300px;
  top: 150px;
  background-image: url('${img}');
  background-position: center center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  place-items: center;
`;

const Button = styled.button`
  position: absolute;
  width: 276px;
  height: 96px;
  border-radius: 20px;
  border: none;
  background: #4ea1d3;
  color: #edf0f8;
  font-family: GmarketSansMedium;
  font-size: 36px;
  font-weight: 500;
  line-height: 54px;
  text-align: center;
`;

const Text = styled.div`
  position: absolute;
  width: 310px;
  height: 36px;
  top: 211px;
  font-family: Pretendard;
  font-size: 24px;
  font-weight: 600;
  line-height: 36px;
  text-align: left;
  color: #edf0f8;
`;
