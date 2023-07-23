import styled from 'styled-components';
import theme from '../../styles/Theme';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { getSVGURL } from '../../utils/getSVGURL';

// 체크박스 스타일을 커스텀해서 새로 만든 체크박스
function Checkbox(props) {
  return (
    <StyledInput
      type="checkbox"
      id={props.checkboxId}
      name={props.checkboxId}
      vlaue={props.value}
      checked={props.checked}
      onChange={props.onChange}
    />
  );
}
export default Checkbox;

const StyledInput = styled.input`
  appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid ${theme.colors.white};
  border-radius: 3px;

  &:checked {
    font-weight: 900;
    background-image: url(${getSVGURL(faCheck, theme.colors.white)});
    background-size: 70% 70%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: ${theme.colors.black};
  }
`;
