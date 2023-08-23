import React, { useState } from 'react';
import styled from 'styled-components';
import theme from '../styles/Theme';
import Header from '../components/header/Header';
import Title from '../components/header/Title';
import Checkbox from '../components/util/Checkbox';
import { TOSMessage } from '../constants/TOSMessage';
import Button from '../components/util/Button';
import CustomScrollBar from '../components/util/Scrollbar';
import useCheckbox from '../hook/useCheckbox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import agree from '../atom/agree';

// 약관동의 페이지
function TOS() {
  const headName = '이지우';
  const headNumber = '010-0000-0000';

  const [isSubmitButtonClick, setIsSubmitButtonClick] = useState(false);
  // 처음 클릭 전에는 경고 알림 보이지 않게 하기위해
  const setIsAgree = useSetRecoilState(agree); // 약관 동의 상태 설정

  const {
    checkboxList,
    setCheckboxList,
    checkAll,
    checkAllHandler,
    checkHandler,
  } = useCheckbox([
    { id: 'head', isChecked: false },
    { id: 'agree', isChecked: false },
  ]);

  const navigate = useNavigate();

  // 약관 동의를 전부 체크해야만 회원가입으로 넘어갈 수 있다
  const goSignup = () => {
    setIsSubmitButtonClick(true);
    if (checkAll) {
      setIsAgree(true);
      navigate('/signup');
    }
  };

  return (
    <TOSContainer>
      <Header background={true} />
      <Title titleName="회원가입" />
      <HeadNumber>
        {`아직 HICC의 회원이 아닌 경우, 홈페이지 회원가입에 앞서 회장에게 연락하고
안내에 따라주시길 바랍니다. (회장 ${headName} 연락처 : ${headNumber})`}
      </HeadNumber>
      <Confirm>
        <Text>회장에게 가입 연락을 하고 가입비를 납부했습니까?</Text>
        <Checkbox
          checkboxId="head"
          onChange={event => checkHandler('head', event.target.checked)}
        />
        <AlertIcon view={!checkboxList[0].isChecked && isSubmitButtonClick}>
          <FontAwesomeIcon icon={faCircleExclamation} />
        </AlertIcon>
      </Confirm>
      <CustomScrollBar elements={<TOSDesc>{TOSMessage}</TOSDesc>} />
      <Confirm>
        <Text>가입 약관을 읽고 동의합니까?</Text>
        <Checkbox
          checkboxId="agree"
          onChange={event => checkHandler('agree', event.target.checked)}
        />
        <AlertIcon view={!checkboxList[1].isChecked && isSubmitButtonClick}>
          <FontAwesomeIcon icon={faCircleExclamation} />
        </AlertIcon>
      </Confirm>
      <ButtonContainer>
        <CancelButton buttonName="취소" />
        <AgreeButton buttonName="회원가입" onClick={goSignup} />
      </ButtonContainer>
    </TOSContainer>
  );
}

export default TOS;

const TOSContainer = styled.div`
  width: ${theme.componentSize.maxWidth};
  height: 100vh;
  margin: 0 auto;
`;

const HeadNumber = styled.div`
  width: 783px;
  margin: 40px auto;
  color: ${theme.colors.white};
  font-family: 'Pretendard';
  font-size: ${theme.fontSizes.label};
  font-weight: 300;
  line-height: 150%;
`;

const Confirm = styled.div`
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: center;
  width: 783px;
  margin: 0 auto;
`;

const AlertIcon = styled.div`
  display: ${props => (props.view ? 'block' : 'none')};
  position: absolute;
  right: -40px;
  color: #ff9494;
  font-family: 'Pretendard', sans-serif;
  font-weight: 300;
  line-height: 150%;
  font-size: ${theme.fontSizes.label};
  white-space: nowrap;
`;

const Text = styled.div`
  color: ${theme.colors.white};
  font-family: 'Pretendard';
  font-size: ${theme.fontSizes.label};

  font-weight: 600;
  line-height: 150%;
`;

const TOSDesc = styled.div`
  width: 760px;
  height: 198px;

  padding: 0 18px;
  background-color: ${theme.colors.white};
  border-radius: 20px;

  font-family: 'Pretendard';
  font-size: ${theme.fontSizes.font_normal};
  font-weight: 300;

  white-space: pre-line;
  line-height: 150%;
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 783px;
  margin: 40px auto;
  padding-bottom: 150px;
`;

const CancelButton = styled(Button)`
  width: 178px;
  height: 60px;
  margin-right: 30px;
  background-color: ${theme.colors.white};
  color: ${theme.colors.black};
`;

const AgreeButton = styled(Button)`
  width: 582px;
  height: 60px;
`;
