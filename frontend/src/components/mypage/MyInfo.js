import React, { useState } from 'react';
import styled from 'styled-components';
import UserInfo from './UserInfo';
import theme from '../../styles/Theme';
import Button from '../../components/util/Button';
import EditUserInfo from './../input/EditUserInfo';
import ViewMemberInfo from '../input/ViewMemberInfo';

// 내 정보를 보여준다
function Profile() {
  const [profileImage, setProfileImage] = useState(
    'https://ssl.pstatic.net/static/common/myarea/myInfo.gif',
  ); // 프로필 이미지, 아직 데모이다.

  // 새로운 이미지로 변경하는 함수
  const handleProfileImageChange = event => {
    const newImage = event.target.value;
    setProfileImage(newImage);
    console.log(newImage);
  };

  const [isEditing, setIsEditing] = useState(false);
  const [nickname, setNickname] = useState('최세호');
  const [phone, setPhone] = useState('010-1234-5678');

  const handleNicknameChange = nick => {
    const newNickname = nick;
    setNickname(newNickname);
    console.log('닉 변경');
  };

  const handlePhoneChange = num => {
    const newPhone = num;
    setPhone(newPhone);
    console.log('폰 변경');
  };

  const handleEditButtonClick = () => {
    setIsEditing(true);
  };

  const handleSaveButtonClick = () => {
    setIsEditing(false);
  };

  return (
    <>
      <ProfileWrapper>
        <ProfileImageContainer>
          <ProfilePicture src={profileImage} alt="프로필 사진" />
          <ProfileInput>사진 선택</ProfileInput>
        </ProfileImageContainer>
        <>
          {isEditing ? (
            <UserInfoWrapper>
              <InputRow>
                <Label>닉네임</Label>
                <InputRowContent>
                  <Input
                    type="text"
                    value={nickname}
                    onChange={e => setNickname(e.target.value)}
                  />
                  <CheckDuplicate buttonName="중복 확인" buttonType="button" />
                </InputRowContent>
              </InputRow>
              <ViewMemberInfo
                labelName="등급"
                type="text"
                width={540}
                value="일반회원"
                authorityCheck={true}
              />
              <InputRow>
                <Label>전화번호</Label>
                <InputRowContent>
                  <Input
                    type="text"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                  />
                </InputRowContent>
              </InputRow>
              <ViewMemberInfo
                labelName="학번"
                type="text"
                width={540}
                value="C011001"
                authorityCheck={false}
              />
              <ViewMemberInfo
                labelName="학과"
                type="text"
                width={540}
                value="컴퓨터공학과"
                authorityCheck={false}
              />
            </UserInfoWrapper>
          ) : (
            <UserInfo
              nickname={nickname}
              level="일반회원"
              phone={phone}
              studentId="C011001"
              major="컴퓨터공학과"
            />
          )}
        </>
        <ButtonContainer>
          {isEditing ? (
            <EditButton type="submit" onClick={handleSaveButtonClick}>
              저장
            </EditButton>
          ) : (
            <EditButton onClick={handleEditButtonClick}>수정</EditButton>
          )}
          <WithdrawButton>회원 탈퇴 신청</WithdrawButton>
        </ButtonContainer>
      </ProfileWrapper>
    </>
  );
}

export default Profile;

const ProfileWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const ProfileImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 63px;
`;

const ProfilePicture = styled.img`
  width: 180px;
  height: 180px;
  border-radius: 50%;
`;

// const SelectProfile = styled.button`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 180px;
//   height: 60px;
//   background: ${theme.colors.blue};
//   border-radius: 20px;
//   margin-top: 30px;
//   outline: none;

//   color: ${theme.colors.white};
//   font-family: 'Pretendard';
//   font-weight: 600;
//   font-size: ${theme.fontSizes.label};
//   line-height: 150%;

//   &:hover {
//     cursor: pointer;
//   }
//   &:active {
//     opacity: 0.3;
//   }
// `;

const ButtonContainer = styled.div`
  position: absolute;
  top: 540px;
  left: 205px;
`;

const EditButton = styled.button`
  width: 786px;
  height: 60px;
  margin-bottom: 50px;
  border: none;
  border-radius: 20px;
  background: ${theme.colors.blue};
  outline: none;

  color: ${theme.colors.white};
  ${theme.fontstyle.body1};

  &:hover {
    cursor: pointer;
  }
  &:active {
    opacity: 0.5;
  }
`;
// const WithdrawalButton = styled.button`
//   width: 786px;
//   height: 60px;
//   margin-bottom: 50px;
//   border: none;
//   border-radius: 20px;
//   background: ${theme.colors.cancleRed};
//   outline: none;

//   color: ${theme.colors.white};
//   font-family: 'Pretendard';
//   font-weight: 600;
//   font-size: ${theme.fontSizes.label};
//   line-height: 150%;

//   &:hover {
//     cursor: pointer;
//   }
//   &:active {
//     opacity: 0.3;
//   }
// `;

const ProfileInput = styled.button`
  width: 180px;
  height: 60px;
  border-radius: 20px;
  border: none;
  margin-top: 40px;
  background: ${theme.colors.blue};
  color: ${theme.colors.white};
  text-align: center;
  ${theme.fontstyle.body1};
  &:hover {
    cursor: pointer;
  }
  &:active {
    opacity: 0.5;
  }
`;

// const ButtonContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   position: absolute;
//   top: 540px;
// `;

const WithdrawButton = styled.button`
  display: flex;
  width: 786px;
  padding: 12px 307px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 20px;
  border: none;
  margin-bottom: 140px;

  background: #ff9494;
  color: #edf0f8;
  text-align: center;
  ${theme.fontstyle.body1};
  &:hover {
    cursor: pointer;
  }
  &:active {
    opacity: 0.5;
  }
`;

const InputRow = styled.div`
  display: flex;
  position: relative;
  justify-content: flex-start;
  width: 540px;
  margin-bottom: 25px;
`;

const Label = styled.label`
  width: 204px;
  color: ${theme.colors.white};
  ${theme.fontstyle.body1};
`;

const InputRowContent = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 582px;
  height: 60px;
  background-color: ${theme.colors.white};
  border-radius: 20px;
`;

const Input = styled.input`
  width: 50%;
  height: 24px;
  margin: 18px 24px;
  background-color: ${theme.colors.white};
  border: none;
  ${theme.fontstyle.body10};
  &:focus {
    outline: none;
  }
`;
const CheckDuplicate = styled(Button)`
  width: 120px;
  height: 46px;
  margin-right: 12px;
  border-radius: 20px;

  color: ${theme.colors.white};
  ${theme.fontstyle.body11};
  &:active {
    opacity: 0.5;
  }
`;
const UserInfoWrapper = styled.div`
  width: 540px;
`;
