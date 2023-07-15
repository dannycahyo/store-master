import { Meta, StoryFn } from "@storybook/react";
import { withActions } from "@storybook/addon-actions/decorator";
import { useArgs } from "@storybook/client-api";
import { action } from "@storybook/addon-actions";

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
