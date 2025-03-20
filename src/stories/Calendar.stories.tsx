import { Meta, StoryObj } from "@storybook/react";
import { Calendar } from "~/components/ui/calendar";

const meta: Meta<typeof Calendar> = {
  title: "Components/Calendar",
  component: Calendar,
  tags: ["autodocs"],
  args: {
    mode: "single",
  },
};

export default meta;

type Story = StoryObj<typeof Calendar>;

export const Default: Story = {
  render: (args) => <Calendar {...args} />,
};

export const MultiSelect: Story = {
  args: {
    mode: "multiple",
  },
  render: (args) => <Calendar {...args} />,
};

export const RangeSelect: Story = {
  args: {
    mode: "range",
  },
  render: (args) => <Calendar {...args} />,
};
