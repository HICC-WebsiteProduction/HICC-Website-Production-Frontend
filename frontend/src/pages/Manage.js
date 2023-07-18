import React, { useState } from 'react';
import styled from 'styled-components';
import { ManageMenu } from '../constants/ManageMenu';
import theme from '../styles/Theme';
import Header from '../components/header/Header';
import ManageTab from '../components/header/ManageTab';

function Manage(props) {
  const [memu, setMemu] = useState(0);

  const changeTabContent = index => {
    setMemu(index);
  };

  const currentTabContents = [
    { name: '회원 승인', accent: memu === 0 },
    { name: '회원 정보', accent: memu === 1 },
    { name: '우산 대여', accent: memu === 2 },
    { name: '사물함 대여', accent: memu === 3 },
  ];

  return (
    <ManageContainer>
      <Header />
      <ManageTab
        currentTabContents={currentTabContents}
        changeTabContent={changeTabContent}
      />
      {ManageMenu[memu]}
    </ManageContainer>
  );
}

export default Manage;

const ManageContainer = styled.div`
  width: ${theme.componentSize.maxWidth};
  height: 100vh;
  margin: 0 auto;
`;
