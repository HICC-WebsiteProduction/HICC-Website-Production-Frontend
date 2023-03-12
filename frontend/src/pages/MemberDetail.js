import React from 'react';
import styled from 'styled-components';
import theme from '../styles/Theme';
import dummy from '../dummy/memberInfo.json';
import logo from '../dummy/hongik.png';
import { useParams } from 'react-router-dom';
import HeaderAndTitle from '../components/HeaderAndTitle';
import MemberInfo from '../components/MemberInfo';
import Button from '../components/Button';

const pixelToRem = size => `${size / 16}rem`;

export default function MemberDetail() {
  const { userNickname } = useParams();
  let userinfo = null;
  for (const member of dummy.memberInfo) {
    if (member.nickname === userNickname) {
      userinfo = member;
      break;
    }
  }
  console.log(userinfo);
  return (
    <MemberDetailContainer>
      <HeaderAndTitle titleName="회원 정보" />
      <MemberProfile>
        {userinfo ? (
          <ProfileImageWrapper>
            <ProfileImage src={logo} />
            <ProfileImageChange>프로필 사진 변경</ProfileImageChange>
          </ProfileImageWrapper>
        ) : null}
        {userinfo ? (
          <MemberProfileList>
            <MemberInfo name="닉네임" param={userinfo.nickname} />
            <MemberInfo name="이름" param={userinfo.name} />
            <MemberInfo name="학번" param={userinfo.studentID} />
            <MemberInfo name="학년" param={userinfo.schoolGrade} />
            <MemberInfo name="학과" param={userinfo.major} />
            <MemberInfo name="전화번호" param={userinfo.tel} />
            <GradeContainer>
              <Label>등급</Label>
              <select defaultValue={userinfo.grade}>
                <option value="normal">일반</option>
                <option value="graduate">졸업생</option>
                <option value="manager">운영진</option>
                <option value="president">회장</option>
              </select>
              <GoAwayButton>강퇴</GoAwayButton>
            </GradeContainer>
          </MemberProfileList>
        ) : (
          <p>'존재하지 않는 회원'</p>
        )}
      </MemberProfile>
      <SubmitButtonContainer>
        <Button buttonName="저장" type="button" />
      </SubmitButtonContainer>
    </MemberDetailContainer>
  );
}

const MemberDetailContainer = styled.div``;

const MemberProfile = styled.div`
  ${theme.flexbox.flex};
`;
const ProfileImageWrapper = styled.div`
  ${theme.flexbox.flexCenterColumn};
  width: 30%;
  margin: ${theme.margin.margin_component} ${pixelToRem(50)};
`;
const ProfileImage = styled.img`
  width: ${pixelToRem(250)};
  height: ${pixelToRem(250)};
  margin: ${theme.margin.margin_component};
  border-radius: 50%;
`;
const ProfileImageChange = styled.button`
  background: transparent;
  border: none;
  color: ${theme.colors.blue};
  &:hover {
    cursor: pointer;
  }
`;

const MemberProfileList = styled.div`
  ${theme.flexbox.flexColumn};
  margin-top: ${theme.margin.margin_component};
`;

const GradeContainer = styled.div``;

const Label = styled.label`
  display: inline-block;
  width: ${pixelToRem(90)};
  margin-right: ${pixelToRem(5)};
  font-family: NanumBarunGothic, sans-serif;
  font-size: ${theme.fontSizes.paragraph};
`;

const GoAwayButton = styled.button`
  width: ${pixelToRem(70)};
  height: ${pixelToRem(25)};
  margin-left: ${pixelToRem(30)};
  background-color: ${theme.colors.blue};
  border: none;
  border-radius: ${pixelToRem(10)};
  color: ${theme.colors.white};
  &:hover {
    cursor: pointer;
  }
`;

const SubmitButtonContainer = styled.div`
  ${theme.flexbox.flexCenterColumn};
  margin-top: ${pixelToRem(0)};
`;
