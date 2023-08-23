import React, { useEffect, useRef, useState } from 'react';
import { Map } from 'react-kakao-maps-sdk';
import styled from 'styled-components';
import theme from '../../styles/Theme';
import Button from '../util/Button';
import EachReviewCard from '../eachItem/EachReviewCard';
import useScrollGradient from '../../hook/useScrollGradient';
import useFetch from '../../hook/useFetch';
import EachMarker from '../eachItem/EachMarker';
import { useRecoilValue } from 'recoil';
import placeId from '../../atom/placeId';

// 일단은 별도의 페이지로 제작한 후 나중에 협의하에 게시판 안으로 밀어넣어보자
function Restaurant(props) {
  const [map, setMap] = useState();
  const [restaurantList, setRestaurantList] = useState([]); // id, placeid, lat, lng, star, name
  const [reviewContent, setReviewContent] = useState([]);
  const currentPlaceId = useRecoilValue(placeId);

  const scrollRef = useRef(null);
  const { showGradient, showGradientTop } = useScrollGradient(scrollRef);

  const kakao = window.kakao;

  const { data, loading, error } = useFetch('/noticeboard/restaurant');

  useEffect(() => {
    if (data) {
      setRestaurantList(data);
    }
  }, [data]);

  useEffect(() => {
    const currentRestaurant = restaurantList.filter(
      restaurant => restaurant.placeid === currentPlaceId,
    );
    setReviewContent(currentRestaurant);
  }, [currentPlaceId]);

  return (
    <RestaurantContainer>
      <MapContainer>
        <Header>맛집 지도</Header>
        <EnrollButton buttonName="맛집 등록" />
        <Map
          /* 디폴트는 학교의 위도 경도 */
          center={{
            lat: 37.552635722509,
            lng: 126.92436042413,
          }}
          style={{ width: '576px', height: '700px' }}
          onCreate={map => {
            setMap(map);
          }}
          disableDoubleClickZoom={true}
        >
          {restaurantList.length > 0 &&
            restaurantList.map(restaurant => (
              <EachMarker
                key={`EventMarkerContainer-${restaurant.lat}-${restaurant.lng}`}
                position={{ lat: restaurant.lat, lng: restaurant.lng }}
                restaurant={restaurant}
              />
            ))}
        </Map>
      </MapContainer>
      <ReviewContainer>
        <Header>맛집 리뷰</Header>
        <WriteButton buttonName="리뷰 쓰기" />
        <ReviewContent
          ref={scrollRef}
          showGradient={showGradient}
          showGradientTop={showGradientTop}
        >
          {reviewContent &&
            reviewContent.map(restaurant => (
              <EachReviewCard key={restaurant.id} eachReview={restaurant} />
            ))}
        </ReviewContent>
      </ReviewContainer>
    </RestaurantContainer>
  );
}

export default Restaurant;

const RestaurantContainer = styled.div`
  display: flex;
  width: ${theme.componentSize.maxWidth};
  margin: 64px 0;
`;

const Header = styled.h1`
  margin-bottom: 32px;
  color: ${theme.colors.white};
  font-family: 'GmarketSansMedium';
  font-size: ${theme.fontSizes.title};
  font-weight: 500;
`;

const MapContainer = styled.div`
  position: relative;
  width: 600px;
`;

const ReviewContainer = styled.div`
  position: relative;
  width: 580px;
  padding-left: 24px;
  border-left: 1px solid rgba(237, 240, 248, 0.5);
`;

const ReviewContent = styled.div`
  width: 100%;
  height: 700px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: ${props => (props.showGradient ? '50px' : '0')};
    background: linear-gradient(transparent, ${theme.colors.black});
    transition: height 0.3s ease;
  }

  &::before {
    content: '';
    position: absolute;
    top: 72px;
    left: 0;
    width: 100%;
    height: ${props => (props.showGradientTop ? '50px' : '0')};
    background: linear-gradient(${theme.colors.black}, transparent);
    transition: height 0.3s ease;
  }
`;

const WriteButton = styled(Button)`
  position: absolute;
  top: 0;
  right: 0;
  width: 140px;
  height: 40px;
`;

const EnrollButton = styled(Button)`
  position: absolute;
  top: 0;
  right: 20px;
  width: 140px;
  height: 40px;
`;
