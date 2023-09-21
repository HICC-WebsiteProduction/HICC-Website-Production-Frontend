import React from 'react';
import styled from 'styled-components';
import theme from '../../styles/Theme';

// 헤더 아래 제목을 보여줄 때 사용
export default function Title(props) {
  return (
    <TitleContainer>
      <TitleName>{props.titleName}</TitleName>
    </TitleContainer>
  );
}

const TitleContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 300px;
`;

const TitleName = styled.h1`
  margin: 0 auto;
  color: ${theme.colors.white};
  ${theme.fontstyle.head4};
`;
