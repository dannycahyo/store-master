import type { Product } from "@src/products/model";

const applyPagination = (
  products: Product[],
  skip: number,
  limit: number,
): Product[] => {
  return limit !== 0
    ? products.slice(skip, skip + limit)
    : products.slice(skip);
};

export { applyPagination };
