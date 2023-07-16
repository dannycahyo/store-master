import fetch from "node-fetch";

import type { Product } from "@src/products/model";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req_: NextApiRequest,
  res: NextApiResponse,
) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
  const data = await response.json();

  const brands = [
    ...new Set<Product[]>(
      data.products.map((product: Product) => product.brand),
    ),
  ];

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(200).json(brands);
}
