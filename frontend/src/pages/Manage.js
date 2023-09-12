import React from 'react';
import styled from 'styled-components';
import { ManageMenu } from '../constants/ManageMenu';
import theme from '../styles/Theme';
import ManageTab from '../components/header/ManageTab';
import { useRecoilValue } from 'recoil';
import { manageTab } from '../atom/tab/manage';

// 관리페이지
function Manage(props) {
  const menu = useRecoilValue(manageTab);

  return (
    <ManageContainer>
      <ManageTab />
      {ManageMenu[menu]}
    </ManageContainer>
  );
}

export default Manage;

const ManageContainer = styled.div`
  width: ${theme.componentSize.maxWidth};
  height: 100%;
  margin: 0 auto;
`;
