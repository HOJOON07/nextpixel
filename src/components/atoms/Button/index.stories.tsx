import { Meta, StoryFn, StoryObj } from "@storybook/react";
import Button from ".";

export default {
  title: "Atoms/Button",
  argTypes: {
    variant: {
      options: ["primary", "secondary"],
      control: { type: "radio" },
      defaultValue: "primary",
      description: "버튼 변형",
      table: {
        type: { summary: "primary | secondary" },
        defaultValue: { summary: "primary" },
      },
    },
    children: {
      control: { type: "text" },
      defaultValue: "Button",
      description: "버튼 텍스트",
      table: {
        type: { summary: "string" },
      },
    },
    disabled: {
      control: { type: "boolean" },
      defaultValue: false,
      description: "Disabled 플래그",
      table: {
        type: { summary: "boolean" },
      },
    },
    width: {
      control: { type: "number" },
      description: "버튼 너비",
      table: {
        type: { summary: "number" },
      },
    },
    height: {
      control: { type: "number" },
      description: "버튼 높이",
      table: {
        type: { summary: "number" },
      },
    },
    onClick: {
      description: "onClick 이벤트 제어 함수",
      table: {
        type: { summary: "function" },
      },
    },
  },
} as Meta<typeof Button>;

const Template: StoryFn<typeof Button> = (args) => <Button {...args}></Button>;

export const Primary = Template.bind({});
Primary.args = { variant: "primary", children: "Primary Button" };

export const Secondary = Template.bind({});
Secondary.args = { variant: "secondary", children: "Secondary Button" };

export const Disabled = Template.bind({});
Disabled.args = { disabled: true, children: "Primary Button" };
