import { Meta, StoryFn } from "@storybook/react";

import { ProductListWidget } from "./ProductListWidget";
import {
  errorProductBrandsHandler,
  errorProductCategoriesHandler,
  errorProductsHandler,
  successProductsByCategoryAndBrandHandler,
  successProductHandlers,
  successProductBrandsHandler,
  successProductCategoriesHandler,
} from "@src/mock";

export default {
  title: "Products/Widgets/ProductListWidget",
  component: ProductListWidget,
} as Meta<typeof ProductListWidget>;

const Template: StoryFn<typeof ProductListWidget> = (args) => (
  <ProductListWidget {...args} />
);

export const Default = Template.bind({});
Default.args = {};

export const ProductListWidgetSuccess = Template.bind({});
ProductListWidgetSuccess.args = {};

export const ProductListWidgetError = Template.bind({});
ProductListWidgetError.args = {};

ProductListWidgetSuccess.parameters = {
  msw: [
    ...successProductBrandsHandler,
    ...successProductCategoriesHandler,
    ...successProductsByCategoryAndBrandHandler,
    ...successProductHandlers,
  ],
};

ProductListWidgetError.parameters = {
  msw: [
    ...errorProductBrandsHandler,
    ...errorProductCategoriesHandler,
    ...errorProductsHandler,
  ],
};
