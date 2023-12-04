import styled from 'styled-components';
import logo from '../../images/fotter_instagram.svg';
import useFetch from '../../hook/useFetch';

export default function Footer() {
  const { data, loading, error } = useFetch(`/president`);
  if (loading === false) {
    return (
      <Frame>
        <Content>
          <TextTop>
            홍익대학교 중앙 컴퓨터 동아리 HICC / Hongik Computer Club <br />
            <br />
            동아리방 G429
          </TextTop>
          <TextBottom1>
            회장 {data.name} {data.phoneNumber}
          </TextBottom1>
          <TextBottom2>Copyrightⓒ2023.HICC. All rights reserved.</TextBottom2>
          <Logo />
        </Content>
      </Frame>
    );
  }
}

const Frame = styled.div`
  width: 100%;
  height: 400px;
  background: #edf0f8;
  display: flex;
  justify-content: center;
`;

const Content = styled.div`
  position: absolute;
  width: 100%;
  height: 400px;
`;

const TextTop = styled.div`
  position: absolute;
  width: 623px;
  height: 72px;
  top: 50px;
  color: #00000080;
`;

const TextBottom1 = styled.div`
  position: absolute;
  width: max-content;
  height: 36px;
  top: 278px;
  font-family: Pretendard;
  font-size: 24px;
  font-weight: 300;
  line-height: 36px;
  text-align: left;
  color: #00000080;
`;

const TextBottom2 = styled.div`
  position: absolute;
  width: 453px;
  height: 36px;
  top: 314px;
  font-family: Pretendard;
  font-size: 24px;
  font-weight: 300;
  line-height: 36px;
  text-align: left;
  color: #00000080;
`;

const Logo = styled.button`
  position: relative;
  width: 40px;
  height: 40px;
  top: 313px;
  opacity: 0.5;
  border: none;
  background-image: url('${logo}');
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  float: right;
`;
