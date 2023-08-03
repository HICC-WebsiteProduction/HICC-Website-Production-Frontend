import styled, { keyframes } from 'styled-components';
import logo from '../../images/mainBanner.svg';
import useScrollClipPath from '../hooks/useScrollClipPath';

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
      <BannerTxt {...animatedItem}>
        Hong Ik <br /> Computer Club
      </BannerTxt>
    </BannerFrame>
  );
}

export default Banner;

const BannerFrame = styled.div`
  height: 100%;
  margin: 0 auto;
  background-image: url('${logo}');
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  grid-area: logo;
  object-fit: contain;
  animation: ${boxAnimation} 0.2s linear alternate;
`;

const BannerTxt = styled.div`
  position: relative;
  width: 100%;
  top: 55%;
  left: 20%;
  font-size: xxx-large;
  font-weight: bold;
  color: #edf0f8;
`;
