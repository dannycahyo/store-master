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

  const response = await fetch(url);
  const data: ProductsResponse = await response.json();
  const filteredProducts = data.products.filter(
    (product: Product) => product.brand === brand,
  );

  const total = filteredProducts.length;

  let paginatedProducts =
    limit !== "0"
      ? filteredProducts.slice(Number(skip), Number(skip) + Number(limit))
      : filteredProducts.slice(Number(skip));

  if (select) {
    const defaultSelectedField = "id,";
    const selectFields = ((defaultSelectedField + select) as string).split(",");
    paginatedProducts = paginatedProducts.map((product: Product) => {
      const selectedProductMap = new Map();
      selectFields.forEach((field: string) => {
        selectedProductMap.set(field, product[field as keyof Product]);
      });
      const selectedProduct = Object.fromEntries(selectedProductMap);
      return selectedProduct as Product;
    });
  }

  res.status(200).json({
    products: paginatedProducts,
    total,
    skip: Number(skip),
    limit: Number(limit),
  });
}
