import React, { useEffect } from 'react';
import styled from 'styled-components';
import theme from '../../styles/Theme';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { umbrella } from '../../atom/umbrella';
import EachUmbrellaManage from '../eachItem/EachUmbrellaManage';
import Button from '../util/Button';
import useConfirm from '../../hook/useConfirm';
import useFetch from '../../hook/useFetch';

// 우산 관리 페이지를 담당
function UmbrellaRentWindow(props) {
  const [umbrellaList, setUmbrellaList] = useRecoilState(umbrella); // 우산 리스트
  const resetUmbrella = useResetRecoilState(umbrella); // 우산 상태 초기화

  const { data, loading, error } = useFetch('/umbrella');

  useEffect(() => {
    if (data) {
      setUmbrellaList(data);
    }

    return () => {
      resetUmbrella();
    };
  }, [data]);

  // 우산 상태를 저장하는 기능
  // 아직 백엔드 통신 코드는 작성하지 않음
  const confirmGrant = () => {
    console.log('반영 성공');

    // 정상적인 결과는 resolve로 1을 전달해준다.
    return new Promise(resolve => resolve(1));
  };

  // 저장 확인 창에서 취소를 눌렀을 때 초기화 후 서버 값 재로딩
  const confirmDismiss = () => {
    resetUmbrella();
    window.location.reload();
  };

  // 저장 버튼을 누르면 실행되는 확인 창
  const saveState = useConfirm(
    '저장하시겠습니까?',
    confirmGrant,
    '저장 성공',
    confirmDismiss,
  );

  return (
    <UmbrellaRentWindowContainer>
      <UmbrellaRentTitle>
        우산 목록
        <Indicator />
      </UmbrellaRentTitle>
      <UmbrellaCurrentState>
        <UmbrellaGrid>
          {umbrellaList.length > 0 &&
            umbrellaList.map(umbrella => (
              <EachUmbrellaManage
                key={umbrella.umbrellaNumber}
                eachUmbrella={umbrella}
              />
            ))}
        </UmbrellaGrid>
      </UmbrellaCurrentState>
      <SaveButtonContainer>
        <SaveButton buttonName="저장" onClick={saveState} />
      </SaveButtonContainer>
    </UmbrellaRentWindowContainer>
  );
}

export default UmbrellaRentWindow;

const UmbrellaRentWindowContainer = styled.div``;

const UmbrellaRentTitle = styled.span`
  position: relative;
  padding-bottom: 10px;
  border-bottom: 3px solid ${theme.colors.green};
  color: ${theme.colors.white};
  font-family: 'Pretendard';
  font-weight: 600;
  font-size: ${theme.fontSizes.label};
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

const UmbrellaCurrentState = styled.div`
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

const UmbrellaGrid = styled.div`
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  grid-template-columns: repeat(3, 1fr);
  grid-row-gap: 40px;
  grid-column-gap: 25px;
  width: 100%;
  height: 100%;
`;
