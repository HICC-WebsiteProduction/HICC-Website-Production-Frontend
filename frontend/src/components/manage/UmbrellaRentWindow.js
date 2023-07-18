import React, { useEffect } from 'react';
import styled from 'styled-components';
import theme from '../../styles/Theme';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { umbrella, umbrellaModal } from '../../atom/umbrella';
import { umbrellaStatus } from '../../dummy/umbrellaStatus';
import EachUmbrellaManage from '../eachItem/EachUmbrellaManage';
import Button from '../util/Button';

function UmbrellaRentWindow(props) {
  const [init, setInit] = useRecoilState(umbrella);
  const [umbrellaList, setUmbrellaList] = useRecoilState(umbrellaModal); // 사물함 리스트
  const resetUmbrella = useResetRecoilState(umbrella);

  useEffect(() => {
    setInit(umbrellaStatus);
    setUmbrellaList(init);

    return () => {
      resetUmbrella();
    };
  }, []);

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
                umbrella={umbrella}
              />
            ))}
        </UmbrellaGrid>
      </UmbrellaCurrentState>
      <SaveButtonContainer>
        <SaveButton buttonName="저장" />
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
