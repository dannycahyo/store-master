import { Meta, StoryFn } from "@storybook/react";

import { CartDetailScreen } from "./CartDetailScreen";

export default {
  title: "Carts/Screens/CartDetailScreen",
  component: CartDetailScreen,
} as Meta<typeof CartDetailScreen>;

const Template: StoryFn<typeof CartDetailScreen> = (args) => (
  <CartDetailScreen {...args} />
);

export const Default = Template.bind({});
Default.args = {
  cartId: "1",
};
