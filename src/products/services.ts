import { useQuery } from "@tanstack/react-query";

import {
  getProducts,
  getAllProductsCategories,
  getAllProductsBrands,
} from "./fetcher";

import type { UseQueryOptions } from "@tanstack/react-query";
import type { ProductRequestParams, ProductResponseMapped } from "./model";

function useGetProducts(
  params?: ProductRequestParams,
  options?: UseQueryOptions<ProductResponseMapped>,
) {
  return useQuery<ProductResponseMapped>({
    queryKey: ["products", { ...params }],
    queryFn: () => getProducts({ ...params }),
    ...options,
  });
}

function useGetAllProductsCategories(options?: UseQueryOptions<string[]>) {
  return useQuery<string[]>({
    queryKey: ["productsCategories"],
    queryFn: () => getAllProductsCategories(),
    ...options,
  });
}

function useGetAllProductsBrands(options?: UseQueryOptions<string[]>) {
  return useQuery<string[]>({
    queryKey: ["productsBrands"],
    queryFn: () => getAllProductsBrands(),
    ...options,
  });
}

export { useGetProducts, useGetAllProductsCategories, useGetAllProductsBrands };