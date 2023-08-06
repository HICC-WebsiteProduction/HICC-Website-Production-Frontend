import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import theme from './../../styles/Theme';

import EachWaitingMember from '../eachItem/EachWatingMember';
import Checkbox from './../util/Checkbox';
import useCheckbox from '../../hook/useCheckbox';
import { request } from '../../utils/axios';
import useConfirm from '../../hook/useConfirm';
import ConfirmMessage from '../../constants/ConfirmMessage';
import useFetch from '../../hook/useFetch';
import Loading from './../util/Loading';

// 회원 승인 화면을 담당
function MemberAuthorizeWindow(props) {
  const [waitingMember, setWaitingMember] = useState([]); // 승인 대기자를 담음

  // 체크박스 관리를 위해
  const {
    checkboxList,
    setCheckboxList,
    checkAll,
    checkAllHandler,
    checkHandler,
  } = useCheckbox([]);

  const { data, loading, error } = useFetch('/admin/applicant');

  useEffect(() => {
    if (data) {
      setWaitingMember(data);

      // checkbox 초기 상태 설정
      if (data.length > 0) {
        const initialList = data.map(member => ({
          id: member.id,
          isChecked: false,
        }));
        setCheckboxList(initialList);
      }
    }
  }, [data]);

  // 승인 거절을 눌렀을 때 실행되는 함수
  // 이 파트는 실제 백엔드와 협의하여 제작함
  const confirmDeny = async () => {
    const checkedIdList = checkboxList
      .filter(member => member.isChecked)
      .map(member => member.id);

    const body = {
      id: 'C011001',
      targetIdList: checkedIdList,
    };

    try {
      await request('post', '/admin/deny', body);
      // 정상적인 결과는 resolve로 1을 전달해준다.
      return new Promise(resolve => resolve(1));
    } catch (error) {
      console.log(error);
    }
  };

  // 승인 허가를 눌렀을 때 실행되는 함수
  // 이 파트는 실제 백엔드와 협의하여 제작함
  const confirmGrant = async () => {
    const checkedIdList = checkboxList
      .filter(member => member.isChecked)
      .map(member => member.id);

    const body = {
      id: 'C011001',
      targetIdList: checkedIdList,
    };

    try {
      await request('post', '/admin/approve', body);
      // 정상적인 결과는 resolve로 1을 전달해준다.
      return new Promise(resolve => resolve(1));
    } catch (error) {
      console.log(error);
    }
  };

  // 승인 거절을 눌렀을 때 실행되는 확인 창
  const denyMember = useConfirm(
    ConfirmMessage.denyMembership,
    confirmDeny,
    '승인이 거부되었습니다.',
  );

  // 승인 허용을 눌렀을 때 실행되는 확인 창
  const approveMember = useConfirm(
    ConfirmMessage.approveMembership,
    confirmGrant,
    '승인이 허가되었습니다.',
  );

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
          {loading ? (
            <Loading />
          ) : (
            waitingMember &&
            checkboxList.length > 0 &&
            waitingMember.map((member, index) => (
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
            ))
          )}
        </WaitingMemberList>
      </WaitingMemberContainer>
      <ActionButtonContainer>
        <DenyButton onClick={denyMember}>가입 거부</DenyButton>
        <GrantButton onClick={approveMember}>가입 승인</GrantButton>
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
