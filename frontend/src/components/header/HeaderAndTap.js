import React from 'react';
import Header from './Header';
import HeaderTap from './HeaderTap';

export default function HeaderAndTap(props) {
  return (
    <>
      <Header />
      <HeaderTap
        ancestorMenuTree={props.ancestorMenuTree}
        currentTabContents={props.currentTabContents}
        handleBoardChange={props.handleBoardChange}
      />
    </>
  );
}
