import { rest } from "msw";

import { productBaseURL, products } from "@src/constants";

import type { Product } from "@src/products/model";

const successProductCategoriesHandler = [
  rest.get(`${productBaseURL}/categories`, (_req, res, ctx) => {
    const categories = [
      ...new Set(products.map((product: Product) => product.category)),
    ];

    return res(ctx.status(200), ctx.json(categories));
  }),
];

const errorProductCategoriesHandler = [
  rest.get(`${productBaseURL}/categories`, (_req, res, ctx) => {
    return res(ctx.status(500));
  }),
];

export { successProductCategoriesHandler, errorProductCategoriesHandler };
