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
      /*Notes: Since the product brand is not unique, we need to use queryAllByText instead of getByText,
        otherwise it will throw an error. */
      const productBrand = canvas.queryAllByText(product.brand)[0];
      expect(productBrand).toBeInTheDocument();
    });

    await step(`user see the ${product.price} price`, async () => {
      const productPrice = canvas.queryByText(product.price.toString());
      expect(productPrice).toBeInTheDocument();
    });

    await step(`user see the ${product.stock} stock`, async () => {
      const productStock = canvas.getByText(product.stock.toString());
      expect(productStock).toBeInTheDocument();
    });

    await step(`user see the ${product.category} category`, async () => {
      /*Notes: Since the product category is not unique, we need to use queryAllByText instead of getByText,
        otherwise it will throw an error. */
      const productCategory = canvas.queryAllByText(product.category)[0];
      expect(productCategory).toBeInTheDocument();
    });
  }
};
