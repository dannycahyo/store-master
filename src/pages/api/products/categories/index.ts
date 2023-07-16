import fetch from "node-fetch";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse,
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/categories`,
  );
  const data = await response.json();

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(200).json(data);
}
