import {
  CheckBoxIcon,
  CheckBoxOutlineBlankIcon,
} from "@/components/atoms/IconButton";
import Text from "@/components/atoms/Text";
import Flex from "@/components/layout/Flex";
import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";

export interface CheckBoxProps
  // omit은 특정 속성을 제거하는 유틸리티 타입이다.
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "defaultValue"> {
  label?: string;
}

const CheckBoxElement = styled.input`
  display: none;
`;

const Label = styled.label`
  cursor: pointer;
  margin-left: 6px;
  user-select: none;
`;

const CheckBox = (props: CheckBoxProps) => {
  const { id, label, onChange, checked, ...rest } = props;
  const [isCheckd, setIsChecked] = useState(checked);
  const ref = useRef<HTMLInputElement>(null);
  const onClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      //체크 박스를 클릭하게 한다 먼저
      ref.current?.click();
      setIsChecked((isCheckd) => !isCheckd);
    },
    [ref, setIsChecked]
  );
  useEffect(() => {
    setIsChecked(checked ?? false);
  }, [checked]);
  return (
    <>
      <CheckBoxElement
        {...rest}
        ref={ref}
        type="checkbox"
        checked={isCheckd}
        readOnly={!onChange}
        onChange={onChange}
      ></CheckBoxElement>
      <Flex alignItems="center">
        {checked ?? isCheckd ? (
          <CheckBoxIcon size={20} onClick={onClick}></CheckBoxIcon>
        ) : (
          <CheckBoxOutlineBlankIcon
            size={20}
            onClick={onClick}
          ></CheckBoxOutlineBlankIcon>
        )}
        {label && label.length > 0 && (
          <Label htmlFor={id} onClick={onClick}>
            <Text>{label}</Text>
          </Label>
        )}
      </Flex>
    </>
  );
};

export default CheckBox;
