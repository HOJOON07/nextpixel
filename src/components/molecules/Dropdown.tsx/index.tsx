import Text from "@/components/atoms/Text";
import Flex from "@/components/layout/Flex";
import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { DropdownItem, DropdownItemProps, DropdownProps } from "./types";

const DrodownItem = (props: DropdownItemProps) => {
  const { item } = props;

  return (
    <Flex alignItems="center">
      <Text margin={0} variant="small">
        {item.label ?? item.value}
      </Text>
    </Flex>
  );
};

const Dropdown = (props: DropdownProps) => {
  const { onChange, name, value, options, hasError } = props;
  const initialItem = options.find((item) => item.value === value);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(initialItem);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleDocumentClick = useCallback((e: MouseEvent | TouchEvent) => {
    // 자기 자신을 클릭하면 아무것도 하지 않으려고
    if (dropdownRef.current) {
      // 코드 설명 :
      const elements = dropdownRef.current.querySelectorAll("*");
      for (let i = 0; i < elements.length; i++) {
        if (elements[i] == e.target) return;
      }
    }
    setIsOpen(false);
  }, []);

  const handleMouseDown = (e: React.SyntheticEvent) => {
    setIsOpen((isOpen) => !isOpen);
    e.stopPropagation();
  };

  const handleSelectValue = (
    e: React.FormEvent<HTMLDivElement>,
    item: DropdownItem
  ) => {
    e.stopPropagation();

    setSelectedItem(item);
    setIsOpen(false);
    onChange && onChange(item);
  };

  useEffect(() => {
    //화면 밖이랑 터치에 대한 이벤트 구독 설정
    document.addEventListener("click", handleDocumentClick, false);
    document.addEventListener("touchend", handleDocumentClick, false);

    return function cleanup() {
      document.removeEventListener("click", handleDocumentClick, false);
      document.removeEventListener("touchend", handleDocumentClick, false);

      //처음 한번만 호출
    };
  }, []);

  return (
    <DropdownRoot ref={dropdownRef}>
      <DropdownControl
        hasError={hasError}
        onMouseDown={handleMouseDown}
        onTouchEnd={handleMouseDown}
        data-testid="dropdown-control"
      >
        {/* 선택한거 있으면 */}
        {selectedItem && (
          <DropdownValue>
            <DrodownItem item={selectedItem}></DrodownItem>
          </DropdownValue>
        )}
        {!selectedItem && (
          <DropdownPlaceholder>{props?.placeholder}</DropdownPlaceholder>
        )}
        <input
          type="hidden"
          name={name}
          value={selectedItem?.value ?? ""}
          onChange={() => onChange && onChange(selectedItem)}
        ></input>
        <DropdownArrow isOpen={isOpen}></DropdownArrow>
      </DropdownControl>
      {isOpen && (
        <DropdownMenu>
          {props.options.map((item, idx) => (
            <DropdownOption
              key={idx}
              onMouseDown={(e) => handleSelectValue(e, item)}
              onClick={(e) => handleSelectValue(e, item)}
              data-testid="dropdown-option"
            >
              <DrodownItem item={item}></DrodownItem>
            </DropdownOption>
          ))}
        </DropdownMenu>
      )}
    </DropdownRoot>
  );
};

export default Dropdown;

const DropdownRoot = styled.div`
  position: relative;
  height: 38px;
`;

const DropdownControl = styled.div<{ hasError?: boolean }>`
  position: relative;
  overflow: hidden;
  background-color: #ffffff;
  border: ${({ theme, hasError }) =>
    hasError
      ? `1px solid ${theme.colors.danger}`
      : `1px solid ${theme.colors.border}`};
  border-radius: 5px;
  box-sizing: border-box;
  cursor: default;
  outline: none;
  padding: 8px 52px 8px 12px;
`;

const DropdownValue = styled.div`
  color: ${({ theme }) => theme.colors.text};
`;

const DropdownPlaceholder = styled.div`
  color: #757575;
  font-size: ${({ theme }) => theme.fontSize[1]};
  min-height: 20px;
  line-height: 20px;
`;

const DropdownArrow = styled.div<{ isOpen?: boolean }>`
  border-color: ${({ isOpen }) =>
    isOpen
      ? `transparent transparent #222222`
      : `#222222 transparent transparent`};
  border-width: ${({ isOpen }) => (isOpen ? "0 5px 5px" : "5px 5px 0;")};
  border-style: solid;
  content: "";
  display: block;
  height: 0;
  margin-top: -ceil(2.5);
  position: absolute;
  right: 10px;
  top: 16px;
  width: 0;
`;

const DropdownMenu = styled.div`
  background-color: #ffffff;
  border: ${({ theme }) => theme.colors.border};
  box-shadow:
    0px 5px 5px -3px rgb(0 0 0 / 20%),
    0px 8px 10px 1px rgb(0 0 0 / 10%),
    0px 3px 14px 2px rgb(0 0 0 / 12%);
  box-sizing: border-box;
  border-radius: 5px;
  margin-top: -1px;
  max-height: 200px;
  overflow: auto;
  position: absolute;
  top: 100%;
  width: 100%;
  z-index: 1000;
`;

const DropdownOption = styled.div`
  padding: 8px 12px 8px 12px;
  &:hover {
    background-color: #f9f9f9;
  }
`;
