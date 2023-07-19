import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import theme from '../../styles/Theme';
import ConfirmMessage from '../../constants/ConfirmMessage';

import useConfirm from '../../hook/useConfirm';
import Checkbox from '../util/Checkbox';
import EachRegisteredMember from '../eachItem/EachRegisteredMember';
import { useRecoilState } from 'recoil';
import { memberinfo } from '../../atom/memberinfo';
import { memberRole } from './../../constants/MemberRole';
import { request } from '../../utils/axios';

function MemberInfoWindow(props) {
  const [memberInfo, setMemberInfo] = useRecoilState(memberinfo);
  const [selectdMemberList, setSelectdMemberList] = useState([]);
  const [selectGrade, setSelectGrade] = useState('normal');

  const changeGrade = () => {
    // 변경정보를 받아와 멤버정보를 수정합니다.
    const updatedMemberInfo = memberInfo.map(member => {
      if (selectdMemberList.includes(member.studentID)) {
        return { ...member, grade: selectGrade };
      } else {
        return member;
      }
    });

    setMemberInfo(updatedMemberInfo);
  };

  // 회원 등급 변경 버튼을 눌렀을 때 실행되는 함수
  const confirmGrant = useConfirm(
    ConfirmMessage.gradeChange,
    changeGrade,
    '회원 등급 변경에 성공하였습니다.',
  );

  // 회원 등급 선택 값을 변경하였을 때 실행되는 함수
  const changeGradeSelect = event => {
    setSelectGrade(event.target.value);
  };

  // 체크된 멤버를 관리하는 함수
  const getSelectdMemberInfo = (memberID, checked) => {
    if (checked) {
      const updatedList = [...selectdMemberList];
      updatedList.push(memberID);
      setSelectdMemberList(updatedList);
    } else {
      const updatedList = selectdMemberList.filter(item => item !== memberID);
      setSelectdMemberList(updatedList);
    }
  };

  // 멤버 정보 더미데이터 불러옵니다.
  const fetchData = async () => {
    try {
      const respose = await request('get', '/admin/members', { id: 'C011001' });
      console.log(respose);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const initMemberInfo = async () => {
      if (memberInfo.length === 0) {
        // 변경사항이 없으면 초기값
        const result = await fetchData(); // array 내부는 Object
        setMemberInfo(result);
      }
    };

    initMemberInfo();
  }, [memberInfo, setMemberInfo]);

  return (
    <MemberInfoContainer>
      <MemberListTitle>
        현재 부원 목록
        <Indicator />
      </MemberListTitle>
      <MemberContainer>
        <MemberHeader>
          <tr>
            <td>등급</td>
            <td>이름</td>
            <td>학번</td>
            <td>전공</td>
            <td>닉네임</td>
            <td>연락처</td>
            <td>
              <Checkbox checkboxId="allcheck" />
            </td>
          </tr>
        </MemberHeader>
        <MemberList>
          {memberInfo &&
            memberInfo.map((value, index) => {
              return (
                <EachRegisteredMember
                  key={index}
                  nickname={value.nickname}
                  name={value.name}
                  major={value.major}
                  id={value.id}
                  phoneNumber={value.phoneNumber}
                  role={value.role}
                  getMemberInfo={getSelectdMemberInfo}
                />
              );
            })}
        </MemberList>
      </MemberContainer>
      <ActionButtonContainer>
        <ChangeGradeSelect onChange={changeGradeSelect}>
          <GradeOption value={memberRole.GENERAL}>일반</GradeOption>
          <GradeOption value={memberRole.GRADUATE}>졸업생</GradeOption>
          <GradeOption value={memberRole.EXECUTIVE}>운영진</GradeOption>
        </ChangeGradeSelect>
        <ModifyButton onClick={confirmGrant}>등급 수정</ModifyButton>
      </ActionButtonContainer>
    </MemberInfoContainer>
  );
}

export default MemberInfoWindow;

const MemberInfoContainer = styled.div``;

const MemberListTitle = styled.span`
  position: relative;
  padding-bottom: 10px;
  border-bottom: 3px solid ${theme.colors.green};
  color: ${theme.colors.white};
  font-family: 'Pretendard';
  font-weight: 600;
  font-size: ${theme.fontSizes.label};
`;

const Indicator = styled.div`
  position: absolute;
  top: 40px;
  left: 42%;
  width: 0;
  height: 0;
  border-bottom: 10px solid transparent;
  border-top: 10px solid ${theme.colors.green};
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
`;

const MemberContainer = styled.table`
  margin-top: 70px;
  width: 100%;

  tr {
    height: 50px;
  }

  td {
    text-align: center;
    vertical-align: middle;

    font-size: ${theme.fontSizes.paragraph};
  }
`;

const MemberHeader = styled.thead`
  background: transparent;
  border-bottom: 1px solid ${theme.colors.white};
  color: ${theme.colors.white};

  font-family: 'Pretendard';
  font-weight: 600;
  text-align: center;
  font-size: ${theme.fontSizes.paragraph};
`;

const MemberList = styled.tbody``;

const ActionButtonContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100px;
  margin-top: 50px;
  align-items: center;
  justify-content: center;

  button,
  select {
    width: 160px;
    height: 60px;
    margin: 60px;
    border-radius: 10px;
    color: white;

    font-family: 'Pretendard';
    font-weight: 600;
    font-size: ${theme.fontSizes.label};
  }
`;

const ChangeGradeSelect = styled.select`
  border: 3px solid ${theme.colors.green};
  background-color: transparent;
  outline: none;
  text-align: center;

  &:hover {
    cursor: pointer;
  }
`;

const GradeOption = styled.option`
  color: ${theme.colors.black};
  font-family: 'Pretendard';
  font-weight: 600;
  font-size: ${theme.fontSizes.label};
`;

const ModifyButton = styled.button`
  border: 0;
  background: ${theme.colors.green};

  &:hover {
    cursor: pointer;
  }
`;
