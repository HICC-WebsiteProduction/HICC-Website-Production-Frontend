import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import theme from '../../styles/Theme';
import ConfirmMessage from '../../constants/ConfirmMessage';

import useConfirm from './../../hook/useConfirm';
import Checkbox from './../util/Checkbox';
import EachRegisteredMember from './../eachItem/EachRegisteredMember';
import getKeyByValue from './../../utils/getKeyByValue';
import useSelect from './../../hook/useSelect';

import { memberRole, rolePriority } from './../../constants/MemberRole';
import { request } from './../../utils/axios';
import useCheckbox from '../../hook/useCheckbox';
import { filterOptionValue } from '../../constants/FilterOptionValue';
import Filter from '../util/Filter';
import Button from '../util/Button';

// 회원 목록을 담당
function MemberInfoWindow(props) {
  const [memberInfo, setMemberInfo] = useState([]); // 회원 정보를 담고 있다.
  const [selectedRole, setSelectedRole] = useSelect(memberRole.GENERAL); // 회원 등급을 조정
  const [sort, setSort] = useSelect(filterOptionValue.member.role); // 정렬 기준을 조정
  const [keyword, setkeyword] = useState(''); // 검색창

  // 체크 박스를 위해
  const {
    checkboxList,
    setCheckboxList,
    checkAll,
    checkAllHandler,
    checkHandler,
  } = useCheckbox([]);

  // 멤버 정보 더미데이터 불러옵니다.
  const fetchData = async () => {
    try {
      const response = await request('post', '/admin/member', {
        id: 'C011001',
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  // 정보 로드
  useEffect(() => {
    const loadMemberInfo = async () => {
      const result = await fetchData(); // array 내부는 Object
      setMemberInfo(result);

      // checkbox 초기 상태 설정
      if (result.length > 0) {
        const initialList = result.map(member => ({
          id: member.id,
          isChecked: false,
        }));
        setCheckboxList(initialList);
      }
    };

    loadMemberInfo();
  }, []);

  useEffect(() => {
    console.log(checkboxList);
  }, [checkboxList]);

  // 변경정보를 받아와 멤버정보를 수정합니다.
  // 백엔드 개발자와 협의 완료
  // 변경 인원 중에 회장이 있으면 막아야하는데 아직 미구현
  const confirmGrant = async () => {
    const checkedIdList = checkboxList
      .filter(member => member.isChecked)
      .map(member => member.id);

    const body = {
      id: 'C011001',
      targetIdList: checkedIdList,
      role: getKeyByValue(memberRole, selectedRole),
    };

    try {
      await request('post', '/admin/modify', body);
      // 정상적인 결과는 resolve로 1을 전달해준다.
      return new Promise(resolve => resolve(1));
    } catch (error) {
      console.log(error);
    }
  };
  
  // 회원 등급 변경 버튼을 눌렀을 때 실행되는 함수
  const changeGrade = useConfirm(
    ConfirmMessage.gradeChange,
    confirmGrant,
    '회원 등급 변경에 성공하였습니다.',
  );

  // 등급 순, 이름 순, 학번 순으로 정렬하는 함수
  // 정렬이 완료되면 체크박스는 모두 해제된다.
  const sortMember = event => {
    setSort(event);
    const sortBy = event.target.value;

    if (sortBy === '이름 순') {
      const sortedMember = [...memberInfo].sort(sortByName);
      const sortedChecklist = sortedMember.map(member => ({
        id: member.id,
        isChecked: false,
      }));
      setMemberInfo(sortedMember);
      setCheckboxList(sortedChecklist);
    }

    if (sortBy === '학번 순') {
      const sortedMember = [...memberInfo].sort(sortById);
      const sortedChecklist = sortedMember.map(member => ({
        id: member.id,
        isChecked: false,
      }));
      setMemberInfo(sortedMember);
      setCheckboxList(sortedChecklist);
    }

    if (sortBy === '등급 순') {
      const sortedMember = [...memberInfo].sort(sortByRole);
      const sortedChecklist = sortedMember.map(member => ({
        id: member.id,
        isChecked: false,
      }));
      setMemberInfo(sortedMember);
      setCheckboxList(sortedChecklist);
    }
  };

  const sortByName = (a, b) => {
    if (a.name > b.name) return 1;
    if (a.name < b.name) return -1;
    return 0;
  };

  const sortById = (a, b) => {
    if (a.id > b.id) return 1;
    if (a.id < b.id) return -1;
    return 0;
  };

  const sortByRole = (a, b) => {
    return rolePriority[a.role] - rolePriority[b.role];
  };

  // 검색 결과를 보여주는 함수
  // 아직 미구현
  const searchMember = () => {
    console.log(keyword);
  };

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
              <Checkbox
                checkboxId="allcheck"
                checked={checkAll}
                onChange={event => checkAllHandler(event.target.checked)}
              />
            </td>
          </tr>
        </MemberHeader>
        <MemberList>
          {memberInfo &&
            checkboxList.length > 0 &&
            memberInfo.map((value, index) => {
              return (
                <EachRegisteredMember
                  key={value.id}
                  nickname={value.nickname}
                  name={value.name}
                  major={value.major}
                  id={value.id}
                  phoneNumber={value.phoneNumber}
                  role={value.role}
                  isChecked={checkboxList[index].isChecked}
                  onChange={checkHandler}
                />
              );
            })}
        </MemberList>
      </MemberContainer>

      <FilterContainer>
        <Filter optionValue={filterOptionValue.member} onChange={sortMember} />
        <Gap />
        <KeywordSearch
          placeholder="검색어를 입력하세요"
          value={keyword}
          onChange={event => setkeyword(event.target.value)}
        />
        <SearchButton buttonName="검색" onClick={searchMember} />
      </FilterContainer>

      <ActionButtonContainer>
        <ChangeGradeSelect onChange={setSelectedRole}>
          <GradeOption value={memberRole.GENERAL}>일반</GradeOption>
          <GradeOption value={memberRole.GRADUATE}>졸업생</GradeOption>
          <GradeOption value={memberRole.EXECUTIVE}>운영진</GradeOption>
        </ChangeGradeSelect>
        <ModifyButton onClick={changeGrade}>등급 수정</ModifyButton>
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

const FilterContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: ${theme.componentSize.maxWidth};
  margin: 50px auto;
`;

const Gap = styled.div`
  width: 20px;
  height: 20px;
`;

const KeywordSearch = styled.input`
  width: 250px;
  height: 45px;
  padding: 6.5px 10px;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid ${theme.colors.white};
  outline: none;

  color: ${theme.colors.white};
  font-family: 'Pretendard';
  font-weight: 300;
  font-size: ${theme.fontSizes.paragraph};
  line-height: 150%;

  &::placeholder {
    color: ${theme.colors.white};
  }
`;

const SearchButton = styled(Button)`
  width: 80px;
  height: 45px;
  margin-left: 20px;

  background-color: ${theme.colors.green};
  border-radius: 40px;
  color: ${theme.colors.white};
  font-family: 'Pretendard';
  font-weight: 500;
  font-size: ${theme.fontSizes.paragraph};
  line-height: 150%;
`;
