import fetch from "node-fetch";

import type { Product, ProductsResponse } from "@src/products/model";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { limit = "0", skip = "0", select, brand } = req.query;

  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/products`);

  url.searchParams.set("limit", "0");
  if (select) url.searchParams.set("select", select as string);

  const response = await fetch(url);
  const data: ProductsResponse = await response.json();
  const filteredProducts = data.products.filter(
    (product: Product) => product.brand === brand,
  );

  const total = filteredProducts.length;

  const paginatedProducts =
    limit !== "0"
      ? filteredProducts.slice(Number(skip), Number(skip) + Number(limit))
      : filteredProducts.slice(Number(skip));

  res.status(200).json({
    products: paginatedProducts,
    total,
    skip: Number(skip),
    limit: Number(limit),
  });
}
