import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "~/components/ui/label";

const meta: Meta<typeof Label> = {
  title: "Components/Label",
  component: Label,
  args: {
    children: "Label Text",
  },
};

export default meta;

type Story = StoryObj<typeof Label>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    className: "peer-disabled",
  },
};
