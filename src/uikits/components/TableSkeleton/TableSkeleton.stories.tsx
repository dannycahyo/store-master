import { Meta, StoryFn } from "@storybook/react";
import { TableSkeleton } from "./TableSkeleton";

export default {
  title: "UI Kits/Components/TableSkeleton",
  component: TableSkeleton,
} as Meta<typeof TableSkeleton>;

const Template: StoryFn<typeof TableSkeleton> = (args) => (
  <TableSkeleton {...args} />
);

export const Default = Template.bind({});
