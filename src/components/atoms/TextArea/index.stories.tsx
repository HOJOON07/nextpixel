import { Meta, StoryFn } from "@storybook/react";
import TextArea from ".";

export default {
  title: "Atoms/textArea",
  argTypes: {
    placeholder: {
      control: { type: "text" },
      description: "플레이스 홀더!",
      table: {
        type: { summary: "string" },
      },
    },
    rows: {
      control: { type: "number" },
      defaultValue: 5,
      description: "행 수",
      table: {
        type: { summary: "number" },
      },
    },
    minRows: {
      control: { type: "number" },
      defaultValue: 5,
      description: "최소 행수",
      table: {
        type: { summary: "number" },
      },
    },
    maxRows: {
      control: { type: "number" },
      defaultValue: 10,
      description: "최대 행수",
      table: {
        type: { summary: "number" },
      },
    },
    hasError: {
      control: {
        type: "boolean",
      },
      defaultValue: false,
      description: "변형 에러 플래그",
      talbe: {
        type: { summary: "boolean" },
      },
    },
    onChange: {
      description: "onChange 이벤트 핸들러",
      talbe: {
        type: { summary: "function" },
      },
    },
  },
} as Meta<typeof TextArea>;

const Template: StoryFn<typeof TextArea> = (args) => (
  <TextArea {...args}></TextArea>
);

export const Normal = Template.bind({});

export const Error = Template.bind({});

Error.args = { hasError: true };
