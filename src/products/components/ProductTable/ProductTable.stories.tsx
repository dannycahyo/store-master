import { Meta, StoryFn } from "@storybook/react";
import { within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

import { productList } from "@src/constants";
import { ProductTable } from "./ProductTable";

export default {
  title: "Products/Components/ProductTable",
  component: ProductTable,
} as Meta<typeof ProductTable>;

const Template: StoryFn<typeof ProductTable> = (args) => (
  <ProductTable {...args} />
);

export const Default = Template.bind({});
Default.args = {
  products: productList,
};

Default.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);

  const productTable = canvas.getByRole("table");
  expect(productTable).toBeInTheDocument();

  const tableRows = canvas.getAllByRole("row");
  expect(tableRows).toHaveLength(productList.length + 1);

  const tableCaption = canvas.getByText("Product List");
  expect(tableCaption).toBeInTheDocument();

  const tableHeaders = canvas.getAllByRole("columnheader");
  expect(tableHeaders).toHaveLength(5);

  const tableData = canvas.getAllByRole("cell");
  expect(tableData).toHaveLength(productList.length * 5);

  for (const product of productList) {
    await step(`user see the ${product.title} product`, async () => {
      const productTitle = canvas.getByText(product.title);
      expect(productTitle).toBeInTheDocument();
    });

    await step(`user see the ${product.brand} brand`, async () => {
      const productBrand = canvas.queryAllByText(product.brand)[0];
      expect(productBrand).toBeInTheDocument();
    });

    await step(`user see the ${product.price} price`, async () => {
      const productPrice = canvas.queryAllByText(product.price.toString())[0];
      expect(productPrice).toBeInTheDocument();
    });

    await step(`user see the ${product.stock} stock`, async () => {
      const productStock = canvas.queryAllByText(product.stock.toString())[0];
      expect(productStock).toBeInTheDocument();
    });

    await step(`user see the ${product.category} category`, async () => {
      const productCategory = canvas.queryAllByText(product.category)[0];
      expect(productCategory).toBeInTheDocument();
    });
  }
};
