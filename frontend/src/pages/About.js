import React, { useState } from 'react';
import styled from 'styled-components';
import HeaderAndTitle from '../components/HeaderAndTitle';
import img1 from '../images/img1.jpg';
import img2 from '../images/img2.jpg';
import img3 from '../images/img3.jpg';
import img4 from '../images/img4.jpg';

const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const length = images.length;

  const nextSlide = () => {
    setCurrentIndex(currentIndex === length - 1 ? 0 : currentIndex + 1);
  };

  const prevSlide = () => {
    setCurrentIndex(currentIndex === 0 ? length - 1 : currentIndex - 1);
  };

  const Image = props => {
    return (
      <div>
        <img src={props.src} alt="e" />
        <Exp>{props.expText}</Exp>
        <Dots>
          <Dot onClick={console.log('hello')}></Dot>
          <Dot></Dot>
          <Dot></Dot>
          <Dot></Dot>
        </Dots>
      </div>
    );
  };

  return (
    <AboutContainer>
      <HeaderAndTitle titleName="동아리 소개" />
      <SlideshowContainer>
        {images.map((image, index) => (
          <div key={index}>
            {index === currentIndex && (
              <Image
                src={image.src}
                alt={image.alt}
                expText={image.expText}
                className="image"
              />
            )}
          </div>
        ))}
        <Prev onClick={prevSlide}>&#10094;</Prev>
        <Next onClick={nextSlide}>&#10095;</Next>
      </SlideshowContainer>
    </AboutContainer>
  );
};

const images = [
  {
    src: img1,
    alt: 'Example Image 1',
    expText:
      '대충 첫 번째 사진에 대한 설명\n주저리 주저리 주저리\n어쩌고 저쩌고 어쩌고 저쩌고',
  },
  {
    src: img2,
    alt: 'Example Image 2',
    expText:
      '대충 두 번째 사진에 대한 설명\n주저리 주저리 주저리\n어쩌고 저쩌고 어쩌고 저쩌고',
  },
  {
    src: img3,
    alt: 'Example Image 3',
    expText:
      '대충 세 번째 사진에 대한 설명\n주저리 주저리 주저리\n어쩌고 저쩌고 어쩌고 저쩌고',
  },
  {
    src: img4,
    alt: 'Example Image 4',
    expText:
      '대충 네 번째 사진에 대한 설명\n주저리 주저리 주저리\n어쩌고 저쩌고 어쩌고 저쩌고',
  },
];

const About = () => {
  return (
    <div className="App">
      <ImageSlider images={images} />
    </div>
  );
};

export default About;

const AboutContainer = styled.div`
  width: 100%;
  height: 100vh;
`;

const SlideshowContainer = styled.div`
  top: 50px;
  max-width: 1000px;
  position: relative;
  margin: auto;
`;

const Exp = styled.div`
  color: #000000;
  font-size: 18px;
  padding: 8px 12px;
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30%;
  text-align: left;
  line-height: 26px;
  background: #d0d0d0;
  white-space: pre-wrap;
`;

const Prev = styled.a`
  cursor: pointer;
  position: absolute;
  top: 50%;
  width: auto;
  margin-top: -22px;
  margin-left: -41px;
  padding: 16px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  transition: 0.6s ease;
  border-radius: 5px 0 0 5px;
  user-select: none;
  background-color: #bbbbbb;
  &:hover {
    background-color: #717171;
  }
`;

const Next = styled.a`
  cursor: pointer;
  position: absolute;
  top: 50%;
  width: auto;
  margin-top: -22px;
  margin-right: -41px;
  padding: 16px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  transition: 0.6s ease;
  border-radius: 0 3px 3px 0;
  user-select: none;
  right: 0;
  border-radius: 0 5px 5px 0;
  background-color: #bbbbbb;
  &:hover {
    background-color: #717171;
  }
`;

const Dots = styled.div`
  text-align: center;
`;

const Dot = styled.a`
  cursor: pointer;
  height: 15px;
  width: 15px;
  margin: 0 2px;
  background-color: #bbbbbb;
  border-radius: 50%;
  display: inline-block;
  transition: background-color 0.6s ease;
  &:hover {
    background-color: #717171;
  }
`;
