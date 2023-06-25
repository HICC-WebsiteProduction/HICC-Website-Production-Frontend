import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import theme from '../styles/Theme';
import logo from '../dummy/hongik.png';
import { useParams } from 'react-router-dom';
import HeaderAndTitle from '../components/header/HeaderAndTitle';
import MemberInfo from '../components/MemberInfo';
import { useDispatch, useSelector } from 'react-redux';
import confirmMessage from '../confirmMessage/ConfirmMessage';
import {
  changeGradeAction,
  deleteMember,
} from '../_actions/changeMemberInfoAction';
import { useNavigate } from 'react-router-dom';

const memberGrade = {
  president: '회장',
  manager: '운영진',
  normal: '일반',
  graduate: '졸업생',
};

// 페이지를 재로딩하면 redux state 가 초기화되어 내용이 사라집니다.
export default function MemberDetail() {
  const { userNickname } = useParams();
  const [userinfo, setUserinfo] = useState([]);
  const [userGrade, setUserGrade] = useState('');
  const userStore = useSelector(store => store.changeMemberInfoReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const updateMemberGrade = e => {
    setUserGrade(e.target.value);
  };
  const deleteUser = () => {
    if (window.confirm(confirmMessage.getOutMember)) {
      if (userinfo.grade === 'president') {
        alert('본인 강퇴는 안돼요...');
      } else {
        if (userStore.changeSuccess) {
          deleteMemberCase(userStore.changeSuccess);
        } else {
          deleteMemberCase(userStore.init);
        }
        navigate('/manage');
      }
    }
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
      navigate('/manage');
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
      dispatch(changeGradeAction(totalUser));
    }
  };
  const deleteMemberCase = store => {
    const totalUser = store;
    const userIdx = totalUser.findIndex(
      element => element.nickname === userNickname,
    );
    delete totalUser[userIdx];
    const newTotalUser = totalUser.filter(element => element !== undefined);
    console.log(newTotalUser);
    dispatch(deleteMember(newTotalUser));
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
          </ProfileImageWrapper>
        ) : null}
        {userinfo ? (
          <MemberProfileList>
            <MemberInfo name="이름" param={userinfo.name} />
            <MemberInfo name="닉네임" param={userinfo.nickname} />
            <MemberInfo name="학번" param={userinfo.studentID} />
            <MemberInfo name="전화번호" param={userinfo.tel} />
            <GradeContainer>
              <MemberInfo name="등급" param={memberGrade[userinfo.grade]} />
              <ChangeGradeSelect
                value={userGrade}
                onChange={e => updateMemberGrade(e)}
              >
                <ChangeGradeOption value="normal">일반</ChangeGradeOption>
                <ChangeGradeOption value="graduate">졸업생</ChangeGradeOption>
                <ChangeGradeOption value="manager">운영진</ChangeGradeOption>
              </ChangeGradeSelect>
              <GoAwayButton onClick={deleteUser}>강퇴</GoAwayButton>
            </GradeContainer>
          </MemberProfileList>
        ) : (
          <p>'존재하지 않는 회원'</p>
        )}
      </MemberProfile>
      <SubmitButtonContainer>
        <SubmitButton onClick={saveMemberInfo}>저장</SubmitButton>
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
  margin: ${theme.margin.margin_component} 50px;
`;
const ProfileImage = styled.img`
  width: 250px;
  height: 250px;
  margin: ${theme.margin.margin_component};
  border-radius: 50%;
`;

const MemberProfileList = styled.div`
  ${theme.flexbox.flexColumn};
  margin-top: ${theme.margin.margin_component};
`;

const GradeContainer = styled.div`
  position: relative;
`;

const ChangeGradeSelect = styled.select`
  position: absolute;
  top: 0px;
  right: -140px;
  width: 119px;
  height: 30px;
  border-radius: 5px;
  border: 2px solid ${theme.colors.green};
  outline: none;

  background-color: transparent;
  color: ${theme.colors.white};
  font-family: 'Pretendard';
  font-weight: 600;
  font-size: ${theme.fontSizes.paragraph};
  text-align: center;
`;

const ChangeGradeOption = styled.option`
  color: ${theme.colors.black};
  font-family: 'Pretendard';
  font-weight: 600;
  font-size: ${theme.fontSizes.paragraph};
`;

const GoAwayButton = styled.button`
  position: absolute;
  top: 0px;
  right: -210px;
  width: 56px;
  height: 30px;
  background-color: ${theme.colors.cancleRed};
  border: none;
  border-radius: 5px;
  color: ${theme.colors.white};
  text-align: center;
  &:hover {
    cursor: pointer;
  }
`;

const SubmitButtonContainer = styled.div`
  ${theme.flexbox.flexCenterColumn};
  margin: 40px 0;
`;

const SubmitButton = styled.button`
  width: 160px;
  height: 60px;
  border-radius: 10px;
  background-color: ${theme.colors.green};
  color: ${theme.colors.white};
  border: none;

  font-family: 'Pretendard';
  font-weight: 600;
  font-size: ${theme.fontSizes.label};
  &:hover {
    cursor: pointer;
  }
`;
