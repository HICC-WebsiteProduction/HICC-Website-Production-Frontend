import React, { useState } from 'react';
import styled from 'styled-components';
import UserInfo from './UserInfo';
import theme from '../../styles/Theme';
import EditUserInfo from './../input/EditUserInfo';

function Profile() {
  const [profileImage, setProfileImage] = useState(
    'https://ssl.pstatic.net/static/common/myarea/myInfo.gif',
  );

  const handleProfileImageChange = event => {
    const newImage = event.target.value;
    setProfileImage(newImage);
    console.log(newImage);
  };

  const [isEditing, setIsEditing] = useState(false);
  const [nickname, setNickname] = useState('최세호');
  const [phone, setPhone] = useState('010-1234-5678');

  const handleNicknameChange = event => {
    const newNickname = event.target.value;
    setNickname(newNickname);
  };

  const handlePhoneChange = event => {
    const newPhone = event.target.value;
    setPhone(newPhone);
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
          <ProfileInput type="file" onChange={handleProfileImageChange} />
        </ProfileImageContainer>
        <>
          {isEditing ? (
            <EditUserInfo
              nickname={nickname}
              phone={phone}
              onNicknameChange={handleNicknameChange}
              onPhoneChange={handlePhoneChange}
            />
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
            <EditButton onClick={handleSaveButtonClick}>저장</EditButton>
          ) : (
            <EditButton onClick={handleEditButtonClick}>정보 수정</EditButton>
          )}
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
`;

const ProfilePicture = styled.img`
  width: 180px;
  height: 180px;
  border-radius: 50%;
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
  font-family: 'Pretendard';
  font-weight: 600;
  font-size: ${theme.fontSizes.label};
  line-height: 150%;

  &:hover {
    cursor: pointer;
  }
`;

const ProfileInput = styled.input``;

const ButtonContainer = styled.div`
  position: absolute;
  top: 540px;
`;
