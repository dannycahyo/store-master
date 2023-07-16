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
  const [{ formValues, brands, categories }, updateArgs] = useArgs();

  const handleSearch = (search: string) => {
    action("onSearch")(search);
    updateArgs({
      formValues: {
        ...formValues,
        q: search,
      },
    });
  };

  const handleCategoryChange = (category: string) => {
    action("onCategoryChange")(category);
    updateArgs({
      formValues: {
        ...formValues,
        category,
      },
    });
  };

  const handleBrandChange = (brand: string) => {
    action("onBrandChange")(brand);
    updateArgs({
      formValues: {
        ...formValues,
        category: undefined,
        brand,
      },
    });
  };

  const handlePriceRangeChange = (min: number, max: number) => {
    action("onPriceRangeChange")(min, max);
    updateArgs({
      formValues: {
        ...formValues,
        pMin: min,
        pMax: max,
      },
    });
  };

  return (
    <ProductFilter
      {...args}
      brands={brands}
      categories={categories}
      formValues={formValues}
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
  formValues: {
    category: "shoes",
    brand: "Adidas",
    pMin: undefined,
    pMax: undefined,
    q: undefined,
  },
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

  const minInput = canvas.getByRole("textbox", {
    name: /Min Price/i,
  });
  expect(minInput).toBeInTheDocument();

  step("user input min price", () => {
    userEvent.type(minInput, "100");
    expect(minInput).toHaveValue("100");
  });

  const maxInput = canvas.getByRole("textbox", {
    name: /Max Price/i,
  });
  expect(maxInput).toBeInTheDocument();

  step("user input max price", () => {
    userEvent.type(maxInput, "1000");
    expect(maxInput).toHaveValue("1000");
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
