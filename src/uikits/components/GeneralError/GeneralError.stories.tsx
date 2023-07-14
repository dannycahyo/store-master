import { Meta, StoryFn } from "@storybook/react";
import { GeneralError } from "./GeneralError";

export default {
  title: "UI Kits/Components/GeneralError",
  component: GeneralError,
} as Meta<typeof GeneralError>;

const Template: StoryFn<typeof GeneralError> = (args) => (
  <GeneralError {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title: "Error!",
  description: "There was an error processing your request",
};
