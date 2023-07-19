import styled from 'styled-components';
import theme from '../../styles/Theme';
import { Link } from 'react-router-dom';
import Checkbox from '../util/Checkbox';
import { memberRole } from '../../constants/MemberRole';

function EachRegisteredMember(props) {
  const changeSelect = e => {
    props.getMemberInfo(props.id, e.target.checked);
  };

  return (
    <MemberPresenter>
      <td>{memberRole[props.role]}</td>
      <td>{props.name}</td>
      <td>{props.id}</td>
      <td>{props.major}</td>
      <td>
        <MemberDetailsLink to={`/manage/memberinfo/${props.nickname}`}>
          {props.nickname}
        </MemberDetailsLink>
      </td>
      <td>{props.phoneNumber}</td>
      <td>
        <Checkbox value={props.id} onChange={changeSelect} />
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
