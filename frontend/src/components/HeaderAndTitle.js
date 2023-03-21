import React from 'react';
import Header from './Header';
import Title from './Title';
import { faUser } from '@fortawesome/free-regular-svg-icons';

// 여기에 아이콘 추가해주시면 됩니다.
const icon = {
  user: faUser,
};

export default function HeaderAndTitle(props) {
  return (
    <div>
      <Header />
      <Title titleName={props.titleName} icon={icon[props.type]} />
    </div>
  );
}
