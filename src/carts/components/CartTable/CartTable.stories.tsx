import { Meta, StoryFn } from "@storybook/react";
import { within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

import { cartList } from "@src/constants";
import { CartTable } from "./CartTable";

export default {
  title: "Carts/Components/CartTable",
  component: CartTable,
} as Meta<typeof CartTable>;

const Template: StoryFn<typeof CartTable> = (args) => <CartTable {...args} />;

export const Default = Template.bind({});
Default.args = {
  carts: cartList,
};

Default.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);

  const cartTable = canvas.getByRole("table");
  expect(cartTable).toBeInTheDocument();

  const tableRows = canvas.getAllByRole("row");
  expect(tableRows).toHaveLength(cartList.length + 1);

  const tableCaption = canvas.getByText("Cart List");
  expect(tableCaption).toBeInTheDocument();

  const tableHeaders = canvas.getAllByRole("columnheader");
  expect(tableHeaders).toHaveLength(5);

  const tableData = canvas.getAllByRole("cell");
  expect(tableData).toHaveLength(cartList.length * 5);

  for (const cart of cartList) {
    await step(`user see the ${cart.userId} user ID`, async () => {
      const cartUserId = canvas.getByText(cart.userId.toString());
      expect(cartUserId).toBeInTheDocument();
    });

    await step(
      `user see the ${cart.totalQuantity} total quantity`,
      async () => {
        const cartTotalQuantity = canvas.queryAllByText(
          cart.totalQuantity.toString(),
        )[0];
        expect(cartTotalQuantity).toBeInTheDocument();
      },
    );

    await step(
      `user see the ${cart.totalProducts} total products`,
      async () => {
        const cartTotalProducts = canvas.queryAllByText(
          cart.totalProducts.toString(),
        )[0];
        expect(cartTotalProducts).toBeInTheDocument();
      },
    );

    await step(`user see the ${cart.total} total`, async () => {
      const cartTotal = canvas.queryAllByText(cart.total.toString())[0];
      expect(cartTotal).toBeInTheDocument();
    });

    await step(
      `user see the ${cart.discountedTotal} discounted total`,
      async () => {
        const cartDiscountedTotal = canvas.queryAllByText(
          cart.discountedTotal.toString(),
        )[0];
        expect(cartDiscountedTotal).toBeInTheDocument();
      },
    );
  }
};
