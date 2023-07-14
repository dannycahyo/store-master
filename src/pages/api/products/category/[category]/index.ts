import fetch from "node-fetch";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { category, limit, skip, select } = req.query;

  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_URL}/products/category/${category}`,
  );

  if (limit) url.searchParams.set("limit", limit as string);
  if (skip) url.searchParams.set("skip", skip as string);
  if (select) url.searchParams.set("select", select as string);

  const response = await fetch(url);
  const data = await response.json();

  res.status(200).json(data);
}
