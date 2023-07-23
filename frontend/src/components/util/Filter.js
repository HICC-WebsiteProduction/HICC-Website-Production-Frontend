import styled from 'styled-components';
import theme from './../../styles/Theme';

export default function Filter(props) {
  const options = Object.keys(props.optionValue);

  return (
    <FilterContainer onChange={props.onChange}>
      {options.map((option, idx) => (
        <Option key={idx} value={props.optionValue[option]}>
          {props.optionValue[option]}
        </Option>
      ))}
    </FilterContainer>
  );
}

const FilterContainer = styled.select`
  width: 150px;
  height: 45px;
  padding: 10px;
  border: none;
  border-bottom: 1px solid ${theme.colors.white};
  background-color: transparent;
  outline: none;

  color: ${theme.colors.white};
  font-family: 'Pretendard';
  font-weight: 500;
  font-size: ${theme.fontSizes.paragraph};
  line-height: 150%;
`;

const Option = styled.option`
  width: 150px;
  height: 45px;
  padding: 10px;

  color: ${theme.colors.black};
  font-family: 'Pretendard';
  font-weight: 300;
  font-size: ${theme.fontSizes.paragraph};
  line-height: 150%;
`;
