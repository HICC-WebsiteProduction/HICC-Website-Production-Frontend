import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import theme from '../../styles/Theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import EachSearchResult from '../eachItem/EachSearchResult';
import useInput from './../../hook/useInput';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useRecoilState, useSetRecoilState } from 'recoil';
import curEnrollRestaurant from '../../atom/curEnrollRestaurant';
import useScrollGradient from '../../hook/useScrollGradient';
import useCloseModal from '../../hook/useCloseModal';
import placeId from '../../atom/placeId';

function EnrollRestaurant(props) {
  const { kakao } = window;
  const [map, setMap] = useState();
  const [places, setPlaces] = useState([]);
  const [keyword, setKeyword] = useInput('');
  const [current, setCurrent] = useRecoilState(curEnrollRestaurant);
  const setSelectPlaceId = useSetRecoilState(placeId);

  const modalRef = useRef(null);
  useCloseModal(modalRef, props.close);

  const scrollRef = useRef(null);
  const { showGradient, showGradientTop } = useScrollGradient(scrollRef);

  const searchPlaces = () => {
    if (keyword.trim() === '') return;
    const places = new kakao.maps.services.Places();

    places.keywordSearch(keyword, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        setPlaces(result);
      }
    });
  };

  const calculateCenter = map => {
    if (places.length <= 0) return;

    const bounds = new kakao.maps.LatLngBounds();

    places.map(place => {
      const { x, y } = place;
      const point = new kakao.maps.LatLng(y, x);
      bounds.extend(point);
      return true;
    });

    map.setBounds(bounds);
  };

  const markerClick = (place, marker) => {
    map.panTo(marker.getPosition());
    setCurrent(place);
  };

  const selectPlace = () => {
    setSelectPlaceId(current.id);
    props.close();
    props.writeMode(true);
  };

  useEffect(() => {
    if (map === undefined) return;
    calculateCenter(map);
  }, [map, places]);

  useEffect(() => {
    if (map === undefined) return;

    const latLng = new kakao.maps.LatLng(current.y, current.x);
    map.panTo(latLng);
  }, [current]);

  return (
    <Container ref={modalRef}>
      <SearchSection>
        <Header>
          <Title>장소 검색</Title>
          <SearchWindow>
            <Input type="text" value={keyword} onChange={setKeyword} />
            <Button onClick={searchPlaces}>
              <Icon icon={faMagnifyingGlass} />
            </Button>
          </SearchWindow>
        </Header>
        <SearchList
          ref={scrollRef}
          showGradient={showGradient}
          showGradientTop={showGradientTop}
        >
          {places.length > 0 &&
            places.map(place => (
              <EachSearchResult
                key={place.id}
                place={place}
                current={place === current}
              />
            ))}
        </SearchList>
        <EnrollButton onClick={selectPlace}>장소 선택</EnrollButton>
      </SearchSection>
      <MapSection>
        <Map
          center={{
            lat: 37.552635722509,
            lng: 126.92436042413,
          }}
          style={{
            width: '100%',
            height: '100%',
            borderTopRightRadius: '20px',
            borderBottomRightRadius: '20px',
          }}
          draggable={true}
          zoomable={true}
          onCreate={map => {
            setMap(map);
          }}
        >
          {places.length > 0 &&
            places.map((place, idx) => (
              <MapMarker
                key={`marker${idx}`}
                onClick={marker => markerClick(place, marker)}
                position={{
                  lat: Number(place.y),
                  lng: Number(place.x),
                }}
                image={{
                  src:
                    current === place
                      ? '/images/select.png'
                      : '/images/non-select.png',

                  size: {
                    width: 30,
                    height: 30,
                  },
                }}
              />
            ))}
        </Map>
      </MapSection>
    </Container>
  );
}

export default EnrollRestaurant;

const Container = styled.div`
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;

  width: 1000px;
  height: 600px;
`;

const SearchSection = styled.section`
  width: 350px;
  height: 600px;
`;

const Header = styled.header`
  padding: 30px;
  background-color: ${theme.colors.blue};
  border-top-left-radius: 20px;
`;

const Title = styled.h1`
  margin-bottom: 20px;
  color: ${theme.colors.white};

  font-family: 'GmarketSansMedium';
  font-size: ${theme.fontSizes.title};
  font-weight: 500;
  line-height: 100%;
`;

const SearchWindow = styled.div`
  display: flex;
  justify-content: space-between;
  height: 40px;
  padding: 5px 5px 5px 20px;

  border-radius: 20px;
  background-color: ${theme.colors.white};
`;

const Input = styled.input`
  width: 80%;

  background-color: ${theme.colors.white};
  outline: none;
  border: none;
  color: ${theme.colors.darkblack};

  font-family: 'Pretendard';
  font-size: ${theme.fontSizes.font_normal};
  font-weight: 600;
  line-height: 150%;

  &:focus {
    border: none;
  }
`;

const Button = styled.div`
  width: 30px;
  height: 30px;
  background-color: ${theme.colors.blue};
  border-radius: 20px;
  text-align: center;

  &:hover {
    cursor: pointer;
  }
`;

const Icon = styled(FontAwesomeIcon)`
  color: ${theme.colors.white};
  font-size: 13px;
  font-weight: 900;
`;

const SearchList = styled.div`
  width: 350px;
  height: 400px;
  margin-right: 30px;
  background-color: ${theme.colors.white};

  overflow-y: scroll;

  &::after {
    content: '';
    position: absolute;
    bottom: 40px;
    left: 0;
    width: 90%;
    height: ${props => (props.showGradient ? '30px' : '0')};
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.49) 100%
    );
    transition: height 0.3s ease;
  }

  &::before {
    content: '';
    position: absolute;
    top: 160px;
    left: 0;
    z-index: 100;
    width: 350px;
    height: ${props => (props.showGradientTop ? '30px' : '0')};
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.49) 0%,
      rgba(0, 0, 0, 0) 100%
    );
    transition: height 0.3s ease;
  }
`;

const EnrollButton = styled.button`
  width: 350px;
  height: 40px;

  background-color: ${theme.colors.blue};
  border: none;
  border-bottom-left-radius: 20px;
  color: #fff;
  text-align: center;
  font-family: 'Pretendard';
  font-size: ${theme.fontSizes.paragraph};
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  &:hover {
    cursor: pointer;
  }
`;

const MapSection = styled.section`
  width: 650px;
  height: 600px;
  background-color: white;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
`;
