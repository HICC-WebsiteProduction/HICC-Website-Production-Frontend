import React from 'react';
import Header from './Header';
import Title from './Title';

export default function HeaderAndTitle(props) {
  return (
    <div>
      <Header />
      <Title titleName={props.titleName} />
    </div>
  );
}
