import React, { useEffect } from 'react';
import styled from 'styled-components';
import theme from '../../styles/Theme';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { umbrella } from '../../atom/umbrella';
import EachUmbrellaManage from '../eachItem/EachUmbrellaManage';
import Button from '../util/Button';
import { request } from '../../utils/axios';
import useConfirm from '../../hook/useConfirm';

function UmbrellaRentWindow(props) {
  const [umbrellaList, setUmbrellaList] = useRecoilState(umbrella);
  const resetUmbrella = useResetRecoilState(umbrella);

  const fetchData = async () => {
    try {
      const response = await request('get', '/umbrella');
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const loadUmbrellaStatus = async () => {
      const result = await fetchData();
      setUmbrellaList(result);
    };
    loadUmbrellaStatus();

    return () => {
      resetUmbrella();
    };
  }, []);

  const confirmGrant = () => {
    console.log('반영 성공');

    // 정상적인 결과는 resolve로 1을 전달해준다.
    return new Promise(resolve => resolve(1));
  };

  const confirmDismiss = () => {
    resetUmbrella();
    window.location.reload();
  };

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
