import styled from 'styled-components';
import theme from '../../styles/Theme';
import { Link } from 'react-router-dom';
import Checkbox from '../util/Checkbox';
import { memberRole } from '../../constants/MemberRole';

function EachRegisteredMember(props) {
  const { nickname, name, major, id, phoneNumber, role, isChecked, onChange } =
    props;

  const changeSelect = e => {
    onChange(id, e.target.checked);
  };

  return (
    <MemberPresenter>
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
