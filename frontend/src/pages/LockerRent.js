import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import theme from '../styles/Theme';
import Caution from '../constants/Caution';
import useMyRent from '../hook/useMyRent';
import { useRecoilValue } from 'recoil';
import Navigation from '../components/header/Navigation';
import useFetch from '../hook/useFetch';
import { user } from '../atom/user';
import EachLocker from '../components/eachItem/EachLocker';
import { ancestorMenuTree, currentTabContents } from '../constants/RentTab';

// 사물함 대여 페이지
function LockerRent(props) {
  const userinfo = useRecoilValue(user); // 내 정보 가져오기 위해

  const { data, loading, error } = useFetch('/rental?itemType=locker');
  const checkMyRent = useMyRent(data, userinfo.name); // 내가 대여 처리

  const [lockerList, setLockerList] = useState(checkMyRent);

  useEffect(() => {
    if (data) {
      setLockerList(checkMyRent);
    }
  }, [checkMyRent, data]);

  return (
    <LockerRentContainer>
      <Navigation
        ancestorMenuTree={ancestorMenuTree}
        currentTabContents={currentTabContents}
      />
      <LockerCurrentState>
        <LockerListHeader>
          <LockerListHeaderText>사물함 목록</LockerListHeaderText>
        </LockerListHeader>
        <LockerGrid>
          {lockerList.length > 0 &&
            lockerList.map(locker => (
              <EachLocker key={locker.id} eachLocker={locker} />
            ))}
        </LockerGrid>
        <Caution item="locker" />
      </LockerCurrentState>
    </LockerRentContainer>
  );
}

export default LockerRent;

const LockerRentContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const LockerCurrentState = styled.div`
  width: ${theme.componentSize.maxWidth};
  margin: 64px auto;
`;

const LockerListHeader = styled.header`
  display: flex;
  align-items: center;
  margin-bottom: 40px;
  color: ${theme.colors.white};
  ${theme.fontstyle.head2};
`;

const LockerListHeaderText = styled.h1``;

const LockerGrid = styled.div`
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  grid-template-columns: repeat(4, 1fr);
  grid-row-gap: 40px;
  grid-column-gap: 25px;
  width: 100%;
  height: 100%;
`;

const ViewApplyModal = styled.div`
  display: ${props => (props.view ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.6);
  z-index: 101;
`;
