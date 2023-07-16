import { cartsBaseURL } from "@src/constants";

import type { Cart, CartRequestParams, CartRespose } from "./model";

const getAllCarts = async ({
  limit,
  skip,
}: CartRequestParams): Promise<CartRespose> => {
  const url = new URL(cartsBaseURL);

  if (skip !== undefined) {
    url.searchParams.set("skip", skip.toString());
  }

  if (limit !== undefined) {
    url.searchParams.set("limit", limit.toString());
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  try {
    const data: CartRespose = await response.json();
    return data;
  } catch (error) {
    throw new Error(`JSON response was not ok cause ${error}`);
  }
};

const getCartDetail = async ({ cartId }: { cartId: string }): Promise<Cart> => {
  const response = await fetch(`${cartsBaseURL}/${cartId}`);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  try {
    const cart: Cart = await response.json();
    return cart;
  } catch (error) {
    throw new Error(`JSON response was not ok cause ${error}`);
  }
};

export type { CartRequestParams, CartRespose };
export { getAllCarts, getCartDetail };
