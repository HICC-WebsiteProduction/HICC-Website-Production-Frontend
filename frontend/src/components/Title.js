import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import theme from '../styles/Theme';

const pixelToRem = size => `${size / 16}rem`;

export default function Title(props) {
  return (
    <TitleContainer>
      <Icon>
        <FontAwesomeIcon icon={faUser} size="2x" />
      </Icon>
      <TitleName>{props.titleName}</TitleName>
    </TitleContainer>
  );
}

const TitleContainer = styled.div`
  ${theme.flexbox.flex};
  justify-content: flex-start;
  align-items: center;
  height: ${pixelToRem(88)};
  margin: 0 ${pixelToRem(20)};
  padding-left: ${pixelToRem(71)};
  border-bottom: ${pixelToRem(2)} dashed ${theme.colors.light_grey};
`;

const Icon = styled.div`
  margin-right: ${pixelToRem(14)};
`;

const TitleName = styled.h1`
  font-family: NanumBarunGothic, sans-serif;
  font-size: ${theme.fontSizes.title};
`;
