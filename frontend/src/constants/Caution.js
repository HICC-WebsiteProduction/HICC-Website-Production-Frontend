import React from 'react';
import styled from 'styled-components';
import theme from '../styles/Theme';
import { Locker, Umbrella } from './CautionMessage';

// 우산, 사물함 대여 주의사항을 반환
// 아이템을 props로 받아 아이템에 맞는 주의사항을 반환
export default function Caution({ item }) {
  const match = {
    locker: Locker,
    umbrella: Umbrella,
  };
  return (
    <CautionContainer>
      <CautionHeader>
        <CautionTitle>대여 시 주의사항</CautionTitle>
      </CautionHeader>
      <CautionContent>
        {match[item].map((message, idx) => (
          <CautionLine key={`${item}-${idx}`}>{message}</CautionLine>
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

  ${theme.fontstyle.head2};
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
  ${theme.fontstyle.body6};
  white-space: pre-line;
`;
