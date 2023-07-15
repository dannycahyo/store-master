import { Meta, StoryFn } from "@storybook/react";

import { ProductListWidget } from "./ProductListWidget";

export default {
  title: "Products/Widgets/ProductListWidget",
  component: ProductListWidget,
} as Meta<typeof ProductListWidget>;

const Template: StoryFn<typeof ProductListWidget> = (args) => (
  <ProductListWidget {...args} />
);

export const Default = Template.bind({});
Default.args = {};
