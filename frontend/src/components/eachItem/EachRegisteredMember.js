import styled from 'styled-components';
import theme from '../../styles/Theme';
import { Link } from 'react-router-dom';
import Checkbox from '../util/Checkbox';
import { memberGrade } from '../../constants/MemberGrade';

function EachRegisteredMember(props) {
  const changeSelect = e => {
    props.getMemberInfo(props.studentID, e.target.checked);
  };

  return (
    <MemberPresenter>
      <td>{memberGrade[props.grade]}</td>
      <td>{props.name}</td>
      <td>{props.studentID}</td>
      <td>
        <MemberDetailsLink to={`/manage/memberinfo/${props.nickname}`}>
          {props.nickname}
        </MemberDetailsLink>
      </td>
      <td>{props.call}</td>
      <td>
        <Checkbox value={props.studentID} onChange={changeSelect} />
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
