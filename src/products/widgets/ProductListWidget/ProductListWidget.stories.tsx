import { Meta, StoryFn } from "@storybook/react";
import { waitForElementToBeRemoved, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

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

ProductListWidgetError.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);
  await step("wait for loading to be finished", async () => {
    await waitForElementToBeRemoved(
      () => canvas.queryAllByRole("progressbar"),
      {
        timeout: 30000,
      },
    );
  });

  await step("user see the alert element", async () => {
    const alertElement = canvas.getAllByRole("alert")[0];
    expect(alertElement).toBeInTheDocument();
  });

  await step(
    "user see the error message of the categories & brands",
    async () => {
      const alertTitle = canvas.getByText(/Categories & Brands Error!/i);
      expect(alertTitle).toBeInTheDocument();

      const alertDescription = canvas.getByText(
        /There was something wrong when fetching get all categories & brands./i,
      );
      expect(alertDescription).toBeInTheDocument();
    },
  );

  await step("user see the error message of the products", async () => {
    const alertTitle = canvas.getByText(/Products Error!/i);
    expect(alertTitle).toBeInTheDocument();

    const alertDescription = canvas.getByText(
      /There was something wrong when fetching get all products./i,
    );
    expect(alertDescription).toBeInTheDocument();
  });
};
