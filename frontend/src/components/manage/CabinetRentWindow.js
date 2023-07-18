import React, { useEffect } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { cabinet, cabinetModal } from '../../atom/cabinet';
import { cabinetStatus } from '../../dummy/cabinetStatus';
import styled from 'styled-components';
import theme from '../../styles/Theme';
import Button from '../util/Button';
import EachCabinetManage from '../eachItem/EachCabinetManage';

function CabinetRentWindow(props) {
  const [init, setInit] = useRecoilState(cabinet);
  const [cabinetList, setCabinetList] = useRecoilState(cabinetModal); // 사물함 리스트

  const resetCabinet = useResetRecoilState(cabinet);

  useEffect(() => {
    setInit(cabinetStatus);
    setCabinetList(init);

    return () => {
      resetCabinet();
    };
  }, []);

  return (
    <CabinetRentWindowContainer>
      <CabinetRentTitle>
        사물함 목록
        <Indicator />
      </CabinetRentTitle>
      <CabinetCurrentState>
        <CabinetGrid>
          {cabinetList.length > 0 &&
            cabinetList.map(cabinet => (
              <EachCabinetManage
                key={cabinet.cabinetNumber}
                cabinet={cabinet}
              />
            ))}
        </CabinetGrid>
      </CabinetCurrentState>
      <SaveButtonContainer>
        <SaveButton buttonName="저장" />
      </SaveButtonContainer>
    </CabinetRentWindowContainer>
  );
}

export default CabinetRentWindow;

const CabinetRentWindowContainer = styled.div``;

const CabinetRentTitle = styled.span`
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

const CabinetCurrentState = styled.div`
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

const CabinetGrid = styled.div`
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  grid-template-columns: repeat(4, 1fr);
  grid-row-gap: 40px;
  grid-column-gap: 25px;
  width: 100%;
  height: 100%;
`;
