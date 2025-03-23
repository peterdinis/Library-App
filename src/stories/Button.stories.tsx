import { Meta, StoryObj } from "@storybook/react";
import { Button } from "~/components/ui/button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "destructive",
        "outline",
        "secondary",
        "ghost",
        "link",
      ],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon"],
    },
    asChild: { control: "boolean" },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "This is a default button",
    variant: "default",
    size: "default",
  },
};

export const Destructive: Story = {
  args: {
    children: "This is a destructive button",
    variant: "destructive",
    size: "default",
  },
};

export const Outline: Story = {
  args: {
    children: "This is an outline button",
    variant: "outline",
    size: "default",
  },
};

export const Large: Story = {
  args: {
    children: "This is a large button",
    variant: "default",
    size: "lg",
  },
};

export const Small: Story = {
  args: {
    children: "This is a small button",
    variant: "default",
    size: "sm",
  },
};

export const IconButton: Story = {
  args: {
    children: "🔍",
    variant: "default",
    size: "icon",
  },
};
