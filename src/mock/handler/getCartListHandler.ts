import { rest } from "msw";

import { cartList } from "@src/constants";
import { CartRespose } from "@src/carts/fetcher";

const successCartListHandler = [
  rest.get(`${process.env.NEXT_PUBLIC_API_URL}/carts`, (req, res, ctx) => {
    const params = req.url.searchParams;
    const skipParams = params.get("skip");
    const limitParams = params.get("limit");

    const page = Number(skipParams) === 0 ? 1 : Number(skipParams);
    const skip =
      Number(skipParams) === 0 ? (page - 1) * Number(limitParams) : page;
    const limit = Number(limitParams);

    const paginatedCarts = cartList.slice(skip, skip + limit);

    return res(
      ctx.status(200),
      ctx.json<CartRespose>({
        carts: paginatedCarts,
        limit,
        skip,
        total: cartList.length,
      }),
    );
  }),
];

const errorCartListHandler = [
  rest.get(`${process.env.NEXT_PUBLIC_API_URL}/carts`, (_req, res, ctx) => {
    return res(ctx.status(500));
  }),
];

export { successCartListHandler, errorCartListHandler };
