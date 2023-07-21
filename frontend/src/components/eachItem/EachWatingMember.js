import styled from 'styled-components';
import theme from '../../styles/Theme';
import Checkbox from './../util/Checkbox';
import { memberRole } from '../../constants/MemberRole';

function EachWaitingMember(props) {
  const { role, name, id, major, nickname, phoneNumber, isChecked, onChange } =
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
