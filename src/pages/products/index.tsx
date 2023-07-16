import { ProductListScreen } from "@src/products/screens";
import { QueryClient, dehydrate } from "@tanstack/react-query";

import {
  getProducts,
  getAllProductsBrands,
  getAllProductsCategories,
} from "@src/products/fetcher";
import { getQuery } from "src/utils";

import type { MainProps } from "@src/pages/_app";
import type { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps<MainProps> = async ({
  query,
}) => {
  const queryClient = new QueryClient();

  const { brand, category, pMin, pMax, q, page, pageSize } = query;
  const brandQuery = getQuery(brand, "");
  const categoryQuery = getQuery(category, "");
  const pMinQuery = getQuery(pMin, 0);
  const pMaxQuery = getQuery(pMax, 0);
  const qQuery = getQuery(q, "");
  const pageQuery = getQuery(page, 1);
  const pageSizeQuery = getQuery(pageSize, 10);

  await queryClient.prefetchQuery(["brands"], getAllProductsBrands);
  await queryClient.prefetchQuery(["categories"], getAllProductsCategories);

  await queryClient.prefetchQuery(
    [
      "products",
      {
        brand: brandQuery,
        category: categoryQuery,
        pMin: Number(pMinQuery),
        pMax: Number(pMaxQuery),
        q: qQuery,
        skip: Number(pageQuery),
        limit: Number(pageSizeQuery),
      },
    ],
    () =>
      getProducts({
        brand: brandQuery,
        category: categoryQuery,
        pMin: Number(pMinQuery),
        pMax: Number(pMaxQuery),
        q: qQuery as string,
        skip: Number(pageQuery),
        limit: Number(pageSizeQuery),
      }),
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default ProductListScreen;
