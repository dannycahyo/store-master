import { rest } from "msw";

import { productBaseURL, products } from "@src/constants";
import {
  applyPagination,
  applyPriceRange,
  applySearching,
  applySelection,
} from "@src/utils";

import type { ProductsResponse } from "@src/products/model";

const successProductsByCategoryAndBrandHandler = [
  rest.get(`${productBaseURL}/:filterKind/:filterKindName`, (req, res, ctx) => {
    const { filterKind, filterKindName } = req.params;
    const params = req.url.searchParams;
    const { limit, skip, select, pMax, pMin, q } = Object.fromEntries(params);

    let productsList = products;
    let totalProducts = productsList.length;

    if (filterKind === "category") {
      productsList = productsList.filter((product) => {
        return product.category === filterKindName;
      });
      totalProducts = productsList.length;
    }

    if (filterKind === "brand") {
      productsList = productsList.filter((product) => {
        return product.brand === filterKindName;
      });
      totalProducts = productsList.length;
    }

    if (pMin && pMax) {
      productsList = applyPriceRange(productsList, Number(pMin), Number(pMax));
      totalProducts = productsList.length;
    }

    if (q) {
      productsList = applySearching(productsList, q);
      totalProducts = productsList.length;
    }

    if (select) {
      const defaultSelectedField = "id,";
      const selectFields = ((defaultSelectedField + select) as string).split(
        ",",
      );
      productsList = productsList.map((product) => {
        return applySelection(product, selectFields);
      });
    }

    productsList = applyPagination(productsList, Number(skip), Number(limit));

    return res(
      ctx.status(200),
      ctx.json<ProductsResponse>({
        products: productsList,
        total: totalProducts,
        skip: Number(skip),
        limit: Number(limit),
      }),
    );
  }),
];

const successProductHandlers = [
  rest.get(`${productBaseURL}`, (req, res, ctx) => {
    const params = req.url.searchParams;
    const { limit, skip, select, pMax, pMin, q } = Object.fromEntries(params);

    let productsList = products;
    let totalProducts = productsList.length;

    if (pMin && pMax) {
      productsList = applyPriceRange(productsList, Number(pMin), Number(pMax));
      totalProducts = productsList.length;
    }

    if (q) {
      productsList = applySearching(productsList, q);
      totalProducts = productsList.length;
    }

    if (select) {
      const defaultSelectedField = "id,";
      const selectFields = ((defaultSelectedField + select) as string).split(
        ",",
      );
      productsList = productsList.map((product) => {
        return applySelection(product, selectFields);
      });
    }

    productsList = applyPagination(productsList, Number(skip), Number(limit));

    return res(
      ctx.status(200),
      ctx.json<ProductsResponse>({
        products: productsList,
        total: totalProducts,
        skip: Number(skip),
        limit: Number(limit),
      }),
    );
  }),
];

const errorProductsByBrandHandler = [
  rest.get(`${productBaseURL}/brand/:brand`, (_req, res, ctx) => {
    return res(ctx.status(500));
  }),
];

const errorProductsByCategoryHandler = [
  rest.get(`${productBaseURL}/category/:category`, (_req, res, ctx) => {
    return res(ctx.status(500));
  }),
];

const errorProductsHandler = [
  rest.get(`${productBaseURL}`, (_req, res, ctx) => {
    return res(ctx.status(500));
  }),
];

export {
  successProductsByCategoryAndBrandHandler,
  successProductHandlers,
  errorProductsByCategoryHandler,
  errorProductsByBrandHandler,
  errorProductsHandler,
};
