import React from 'react';
import Header from './Header';
import HeaderNavigation from './HeaderNavigation';

export default function HeaderAndNavigation(props) {
  return (
    <>
      <Header />
      <HeaderNavigation
        ancestorMenuTree={props.ancestorMenuTree}
        currentTabContents={props.currentTabContents}
      />
    </>
  );
}
