import React from 'react';
import styled from 'styled-components';
import theme from '../styles/Theme';

const pixelToRem = size => `${size / 16}rem`;

export default function LoginInputMemberInfo(props) {
  return (
    <InputLoginInfo
      placeholder={props.placeholder}
      name={props.name}
      type={props.type}
      maxLength={props.maxLength}
      {...props.register(props.name, {
        required: {
          value: props.required,
          message: props.requiredMessage,
        },
        pattern: {
          value: props.validPattern,
          message: props.validPatternMessage,
        },
      })}
    />
  );
}

const InputLoginInfo = styled.input`
  width: ${pixelToRem(156)};
  height: ${pixelToRem(20)};
  margin: ${pixelToRem(5)} 0;
  padding: ${pixelToRem(4)} ${pixelToRem(7)};
  background: rgba(0, 0, 0, 0.05);
  border-radius: ${pixelToRem(5)};
  border: none;
  font-size: ${theme.fontSizes.font_micro};
  color: ${theme.colors.white};
  &:focus {
    outline: ${pixelToRem(1)} solid ${theme.colors.white};
  }
  &::placeholder {
    color: ${theme.colors.white};
  }
`;
