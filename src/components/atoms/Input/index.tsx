import styled, { css } from "styled-components";

// 텍스트 경계선 설정을 외부에서 입력 가능하도록 했습니다.

const Input = styled.input<{ hasError?: boolean; hasBorder?: boolean }>`
  color: ${({ theme }: any) => theme.colors.inputText};
  ${({ theme, hasBorder, hasError }) => {
    if (hasBorder) {
      return css`
        border: 1px solid ${hasError ? theme.colors.dange : theme.colors.border};
        border-radius: 5px;
      `;
    } else {
      return css`
        border: none;
      `;
    }
  }};
  padding: 11px 12px 12px 9px;
  box-sizing: border-box;
  outline: none;
  width: 100%;
  height: 38px;
  font-size: 16px;
  line-height: 19px;

  &::placeholder {
    color: ${({ theme }) => theme.colors.placeholder};
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &[type="number"] {
    -moz-appearance: textfield;
  }
`;

Input.defaultProps = {
  hasBorder: true,
};

export default Input;
