import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import theme from '../styles/Theme';
import { useForm } from 'react-hook-form';
import InputMemberInfo from '../components/input/InputMemberInfo';
import Button from '../components/util/Button';
import Regex from '../constants/Regex';
import { useNavigate } from 'react-router-dom';
import useAlert from '../hook/useAlert';
import ConfirmMessage from '../constants/ConfirmMessage';
import { request } from '../utils/axios';
import Header from '../components/header/Header';
import Title from '../components/header/Title';
import { useRecoilValue } from 'recoil';
import agree from '../atom/agree';

// 회원가입 페이지
function Signup(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const navigate = useNavigate();
  const alert = useAlert();

  const isAgree = useRecoilValue(agree);

  // 약관동의를 하지 않은 상태에서 바로 회원가입 페이지 접근을 막음
  useEffect(() => {
    if (!isAgree) {
      alert(true, '약관동의를 먼저 해주세요');
      navigate('/tos');
    }
  }, [alert, isAgree, navigate]);

  // 닉네임 중복체크를 하지 않았으면 중복 체크 요구
  const onSubmit = data => {
    if (!isNicknameChecked) {
      alert(true, '중복체크를 해주세요');
      return;
    }

    alert(false, '가입이 정상적으로 완료되었습니다.');
    navigate('/');
  };

  const [isNicknameChecked, setIsNicknameChecked] = useState(false); // 닉네임 중복 체크 여부

  // 한 글자씩 늦게 반영되는 오류 발생
  // watch를 사용하여 해결완료
  const inputNickname = watch('nickname');

  // 닉네임 중복체크 함수
  const checkDuplicate = async () => {
    try {
      console.log(inputNickname);
      const response = await request('get', `/signup/${inputNickname}`);
      if (response.status === 200) {
        alert(false, ConfirmMessage.duplicateCheck[1]);
        setIsNicknameChecked(true);
      } else {
        alert(true, ConfirmMessage.duplicateCheck[0]);
      }
    } catch (error) {
      alert(true, ConfirmMessage.duplicateCheck[0]);
    }
  };

  // 중복체크 후 수정했을 때 다시 중복체크 상태 해제
  useEffect(() => {
    setIsNicknameChecked(false);
  }, [inputNickname]);

  return (
    <SignupContainer>
      <Header background={true} />
      <Title titleName="회원가입" />
      <InputForm onSubmit={handleSubmit(onSubmit)}>
        <JoinAnnouncementMent>모든 항목에 응답해주세요</JoinAnnouncementMent>
        <InputMemberInfo
          labelName="ID"
          name="ID"
          specificPlaceholder="학번을 입력해주세요"
          required={true}
          checkDuplicate={false}
          type="text"
          register={register}
          errors={errors.ID}
          minLength={7}
          maxLength={7}
          pattern={Regex.ID.pattern}
          width={786}
        />
        <InputMemberInfo
          labelName="비밀번호"
          name="pw"
          specificPlaceholder="학교 클래스넷 비밀번호와 동일"
          required={true}
          checkDuplicate={false}
          type="password"
          register={register}
          errors={errors.pw}
          minLength={8}
          maxLength={16}
          pattern={Regex.PW.pattern}
          width={786}
        />
        <InputMemberInfo
          labelName="이름"
          name="koreanName"
          specificPlaceholder="한글로 이루어진 2~7자리"
          required={true}
          checkDuplicate={false}
          type="text"
          register={register}
          errors={errors.koreanName}
          minLength={2}
          maxLength={7}
          pattern={Regex.koreanName.pattern}
          width={786}
        />
        <InputMemberInfo
          labelName="닉네임"
          name="nickname"
          specificPlaceholder="한글, 영어대소문자, 숫자로 이루어진 4~16자리"
          required={true}
          checkDuplicate={checkDuplicate}
          type="text"
          register={register}
          errors={errors.nickname}
          minLength={4}
          maxLength={16}
          pattern={Regex.nickname.pattern}
          width={786}
        />
        <InputMemberInfo
          labelName="학과"
          name="major"
          specificPlaceholder="한글 3~14자리 (조소과 ~ 스마트도시데이터사이언스전공)"
          required={true}
          checkDuplicate={false}
          type="text"
          register={register}
          errors={errors.major}
          minLength={3}
          maxLength={14}
          pattern={Regex.major.pattern}
          width={786}
        />
        <InputMemberInfo
          labelName="전화번호"
          name="call"
          specificPlaceholder="010-xxxx-xxxx형식"
          required={true}
          checkDuplicate={false}
          type="text"
          register={register}
          errors={errors.call}
          minLength={13}
          maxLength={13}
          pattern={Regex.call.pattern}
          width={786}
        />
        <ButtonContainer>
          <CancleButton
            buttonType="button"
            buttonName="취소"
            onClick={() => {
              navigate('/');
            }}
          />
          <SubmitButton buttonName="회원가입" buttonType="submit" />
        </ButtonContainer>
      </InputForm>
    </SignupContainer>
  );
}

export default Signup;

const SignupContainer = styled.div`
  width: 100%;
  height: 100vh;
`;

const InputForm = styled.form`
  ${theme.flexbox.flexCenterColumn}
  position: relative;
  width: 786px;
  margin: 0 auto;
`;

const JoinAnnouncementMent = styled.span`
  position: absolute;
  top: -35px;
  right: 0px;
  color: ${theme.colors.white};
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 300;
  font-size: ${theme.fontSizes.font_normal};
  line-height: 150%;
`;

const ButtonContainer = styled.div`
  ${theme.flexbox.flex};
  width: 786px;
  margin-top: 74px;
  margin-bottom: 210px;
  justify-content: space-between;
`;

const CancleButton = styled(Button)`
  width: 178px;
  height: 60px;
  margin-right: 30px;
  background-color: ${theme.colors.white};
  color: ${theme.colors.black};
`;

const SubmitButton = styled(Button)`
  width: 580px;
  height: 60px;
  color: ${theme.colors.white};
`;
