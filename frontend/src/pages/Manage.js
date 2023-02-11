import React from 'react';
import styled from 'styled-components';

import HeaderAndTitle from '../components/HeaderAndTitle';

const pixelToRem = size => `${size / 16}rem`;

function Manage(props) {
  return (
    <ManageContainer>
      <HeaderAndTitle titleName="관리" />
    </ManageContainer>
  );
}

export default Manage;

const ManageContainer = styled.div`
  width: 100%;
  height: 100vh;
`;
