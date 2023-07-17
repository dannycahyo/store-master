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
  const brandQueryValue = getQuery<string>(brand, "");
  const categoryQueryValue = getQuery<string>(category, "");
  const pMinQueryValue = getQuery<number>(pMin, 0);
  const pMaxQueryValue = getQuery<number>(pMax, 0);
  const qQueryValue = getQuery<string>(q, "");
  const pageQueryValue = getQuery<number>(page, 1);
  const pageSizeQueryValue = getQuery<number>(pageSize, 10);

  await queryClient.prefetchQuery(["productsBrands"], getAllProductsBrands);
  await queryClient.prefetchQuery(
    ["productsCategories"],
    getAllProductsCategories,
  );

  await queryClient.prefetchQuery(
    [
      "products",
      {
        brand: brandQueryValue,
        category: categoryQueryValue,
        pMin: Number(pMinQueryValue),
        pMax: Number(pMaxQueryValue),
        q: qQueryValue,
        skip: (Number(pageQueryValue) - 1) * Number(pageSizeQueryValue),
        limit: Number(pageSizeQueryValue),
      },
    ],
    () =>
      getProducts({
        brand: brandQueryValue,
        category: categoryQueryValue,
        pMin: Number(pMinQueryValue),
        pMax: Number(pMaxQueryValue),
        q: qQueryValue,
        skip: (Number(pageQueryValue) - 1) * Number(pageSizeQueryValue),
        limit: Number(pageSizeQueryValue),
      }),
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default ProductListScreen;
