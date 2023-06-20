import React, { useState } from 'react';
import styled from 'styled-components';
import UserInfo from '../components/UserInfo';
import EditUserInfo from '../components/EditUserInfo';
import HeaderAndTitle from '../components/HeaderAndTitle';

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
      <HeaderAndTitle titleName="내 정보" />

      <ProfileWrapper>
        <div>
          <ProfilePicture src={profileImage} alt="프로필 사진" />
          <ProfileInput type="file" onChange={handleProfileImageChange} />
        </div>
        <div>
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
              major="Computer Science"
              year="2"
            />
          )}
          {isEditing ? (
            <EditButton onClick={handleSaveButtonClick}>저장</EditButton>
          ) : (
            <EditButton onClick={handleEditButtonClick}>정보 수정</EditButton>
          )}
        </div>
      </ProfileWrapper>
    </>
  );
}

export default Profile;

const ProfileWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const ProfilePicture = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;

const EditButton = styled.button`
  background-color: white;
  border: 1px solid black;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 1em;
  font-weight: bold;
  cursor: pointer;
`;

const ProfileInput = styled.input`
  *
`;
