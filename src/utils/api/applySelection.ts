import type { Product } from "@src/products/model";

const applySelection = (product: Product, selectFields: string[]): Product => {
  const selectedProductMap = new Map();
  selectFields.forEach((field) => {
    selectedProductMap.set(field, product[field as keyof Product]);
  });
  const selectedProduct = Object.fromEntries(selectedProductMap);
  return selectedProduct as Product;
};

export { applySelection };
