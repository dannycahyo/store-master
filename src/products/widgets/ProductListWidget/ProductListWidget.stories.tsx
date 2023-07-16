import { Meta, StoryFn } from "@storybook/react";
import {
  userEvent,
  waitForElementToBeRemoved,
  within,
} from "@storybook/testing-library";
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

ProductListWidgetSuccess.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);
  await step("wait for loading to be finished", async () => {
    await waitForElementToBeRemoved(
      () => canvas.queryAllByRole("progressbar"),
      {
        timeout: 30000,
      },
    );
  });

  await step("user see the filtering form of the products", async () => {
    const filterContainer = canvas.getByRole("form");
    expect(filterContainer).toBeInTheDocument();
  });

  await step("user see the table", async () => {
    const productTable = canvas.getByRole("table");
    expect(productTable).toBeInTheDocument();
  });

  await step("user see the pagination", async () => {
    const paginationContainer = canvas.getByRole("navigation");
    expect(paginationContainer).toBeInTheDocument();
  });

  await step("user select the first category", async () => {
    const filterByCategorySelect = canvas.getByRole("combobox", {
      name: /Categories Filter/i,
    });
    expect(filterByCategorySelect).toBeInTheDocument();

    const firstCategoryOption = canvas.getByRole("option", {
      name: /smartphones/i,
    });
    expect(firstCategoryOption).toBeInTheDocument();

    userEvent.selectOptions(filterByCategorySelect, firstCategoryOption);
    expect(filterByCategorySelect).toHaveValue("smartphones");
  });

  await step(
    "user see all of the category column to be all smartphones values",
    async () => {
      const categoryColumn = canvas.findByRole("columnheader", {
        name: /CATEGORY/i,
      });
      expect(await Promise.resolve(categoryColumn)).toBeInTheDocument();

      const categoryColumnValue = canvas.findAllByRole("cell", {
        name: /smartphones/i,
      });
      expect(await Promise.resolve(categoryColumnValue)).toHaveLength(5);
    },
  );

  await step("user select the first brand", async () => {
    const filterByBrandSelect = canvas.getByRole("combobox", {
      name: /Brands Filter/i,
    });
    expect(filterByBrandSelect).toBeInTheDocument();

    const firstBrandOption = canvas.getByRole("option", {
      name: /apple/i,
    });
    expect(firstBrandOption).toBeInTheDocument();

    userEvent.selectOptions(filterByBrandSelect, firstBrandOption);
    expect(filterByBrandSelect).toHaveValue("Apple");
  });

  await step(
    "user see all of the brand column to be all apple values",
    async () => {
      const brandColumn = canvas.findByRole("columnheader", {
        name: /BRAND/i,
      });
      expect(await Promise.resolve(brandColumn)).toBeInTheDocument();

      const brandColumnValue = canvas.findAllByRole("cell", {
        name: /apple/i,
      });
      expect(await Promise.resolve(brandColumnValue)).toHaveLength(3);
    },
  );

  await step(
    "user fill the price range input with minPrice 600 and maxPrice 2000",
    async () => {
      const minInput = canvas.getByRole("textbox", {
        name: /Min Price/i,
      });
      expect(minInput).toBeInTheDocument();

      userEvent.type(minInput, "600");
      expect(minInput).toHaveValue("600");

      const maxInput = canvas.getByRole("textbox", {
        name: /Max Price/i,
      });
      expect(maxInput).toBeInTheDocument();

      userEvent.type(maxInput, "2000");
      expect(maxInput).toHaveValue("2000");
    },
  );

  await step("user click the apply price range button", async () => {
    const applyPriceRangeButton = canvas.getByRole("button", {
      name: /Apply Price Range/i,
    });
    expect(applyPriceRangeButton).toBeInTheDocument();

    userEvent.click(applyPriceRangeButton);
  });

  await step("user see the 899 & 1749 price product in the table", async () => {
    const priceColumn = canvas.findByRole("columnheader", {
      name: /PRICE/i,
    });
    expect(await Promise.resolve(priceColumn)).toBeInTheDocument();

    const firstPriceColumnValue = canvas.findAllByRole("cell", {
      name: /899/i,
    });
    expect(await Promise.resolve(firstPriceColumnValue)).toHaveLength(1);
    const secondPriceColumnValue = canvas.findAllByRole("cell", {
      name: /1749/i,
    });
    expect(await Promise.resolve(secondPriceColumnValue)).toHaveLength(1);
  });

  await step("user fill the search product input with iPhone", async () => {
    const searchProductInput = canvas.getByRole("textbox", {
      name: /Search product/i,
    });
    expect(searchProductInput).toBeInTheDocument();

    userEvent.type(searchProductInput, "iPhone");
    expect(searchProductInput).toHaveValue("iPhone");
  });

  await step("user see the iPhone product in the table", async () => {
    const titleColumn = canvas.findByRole("columnheader", {
      name: /PRODUCT NAME/i,
    });
    expect(await Promise.resolve(titleColumn)).toBeInTheDocument();

    const titleColumnValue = canvas.findAllByRole("cell", {
      name: /iPhone/i,
    });
    expect(await Promise.resolve(titleColumnValue)).toHaveLength(1);
  });
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
