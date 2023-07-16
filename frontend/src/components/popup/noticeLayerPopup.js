import React from 'react';
import styled from 'styled-components';
import theme from '../../styles/Theme';

function NoticeLayerPopup() {
  return (
    <NoticeLayerPopupContainer>
      <Triangle />
    </NoticeLayerPopupContainer>
  );
}

export default NoticeLayerPopup;

const NoticeLayerPopupContainer = styled.div`
  display: flex;
  position: absolute;
  top: 50px;
  left: -290px;
  z-index: 100;
  flex-direction: column;
  align-items: center;
  width: 347px;
  height: 300px;
  padding: 20px 25px;
  border: 2px solid ${theme.colors.blue};
  border-radius: 20px;
  background-color: ${theme.colors.black};
`;

const Triangle = styled.div`
  display: inline-block;
  position: absolute;
  top: -10px;
  left: 87%;
  transform: translateX(-50%);
  width: 15px;
  height: 15px;
  &::before {
    content: ' ';
    display: block;
    width: 15px;
    height: 2px;
    background: ${theme.colors.blue};
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    -webkit-transform: rotate(40deg);
    -moz-transform: rotate(40deg);
    -ms-transform: rotate(40deg);
    transform: rotate(40deg);
    position: absolute;
    top: 3px;
    right: -5px;
  }
  &::after {
    content: ' ';
    display: block;
    width: 15px;
    height: 2px;
    background: ${theme.colors.blue};
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    -webkit-transform: rotate(-40deg);
    -moz-transform: rotate(-40deg);
    -ms-transform: rotate(-40deg);
    transform: rotate(-40deg);
    position: absolute;
    top: 3px;
    left: -5px;
  }
`;
