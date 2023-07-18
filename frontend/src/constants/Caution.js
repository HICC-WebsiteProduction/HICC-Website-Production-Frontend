import React from 'react';
import styled from 'styled-components';
import theme from '../styles/Theme';
import { Cabinet, Umbrella } from './CautionMessage';

export default function Caution({ item }) {
  const match = {
    cabinet: Cabinet,
    umbrella: Umbrella,
  };
  return (
    <CautionContainer>
      <CautionHeader>
        <CautionTitle>대여 시 주의사항</CautionTitle>
      </CautionHeader>
      <CautionContent>
        {match[item].map(message => (
          <CautionLine>{message}</CautionLine>
        ))}
      </CautionContent>
    </CautionContainer>
  );
}

const CautionContainer = styled.div`
  width: 1200px;
  height: 400px;
  margin: 160px auto;
`;

const CautionHeader = styled.header`
  display: flex;
  align-items: center;
  margin-bottom: 40px;

  font-size: ${theme.fontSizes.title};
  font-family: 'GmarketSansMedium', sans-serif;
  font-style: normal;
  font-weight: 500;
  line-height: 100%;
`;

const CautionTitle = styled.span`
  color: ${theme.colors.white};
`;

const CautionContent = styled.ul`
  padding: 32px;
  border: 1px solid ${theme.colors.white};
  border-radius: 20px;
`;

const CautionLine = styled.li`
  margin-left: 20px;
  list-style-type: circle;

  color: ${theme.colors.white};
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 300;
  font-size: ${theme.fontSizes.paragraph};
  line-height: 150%;
  white-space: pre-line;
`;
