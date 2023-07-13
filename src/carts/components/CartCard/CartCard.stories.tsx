import { expect } from "@storybook/jest";
import { Meta, StoryFn } from "@storybook/react";
import { within } from "@storybook/testing-library";

import { cartDetail } from "@src/constants/testData";
import { CartCard } from "./CartCard";

export default {
  title: "Carts/Components/CartCard",
  component: CartCard,
} as Meta<typeof CartCard>;

const Template: StoryFn<typeof CartCard> = (args) => <CartCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  cartDetail,
};

Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const cartCard = canvas.getByRole("figure");
  expect(cartCard).toBeInTheDocument();

  const userIdLabel = canvas.getByText("User ID:");
  expect(userIdLabel).toBeInTheDocument();
  const userIdValue = canvas.getByText(cartDetail.userId.toString());
  expect(userIdValue).toBeInTheDocument();

  const discountedTotalLabel = canvas.getByText("Discounted Total:");
  expect(discountedTotalLabel).toBeInTheDocument();
  const discountedTotalValue = canvas.getByText(
    cartDetail.discountedTotal.toString(),
  );
  expect(discountedTotalValue).toBeInTheDocument();

  const totalLabel = canvas.getByText("Total:");
  expect(totalLabel).toBeInTheDocument();
  const totalValue = canvas.getByText(cartDetail.total.toString());
  expect(totalValue).toBeInTheDocument();

  const totalProductsLabel = canvas.getByText("Total Products:");
  expect(totalProductsLabel).toBeInTheDocument();
  const totalProductsValue = canvas.getByText(
    cartDetail.totalProducts.toString(),
  );
  expect(totalProductsValue).toBeInTheDocument();

  const totalQuantityLabel = canvas.getByText("Total Quantity:");
  expect(totalQuantityLabel).toBeInTheDocument();
  const totalQuantityValue = canvas.getByText(
    cartDetail.totalQuantity.toString(),
  );
  expect(totalQuantityValue).toBeInTheDocument();
};
