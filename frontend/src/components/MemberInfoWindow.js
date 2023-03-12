import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import theme from '../styles/Theme';

const pixelToRem = size => `${size / 16}rem`;

function MemberInfoWindow(props) {
  const memberListRef = React.createRef();
  let toggleNext = false;
  const selectToggle = data => {
    const memberList = memberListRef.current.children;
    let checkedAny = false;

    // if checked any, remove every checkbox
    for (const element of memberList) {
      let tdList = element.children;
      if (tdList[tdList.length - 1].children[0].checked === true) {
        checkedAny = true;
        break;
      }
    }
    if (checkedAny === true) {
      toggleNext = false;
    }

    // transition : toggle check
    for (const element of memberList) {
      let tdList = element.children;
      console.log(tdList[tdList.length - 1].children[0].checked);
      tdList[tdList.length - 1].children[0].checked = toggleNext;
    }

    toggleNext = !toggleNext;
  };

  const confirmGrant = data => {
    // open dialog box
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
  // 최초 1회만 부르도록 설정하려면 마지막에 빈 배열을 넣어 문제를 해결할 수 있지만
  // 탭 이동으로 이 화면으로 넘어오는 상황이라 (페이지가 처음 로드되는 상황이 아님) 그럴 수가 없는 상황입니다.
  // 해결책 아시는 분 알려주시면....
  useEffect(() => {
    const initMemberInfo = async () => {
      const result = await fetchData();
      setMemberInfo(result);
    };
    initMemberInfo();
  });

  return (
    <MemberInfoContainer className={props.className}>
      <Toolbar>
        <SelectAllTool onClick={selectToggle}>전체 선택 및 해제</SelectAllTool>
      </Toolbar>
      <MemberContainer>
        <MemberHeader>
          <tr>
            <td>닉네임</td>
            <td>학번</td>
            <td>이름</td>
            <td>학과</td>
            <td>학년</td>
            <td>연락처</td>
            <td>등급</td>
            <td>선택</td>
          </tr>
        </MemberHeader>
        <MemberList ref={memberListRef}>
          {memberInfo.map((value, index) => {
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
  return (
    <MemberPresenter>
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
      <td>
        <select defaultValue={props.grade}>
          <option value="normal">일반</option>
          <option value="graduate">졸업생</option>
          <option value="manager">운영진</option>
          <option value="president">회장</option>
        </select>
      </td>
      <td>
        <input type="checkbox" name="color" value="blue" />
      </td>
    </MemberPresenter>
  );
}

export default MemberInfoWindow;

const MemberInfoContainer = styled.div`
  *
`;

const Toolbar = styled.div`
  display: flex;
  width: 100%;
  height: ${pixelToRem(40)};
  justify-content: right;
`;

const SelectAllTool = styled.button`
  margin-right: ${pixelToRem(5)};
  border: 0;
  color: rgb(150, 150, 150);
  font-size: ${pixelToRem(8)};
  font-weight: lighter;
  align-self: end;
  &:hover {
    cursor: pointer;
  }
`;

const MemberContainer = styled.table`
  width: 100%;

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
