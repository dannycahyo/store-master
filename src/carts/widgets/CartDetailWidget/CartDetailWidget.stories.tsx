import { Meta, StoryFn } from "@storybook/react";

import { CartDetailWidget } from "./CartDetailWidget";

export default {
  title: "Carts/Widgets/CartDetailWidget",
  component: CartDetailWidget,
} as Meta<typeof CartDetailWidget>;

const Template: StoryFn<typeof CartDetailWidget> = (args) => (
  <CartDetailWidget {...args} />
);

export const Default = Template.bind({});
Default.args = {
  cartId: "1",
};
