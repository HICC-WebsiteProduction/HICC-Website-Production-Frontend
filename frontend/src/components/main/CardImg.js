import React, { useState } from 'react';
import styled from 'styled-components';

export default function CardBoxes(props) {
  const [hover, setHover] = useState(false);

  const OverButton = e => {
    setHover(true);
  };

  const LeaveButton = e => {
    setHover(false);
  };

  return (
    <CardBox onMouseOver={OverButton} onMouseLeave={LeaveButton}>
      <CardImg
        alt="프로젝트"
        src={props.src}
        style={{
          opacity: hover ? 0.2 : 1,
          transition: `opacity .5s ease-in-out`,
        }}
      />
      {hover && (
        <CardText>
          <CardTextTitle>{props.name}</CardTextTitle>
          <CardTextContent>{props.desc}</CardTextContent>
        </CardText>
      )}
    </CardBox>
  );
}

const CardBox = styled.div`
  cursor: pointer;
  height: 230px;
  align-items: center;
  display: flex;
`;

const CardImg = styled.img`
  width: 350px;
  height: 230px;
  margin: auto;
  display: inline-block;
`;

const CardText = styled.div`
  position: absolute;
  width: 300px;
  max-height: 230px;
  margin: 0 auto;
  font-size: 20px;
  font-weight: bolder;
  white-space: pre-line;
  text-align: center;
  align-items: center;
  color: #edf0f8;
`;

const CardTextTitle = styled.div`
  font-size: 25px;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
`;

const CardTextContent = styled.div`
  font-size: 20px;
  margin-top: 10px;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
`;
