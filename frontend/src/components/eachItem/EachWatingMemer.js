import styled from 'styled-components';
import theme from '../../styles/Theme';
import { useState } from 'react';
import Checkbox from '../Checkbox';

function EachWaitingMember(props) {
  const [checked, setChecked] = useState(false);
  return (
    <MemberPresenter>
      <td>{props.no}</td>
      <td>{props.name}</td>
      <td>{props.studentNo}</td>
      <td>{props.nickname}</td>
      <td>{props.call}</td>
      <td>
        <Checkbox checkboxId={props.no} />
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
