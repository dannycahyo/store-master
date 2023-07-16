import { Meta, StoryFn } from "@storybook/react";

import { ProductListScreen } from "./ProductListScreen";

export default {
  title: "Products/Screens/ProductListScreen",
  component: ProductListScreen,
} as Meta<typeof ProductListScreen>;

const Template: StoryFn<typeof ProductListScreen> = () => <ProductListScreen />;

export const Default = Template.bind({});
Default.args = {};
