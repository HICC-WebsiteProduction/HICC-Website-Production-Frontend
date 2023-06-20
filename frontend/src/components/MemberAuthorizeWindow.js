import React from 'react';
import styled from 'styled-components';

const pixelToRem = size => `${size / 16}rem`;

function MemberAuthorizeWindow(props) {
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

  return (
    <MemberAuthorizeContainer className={props.className}>
      <Toolbar>
        <SelectAllTool onClick={selectToggle}>전체 선택 및 해제</SelectAllTool>
      </Toolbar>
      <WaitingMemberContainer>
        <WaitingMemberHeader>
          <tr>
            <td>닉네임</td>
            <td>ID</td>
            <td>이름</td>
            <td>학과</td>
            <td>학년</td>
            <td>연락처</td>
            <td>선택</td>
          </tr>
        </WaitingMemberHeader>
        <WaitingMemberList ref={memberListRef}>
          <WaitingMember>Member 1</WaitingMember>
          <WaitingMember>Member 2</WaitingMember>
          <WaitingMember>Member 3</WaitingMember>
          <WaitingMember>Member 4</WaitingMember>
        </WaitingMemberList>
      </WaitingMemberContainer>
      <ActionButtonContainer>
        <DenyButton onClick={confirmDeny}>가입 거부</DenyButton>
        <GrantButton onClick={confirmGrant}>가입 승인</GrantButton>
      </ActionButtonContainer>
    </MemberAuthorizeContainer>
  );
}

function WaitingMember(props) {
  return (
    <MemberPresenter>
      <td>1</td>
      <td>2</td>
      <td>3</td>
      <td>4</td>
      <td>5</td>
      <td>6</td>
      <td>
        <input type="checkbox" name="color" value="blue" />
      </td>
    </MemberPresenter>
  );
}

export default MemberAuthorizeWindow;

const MemberAuthorizeContainer = styled.div`
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
  font-weight: light;
  align-self: end;
`;

const WaitingMemberContainer = styled.table`
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

const WaitingMemberHeader = styled.thead`
  background: lightgray;
  font-weight: bold;
`;

const WaitingMemberList = styled.tbody`
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
    font-size: ${pixelToRem(20)};
  }
`;

const DenyButton = styled.button`
  *
`;

const GrantButton = styled.button`
  *
`;

const MemberPresenter = styled.tr`
  height: ${pixelToRem(30)};

  :nth-child(2n) {
    background: rgb(220, 220, 220);
  }
`;

// function AuthConfirmDialog(props) {
//   return (
//     <AuthConfirmDialogContainer>
//       <AuthComfirmDialogMessage>
//         <span>가입을 거부/승인 하시겠습니까?!!!!!</span>
//         <span>진짜? 정말? 후회 없죠?</span>
//       </AuthComfirmDialogMessage>
//       <AuthConfirmDialogButtonContainer>
//         <AuthConfirmDialogCancel>Cancel</AuthConfirmDialogCancel>
//         <AuthConfirmDialogOk>OK</AuthConfirmDialogOk>
//       </AuthConfirmDialogButtonContainer>
//     </AuthConfirmDialogContainer>
//   );
// }

// const AuthConfirmDialogContainer = styled.div`
//   height: ${pixelToRem(400)};
//   width: ${pixelToRem(800)};

//   background: lightgray;
// `;

// const AuthComfirmDialogMessage = styled.div`
//   width: 100%;
//   height: 55%;
// `;

// const AuthConfirmDialogButtonContainer = styled.div`
//   width: 100%;
//   height: 45%;
// `;

// const AuthConfirmDialogCancel = styled.button`
//   *
// `;

// const AuthConfirmDialogOk = styled.button`
//   *
// `;
