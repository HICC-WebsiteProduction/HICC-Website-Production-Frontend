import React from 'react';
import styled from 'styled-components';
import theme from '../../styles/Theme';
import { useSetRecoilState } from 'recoil';
import curEnrollRestaurant from '../../atom/curEnrollRestaurant';

function EachSearchResult(props) {
  const mapiconSrc = `/images/${!props.current ? 'non-' : ''}select.png`;

  const setCurrent = useSetRecoilState(curEnrollRestaurant);

  return (
    <ListItem current={props.current} onClick={() => setCurrent(props.place)}>
      <MapIcon src={mapiconSrc} alt="mapicon" />
      <PlaceInfo>
        <PlaceName>{props.place.place_name}</PlaceName>
        <Address>{props.place.address_name}</Address>
      </PlaceInfo>
    </ListItem>
  );
}

export default EachSearchResult;

const ListItem = styled.div`
  display: flex;
  width: 330px;
  padding: 10px;
  background-color: ${props =>
    props.current ? theme.colors.lightgray : theme.colors.white};
  border-bottom: 1px solid ${theme.colors.lightgray};
  &:hover {
    cursor: pointer;
    background-color: #d9d9d9;
  }
`;

const MapIcon = styled.img`
  object-fit: contain;
  margin-right: 10px;
`;

const PlaceInfo = styled.div``;

const PlaceName = styled.div`
  margin-bottom: 8px;

  color: ${theme.colors.pureBlack};
  font-family: 'Pretendard';
  font-size: ${theme.fontSizes.paragraph};
  font-weight: 600;
`;

const Address = styled.div`
  color: ${theme.colors.pureBlack};
  font-family: 'Pretendard';
  font-size: ${theme.fontSizes.font_normal};
  font-weight: 600;
`;
