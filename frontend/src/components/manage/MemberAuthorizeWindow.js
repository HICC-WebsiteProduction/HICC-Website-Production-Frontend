import React, { useEffect } from 'react';
import styled from 'styled-components';
import theme from './../../styles/Theme';

import { waitingMember } from '../../dummy/watingMember';
import EachWaitingMember from '../eachItem/EachWatingMember';
import Checkbox from './../util/Checkbox';
import useCheckbox from '../../hook/useCheckbox';

function MemberAuthorizeWindow(props) {
  const confirmGrant = data => {
    // open dialog box
  };

  const confirmDeny = data => {
    // open dialog box
  };

  const waitingMemberList = waitingMember;

  const initialList = waitingMemberList.map(member => ({
    id: member.id,
    isChecked: false,
  }));

  const { checkboxList, checkAll, checkAllHandler, checkHandler } =
    useCheckbox(initialList);

  useEffect(() => {
    console.log(checkboxList);
  }, [checkboxList]);

  return (
    <MemberAuthorizeContainer>
      <MemberAuthorizeListTitle>
        승인대기자 목록
        <Indicator />
      </MemberAuthorizeListTitle>

      <WaitingMemberContainer>
        <WaitingMemberHeader>
          <tr>
            <td>등급</td>
            <td>이름</td>
            <td>학번</td>
            <td>전공</td>
            <td>닉네임</td>
            <td>연락처</td>
            <td>
              <Checkbox
                checkboxId="allcheck"
                checked={checkAll}
                onChange={event => checkAllHandler(event.target.checked)}
              />
            </td>
          </tr>
        </WaitingMemberHeader>
        <WaitingMemberList>
          {waitingMemberList &&
            waitingMemberList.map((member, index) => (
              <EachWaitingMember
                key={`memberauthorize${index}`}
                nickname={member.nickname}
                name={member.name}
                major={member.major}
                id={member.id}
                phoneNumber={member.phoneNumber}
                role={member.role}
                isChecked={checkboxList[index].isChecked}
                onChange={checkHandler}
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
  font-size: ${theme.fontSizes.label};
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
    font-size: ${theme.fontSizes.label};
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
