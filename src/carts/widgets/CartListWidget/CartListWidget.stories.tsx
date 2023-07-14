import { Meta, StoryFn } from "@storybook/react";
import {
  waitForElementToBeRemoved,
  within,
  userEvent,
  waitFor,
} from "@storybook/testing-library";
import { expect } from "@storybook/jest";

import { errorCartListHandler, successCartListHandler } from "@src/mock";
import { CartListWidget } from "./CartListWidget";
import { cartList } from "@src/constants";

export default {
  title: "Carts/Widgets/CartListWidget",
  component: CartListWidget,
} as Meta<typeof CartListWidget>;

const Template: StoryFn<typeof CartListWidget> = (args) => (
  <CartListWidget {...args} />
);

export const Default = Template.bind({});
Default.args = {};

export const CartListWidgetSuccess = Template.bind({});
CartListWidgetSuccess.args = {};

export const CartListWidgetError = Template.bind({});
CartListWidgetError.args = {};

CartListWidgetSuccess.parameters = {
  msw: [...successCartListHandler],
};

CartListWidgetError.parameters = {
  msw: [...errorCartListHandler],
};

CartListWidgetSuccess.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);
  await step("wait for loading to be finished", async () => {
    await waitForElementToBeRemoved(() => canvas.queryByRole("progressbar"));
  });

  await step("user see the table", async () => {
    const cartTable = canvas.getByRole("table");
    expect(cartTable).toBeInTheDocument();
  });

  await step("user see the pagination", async () => {
    const paginationContainer = canvas.getByRole("navigation");
    expect(paginationContainer).toBeInTheDocument();
  });

  await step("user change the page size to 10", async () => {
    const pageSizeSelector = canvas.getByRole("combobox", {
      name: "Page size selector",
    });
    expect(pageSizeSelector).toBeInTheDocument();

    userEvent.selectOptions(pageSizeSelector, "10");
  });

  await step("user see the first 10 carts", async () => {
    const firstTenCarts = cartList.slice(0, 10);

    const tableRows = canvas.findAllByRole("row");
    await waitFor(async () => {
      expect(await Promise.resolve(tableRows)).toHaveLength(
        firstTenCarts.length + 1,
      );
    });
  });

  await step("user change the page size to 5", async () => {
    const pageSizeSelector = canvas.getByRole("combobox", {
      name: "Page size selector",
    });
    expect(pageSizeSelector).toBeInTheDocument();

    userEvent.selectOptions(pageSizeSelector, "5");

    const tableRows = canvas.getAllByRole("row");
    await waitFor(() => {
      expect(tableRows).toHaveLength(6);
    });
  });

  await step("user see the first 5 carts", async () => {
    const firstFiveCarts = cartList.slice(0, 5);

    for (const cart of firstFiveCarts) {
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
  });

  await step("user navigate into the second page", async () => {
    const previousButton = canvas.getByRole("button", {
      name: "Previous Page",
    });
    expect(previousButton).toBeDisabled();

    const secondPageElement = canvas.getByRole("listitem", {
      name: "Page 2",
    });

    userEvent.click(secondPageElement);
  });

  await step("user see the next 5 carts", async () => {
    const secondFiveCarts = cartList.slice(5, 10);
    waitFor(async () => {
      for (const cart of secondFiveCarts) {
        await step(`user see the ${cart.userId} user ID`, async () => {
          const cartUserId = canvas.queryAllByText(cart.userId.toString())[0];
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

      const nextButton = canvas.getByRole("button", {
        name: "Next Page",
      });
      expect(nextButton).toBeDisabled();
    });
  });
};

CartListWidgetError.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);
  await step("wait for loading to be finished", async () => {
    await waitForElementToBeRemoved(() => canvas.queryByRole("progressbar"), {
      timeout: 30000,
    });
  });

  await step("user see the error message", async () => {
    const alertElement = canvas.getByRole("alert");
    expect(alertElement).toBeInTheDocument();

    const errorMessageTitle = canvas.getByText(/Cart List Error!/i);
    expect(errorMessageTitle).toBeInTheDocument();

    const errorMessageDescription = canvas.getByText(
      /There was something wrong when fetching cart list./i,
    );
    expect(errorMessageDescription).toBeInTheDocument();
  });
};
