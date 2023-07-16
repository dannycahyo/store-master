import { rest } from "msw";

import { productBaseURL, products } from "@src/constants";

import type { Product } from "@src/products/model";

const successProductBrandsHandler = [
  rest.get(`${productBaseURL}/brands`, (_req, res, ctx) => {
    const brands = [
      ...new Set(products.map((product: Product) => product.brand)),
    ];

    return res(ctx.status(200), ctx.json(brands));
  }),
];

const errorProductBrandsHandler = [
  rest.get(`${productBaseURL}/brands`, (_req, res, ctx) => {
    return res(ctx.status(500));
  }),
];

export { successProductBrandsHandler, errorProductBrandsHandler };
