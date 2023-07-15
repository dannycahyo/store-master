import { useQuery } from "@tanstack/react-query";

import { getAllCarts, getCartDetail } from "./fetcher";

import type { Cart, CartRequestParams, CartRespose } from "./model";
import type { UseQueryOptions } from "@tanstack/react-query";

function useGetCartDetail(
  { cartId }: { cartId: string },
  options?: UseQueryOptions<Cart>,
) {
  return useQuery<Cart>({
    queryKey: ["cart", cartId],
    queryFn: () => getCartDetail({ cartId }),
    ...options,
  });
}

function useGetAllCarts(
  params?: CartRequestParams,
  options?: UseQueryOptions<CartRespose>,
) {
  return useQuery<CartRespose>({
    queryKey: ["carts", { ...params }],
    queryFn: () => getAllCarts({ ...params }),
    ...options,
  });
}

export { useGetAllCarts, useGetCartDetail };
