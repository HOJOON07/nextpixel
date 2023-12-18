import { Meta, StoryFn } from "@storybook/react";
import Input from ".";

export default {
  title: "Atoms/Input",
  argTypes: {
    placeholder: {
      control: { type: "text" },
      description: "Placeholder",
      table: {
        type: { summary: "string" },
      },
    },
    hasBorder: {
      control: { type: "boolean" },
      defaultValue: true,
      description: "border 여부",
      table: {
        tyoe: { summary: "boolean" },
      },
    },
    hasError: {
      control: { type: "boolean" },
      defaultValue: false,
      description: "Error 여부",
      table: {
        type: { summary: "boolean" },
      },
    },
  },
} as Meta<typeof Input>;

const Template: StoryFn<typeof Input> = (args) => <Input {...args}></Input>;

export const Normal = Template.bind({});

export const Error = Template.bind({});

Error.args = { hasError: true };
