import type { Product } from "@src/products/model";

const applySearching = (products: Product[], q: string): Product[] => {
  const query = q.toLowerCase();

  return products.filter(({ title }: Product) => {
    return title.toLowerCase().includes(query);
  });
};

export { applySearching };
