import type { Product } from "@src/products/model";

const applyPriceRange = (products: Product[], pMin: number, pMax: number) => {
  return products.filter(
    (product) => product.price >= Number(pMin) && product.price <= Number(pMax),
  );
};

export { applyPriceRange };
