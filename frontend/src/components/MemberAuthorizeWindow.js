import React from 'react';
import styled from 'styled-components';
import theme from '../styles/Theme';
import { waitingMember } from './../dummy/watingMember';

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

  const waitingMemberList = waitingMember;

  return (
    <MemberAuthorizeContainer>
      <MemberAuthorizeListTitle>
        승인대기자 목록
        <Indicator />
      </MemberAuthorizeListTitle>

      <WaitingMemberContainer>
        <WaitingMemberHeader>
          <tr>
            <td>NO.</td>
            <td>이름</td>
            <td>학번</td>
            <td>닉네임</td>
            <td>전화번호</td>
            <td>
              <input type="checkbox" onClick={selectToggle} />
            </td>
          </tr>
        </WaitingMemberHeader>
        <WaitingMemberList ref={memberListRef}>
          {waitingMemberList.map((member, index) => (
            <WaitingMember
              key={`member${index}`}
              no={index + 1}
              name={member.name}
              studentNo={member.studentNo}
              nickname={member.nickname}
              call={member.call}
            />
          ))}
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
      <td>{props.no}</td>
      <td>{props.name}</td>
      <td>{props.studentNo}</td>
      <td>{props.nickname}</td>
      <td>{props.call}</td>
      <td>
        <input type="checkbox" name="color" value="blue" />
      </td>
    </MemberPresenter>
  );
}

export default MemberAuthorizeWindow;

const MemberAuthorizeContainer = styled.div`
  width: 100%;
  height: 100vh;
`;

const MemberAuthorizeListTitle = styled.span`
  position: relative;
  padding-bottom: 10px;
  border-bottom: 3px solid #3cda5b;
  color: ${theme.colors.white};
  font-family: 'Pretendard';
  font-weight: 600;
  font-size: 25px;
`;

const Indicator = styled.div`
  position: absolute;
  top: 40px;
  left: 42%;
  width: 0;
  height: 0;
  border-bottom: 10px solid transparent;
  border-top: 10px solid #3cda5b;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
`;

const WaitingMemberContainer = styled.table`
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

const WaitingMemberHeader = styled.thead`
  background: transparent;
  border-bottom: 1px solid ${theme.colors.white};
  color: ${theme.colors.white};

  font-family: 'Pretendard';
  font-weight: 600;
  text-align: center;
  font-size: ${theme.fontSizes.paragraph};
`;

const WaitingMemberList = styled.tbody``;

const ActionButtonContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100px;
  margin-top: 50px;
  align-items: center;
  justify-content: center;

  button {
    width: 160px;
    height: 60px;
    margin: 60px;
    border: 0;
    border-radius: 10px;
    color: white;

    font-family: 'Pretendard';
    font-weight: 600;
    font-size: 25px;
  }
`;

const DenyButton = styled.button`
  background: #ff8764;

  &:hover {
    cursor: pointer;
  }
`;

const GrantButton = styled.button`
  background: #3cda5b;

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
  font-size: 20px;
  text-align: center;
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
