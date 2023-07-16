import React from 'react';
import styled from 'styled-components';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import theme from '../styles/Theme';

export default function Caution() {
  return (
    <CautionContainer>
      <CautionHeader>
        <CautionIcon>
          <FontAwesomeIcon icon={faCircleExclamation} />
        </CautionIcon>
        <CautionTitle>대여 시 주의사항</CautionTitle>
      </CautionHeader>
      <CautionContent>
        {`1. 대여 후 꼭 반납해주세요.
            2. 대여 / 반납 처리를 꼭 해주세요
            3. 등등
            4. 아래 공간이 많이 남을 것 같으니 주의 사항 또는 이용 방법? 적어두는 것도 괜찮을 것 같아요`}
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

const CautionIcon = styled.div`
  margin-right: 20px;
  color: ${theme.colors.white};
`;

const CautionTitle = styled.span`
  color: ${theme.colors.white};
`;

const CautionContent = styled.div`
  padding: 32px;
  border: 1px solid ${theme.colors.white};
  border-radius: 20px;

  color: ${theme.colors.white};
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 300;
  font-size: ${theme.fontSizes.paragraph};
  line-height: 150%;
  white-space: pre-line;
`;
