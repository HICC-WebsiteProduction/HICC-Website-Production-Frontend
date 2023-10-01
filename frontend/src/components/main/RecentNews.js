import styled from 'styled-components';
import RecentNewsContents from './RecentNewsContents';
import useFetch from '../../hook/useFetch';
import Loading from '../util/Loading';
import React from 'react';

export default function RecentNews() {
  const { data, loading, error } = useFetch(`/news`);
  if (loading === false) {
    return (
      <Frame>
        <Title>최근 뉴스</Title>
        {!loading ? (
          <CenterContainer>
            {data.map(data => {
              return <RecentNewsContents data={data}></RecentNewsContents>;
            })}
          </CenterContainer>
        ) : (
          <LoadingDiv>
            <Loading />
          </LoadingDiv>
        )}
      </Frame>
    );
  }
}

const Frame = styled.div`
  position: relative;
  width: 100%;
  max-width: 1200px;
  height: 1100px;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
  display: flex;
`;

const CenterContainer = styled.div`
  position: relative;
  min-width: 1200px;
  height: 1100px;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  position: absolute;
  width: 170px;
  height: 48px;
  top: 50px;
  left: 0px;
  font-family: GmarketSansMedium;
  font-size: 40px;
  font-weight: 500;
  line-height: 48px;
  letter-spacing: 0em;
  color: #edf0f8;
  text-align: left;
`;

const LoadingDiv = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto;
`;
