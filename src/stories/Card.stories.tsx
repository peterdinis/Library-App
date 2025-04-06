import type { Meta, StoryObj } from "@storybook/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "~/components/ui/card";

const meta: Meta = {
  title: "Components/Card",
  component: Card,
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>
          This is a short description of what this card is about.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac
          volutpat mauris, sed laoreet justo. Donec vitae mauris eu velit
          pretium congue.
        </p>
      </CardContent>
      <CardFooter>
        <button className="bg-primary hover:bg-primary/90 ml-auto rounded-md px-4 py-2 text-white">
          Action
        </button>
      </CardFooter>
    </Card>
  ),
};
