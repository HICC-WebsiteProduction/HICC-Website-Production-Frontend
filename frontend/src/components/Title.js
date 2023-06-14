import React from 'react';
import styled from 'styled-components';
import theme from '../styles/Theme';

export default function Title(props) {
  return (
    <TitleContainer>
      <TitleName>{props.titleName}</TitleName>
    </TitleContainer>
  );
}

const TitleContainer = styled.div`
  ${theme.flexbox.flex};
  justify-content: flex-start;
  align-items: center;
  height: 300px;
`;

const TitleName = styled.h1`
  margin: 0 auto;
  color: ${theme.colors.white};
  font-family: 'GmarketSansMedium', sans-serif;
  line-height: 120%;
  font-size: ${theme.fontSizes.title};
`;
