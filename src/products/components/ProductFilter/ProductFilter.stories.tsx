import { Meta, StoryFn } from "@storybook/react";
import { withActions } from "@storybook/addon-actions/decorator";
import { useArgs } from "@storybook/client-api";
import { action } from "@storybook/addon-actions";
import { expect } from "@storybook/jest";
import { userEvent, within } from "@storybook/testing-library";

import { brandDummies, categoriesDummy } from "@src/constants";
import { ProductFilter } from "./ProductFilter";

export default {
  title: "Products/Components/ProductFilter",
  component: ProductFilter,
  decorators: [withActions],
} as Meta<typeof ProductFilter>;

const Template: StoryFn<typeof ProductFilter> = (args) => {
  const [{ brands, categories }] = useArgs();

  const handleSearch = (search: string) => {
    action("onSearch")(search);
  };

  const handleCategoryChange = (category: string) => {
    action("onCategoryChange")(category);
  };

  const handleBrandChange = (brand: string) => {
    action("onBrandChange")(brand);
  };

  const handlePriceRangeChange = (min: number, max: number) => {
    action("onPriceRangeChange")(min, max);
  };

  return (
    <ProductFilter
      {...args}
      brands={brands}
      categories={categories}
      onSearch={handleSearch}
      onCategoryChange={handleCategoryChange}
      onBrandChange={handleBrandChange}
      onPriceRangeChange={handlePriceRangeChange}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  brands: brandDummies,
  categories: categoriesDummy,
};

Default.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);

  const filterByCategorySelect = canvas.getByRole("combobox", {
    name: /Categories Filter/i,
  });
  expect(filterByCategorySelect).toBeInTheDocument();

  step("user select first category", () => {
    userEvent.selectOptions(filterByCategorySelect, categoriesDummy[0]);
    expect(filterByCategorySelect).toHaveValue(categoriesDummy[0]);
  });

  const filterByBrandSelect = canvas.getByRole("combobox", {
    name: /Brands Filter/i,
  });
  expect(filterByBrandSelect).toBeInTheDocument();

  step("user select first brand", () => {
    userEvent.selectOptions(filterByBrandSelect, brandDummies[0]);
    expect(filterByBrandSelect).toHaveValue(brandDummies[0]);
  });

  const applyPriceRangeButton = canvas.getByRole("button", {
    name: /Apply Price Range/i,
  });
  expect(applyPriceRangeButton).toBeDisabled();

  const minInput = canvas.getByRole("spinbutton", {
    name: /Min Price/i,
  });
  expect(minInput).toBeInTheDocument();

  step("user input min price", () => {
    userEvent.type(minInput, "100");
    expect(minInput).toHaveValue(100);
  });

  const maxInput = canvas.getByRole("spinbutton", {
    name: /Max Price/i,
  });
  expect(maxInput).toBeInTheDocument();

  step("user input max price", () => {
    userEvent.type(maxInput, "1000");
    expect(maxInput).toHaveValue(1000);
  });

  step("user see the apply button not disabled", () => {
    expect(applyPriceRangeButton).not.toBeDisabled();
  });

  const searchProductInput = canvas.getByRole("textbox", {
    name: /Search product/i,
  });
  expect(searchProductInput).toBeInTheDocument();

  step("user input search product", () => {
    userEvent.type(searchProductInput, "Iphone");
    expect(searchProductInput).toHaveValue("Iphone");
  });
};
