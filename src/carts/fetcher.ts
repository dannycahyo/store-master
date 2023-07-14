import type { Cart } from "./model";

type CartRequestParams = {
  limit?: number;
  skip?: number;
};

type CartRespose = {
  total: number;
  carts: Cart[];
  skip: number;
  limit: number;
};

const getAllCarts = async ({
  limit,
  skip,
}: CartRequestParams): Promise<CartRespose> => {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/carts`);

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
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/carts/${cartId}`,
  );

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
