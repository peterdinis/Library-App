import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "~/components/ui/textarea";

const meta: Meta<typeof Textarea> = {
  title: "Components/Textarea",
  component: Textarea,
  args: {
    placeholder: "Enter text here...",
  },
};

export default meta;

type Story = StoryObj<typeof Textarea>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const WithCustomClass: Story = {
  args: {
    className: "border-red-500",
  },
};
