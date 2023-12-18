import React, { useCallback, useState } from "react";
import styled from "styled-components";

// 최대 행수까지 줄바꿈 했을 때 그 높이가 바뀐다. 보통의 textarea는 행수가 입력에 따라 늘어나지 않아서 기능적으로 구현하는데
// onchage로 값이 바뀌면 scrollheight로부터 현재 표시하고 있는 행수를 파악하고, setTextareaRows로 최대 행수 maxRow를 넘지 않도록 동적으로 변경한다.

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  //최소 행수
  minRows?: number;

  //최대 행수
  maxRows?: number;

  hasError?: boolean;
}

const StyledTextArea = styled.textarea<{ hasError?: boolean }>`
  color: ${({ theme }) => theme.colors.inputText};
  border: 1px solid
    ${({ theme, hasError }) =>
      hasError ? theme.colors.danger : theme.colors.border};
  border-radius: 5px;
  box-sizing: border-box;
  outline: none;
  width: 100%;
  font-size: 16px;
  line-height: 24px;
  padding: 9px 12px 10px 12px;
  resize: none; // 크기가 맘대로 변하지 않을 수 있음.
  overflow: auto;
  height: auto;

  &::placeholder {
    color: ${({ theme }) => theme.colors.placeholder};
  }
`;

const TextArea = (props: TextAreaProps) => {
  const {
    rows = 5,
    minRows = 5,
    maxRows = 10,
    children,
    hasError,
    onChange,
    ...rest
  } = props;

  const [textareaRows, setTextareaRows] = useState(Math.min(rows, minRows));

  console.assert(
    !(rows < minRows),
    "TextArea: rows should be greater than minRows"
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const textareaLineHeight = 24;
      const previousRows = e.target.rows;
      // 행수 초기화
      e.target.rows = minRows;
      // 현재 행수
      const currentRows = Math.floor(
        e.target.scrollHeight / textareaLineHeight
      );

      if (currentRows === previousRows) {
        e.target.rows = currentRows;
      }

      if (currentRows >= maxRows) {
        e.target.rows = maxRows;
        e.target.scrollTop = e.target.scrollHeight;
        // 스크롤 탑은 textArea에서 스크롤 위치를 나타냄 제일 위가 0 임 -> 지금까지 스크롤을 해온 길이를 구할 수 있다.
        // scroll height는 페이지 전체 글의 길이이다.
      }
      setTextareaRows(currentRows < maxRows ? currentRows : maxRows);
      onChange && onChange(e);
    },
    [onChange, minRows, maxRows]
  );

  return (
    <StyledTextArea
      hasError={hasError}
      onChange={handleChange}
      aria-label={rest.placeholder}
      rows={textareaRows}
      {...rest}
    >
      {children}
    </StyledTextArea>
  );
};

TextArea.defaultProps = {
  rows: 5,
  minRows: 5,
  maxRows: 10,
};

export default TextArea;
