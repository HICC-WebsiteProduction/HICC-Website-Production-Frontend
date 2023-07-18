import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import theme from '../../styles/Theme';

import { useParams } from 'react-router-dom';
import MemberInfo from './MemberInfo';
import confirmMessage from '../../constants/ConfirmMessage';
import { useNavigate } from 'react-router-dom';
import { memberGrade } from '../../constants/MemberGrade';
import { useRecoilState } from 'recoil';
import { memberinfo } from '../../atom/memberinfo';
import useConfirm from '../../hook/useConfirm';
import useAlert from '../../hook/useAlert';
import Title from '../header/Title';
import Header from '../header/Header';

export default function MemberDetail() {
  const { user } = useParams();
  const [userinfo, setUserinfo] = useState([]);
  const [memberInfo, setMemberInfo] = useRecoilState(memberinfo);

  const [userGrade, setUserGrade] = useState('normal');

  const navigate = useNavigate();

  const updateMemberGrade = e => {
    setUserGrade(e.target.value);
  };

  // 리코일에 전체 멤버 정보 들고있고, 찾아서 현재 유저를 보여주는 방식
  // 서버를 도입하면 이렇게 하는 방식에서 변경되어야 함
  useEffect(() => {
    const currentUser = memberInfo.find(member => member.nickname === user);
    setUserinfo(currentUser);
  }, [memberInfo, user]);

  // 실제 서버가 연결된다면 아래와 같은 과정 필요 없이 (recoii)
  // 서버에 put 요청하면 된다
  const saveMember = () => {
    // 현재 멤버 등급 변경
    // recoil에서 값을 불러와 객체를 복사할 때는 깊은 복사를 사용할 것
    let newUserInfo = Object.assign({}, userinfo);
    newUserInfo.grade = userGrade;
    setUserinfo(newUserInfo);

    // 전체 멤버상태 변경
    // recoil에서 값을 불러와 배얼을 복사할 때는 깊은 복사를 사용할 것
    const totalUser = [...memberInfo];
    const userIdx = totalUser.findIndex(member => member.nickname === user);
    totalUser[userIdx] = newUserInfo;
    setMemberInfo(totalUser);

    navigate('/manage');
  };

  const saveMemberInfo = useConfirm(
    confirmMessage.gradeChange,
    saveMember,
    '회원등급 변경에 성공했습니다.',
  );

  const alert = useAlert();

  // recoil을 사용하여 유저를 찾아서 특정 유저를 지워버림
  const deleteMember = () => {
    if (userinfo.grade === 'president') {
      alert(true, '본인 강퇴는 안돼요...');
      return;
    }

    const totalUser = [...memberInfo];
    const userIdx = totalUser.findIndex(member => member.nickname === user);
    totalUser.splice(userIdx, 1);
    setMemberInfo(totalUser);

    navigate('/manage');
  };

  const deleteUser = useConfirm(
    confirmMessage.getOutMember,
    deleteMember,
    '삭제에 성공했습니다.',
  );

  return (
    <MemberDetailContainer>
      <Header />
      <Title titleName="회원 정보" />
      {userinfo ? (
        <MemberProfile>
          <ProfileImage src={'/images/hongik.png'} />
          <MemberProfileList>
            <MemberInfo name="이름" param={userinfo.name} />
            <MemberInfo name="닉네임" param={userinfo.nickname} />
            <MemberInfo name="학번" param={userinfo.studentID} />
            <MemberInfo name="전화번호" param={userinfo.call} />
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
        </MemberProfile>
      ) : (
        <p>'존재하지 않는 회원'</p>
      )}

      <SubmitButtonContainer>
        <SubmitButton onClick={saveMemberInfo}>저장</SubmitButton>
      </SubmitButtonContainer>
    </MemberDetailContainer>
  );
}

const MemberDetailContainer = styled.div``;

const MemberProfile = styled.div`
  display: flex;
  justify-content: center;
  width: 75%;
  margin: ${theme.margin.margin_component} 50px;
`;

const ProfileImage = styled.img`
  width: 250px;
  height: 250px;
  margin: ${theme.margin.margin_component};
  border-radius: 50%;
`;

const MemberProfileList = styled.div`
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
