import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import theme from '../styles/Theme';
import logo from '../dummy/hongik.png';
import { Link, useParams } from 'react-router-dom';
import HeaderAndTitle from '../components/HeaderAndTitle';
import MemberInfo from '../components/MemberInfo';
import { useDispatch, useSelector } from 'react-redux';
import confirmMessage from '../confirmMessage/ConfirmMessage';
import { changeGrade } from '../_actions/changeMemberInfoAction';

const pixelToRem = size => `${size / 16}rem`;

// 페이지를 재로딩하면 redux state 가 초기화되어 내용이 사라집니다.
export default function MemberDetail() {
  const { userNickname } = useParams();
  const [userinfo, setUserinfo] = useState([]);
  const [userGrade, setUserGrade] = useState('');
  const userStore = useSelector(store => store.changeMemberInfoReducer);
  const dispatch = useDispatch();
  const updateMemberGrade = e => {
    setUserGrade(e.target.value);
  };
  const saveMemberInfo = () => {
    if (window.confirm(confirmMessage.gradeChange)) {
      let userinfoTemp = userinfo;
      userinfoTemp.grade = userGrade;
      setUserinfo(userinfoTemp);
      console.log(userinfo);
      // 아래 코드도 DB가 나온다면 필요없을 듯
      if (userStore.changeSuccess) {
        setUserInformation(userStore.changeSuccess, true);
      } else {
        setUserInformation(userStore.init, true);
      }
    }
  };
  const setUserInformation = (store, save) => {
    if (!save) {
      for (const member of store) {
        if (member.nickname === userNickname) {
          setUserinfo(member);
          setUserGrade(member.grade);
          break;
        }
      }
    } else {
      const totalUser = store;
      const userIdx = totalUser.findIndex(
        element => element.nickname === userNickname,
      );
      totalUser[userIdx] = userinfo;
      console.log(totalUser);
      dispatch(changeGrade(totalUser));
    }
  };
  useEffect(() => {
    if (userStore.changeSuccess) {
      setUserInformation(userStore.changeSuccess, false);
    } else {
      setUserInformation(userStore.init, false);
    }
    console.log('호출');
  }, []);
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
              <select value={userGrade} onChange={e => updateMemberGrade(e)}>
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
        <SubmitButton to="/manage" onClick={saveMemberInfo}>
          저장
        </SubmitButton>
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

const SubmitButton = styled(Link)`
  width: ${pixelToRem(102)};
  height: ${pixelToRem(40)};
  padding-top: ${pixelToRem(12)};
  background-color: ${theme.colors.blue};
  border: none;
  border-radius: ${pixelToRem(10)};
  color: ${theme.colors.white};
  text-decoration-line: none;
  text-align: center;
  &:hover {
    cursor: pointer;
  }
`;
