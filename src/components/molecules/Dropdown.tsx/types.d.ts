export interface DropdownItem {
  value: string | number | null;
  label?: string;
}

export interface DropdownItemProps {
  item: DrodownItem;
}

export interface DropdownProps {
  options: DrodownItem[];
  value?: string | number;
  name?: string;
  placeholder?: string;
  hasError?: boolean;
  onChange?: (selected?: DrodownItem) => void;
}
