import { Meta, StoryFn } from "@storybook/react";
import { within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

import { cartDetail } from "@src/constants";
import { CartProductTable } from "./CartProductTable";

export default {
  title: "Carts/Components/CartProductTable",
  component: CartProductTable,
} as Meta<typeof CartProductTable>;

const Template: StoryFn<typeof CartProductTable> = (args) => (
  <CartProductTable {...args} />
);

export const Default = Template.bind({});
Default.args = {
  products: cartDetail.products,
};

Default.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);

  const productTable = canvas.getByRole("table");
  expect(productTable).toBeInTheDocument();

  const tableRows = canvas.getAllByRole("row");
  expect(tableRows).toHaveLength(cartDetail.products.length + 1);

  const tableCaption = canvas.getByText("Product List");
  expect(tableCaption).toBeInTheDocument();

  const tableHeaders = canvas.getAllByRole("columnheader");
  expect(tableHeaders).toHaveLength(6);

  const tableData = canvas.getAllByRole("cell");
  expect(tableData).toHaveLength(cartDetail.products.length * 6);

  for (const product of cartDetail.products) {
    await step(`user see the ${product.title} product`, async () => {
      const productTitle = canvas.getByText(product.title);
      expect(productTitle).toBeInTheDocument();
    });

    await step(`user see the ${product.price} price`, async () => {
      const productPrice = canvas.queryAllByText(product.price.toString())[0];
      expect(productPrice).toBeInTheDocument();
    });

    await step(
      `user see the ${product.discountPercentage} discountPercentage`,
      async () => {
        const productDiscountPercentage = canvas.queryAllByText(
          product.discountPercentage.toString(),
        )[0];
        expect(productDiscountPercentage).toBeInTheDocument();
      },
    );

    await step(`user see the ${product.quantity} quantity`, async () => {
      const productQuantity = canvas.queryAllByText(
        product.quantity.toString(),
      )[0];
      expect(productQuantity).toBeInTheDocument();
    });

    await step(`user see the ${product.total} total`, async () => {
      const productTotal = canvas.queryAllByText(product.total.toString())[0];
      expect(productTotal).toBeInTheDocument();
    });

    await step(
      `user see the ${product.discountedPrice} discountedPrice`,
      async () => {
        const productDiscountedPrice = canvas.queryAllByText(
          product.discountedPrice.toString(),
        )[0];
        expect(productDiscountedPrice).toBeInTheDocument();
      },
    );
  }
};
