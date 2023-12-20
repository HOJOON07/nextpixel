import { Meta, StoryFn } from "@storybook/react";
import ProductForm from ".";

export default {
  title: "organisms/ProductForm",
  argTypes: {
    onProductSave: {
      description: "등록 버튼을 클릭했을 때의 이벤트 핸들러",
      table: {
        type: { summary: "function" },
      },
    },
  },
} as Meta<typeof ProductForm>;

const Template: StoryFn<typeof ProductForm> = (args) => (
  <ProductForm {...args}></ProductForm>
);

export const Form = Template.bind({});
