import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import theme from '../styles/Theme';
import { Link } from 'react-router-dom';
import ConfirmMessage from '../confirmMessage/ConfirmMessage';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeGradeAction,
  initMember,
} from '../_actions/changeMemberInfoAction';

const memberGrade = {
  president: '회장',
  manager: '운영진',
  normal: '일반',
  graduate: '졸업생',
};

function MemberInfoWindow(props) {
  const dispatch = useDispatch();
  const userReducer = useSelector(state => state.changeMemberInfoReducer);

  const [memberInfo, setMemberInfo] = useState([]);
  const [selectdMemberList, setSelectdMemberList] = useState([]);
  const [selectGrade, setSelectGrade] = useState('normal');

  const changeGradeSelect = event => {
    setSelectGrade(event.target.value);
  };

  const confirmGrant = data => {
    // 등급 변경사항 상태를 리덕스 스토어에 저장합니다.
    // 나중에 이 상태를 백엔드 데이터베이스에 저장 요청을 하면 됩니다.
    if (window.confirm(ConfirmMessage.gradeChange)) {
      const updatedMemberInfo = changeGrade();
      dispatch(changeGradeAction(updatedMemberInfo));
      alert('회원 등급 변경에 성공하였습니다.');
    }
  };
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

  const confirmDeny = data => {
    // open dialog box
  };

  // 멤버 정보 더미데이터 불러옵니다.
  const fetchData = async () => {
    const res = await fetch('memberInfo.json');
    const data = await res.json();
    return data.memberInfo;
  };
  useEffect(() => {
    // 멤버 초기정보를 셋팅합니다.
    // 아래 조건문은 DB에 저장된 값을 불러온다면 필요없습니다..
    // DB에 저장된다면 무조건 DB 에서 들고오면 되기 때문입니다.
    // DB 없이 변경값을 확인하기위해 임시로 해놓은 코드입니다.
    const initMemberInfo = async () => {
      if (!userReducer.changeSuccess) {
        // 변경사항이 없으면 초기값
        const result = await fetchData(); // array 내부는 Object
        setMemberInfo(result);
        dispatch(initMember(result));
      } else if (!userReducer.deleteSuccess) {
        // 변경사항이 있으면 변경값 하지만 멤버를 지우지 않은 상태
        setMemberInfo(userReducer.changeSuccess);
      } else {
        setMemberInfo(userReducer.deleteSuccess);
      }
    };
    initMemberInfo();
  }, []);

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
            <td>닉네임</td>
            <td>연락처</td>
            <td>
              <input type="checkbox" />
            </td>
          </tr>
        </MemberHeader>
        <MemberList>
          {memberInfo &&
            memberInfo.map((value, index) => {
              return (
                <RegisteredMember
                  key={index}
                  nickname={value.nickname}
                  name={value.name}
                  studentID={value.studentID}
                  tel={value.tel}
                  grade={value.grade}
                  getMemberInfo={getSelectdMemberInfo}
                />
              );
            })}
        </MemberList>
      </MemberContainer>
      <ActionButtonContainer>
        <ChangeGradeSelect onChange={changeGradeSelect}>
          <GradeOption value="normal">일반</GradeOption>
          <GradeOption value="graduate">졸업생</GradeOption>
          <GradeOption value="manager">운영진</GradeOption>
        </ChangeGradeSelect>
        <ModifyButton onClick={confirmGrant}>등급 수정</ModifyButton>
      </ActionButtonContainer>
    </MemberInfoContainer>
  );
}

function RegisteredMember(props) {
  const changeSelect = e => {
    props.getMemberInfo(e.target.value, e.target.checked);
  };

  return (
    <MemberPresenter>
      <td>{memberGrade[props.grade]}</td>
      <td>{props.name}</td>
      <td>{props.studentID}</td>
      <td>
        <MemberDetailsLink to={`/manage/memberDetail/${props.nickname}`}>
          {props.nickname}
        </MemberDetailsLink>
      </td>
      <td>{props.tel}</td>
      <td>
        <input
          type="checkbox"
          value={props.studentID}
          onChange={changeSelect}
        />
      </td>
    </MemberPresenter>
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

const MemberPresenter = styled.tr`
  height: 40px;
  border-bottom: 1px solid ${theme.colors.white};

  color: ${theme.colors.white};
  font-family: 'Pretendard';
  font-weight: 300;
  font-size: ${theme.fontSizes.paragraph};
  text-align: center;
`;

const MemberDetailsLink = styled(Link)`
  color: ${theme.colors.blue};
  text-decoration-line: none;
  &:hover {
    cursor: pointer;
  }
`;
