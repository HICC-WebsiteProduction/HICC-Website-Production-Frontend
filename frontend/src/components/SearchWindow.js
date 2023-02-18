import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import theme from '../styles/Theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const pixelToRem = size => `${size / 16}rem`;

export default function SearchWindow() {
  // 연관검색어를 보여주기 위해 임의로 넣은 더미데이터를 불러오는 코드입니다.
  // https://velog.io/@gbwlxhd97/%EA%B2%80%EC%83%89%EC%B0%BD-%EC%9E%90%EB%8F%99%EC%99%84%EC%84%B1-%EB%A7%8C%EB%93%A4%EA%B8%B0-featreact
  const [search, setSearch] = useState();
  const [keyItems, setKeyItems] = useState([]);
  const onChangeData = e => {
    setSearch(e.currentTarget.value);
  };
  const fetchData = () => {
    return fetch(
      `https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json`,
    )
      .then(res => res.json())
      .then(data => data.slice(0, 100));
  };
  const updateData = async () => {
    const res = await fetchData();
    let searchValue = res
      .filter(ICity => ICity.city.includes(search) === true)
      .slice(0, 10);
    setKeyItems(searchValue);
  };
  useEffect(() => {
    const debounce = setTimeout(() => {
      if (search) updateData();
    }, 200);
    return () => {
      clearTimeout(debounce);
    };
  }, [search, updateData]);
  return (
    <SearchWrapper>
      <SearchContainer>
        <MagnifyingGlass>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </MagnifyingGlass>
        <Input
          type="text"
          placeholder="검색어를 입력하세요."
          value={search}
          onChange={onChangeData}
        />
      </SearchContainer>
      <RelatedSearchTerms>
        {keyItems.length > 0 && search && (
          <AutoSearchContainer>
            <AutoSearchWrap>
              {keyItems.map((search, idx) => (
                <AutoSearchData
                  key={search.city}
                  onClick={() => {
                    setKeyItems(search.city);
                  }}
                >
                  <AutoSearchDataLink href="#">
                    {search.city}
                  </AutoSearchDataLink>
                </AutoSearchData>
              ))}
            </AutoSearchWrap>
          </AutoSearchContainer>
        )}
      </RelatedSearchTerms>
    </SearchWrapper>
  );
}

const SearchWrapper = styled.div`
  display: inline-block;
  position: relative;
`;

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

const RelatedSearchTerms = styled.div`
  width: ${pixelToRem(222)};
  background-color: ${theme.colors.white};
`;

const AutoSearchContainer = styled.div`
  position: absolute;
  top: ${pixelToRem(45)};
  z-index: 3;
  width: ${pixelToRem(318)};
  padding: ${pixelToRem(15)};
  border: 1px solid ${theme.colors.black};
  border-radius: 5px;
  background-color: ${theme.colors.white};
`;
const AutoSearchWrap = styled.ul``;
const AutoSearchData = styled.li`
  position: relative;
  z-index: 4;
  width: 100%;
  padding: 10px 8px;
  font-family: NanumBarunGothicBold, sans-serif;
  font-size: 14px;
  letter-spacing: 2px;
  &:hover {
    background-color: #edf5f5;
    cursor: pointer;
  }
`;

const AutoSearchDataLink = styled.a`
  color: ${theme.colors.blue};
  text-decoration-line: none;
`;
