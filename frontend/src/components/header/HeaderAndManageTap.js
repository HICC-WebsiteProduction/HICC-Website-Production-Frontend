import React from 'react';
import Header from './Header';
import HeaderManageTap from './HeaderManageTab';

export default function HeaderAndManageTap(props) {
  return (
    <>
      <Header />
      <HeaderManageTap
        currentTabContents={props.currentTabContents}
        changeTabContent={props.changeTabContent}
      />
    </>
  );
}
