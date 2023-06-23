import React, { useState } from 'react';
import styled from 'styled-components';
import theme from '../styles/Theme';
import HeaderAndManageTap from '../components/header/HeaderAndManageTap';
import { TabContentByIndex } from '../components/header/TabContentByIndex';

const pixelToRem = size => `${size / 16}rem`;

function Manage(props) {
  const [tabContentIndex, setTabContentIndex] = useState(0);

  const changeTabContent = index => {
    setTabContentIndex(index);
  };

  const currentTabContents = [
    { name: '회원 승인', accent: tabContentIndex === 0 },
    { name: '회원 정보', accent: tabContentIndex === 1 },
    { name: '우산 대여', accent: tabContentIndex === 2 },
    { name: '사물함 대여', accent: tabContentIndex === 3 },
  ];

  return (
    <ManageContainer className="hidden-page">
      <HeaderAndManageTap
        currentTabContents={currentTabContents}
        changeTabContent={changeTabContent}
      />
      {TabContentByIndex[tabContentIndex]}
    </ManageContainer>
  );
}

export default Manage;

const ManageContainer = styled.div`
  width: 100%;
  height: 100vh;
`;
