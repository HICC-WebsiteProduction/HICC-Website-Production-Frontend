import React from 'react';
import styled from 'styled-components';

import HeaderAndTitle from '../components/HeaderAndTitle';
import theme from '../styles/Theme';

const pixelToRem = size => `${size / 16}rem`;

// 외부적으로 해야 할 일
// Title > TitleContainer > Icon > FontAwesomeIcon 변경 가능하도록 파라미터화

function Manage(props) {
  const pageRef = React.createRef();
  const headerRef = React.createRef();
  const selectTab = data => {
    const pages = pageRef.current.children;
    const headers = headerRef.current.children;
    const len = pages.length;

    const hiddenTag = 'hidden-page';
    for (let i = 0; i < len; i++) {
      if (data.target === headers[i]) {
        // matching page index === i
        for (let j = 0; j < len; j++) {
          if (i === j && pages[j].classList.contains(hiddenTag)) {
            pages[j].classList.remove(hiddenTag);
          } else if (
            i !== j &&
            pages[j].classList.contains(hiddenTag) === false
          ) {
            pages[j].classList.add(hiddenTag);
          }
        }
      }
    }

    console.log('end of function');
  };
  return (
    <ManageContainer>
      <HeaderAndTitle titleName="관리" />
      <ManageTabHeaderContainer ref={headerRef}>
        <ManageTabHeaderItem onClick={selectTab}>회원 승인</ManageTabHeaderItem>
        <ManageTabHeaderItem onClick={selectTab}>회원 정보</ManageTabHeaderItem>
        <ManageTabHeaderItem onClick={selectTab}>우산 대여</ManageTabHeaderItem>
        <ManageTabHeaderItem onClick={selectTab}>
          사물함 대여
        </ManageTabHeaderItem>
      </ManageTabHeaderContainer>
      <ManageTabPageContainer ref={pageRef}>
        <ManageTabPageItem>회원 승인 컴포넌트</ManageTabPageItem>
        <ManageTabPageItem className="hidden-page">
          회원 정보 컴포넌트
        </ManageTabPageItem>
        <ManageTabPageItem className="hidden-page">
          우산 대여 컴포넌트
        </ManageTabPageItem>
        <ManageTabPageItem className="hidden-page">
          사물함 대여 컴포넌트
        </ManageTabPageItem>
      </ManageTabPageContainer>
    </ManageContainer>
  );
}

export default Manage;

const ManageContainer = styled.div`
  width: 100%;
  height: 100vh;
`;

const ManageTabHeaderContainer = styled.ul`
  height: 40px;
  list-style: none;
  display: block;
  float: none;
  clear: both;
  margin: 0 ${pixelToRem(40)};
  padding-left: ${pixelToRem(71)};
  border-bottom: 2px solid ${theme.colors.light_grey};
`;

const ManageTabHeaderItem = styled.div`
  width: 100px;
  height: 40px;
  float: left;
  text-align: center;
  text-decoration: none;
  border: 1px solid white;
`;

const ManageTabPageContainer = styled.div`
  display: block;
  margin: 0 ${pixelToRem(40)};
  padding-left: ${pixelToRem(71)};
  border-bottom: 2px solid ${theme.colors.light_grey};

  .hidden-page {
    display: none;
  }
`;

const ManageTabPageItem = styled.div`
  background-color: transparent;
`;
