import styled from 'styled-components';
import theme from '../../styles/Theme';
import Checkbox from './../util/Checkbox';
import { memberRole } from '../../constants/MemberRole';

// 회원 승인 페이지에서 승인 대기자를 보여주는 기능
// 등급, 이름, 학번, 전공, 닉네임, 전화번호, 체크여부, onChange를 넘겨받음
function EachWaitingMember(props) {
  const { role, name, id, major, nickname, phoneNumber, isChecked, onChange } =
    props;

  // 등록된 회원과 기능 동일 (학번과, 체크여부 넘겨줌)
  const changeSelect = e => {
    onChange(id, e.target.checked);
  };

  return (
    <MemberPresenter>
      <td>{memberRole[role]}</td>
      <td>{name}</td>
      <td>{id}</td>
      <td>{major}</td>
      <td>{nickname}</td>
      <td>{phoneNumber}</td>
      <td>
        <Checkbox value={id} checked={isChecked} onChange={changeSelect} />
      </td>
    </MemberPresenter>
  );
}

const MemberPresenter = styled.tr`
  height: 40px;
  border-bottom: 1px solid ${theme.colors.white};

  color: ${theme.colors.white};
  font-family: 'Pretendard';
  font-weight: 300;
  font-size: ${theme.fontSizes.paragraph};
  text-align: center;
`;

export default EachWaitingMember;
