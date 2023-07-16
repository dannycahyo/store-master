import { QueryClient, dehydrate } from "@tanstack/react-query";

import { CartDetailScreen } from "@src/carts/screens";
import { getCartDetail } from "@src/carts/fetcher";
import { getQuery } from "src/utils";

import type { MainProps } from "@src/pages/_app";
import type { GetServerSideProps } from "next";

type CartDetailScreenProps = {
  cartId: string;
};

export const getServerSideProps: GetServerSideProps<
  MainProps & CartDetailScreenProps
> = async ({ query }) => {
  const queryClient = new QueryClient();

  const cartId = getQuery(query.cartId, "");

  await queryClient.prefetchQuery(["cart", cartId], () =>
    getCartDetail({ cartId }),
  );

  return {
    props: {
      cartId,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default CartDetailScreen;
