import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import theme from '../styles/Theme';
import ConfirmMessage from '../confirmMessage/ConfirmMessage';
import { useDispatch } from 'react-redux';
import { changeGrade } from '../_actions/changeGradeAction';

const pixelToRem = size => `${size / 16}rem`;

function MemberInfoWindow(props) {
  const dispatch = useDispatch();

  const confirmGrant = data => {
    // 등급 변경사항 상태를 리덕스 스토어에 저장합니다.
    // 나중에 이 상태를 백엔드 데이터베이스에 저장 요청을 하면 됩니다.
    if (window.confirm(ConfirmMessage.gradeChange)) {
      dispatch(changeGrade(memberInfo));
    }
  };
  const getChangeInfo = (memberID, grade) => {
    // 변경정보를 받아와 멤버정보를 수정합니다.
    let memberInfoTemp = memberInfo;
    memberInfoTemp[memberID - 1].grade = grade;
    setMemberInfo(memberInfoTemp);
  };

  const confirmDeny = data => {
    // open dialog box
  };
  const [memberInfo, setMemberInfo] = useState([]);
  // 멤버 정보 더미데이터 불러옵니다.
  const fetchData = () => {
    return fetch('memberInfo.json')
      .then(res => res.json())
      .then(data => data.memberInfo);
  };
  useEffect(() => {
    // 멤버 초기정보를 셋팅합니다.
    const initMemberInfo = async () => {
      const result = await fetchData(); // array 내부는 Object
      setMemberInfo(result);
    };
    initMemberInfo();
  }, []);

  return (
    <MemberInfoContainer>
      <MemberContainer>
        <MemberHeader>
          <tr>
            <HideTd>번호</HideTd>
            <td>닉네임</td>
            <td>학번</td>
            <td>이름</td>
            <td>학과</td>
            <td>학년</td>
            <td>연락처</td>
            <td>등급</td>
          </tr>
        </MemberHeader>
        <MemberList>
          {memberInfo &&
            memberInfo.map((value, index) => {
              return (
                <RegisteredMember
                  key={index}
                  memberNumber={index + 1}
                  nickname={value.nickname}
                  name={value.name}
                  studentID={value.studentID}
                  schoolGrade={value.schoolGrade}
                  major={value.major}
                  tel={value.tel}
                  grade={value.grade}
                  getMemberInfo={getChangeInfo}
                />
              );
            })}
          {/*<RegisteredMember MemberNumber={1} />
          <RegisteredMember MemberNumber={2} />
          <RegisteredMember MemberNumber={3} />
          <RegisteredMember MemberNumber={4} />*/}
        </MemberList>
      </MemberContainer>
      <ActionButtonContainer>
        <ModifyButton onClick={confirmGrant}>등급 승격/강등</ModifyButton>
      </ActionButtonContainer>
    </MemberInfoContainer>
  );
}

function RegisteredMember(props) {
  const memberDetailRef = React.createRef();
  const [grade, setGrade] = useState(props.grade);
  const changeGradeFunc = e => {
    setGrade(e.target.value);
    props.getMemberInfo(
      memberDetailRef.current.firstChild.innerHTML,
      e.target.value,
    );
  };
  return (
    <MemberPresenter ref={memberDetailRef}>
      <HideTd>{props.memberNumber}</HideTd>
      <td>
        <MemberDetailsLink href={`/manage/memberDetail/${props.nickname}`}>
          {props.nickname}
        </MemberDetailsLink>
      </td>
      <td>{props.studentID}</td>
      <td>{props.name}</td>
      <td>{props.major}</td>
      <td>{props.schoolGrade}</td>
      <td>{props.tel}</td>
      <td id="grade">
        <select value={grade} onChange={changeGradeFunc}>
          <option value="normal">일반</option>
          <option value="graduate">졸업생</option>
          <option value="manager">운영진</option>
          <option value="president">회장</option>
        </select>
      </td>
    </MemberPresenter>
  );
}

export default MemberInfoWindow;

const MemberInfoContainer = styled.div`
  *
`;

const MemberContainer = styled.table`
  width: 100%;
  margin-top: ${pixelToRem(40)};

  tr {
    height: ${pixelToRem(50)};
  }

  td {
    text-align: center;
    vertical-align: middle;

    font-size: ${pixelToRem(20)};
  }
`;

const MemberHeader = styled.thead`
  background: lightgray;
  font-weight: bold;
`;

const MemberList = styled.tbody`
  *
`;

const ActionButtonContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100px;
  align-items: center;
  justify-content: center;

  button {
    background-color: rgb(80, 80, 80);

    width: ${pixelToRem(120)};
    height: ${pixelToRem(40)};
    margin: ${pixelToRem(60)};
    border: 0;
    border-radius: 10px;
    color: white;
    font-size: ${pixelToRem(18)};
    &:hover {
      cursor: pointer;
    }
  }
`;

const DenyButton = styled.button`
  *
`;

const ModifyButton = styled.button`
  *
`;

const MemberPresenter = styled.tr`
  height: ${pixelToRem(30)};

  :nth-child(2n) {
    background: rgb(220, 220, 220);
  }
`;

const MemberDetailsLink = styled.a`
  color: ${theme.colors.blue};
  text-decoration-line: none;
  &:hover {
    cursor: pointer;
  }
`;

const HideTd = styled.td`
  display: none;
`;
