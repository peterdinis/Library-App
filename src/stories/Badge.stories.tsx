import { Meta, StoryObj } from "@storybook/react";
import { Badge, badgeVariants } from "~/components/ui/badge";
import React from "react";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "destructive", "outline", "success"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: "Default Badge",
    variant: "default",
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary Badge",
    variant: "secondary",
  },
};

export const Destructive: Story = {
  args: {
    children: "Destructive Badge",
    variant: "destructive",
  },
};

export const Outline: Story = {
  args: {
    children: "Outline Badge",
    variant: "outline",
  },
};

export const Success: Story = {
  args: {
    children: "Success Badge",
    variant: "success",
  },
};
