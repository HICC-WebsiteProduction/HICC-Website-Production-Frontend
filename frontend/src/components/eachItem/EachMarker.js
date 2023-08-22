import { useState } from 'react';
import { MapMarker, useMap, CustomOverlayMap } from 'react-kakao-maps-sdk';
import styled from 'styled-components';
import theme from '../../styles/Theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useSetRecoilState } from 'recoil';
import placeId from '../../atom/placeId';

function EachMarker({ position, restaurant }) {
  const map = useMap();
  const [isVisible, setIsVisible] = useState(false);
  const setCurrentRestaurant = useSetRecoilState(placeId);

  const markerClick = (placeid, marker) => {
    map.panTo(marker.getPosition());
    setCurrentRestaurant(placeid);
  };

  return (
    <>
      <MapMarker
        position={position}
        onClick={marker => markerClick(restaurant.placeid, marker)}
        onMouseOver={() => setIsVisible(true)}
        onMouseOut={() => setIsVisible(false)}
      />
      {isVisible && (
        <CustomOverlayMap position={position} yAnchor={1.8}>
          <InfoWindow>
            <PlaceName>{restaurant.name}</PlaceName>
            <Rating>
              <StarIcon icon={faStar} />
              {restaurant.star.toFixed(1)}
            </Rating>
          </InfoWindow>
        </CustomOverlayMap>
      )}
    </>
  );
}

export default EachMarker;

const InfoWindow = styled.div`
  position: relative;
  width: 300px;
  padding: 15px 12px;

  border-radius: 20px;
  background: ${theme.colors.blue};
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 47%;
    border-top: 10px solid ${theme.colors.blue};
    border-right: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-left: 10px solid transparent;
  }
`;

const PlaceName = styled.div`
  color: ${theme.colors.white};
  font-family: 'Pretendard';
  font-size: ${theme.fontSizes.label};
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
`;

const Rating = styled.div`
  color: ${theme.colors.black};
  font-family: 'Pretendard';
  font-size: ${theme.fontSizes.paragraph};
  font-style: normal;
  font-weight: 600;
`;

const StarIcon = styled(FontAwesomeIcon)`
  margin-right: 3px;
  color: ${theme.colors.black};
  font-size: ${theme.fontSizes.paragraph};
`;
