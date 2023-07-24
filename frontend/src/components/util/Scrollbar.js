import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import './../../styles/scrollbar.css';
import styled from 'styled-components';

function CustomScrollBar({ elements }) {
  return (
    <CustomScrollBarStyle
      thumbSize={85}
      renderTrackHorizontal={props => (
        <div {...props} className="track-horizontal" />
      )}
      renderTrackVertical={({ style, ...props }) => {
        return (
          <div
            {...props}
            className="track-vertical"
            style={{ ...style, width: '20px' }}
          />
        );
      }}
      renderThumbHorizontal={props => (
        <div {...props} className="thumb-horizontal" />
      )}
      renderThumbVertical={props => (
        <div {...props} className="thumb-vertical" />
      )}
      renderView={props => <div {...props} className="view" />}
    >
      {elements}
    </CustomScrollBarStyle>
  );
}

export default CustomScrollBar;

const CustomScrollBarStyle = styled(Scrollbars)`
  position: relative !important;
  overflow: hidden;
  width: 783px !important;
  height: 50% !important;
  margin: 40px auto !important;

  background-color: #edf0f8;
  border-radius: 10px !important;
`;
