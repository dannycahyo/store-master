import fetch from "node-fetch";

import {
  applyPagination,
  applyPriceRange,
  applySearching,
  applySelection,
} from "@src/utils";

import type { Product, ProductsResponse } from "@src/products/model";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { limit = "0", skip = "0", select, brand, pMax, pMin, q } = req.query;

  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/products`);

  url.searchParams.set("limit", "0");

  const response = await fetch(url);
  const data: ProductsResponse = await response.json();

  let products = data.products.filter(
    (product: Product) => product.brand === brand,
  );
  let totalProducts = products.length;

  if (pMin && pMax) {
    products = applyPriceRange(products, Number(pMin), Number(pMax));
    totalProducts = products.length;
  }

  if (q) {
    products = applySearching(products, q as string);
    totalProducts = products.length;
  }

  if (select) {
    const defaultSelectedField = "id,";
    const selectFields = ((defaultSelectedField + select) as string).split(",");
    products = products.map((product: Product) => {
      return applySelection(product, selectFields);
    });
  }

  products = applyPagination(products, Number(skip), Number(limit));

  res.status(200).json({
    products: products,
    total: totalProducts,
    skip: Number(skip),
    limit: Number(limit),
  });
}
