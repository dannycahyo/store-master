import { Meta, StoryFn } from "@storybook/react";

import { CartListScreen } from "./CartListScreen";

export default {
  title: "Carts/Screens/CartListScreen",
  component: CartListScreen,
} as Meta<typeof CartListScreen>;

const Template: StoryFn<typeof CartListScreen> = () => <CartListScreen />;

export const Default = Template.bind({});
Default.args = {};
