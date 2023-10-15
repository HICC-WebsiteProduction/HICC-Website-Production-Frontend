import React, { useEffect } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import styled from 'styled-components';
import theme from '../../styles/Theme';
import Button from '../util/Button';
import useConfirm from '../../hook/useConfirm';
import useFetch from '../../hook/useFetch';
import ConfirmMessage from '../../constants/ConfirmMessage';
import { locker } from '../../atom/locker';
import EachLockerManage from '../eachItem/EachLockerManage';

// 사물함 관리 페이지를 담당
function LockerRentWindow(props) {
  const [lockerList, setLockerList] = useRecoilState(locker); // 사물함 리스트 (모달 창 포함)
  const resetLocker = useResetRecoilState(locker); // 사물함 상태 초기화

  const { data, loading, error } = useFetch(`/rental?itemType=locker`);

  // setInit에 서버의 상태 저장, 모달 창에 대한 상태는 다른 곳에 저장
  useEffect(() => {
    if (data) {
      setLockerList(data);
    }

    return () => {
      resetLocker();
    };
  }, [data, resetLocker, setLockerList]);

  const confirmGrant = async () => {
    console.log('반영 성공');

    // 정상적인 결과는 resolve로 1을 전달해준다.
    return new Promise(resolve => resolve(1));
  };

  // 저장 확인 창에서 취소를 누르면 서버의 상태로 되돌어가야하기때문
  // 리코일 저장소를 리셋하고, 페이지를 리로드한다.
  // 그렇게 되면 서버에서 다시 fetch하게되어 서버의 상태로 되돌아갈 수 있다.
  const confirmDismiss = () => {
    resetLocker();
    window.location.reload();
  };

  // 저장 버튼을 누르면 실행되는 확인 창
  const saveState = useConfirm(
    ConfirmMessage.saveState,
    confirmGrant,
    '저장 성공',
    confirmDismiss,
  );

  return (
    <LockerRentWindowContainer>
      <LockerRentTitle>
        사물함 목록
        <Indicator />
      </LockerRentTitle>
      <LockerCurrentState>
        <LockerGrid>
          {lockerList !== undefined &&
            lockerList.length > 0 &&
            lockerList.map(locker => (
              <EachLockerManage key={locker.id} eachLocker={locker} />
            ))}
        </LockerGrid>
      </LockerCurrentState>
      <SaveButtonContainer>
        <SaveButton buttonName="저장" onClick={saveState} />
      </SaveButtonContainer>
    </LockerRentWindowContainer>
  );
}

export default LockerRentWindow;

const LockerRentWindowContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const LockerRentTitle = styled.span`
  position: relative;
  padding-bottom: 10px;
  border-bottom: 3px solid ${theme.colors.green};
  color: ${theme.colors.white};
  ${theme.fontstyle.head9};
`;

const Indicator = styled.div`
  position: absolute;
  top: 40px;
  left: 42%;
  width: 0;
  height: 0;
  border-bottom: 10px solid transparent;
  border-top: 10px solid ${theme.colors.green};
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
`;

const LockerCurrentState = styled.div`
  width: ${theme.componentSize.maxWidth};
  margin: 64px auto;
`;

const SaveButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: ${theme.componentSize.maxWidth};
  height: 150px;
`;

const SaveButton = styled(Button)`
  width: 160px;
  height: 60px;
  margin: 26px auto;

  border-radius: 10px;
  background-color: ${theme.colors.green};
`;

const LockerGrid = styled.div`
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  grid-template-columns: repeat(4, 1fr);
  grid-row-gap: 40px;
  grid-column-gap: 25px;
  width: 100%;
  height: 100%;
`;
