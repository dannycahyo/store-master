import { rest } from "msw";

import { cartList } from "@src/constants";

import type { Cart } from "@src/carts/model";

const successCartDetailHandler = [
  rest.get(`${process.env.NEXT_PUBLIC_API_URL}/carts/:id`, (req, res, ctx) => {
    const { id } = req.params;

    const cartDetail = cartList.find((cart) => cart.id === Number(id)) as Cart;

    return res(ctx.status(200), ctx.json<Cart>(cartDetail));
  }),
];

const errorCartDetailHandler = [
  rest.get(`${process.env.NEXT_PUBLIC_API_URL}/carts/:id`, (_req, res, ctx) => {
    return res(ctx.status(500));
  }),
];

export { successCartDetailHandler, errorCartDetailHandler };
