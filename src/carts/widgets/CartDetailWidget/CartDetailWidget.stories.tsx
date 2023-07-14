import { Meta, StoryFn } from "@storybook/react";
import { waitForElementToBeRemoved, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

import { errorCartDetailHandler, successCartDetailHandler } from "@src/mock";
import { cartList } from "@src/constants";
import { CartDetailWidget } from "./CartDetailWidget";

import type { Cart } from "@src/carts/model";

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

export const CartDetailWidgetSuccess = Template.bind({});
CartDetailWidgetSuccess.args = {
  cartId: "2",
};

export const CartDetailWidgetError = Template.bind({});
CartDetailWidgetError.args = {
  cartId: "2",
};

CartDetailWidgetSuccess.parameters = {
  msw: [...successCartDetailHandler],
};

CartDetailWidgetError.parameters = {
  msw: [...errorCartDetailHandler],
};

CartDetailWidgetSuccess.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);
  await step("wait for loading to be finished", async () => {
    await waitForElementToBeRemoved(() => canvas.queryByRole("progressbar"));
  });

  await step("user see the cart card", async () => {
    const cartCard = canvas.getByRole("figure");
    expect(cartCard).toBeInTheDocument();
  });

  await step("user see the cart product table data", async () => {
    const cartDetail = cartList.find((cart) => cart.id === 2) as Cart;

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
  });

  await step("user see the cart ID", async () => {
    const cartIdLabel = canvas.getByRole("heading", {
      name: "Cart 2",
    });
    expect(cartIdLabel).toBeInTheDocument();
  });

  await step("user see the cart detail data", async () => {
    const cartDetailData = cartList.find((cart) => cart.id === 2) as Cart;

    const cartUserIdLabel = canvas.getByText(/User ID:/i);
    expect(cartUserIdLabel).toBeInTheDocument();

    const cartUserIdValue = canvas.getAllByText(
      new RegExp(`${cartDetailData.userId}`, "i"),
    )[0];
    expect(cartUserIdValue).toBeInTheDocument();

    const cartDiscountedTotalLabel = canvas.getByText(/Discounted Total:/i);
    expect(cartDiscountedTotalLabel).toBeInTheDocument();

    const cartDiscountedTotalValue = canvas.getByText(
      new RegExp(`${cartDetailData.discountedTotal}`, "i"),
    );
    expect(cartDiscountedTotalValue).toBeInTheDocument();

    const cartTotalLabel = canvas.getAllByText(/Total:/i)[0];
    expect(cartTotalLabel).toBeInTheDocument();

    const cartTotalValue = canvas.getByText(
      new RegExp(`${cartDetailData.total}`, "i"),
    );
    expect(cartTotalValue).toBeInTheDocument();

    const cartTotalProductsLabel = canvas.getByText(/Total Products:/i);
    expect(cartTotalProductsLabel).toBeInTheDocument();

    const cartTotalProductsValue = canvas.getAllByText(
      new RegExp(`${cartDetailData.totalProducts}`, "i"),
    )[0];
    expect(cartTotalProductsValue).toBeInTheDocument();

    const cartTotalQuantityLabel = canvas.getByText(/Total Quantity:/i);
    expect(cartTotalQuantityLabel).toBeInTheDocument();

    const cartTotalQuantityValue = canvas.getAllByText(
      new RegExp(`${cartDetailData.totalQuantity}`, "i"),
    )[0];
    expect(cartTotalQuantityValue).toBeInTheDocument();
  });

  await step("user see the table data", async () => {
    const cartDetailData = cartList.find((cart) => cart.id === 2) as Cart;

    const tableData = canvas.getAllByRole("cell");
    expect(tableData).toHaveLength(cartDetailData.products.length * 6);

    for (const product of cartDetailData.products) {
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
  });
};

CartDetailWidgetError.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);
  await step("wait for loading to be finished", async () => {
    await waitForElementToBeRemoved(() => canvas.queryByRole("progressbar"), {
      timeout: 30000,
    });
  });

  await step("user see the error message", async () => {
    const alertElement = canvas.getByRole("alert");
    expect(alertElement).toBeInTheDocument();

    const errorMessageTitle = canvas.getByText(/Cart Detail Error!/i);
    expect(errorMessageTitle).toBeInTheDocument();

    const errorMessageDescription = canvas.getByText(
      /There was something wrong when fetching cart detail./i,
    );
    expect(errorMessageDescription).toBeInTheDocument();
  });
};
