import { Meta, StoryObj } from "@storybook/react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

const meta: Meta<typeof Avatar> = {
  title: "Components/Avatar",
  component: Avatar,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="https://i.pravatar.cc/150?img=3" alt="User Avatar" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  ),
};

export const NoRounded: Story = {
  render: () => (
    <Avatar className="rounded-none">
      <AvatarImage src="https://i.pravatar.cc/150?img=3" alt="User Avatar" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  ),
};

export const WithFallback: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="" alt="User Avatar" />
      <AvatarFallback>AB</AvatarFallback>
    </Avatar>
  ),
};

export const WithFallbackNoRounded: Story = {
  render: () => (
    <Avatar className="rounded-none bg-gray-100">
      <AvatarImage src="" alt="User Avatar" />
      <AvatarFallback>AB</AvatarFallback>
    </Avatar>
  ),
};
