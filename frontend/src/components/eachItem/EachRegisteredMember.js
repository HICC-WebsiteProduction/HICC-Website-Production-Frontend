import styled from 'styled-components';
import theme from '../../styles/Theme';
import { Link } from 'react-router-dom';
import Checkbox from '../Checkbox';

function EachRegisteredMember(props) {
  const memberGrade = {
    president: '회장',
    manager: '운영진',
    normal: '일반',
    graduate: '졸업생',
  };

  const changeSelect = e => {
    props.getMemberInfo(props.studentID, e.target.checked);
  };

  return (
    <MemberPresenter>
      <td>{memberGrade[props.grade]}</td>
      <td>{props.name}</td>
      <td>{props.studentID}</td>
      <td>
        <MemberDetailsLink to={`/manage/memberDetail/${props.nickname}`}>
          {props.nickname}
        </MemberDetailsLink>
      </td>
      <td>{props.tel}</td>
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
