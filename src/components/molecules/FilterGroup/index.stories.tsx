import { useState } from "react";
import FilterGroup from "./index";
import { Meta, StoryFn } from "@storybook/react";

export default {
  title: "Molecules/FilterGroup",
  argTypes: {
    title: {
      control: { type: "text" },
      description: "제목",
      table: {
        type: { summary: "string" },
      },
    },
    items: {
      control: { type: "array" },
      description: "옵션",
      table: {
        type: { summary: "array" },
      },
    },
    onChange: {
      description: "onChange 이벤트 핸들러",
      table: {
        type: { summary: "function" },
      },
    },
  },
} as Meta<typeof FilterGroup>;

const Template: StoryFn<typeof FilterGroup> = (args) => {
  const [value, setValue] = useState<string[]>([]);
  const handleChange = (value: string[]) => {
    setValue(value);
    args && args.onChange && args.onChange(value);
  };

  return <FilterGroup value={value} onChange={handleChange} {...args} />;
};

export const Standard = Template.bind({});
Standard.args = {
  title: "All categories",
  items: [
    { label: "Clothes", name: "clothes" },
    { label: "Books", name: "books" },
    { label: "Shoes", name: "shoes" },
  ],
};
