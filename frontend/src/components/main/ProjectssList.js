import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Slide({ sliders }) {
  return (
    <Container>
      {/*<SlideTitle>프로젝트 둘러보기</SlideTitle>*/}
      <StyledSlider {...settings}>
        {sliders.map(({ name, image }) => {
          return (
            <CardBox>
              <CardImg alt="인기 서비스" src={image} />
              {/*<CardText>{name}</CardText>*/}
            </CardBox>
          );
        })}
      </StyledSlider>
    </Container>
  );
}

export default Slide;

// 슬라이드 설정
const settings = {
  dots: true, // 슬라이드 밑에 점 보이게
  infinite: true, // 무한으로 반복
  speed: 500,
  autoplay: true,
  autoplaySpeed: 2000, // 넘어가는 속도
  slidesToShow: 1, // 4장씩 보이게
  slidesToScroll: 1, // 1장씩 뒤로 넘어가게
  centerMode: true,
  centerPadding: '400px', // 0px 하면 슬라이드 끝쪽 이미지가 안잘림
};

// const SlideTitle = styled.h2`
//   //padding: 60px 0px 50px 0px;
//   //text-align: center;
//   //font-size: 30px;
//   //font-weight: bolder;
//   position: absolute;
//   width: 325px;
//   height: 48px;
//   top: 200px;
//   margin-left: 0;
//   font-family: GmarketSansMedium;
//   font-size: 40px;
//   font-weight: 500;
//   line-height: 48px;
//   letter-spacing: 0em;
//   text-align: left;
//   color: #edf0f8;
// `;

const Container = styled.div`
  width: 1200px;
`;

// 슬라이드 CSS
const StyledSlider = styled(Slider)`
  .slick-list {
    width: 1200px;
    margin: 0 auto;
  }

  .slick-slide div {
    /* cursor: pointer; */
    justify-content: center;
  }

  .slick-dots {
    bottom: -50px;
    margin-top: 200px;
  }

  .slick-prev {
    left: 400px;
    z-index: 10;
  }

  .slick-next {
    right: 400px;
    z-index: 10;
  }

  .slick-track {
    overflow-x: hidden;
  }
`;

const CardBox = styled.div`
  cursor: pointer;
`;

const CardImg = styled.img`
  width: 350px;
  height: 230px;
  margin: auto;
`;

// const CardText = styled.p`
//   padding: 20px;
//   font-size: 20px;
//   font-weight: bolder;
//   text-align: center;
// `;
