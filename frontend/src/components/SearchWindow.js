import React from 'react';
import styled from 'styled-components';
import theme from '../styles/Theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const pixelToRem = size => `${size / 16}rem`;

export default function SearchWindow() {
  return (
    <SearchContainer>
      <MagnifyingGlass>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </MagnifyingGlass>
      <Input type="text" placeholder="검색어를 입력하세요." />
    </SearchContainer>
  );
}

const SearchContainer = styled.div`
  ${theme.flexbox.flex};
  justify-content: flex-start;
  width: ${pixelToRem(318)};
  height: ${pixelToRem(34)};
  border: ${pixelToRem(1)} solid #000000;
  border-radius: ${pixelToRem(50)};
`;

const MagnifyingGlass = styled.div`
  width: ${pixelToRem(16)};
  height: ${pixelToRem(16)};
  margin: ${pixelToRem(9)} ${pixelToRem(16)};
`;

const Input = styled.input`
  width: ${pixelToRem(222)};
  height: ${pixelToRem(10)};
  margin: ${pixelToRem(12)} 0;
  border: none;
  font-size: ${theme.fontSizes.font_micro};
  &:focus {
    outline: none;
  }
`;
