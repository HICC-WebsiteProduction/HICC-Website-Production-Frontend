import React from 'react';
import styled from 'styled-components';
import theme from '../styles/Theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

const pixelToRem = size => `${size / 16}rem`;

export default function Warning() {
  return (
    <WarningContainer>
      <TriangleExclamation>
        <FontAwesomeIcon icon={faTriangleExclamation} />
      </TriangleExclamation>
      <Desc>회원가입정보 기입 시 주의사항</Desc>
      <Desc>
        ID와 비밀번호는 홍익대학교 로그인 시 기재하는 ID와 비밀번호와 같습니다.
      </Desc>
      <Desc>정확하게 입력해주시기 바랍니다.</Desc>
      <Desc>*는 필수입력정보입니다.</Desc>
    </WarningContainer>
  );
}

const WarningContainer = styled.div`
  ${theme.flexbox.flexCenterColumn};
  margin: ${theme.margin.margin_component} 0;
`;

const TriangleExclamation = styled.div`
  width: ${pixelToRem(36)};
  height: ${pixelToRem(36)};
  margin-bottom: ${pixelToRem(6)};
  color: ${theme.colors.red};
  font-size: ${pixelToRem(36)};
`;

const Desc = styled.div`
  margin: ${pixelToRem(2)} 0;
  font-family: NanumBarunGothic, sans-serif;
  font-size: ${theme.fontSizes.paragraph};
`;
