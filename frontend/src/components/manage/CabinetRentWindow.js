import React, { useEffect, useRef } from 'react';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { cabinet, cabinetModal, currentCabinetIndex } from '../../atom/cabinet';
import styled from 'styled-components';
import theme from '../../styles/Theme';
import Button from '../util/Button';
import EachCabinetManage from '../eachItem/EachCabinetManage';
import { request } from '../../utils/axios';
import ApproveModal from '../popup/ApproveModal';
import useConfirm from '../../hook/useConfirm';

function CabinetRentWindow(props) {
  const [init, setInit] = useRecoilState(cabinet);
  const [cabinetList, setCabinetList] = useRecoilState(cabinetModal); // 사물함 리스트
  const currentIndex = useRecoilValue(currentCabinetIndex); // 모달 백드롭 때문에

  const resetCabinet = useResetRecoilState(cabinet);

  const fetchData = async () => {
    try {
      const response = await request('get', '/locker');
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const loadCabinetStatus = async () => {
      const result = await fetchData();
      setInit(result);
      setCabinetList(init);
    };
    loadCabinetStatus();

    return () => {
      resetCabinet();
    };
  }, []);

  const confirmGrant = () => {
    console.log('반영 성공');

    // 정상적인 결과는 resolve로 1을 전달해준다.
    return new Promise(resolve => resolve(1));
  };

  const confirmDismiss = () => {
    resetCabinet();
    window.location.reload();
  };

  const saveState = useConfirm(
    '저장하시겠습니까?',
    confirmGrant,
    '저장 성공',
    confirmDismiss,
  );

  const modalRef = useRef(null);

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
                eachCabinet={cabinet}
              />
            ))}
        </CabinetGrid>
        <ViewApplyModal ref={modalRef} view={currentIndex !== -1}>
          {cabinetList.map(
            item =>
              item.modalOpen && (
                <ApproveModal
                  key={`canbinetModal`}
                  itemName={`사물함`}
                  itemNumber={item.cabinetNumber}
                  lender={item.lender}
                  start={item.start}
                  end={item.end}
                />
              ),
          )}
        </ViewApplyModal>
      </CabinetCurrentState>
      <SaveButtonContainer>
        <SaveButton buttonName="저장" onClick={saveState} />
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

const ViewApplyModal = styled.div`
  display: ${props => (props.view ? 'block' : 'none')};
  position: fixed;

  width: 100%;
  height: 100%;
  left: 0px;
  top: 0px;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1;
`;
