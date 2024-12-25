import Button, { ButtonProps } from "@/components/storybook/Button";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Button> = {
  title: "Example/Button",
  component: Button,
  argTypes: {
    text: { control: "text" },
    variant: {
      control: { type: "select" },
      options: ["default", "primary", "secondary"],
    },
    onClick: { action: "clicked" },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;


export const Default: Story = {}