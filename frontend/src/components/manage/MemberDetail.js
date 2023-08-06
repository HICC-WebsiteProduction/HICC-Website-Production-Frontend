import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import theme from '../../styles/Theme';

import { useParams } from 'react-router-dom';
import MemberInfo from './MemberInfo';
import confirmMessage from '../../constants/ConfirmMessage';
import { useNavigate } from 'react-router-dom';
import useConfirm from '../../hook/useConfirm';
import Title from '../header/Title';
import Header from '../header/Header';
import { memberRole } from '../../constants/MemberRole';
import { request } from '../../utils/axios';
import getKeyByValue from '../../utils/getKeyByValue';
import useSelect from '../../hook/useSelect';

// 회원 상세 페이지를 담당
export default function MemberDetail() {
  const { user } = useParams(); // url에서 user의 닉네임을 추출
  const [userinfo, setUserinfo] = useState([]); // 회원의 정보를 저장

  const [selectedRole, setSelectedRole] = useSelect(memberRole.GENERAL); // 회원 등급 선택
  const navigate = useNavigate();

  // 회원정보 로드
  useEffect(() => {
    const loadUserInfo = async () => {
      const body = {
        id: 'C011001',
        nickname: user,
      };
      try {
        const response = await request('post', `/admin/member/detail`, body);
        setUserinfo(response);
      } catch (error) {
        console.log(error);
      }
    };
    loadUserInfo();
  }, [user]);

  // 회원 정보를 저장할 때 실행되는 함수
  // 이 파트는 실제 백엔드와 협의하여 제작함
  const confirmGrantSave = async () => {
    const body = {
      id: 'C011001',
      targetIdList: [userinfo.id],
      role: getKeyByValue(memberRole, selectedRole),
    };

    try {
      await request('post', '/admin/modify', body);
      navigate('/manage');
    } catch (error) {
      console.log(error);
    }
  };

  // 회원 정보를 저장할 때 실행되는 확인 창
  const saveMemberInfo = useConfirm(
    confirmMessage.gradeChange,
    confirmGrantSave,
    '회원등급 변경에 성공했습니다.',
  );

  // 회원 정보를 저장할 때 실행되는 함수
  // 이 파트는 실제 백엔드와 협의하여 제작함
  // 삭제할 때 삭제할 회원이 회장이면 에러 메시지를 띄움으로서 삭제를 막음
  const confirmGrantDelete = async () => {
    if (memberRole[userinfo.role] === memberRole.PRESIDENT) {
      return new Promise(reject => {
        reject('본인 강퇴는 안 돼요');
      });
    } else {
      const body = {
        id: 'C011001',
        targetId: userinfo.id,
      };

      try {
        await request('post', '/admin/expel', body);
        navigate('/manage');
      } catch (error) {
        console.log(error);
      }
    }
  };

  // 회원 삭제 확인 창을 띄운다.
  const deleteUser = useConfirm(
    confirmMessage.getOutMember,
    confirmGrantDelete,
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
            <MemberInfo name="학번" param={userinfo.id} />
            <MemberInfo name="학과" param={userinfo.major} />
            <MemberInfo name="전화번호" param={userinfo.phoneNumber} />
            <GradeContainer>
              <MemberInfo name="등급" param={memberRole[userinfo.role]} />
              <ChangeGradeSelect
                value={selectedRole}
                onChange={e => setSelectedRole(e)}
              >
                <ChangeGradeOption value={memberRole.GENERAL}>
                  일반
                </ChangeGradeOption>
                <ChangeGradeOption value={memberRole.GRADUATE}>
                  졸업생
                </ChangeGradeOption>
                <ChangeGradeOption value={memberRole.EXECUTIVE}>
                  운영진
                </ChangeGradeOption>
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
