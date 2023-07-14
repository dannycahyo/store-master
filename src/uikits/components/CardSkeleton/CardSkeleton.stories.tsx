import { Meta, StoryFn } from "@storybook/react";
import { CardSkeleton } from "./CardSkeleton";

export default {
  title: "UI Kits/Components/CardSkeleton",
  component: CardSkeleton,
} as Meta<typeof CardSkeleton>;

const Template: StoryFn<typeof CardSkeleton> = (args) => (
  <CardSkeleton {...args} />
);

export const Default = Template.bind({});
