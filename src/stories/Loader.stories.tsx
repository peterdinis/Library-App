import { Meta, StoryObj } from "@storybook/react";
import Loader from "~/components/ui/loader";

const meta: Meta<typeof Loader> = {
  title: "Components/Loader",
  tags: ["autodocs"],
  component: Loader,
  argTypes: {
    background: { control: "text" },
    width: { control: { type: "number", min: 1, max: 20 } },
    height: { control: { type: "number", min: 1, max: 20 } },
  },
};

export default meta;

type Story = StoryObj<typeof Loader>;

export const Default: Story = {
  args: {
    background: "transparent",
    width: 6,
    height: 6,
  },
};

export const Large: Story = {
  args: {
    background: "gray-200",
    width: 10,
    height: 10,
  },
};

export const CustomColor: Story = {
  args: {
    background: "blue-500",
    width: 8,
    height: 8,
  },
};
