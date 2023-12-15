import { Meta, StoryFn } from "@storybook/react";
import ShapeImage from ".";

export default {
  title: "Atoms/ShapeImage",
  argTypes: {
    shape: {
      option: ["circle", "square"],
      control: { type: "radio" },
      defaultValue: "square",
      table: {
        type: { summary: "cirlce | square" },
        defaultValue: { summary: "square" },
      },
    },
    src: {
      control: { type: "text" },
      description: "이미지 URL",
      table: {
        type: { summary: "string" },
      },
    },
    width: {
      control: {
        type: "number",
      },
      defaultValue: 320,
      description: "너비",
      table: {
        type: { summary: "number" },
      },
    },
    height: {
      control: { type: "number" },
      description: "높이",
      defaultValue: 320,
      table: {
        type: {
          summary: "number",
        },
      },
    },
  },
} as Meta<typeof ShapeImage>;

const TemPlate: StoryFn<typeof ShapeImage> = (args) => (
  <ShapeImage {...args}></ShapeImage>
);

export const Circle = TemPlate.bind({});
Circle.args = { src: "/images/sample/1.jpg", shape: "circle" };

export const Square = TemPlate.bind({});
Square.args = { src: "/images/sample/1.jpg", shape: "square" };
