import styled from 'styled-components';
import theme from '../../styles/Theme';
import { Link } from 'react-router-dom';
import Checkbox from '../util/Checkbox';
import { memberRole } from '../../constants/MemberRole';

// 관리페이지에서 등록된 멤버 한 줄을 보여주는 함수
// 닉네임, 이름, 전공, 아이디(학번), 전화번호, 등급, 체크여부, onChange 함수를 넘겨받는다.
// 닉네임을 클릭하면 회원 상세 페이지로 이동한다.
function EachRegisteredMember(props) {
  const { nickname, name, major, id, phoneNumber, role, isChecked, onChange } =
    props;

  // 체크박스가 선택될 때 해당 부원의 학번과 체크 여부를 전달해준다.
  const changeSelect = e => {
    onChange(id, e.target.checked);
  };

  return (
    <MemberPresenter key={id}>
      <td>{memberRole[role]}</td>
      <td>{name}</td>
      <td>{id}</td>
      <td>{major}</td>
      <td>
        <MemberDetailsLink to={`/manage/memberinfo/${nickname}`}>
          {nickname}
        </MemberDetailsLink>
      </td>
      <td>{phoneNumber}</td>
      <td>
        <Checkbox value={id} checked={isChecked} onChange={changeSelect} />
      </td>
    </MemberPresenter>
  );
}

export default EachRegisteredMember;

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
