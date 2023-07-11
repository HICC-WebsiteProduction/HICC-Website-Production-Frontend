import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import theme from '../styles/Theme';
import { useForm } from 'react-hook-form';
import HeaderAndTitle from '../components/header/HeaderAndTitle';
import InputMemberInfo from '../components/InputMemberInfo';
import Button from '../components/Button';
import InputMemberValidInfo from '../components/InputMemberValidInfo';
import { useDispatch } from 'react-redux';
import { registerUser } from '../_actions/userAction';
import { useNavigate } from 'react-router-dom';
import useAlert from '../hook/useAlert';
import ConfirmMessage from '../confirmMessage/ConfirmMessage';

function Signup(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();
  const dispatch = useDispatch();
  const onSubmit = data => {
    if (!isNicknameChecked) {
      alert(true, '중복체크를 해주세요');
      return;
    }

    dispatch(registerUser(data)).then(res => {
      alert(false, '가입이 정상적으로 완료되었습니다.');
      navigate('/');
    });
  };
  const navigate = useNavigate();

  const alert = useAlert();
  const isError = false;

  const [isNicknameChecked, setIsNicknameChecked] = useState(false);

  const inputNickname = getValues('nickname');

  const checkDuplicate = () => {
    // 서버로 중복체크 전달
    // 성공했다면
    if (isError) {
      alert(true, ConfirmMessage.duplicateCheck[0]);
    } else {
      alert(false, ConfirmMessage.duplicateCheck[1]);
      setIsNicknameChecked(true);
    }
  };

  useEffect(() => {
    setIsNicknameChecked(false);
  }, [inputNickname]);

  return (
    <SignupContainer>
      <HeaderAndTitle titleName="회원가입" />
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
          validPattern={InputMemberValidInfo.ID.validPattern}
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
          validPattern={InputMemberValidInfo.PW.validPattern}
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
          validPattern={InputMemberValidInfo.nickname.validPattern}
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
          validPattern={InputMemberValidInfo.koreanName.validPattern}
          width={786}
        />
        <InputMemberInfo
          labelName="학번"
          name="studentID"
          specificPlaceholder="숫자로 이루어진 2자리 ex) 23"
          required={true}
          checkDuplicate={false}
          type="number"
          register={register}
          errors={errors.studentID}
          minLength={2}
          maxLength={2}
          validPattern={InputMemberValidInfo.studentID.validPattern}
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
          validPattern={InputMemberValidInfo.call.validPattern}
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
