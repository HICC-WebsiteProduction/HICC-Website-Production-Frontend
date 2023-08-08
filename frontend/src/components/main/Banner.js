import styled, { keyframes } from 'styled-components';
import logo from '../../images/mainBanner.svg';
import useScrollClipPath from '../../hook/useScrollClipPath';

const boxAnimation = keyframes`
  0%{
    opacity: 0.8;
    transform: scale(0.9);
  }
  100%{
    opacity: 1;
    transform: scale(1);
  }
`;

function Banner() {
  const animatedItem = useScrollClipPath('left', 1.5, 0);
  return (
    <BannerFrame>
      <BannerTextContainer>
        <BannerTxt {...animatedItem}>
          Hong Ik <br /> Computer Club
        </BannerTxt>
      </BannerTextContainer>
    </BannerFrame>
  );
}

export default Banner;

const BannerFrame = styled.div`
  position: relative;
  width: 100%;
  height: 880px;
  margin: 0 auto;
  place-content: center;
  z-index: -1;
  background-image: url('${logo}');
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  grid-area: logo;
  object-fit: contain;
  animation: ${boxAnimation} 0.2s linear alternate;
  display: flex;
  justify-content: center;
`;

const BannerTextContainer = styled.div`
  margin: 0 auto;
  position: relative;
  width: 1200px;
  height: 880px;
  display: flex;
  justify-content: center;
  place-items: center;
  //place-content: center;
`;

const BannerTxt = styled.div`
  position: absolute;
  width: 100%;
  top: 55%;
  font-size: xxx-large;
  font-weight: bold;
  color: #edf0f8;
`;
