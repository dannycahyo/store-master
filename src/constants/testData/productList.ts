import type { ProductMapped } from "@src/products/model";

const productList: ProductMapped[] = [
  {
    id: 1,
    title: "iPhone 9",
    price: 549,
    stock: 94,
    brand: "Apple",
    category: "smartphones",
  },
  {
    id: 2,
    title: "iPhone X",
    price: 899,
    stock: 34,
    brand: "Apple",
    category: "smartphones",
  },
  {
    id: 3,
    title: "Samsung Universe 9",
    price: 1249,
    stock: 36,
    brand: "Samsung",
    category: "smartphones",
  },
];

export { productList };
