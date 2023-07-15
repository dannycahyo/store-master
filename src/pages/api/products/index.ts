import fetch from "node-fetch";

import { applyPagination, applyPriceRange, applySelection } from "@src/utils";

import type { NextApiRequest, NextApiResponse } from "next";
import type { Product, ProductsResponse } from "@src/products/model";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { limit = "0", skip = "0", select, pMax, pMin } = req.query;

  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/products`);

  url.searchParams.set("limit", "0");

  const response = await fetch(url);
  const data: ProductsResponse = await response.json();

  let products = data.products;

  if (pMin && pMax) {
    products = applyPriceRange(products, Number(pMin), Number(pMax));
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
    total: products.length,
    skip: Number(skip),
    limit: Number(limit),
  });
}
